const mixerConnection = require('./connection');
const db = require('../database');
const wsService = require('../websocket');

// Timestamp helper for readable logs
function ts() {
  return new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Channel type presets met optimale thresholds
// UI24 gain range: -40 to +50 dB (preamp gain)
const CHANNEL_PRESETS = {
  vocal: {
    name: 'Zang',
    threshold: 0.82,      // Iets onder clip voor warmte
    minGain: -40,          // Dynamic mic: 10-50 dB typisch
    maxGain: 50,
    attackTime: 30,       // Snelle reactie op plotse schreeuw
    releaseTime: 500,
    description: 'Dynamische zang, snel reageren op pieken'
  },
  keyboard: {
    name: 'Keyboard/Keys',
    threshold: 0.88,      // Line level, zeer consistent
    minGain: -40,         // Line level: -40 tot 10 dB
    maxGain: 10,
    attackTime: 100,
    releaseTime: 1000,
    description: 'Arranger/synth, stabiel line signaal'
  },
  acoustic_guitar: {
    name: 'Akoestische Gitaar',
    threshold: 0.75,      // Veel headroom voor strumming pieken
    minGain: 10,          // Pickup/mic: 10-45 dB
    maxGain: 45,
    attackTime: 20,       // Zeer snel voor transients
    releaseTime: 400,
    description: 'Dynamisch, scherpe aanslag pieken'
  },
  electric_guitar: {
    name: 'Elektrische Gitaar',
    threshold: 0.80,      // Amp/DI comprimeert al wat
    minGain: -20,         // DI/amp: -20 tot 30 dB
    maxGain: 30,
    attackTime: 50,
    releaseTime: 600,
    description: 'Via amp of DI, redelijk consistent'
  },
  bass: {
    name: 'Bas',
    threshold: 0.85,      // Consistent, maar slap/pop kan pieken
    minGain: -20,         // DI: -20 tot 25 dB
    maxGain: 25,
    attackTime: 40,
    releaseTime: 800,
    description: 'DI signaal, let op slap pieken'
  },
  drums_kick: {
    name: 'Kick Drum',
    threshold: 0.65,      // VEEL headroom voor zware transients
    minGain: 15,          // Dynamic mic: 15-45 dB
    maxGain: 45,
    attackTime: 10,       // Ultra snel
    releaseTime: 300,
    description: 'Extreme transients, maximale headroom'
  },
  drums_snare: {
    name: 'Snare',
    threshold: 0.68,      // Veel headroom
    minGain: 15,          // Dynamic mic: 15-45 dB
    maxGain: 45,
    attackTime: 10,
    releaseTime: 300,
    description: 'Scherpe rimshots opvangen'
  },
  drums_overhead: {
    name: 'Overhead/Cymbals',
    threshold: 0.70,      // Cymbals zijn heel dynamisch
    minGain: 10,          // Condenser: 10-40 dB
    maxGain: 40,
    attackTime: 15,
    releaseTime: 400,
    description: 'Cymbals kunnen hard pieken'
  },
  drums_tom: {
    name: 'Toms',
    threshold: 0.68,
    minGain: 15,          // Dynamic mic: 15-45 dB
    maxGain: 45,
    attackTime: 10,
    releaseTime: 300,
    description: 'Vergelijkbaar met kick'
  },
  backing_track: {
    name: 'Backing Track',
    threshold: 0.90,      // Al gemasterd, zeer consistent
    minGain: -40,         // Line level: -40 tot 5 dB
    maxGain: 5,
    attackTime: 200,
    releaseTime: 2000,
    description: 'Gemasterde audio, nauwelijks aanpassing nodig'
  },
  speech: {
    name: 'Spraak/Presentatie',
    threshold: 0.78,      // Meer headroom dan zang
    minGain: 15,          // Dynamic mic: 15-50 dB
    maxGain: 50,
    attackTime: 50,
    releaseTime: 600,
    description: 'Spreker, minder dynamisch dan zang'
  },
  choir: {
    name: 'Koor Mic',
    threshold: 0.75,      // Kan plotseling hard worden
    minGain: 20,          // Condenser, verder weg: 20-50 dB
    maxGain: 50,
    attackTime: 40,
    releaseTime: 500,
    description: 'Groepszang, kan snel aanzwellen'
  }
};

// Gain health status levels
const GAIN_HEALTH = {
  TOO_LOW: 'too_low',       // Signal consistently weak - INCREASE GAIN!
  LOW: 'low',               // Signal below optimal - consider increasing
  OPTIMAL: 'optimal',       // Perfect range
  HIGH: 'high',             // Getting hot - be careful
  CLIPPING: 'clipping'      // Over threshold - reducing gain
};

// Target levels for optimal gain staging
// Note: vuPre values from Soundcraft library are scaled differently than actual dB
// Calibrated for UI24 to achieve -12dB peak on mixer (higher values = louder)
const TARGET_LEVELS = {
  // Peak targets (calibrated for UI24)
  peakIdeal: 0.70,        // Target peak level (was 0.50)
  peakMax: 0.85,          // Absolute max for peaks (start reducing)
  peakMin: 0.40,          // Peaks too low

  // Average targets - aim for -12dB on mixer
  avgIdeal: 0.70,         // Target average level (+15% hoger)
  avgHigh: 0.80,          // Average getting hot
  avgLow: 0.40,           // Average too low
  avgCritical: 0.15,      // Way too low, urgent action

  // Tolerance band - aim for -12dB zone
  avgToleranceLow: 0.50,  // Below this = increase gain
  avgToleranceHigh: 0.85, // Above this = decrease gain
};

class AutoGainController {
  constructor() {
    this.channels = new Map(); // channel -> { subscription, currentGain, lastPeakTime, config }
    this.running = false;
    this.broadcastInterval = null;
    this.autoRecoveryEnabled = true; // Enable auto gain-up for low signals
  }

  start() {
    if (this.running) return;

    const config = db.get().mixerConfig;
    if (!config.autoGain?.enabled) {
      console.log('Auto-gain is disabled');
      return;
    }

    if (!mixerConnection.isConnected()) {
      console.log('Cannot start auto-gain: mixer not connected');
      return;
    }

    console.log(`[${ts()}] Auto-gain starting...`);
    this.running = true;

    // Start monitoring configured channels
    const channelConfigs = config.channels || [];
    channelConfigs.forEach(ch => {
      if (ch.autoGainEnabled) {
        this.addChannel(ch.number, ch);
      }
    });

    // Broadcast meter levels to UI periodically (reduced to prevent lag)
    this.broadcastInterval = setInterval(() => {
      this.broadcastLevels();
    }, 250); // 4 times per second (was 10x)

    console.log(`[${ts()}] Auto-gain ready (${this.channels.size} channels)`);
  }

  stop() {
    if (!this.running) return;

    console.log('Stopping auto-gain controller...');

    // Clear all subscriptions
    this.channels.forEach((data, channel) => {
      if (data.subscription) {
        data.subscription.unsubscribe();
      }
    });
    this.channels.clear();

    if (this.broadcastInterval) {
      clearInterval(this.broadcastInterval);
      this.broadcastInterval = null;
    }

    this.running = false;
    console.log('Auto-gain stopped');
  }

  restart() {
    this.stop();
    setTimeout(() => this.start(), 500);
  }

  addChannel(channelNumber, config = {}) {
    if (this.channels.has(channelNumber)) {
      this.removeChannel(channelNumber);
    }

    const globalConfig = db.get().mixerConfig.autoGain || {};

    const channelData = {
      number: channelNumber,
      name: config.name || `CH ${channelNumber}`,
      type: config.type || 'vocal',
      currentGain: config.currentGain || 0,
      targetGain: config.currentGain || 0,
      currentLevel: 0,
      peakLevel: 0,
      lastPeakTime: 0,
      isReducing: false,
      isIncreasing: false,
      lastIncreaseTime: 0,
      // For average level tracking (RMS-like)
      levelHistory: [],
      levelHistoryMaxSize: 20, // ~2 seconds of samples at 10Hz (faster response)
      averageLevel: 0,
      lowLevelDuration: 0, // How long signal has been too low
      lastLevelTime: 0,
      // Health status
      health: GAIN_HEALTH.OPTIMAL,
      healthMessage: '',
      gainLocked: false, // Manual lock to prevent auto-changes
      hasInitialAdjustment: false, // Track if first big jump was made
      // Fader and mute state
      faderLevel: 0.75, // 0.0-1.0, default to ~0dB
      muted: false,
      config: {
        threshold: config.threshold ?? globalConfig.threshold ?? 0.85,
        minGain: config.minGain ?? globalConfig.minGain ?? -40,
        maxGain: config.maxGain ?? globalConfig.maxGain ?? 50,  // Default to +50dB
        attackTime: config.attackTime ?? globalConfig.attackTime ?? 50,
        releaseTime: config.releaseTime ?? globalConfig.releaseTime ?? 500,
        reductionStep: config.reductionStep ?? 1, // dB per step
        recoveryStep: config.recoveryStep ?? 0.5, // dB per step
        lowSignalTime: config.lowSignalTime ?? 5000, // Time before suggesting gain increase (5 sec)
        increaseStep: config.increaseStep ?? 3 // dB per step when increasing
      },
      subscription: null
    };

    // Subscribe to meter level
    const sub = mixerConnection.onMeterLevel(channelNumber, (level) => {
      this.processLevel(channelNumber, level);
    });

    if (sub) {
      channelData.subscription = sub;
      this.channels.set(channelNumber, channelData);
      console.log(`[${ts()}] CH${channelNumber} enabled (${channelData.name})`);

      // Also subscribe to gain changes to track current gain
      mixerConnection.onGainChange(channelNumber, (gain) => {
        const ch = this.channels.get(channelNumber);
        if (ch && !ch.isReducing) {
          ch.currentGain = gain;
          ch.targetGain = gain;
        }
      });

      // Subscribe to fader level
      mixerConnection.onFaderChange(channelNumber, (faderLevel) => {
        const ch = this.channels.get(channelNumber);
        if (ch) {
          ch.faderLevel = faderLevel;
        }
      });

      // Subscribe to mute status
      mixerConnection.onMuteChange(channelNumber, (muted) => {
        const ch = this.channels.get(channelNumber);
        if (ch) {
          ch.muted = muted;
        }
      });
    }

    return channelData;
  }

  removeChannel(channelNumber) {
    const data = this.channels.get(channelNumber);
    if (data) {
      if (data.subscription) {
        data.subscription.unsubscribe();
      }
      this.channels.delete(channelNumber);
      console.log(`Auto-gain disabled for channel ${channelNumber}`);
    }
  }

  processLevel(channelNumber, level) {
    const ch = this.channels.get(channelNumber);
    if (!ch) return;

    const now = Date.now();
    const timeDelta = ch.lastLevelTime ? now - ch.lastLevelTime : 100;
    ch.lastLevelTime = now;
    ch.currentLevel = level;

    // Track peak
    if (level > ch.peakLevel) {
      ch.peakLevel = level;
      ch.lastPeakTime = now;
    } else if (now - ch.lastPeakTime > 1000) {
      // Decay peak after 1 second
      ch.peakLevel = Math.max(level, ch.peakLevel * 0.95);
    }

    // Track average level (rolling window)
    const prevAvg = ch.averageLevel;
    ch.levelHistory.push(level);
    if (ch.levelHistory.length > ch.levelHistoryMaxSize) {
      ch.levelHistory.shift();
    }
    ch.averageLevel = ch.levelHistory.reduce((a, b) => a + b, 0) / ch.levelHistory.length;

    // Fast response: detect sudden gain drops (e.g., user lowered gain on mixer)
    // Only trigger if: level dropped to <10% of previous AND not adjusted in last 1s
    const timeSinceLastAdjust = now - (ch.lastIncreaseTime || 0);
    const timeSinceLastReduce = now - (ch.lastReductionTime || 0);
    const recentlyAdjusted = timeSinceLastAdjust < 1000 || timeSinceLastReduce < 1000;

    if (level < prevAvg * 0.1 && prevAvg > 0.1 && !recentlyAdjusted) {
      ch.levelHistory = [level, level, level]; // Reset to current level
      ch.averageLevel = level;
      ch.hasInitialAdjustment = false; // Allow new JUMP
      console.log(`[${ts()}] CH${channelNumber}: RESET (manual gain change detected)`);
    }

    const { threshold, minGain, maxGain, attackTime, releaseTime, reductionStep, lowSignalTime, increaseStep } = ch.config;

    // === HEALTH STATUS CALCULATION ===
    this.updateHealthStatus(ch, level);

    // === CLIPPING PROTECTION (priority 1) ===
    if (level > threshold) {
      // We're clipping! Reduce gain immediately
      ch.lowLevelDuration = 0; // Reset low level counter

      if (!ch.gainLocked && (!ch.isReducing || now - ch.lastReductionTime > attackTime)) {
        ch.isReducing = true;
        ch.isIncreasing = false;
        ch.lastReductionTime = now;

        const newGain = Math.max(minGain, ch.currentGain - reductionStep);

        if (newGain !== ch.currentGain) {
          ch.currentGain = newGain;
          mixerConnection.setGain(channelNumber, newGain);

          console.log(`[${ts()}] CH${channelNumber}: CLIP ${(level * 100).toFixed(0)}% -> gain ${newGain}dB`);

          wsService.broadcast({
            type: 'autoGainAdjust',
            data: {
              channel: channelNumber,
              level: level,
              gain: newGain,
              action: 'reduce',
              health: ch.health,
              message: 'Gain verlaagd (clipping)'
            }
          });
        }
      }
    }
    // === LOW SIGNAL - Direct jump to target ===
    else if (ch.averageLevel < TARGET_LEVELS.avgToleranceLow && ch.averageLevel > 0.0001) {
      ch.lowLevelDuration += timeDelta;
      ch.isReducing = false;

      // Quick start: 200ms wait, then act immediately
      const waitTime = 200;

      if (this.autoRecoveryEnabled && !ch.gainLocked && ch.lowLevelDuration > waitTime) {
        // Cooldown: 300ms between adjustments
        if (!ch.isIncreasing || now - ch.lastIncreaseTime > 300) {
          ch.isIncreasing = true;
          ch.lastIncreaseTime = now;

          // Calculate FULL needed gain to reach target (-12dB peak = avgIdeal)
          const neededGain = 20 * Math.log10(TARGET_LEVELS.avgIdeal / ch.averageLevel);

          // First adjustment: apply 90% of needed gain (aggressive)
          // Subsequent adjustments: apply 100% (fine-tune)
          const isFirstAdjustment = !ch.hasInitialAdjustment;
          const factor = isFirstAdjustment ? 0.9 : 1.0;
          const step = Math.round(neededGain * factor);
          const newGain = Math.min(maxGain, Math.max(minGain, ch.currentGain + step));

          if (newGain !== ch.currentGain && step > 0) {
            ch.currentGain = newGain;
            ch.hasInitialAdjustment = true;
            ch.pendingStep = step;
            mixerConnection.setGain(channelNumber, newGain);

            console.log(`[${ts()}] CH${channelNumber}: ${isFirstAdjustment ? 'JUMP' : 'tune'} +${step}dB -> ${newGain}dB (avg=${(ch.averageLevel*100).toFixed(0)}%)`);

            wsService.broadcast({
              type: 'autoGainAdjust',
              data: {
                channel: channelNumber,
                level: level,
                gain: newGain,
                action: 'increase',
                health: ch.health,
                message: `+${step}dB`
              }
            });

            ch.lowLevelDuration = 0;
          }
        }
      }
    }
    // === ABOVE OPTIMAL - Proportional decrease ===
    else if (ch.averageLevel > TARGET_LEVELS.avgToleranceHigh && ch.peakLevel < threshold * 0.9) {
      ch.lowLevelDuration = 0;
      ch.isIncreasing = false;

      if (this.autoRecoveryEnabled && !ch.gainLocked) {
        if (!ch.isReducing || now - ch.lastReductionTime > 1500) {
          ch.isReducing = true;
          ch.lastReductionTime = now;

          // Proportional: calculate needed reduction, apply 50% capped at 4dB
          const neededReduction = 20 * Math.log10(ch.averageLevel / TARGET_LEVELS.avgIdeal);
          const step = Math.min(Math.round(neededReduction * 0.5), 4);
          const newGain = Math.max(minGain, ch.currentGain - step);

          if (newGain !== ch.currentGain && step > 0) {
            ch.currentGain = newGain;
            ch.pendingStep = -step;
            mixerConnection.setGain(channelNumber, newGain);

            console.log(`[${ts()}] CH${channelNumber}: HOT -${step}dB -> ${newGain}dB (avg=${(ch.averageLevel*100).toFixed(0)}%)`);

            wsService.broadcast({
              type: 'autoGainAdjust',
              data: {
                channel: channelNumber,
                level: level,
                gain: newGain,
                action: 'reduce',
                health: ch.health,
                message: `-${step}dB`
              }
            });
          }
        }
      }
    }
    // === OPTIMAL ZONE - No adjustment needed ===
    else {
      ch.lowLevelDuration = 0;
      ch.isIncreasing = false;

      if (ch.isReducing && level < threshold * 0.7) {
        if (now - ch.lastReductionTime > releaseTime) {
          ch.isReducing = false;
        }
      }
    }
  }

  updateHealthStatus(ch, level) {
    const { threshold } = ch.config;
    const avg = ch.averageLevel;
    let health = GAIN_HEALTH.OPTIMAL;
    let message = '';

    if (ch.isReducing || level > threshold) {
      health = GAIN_HEALTH.CLIPPING;
      message = 'Clip -1dB';
    } else if (avg < 0.01) {
      health = GAIN_HEALTH.OPTIMAL;
      message = '';
    } else if (avg < TARGET_LEVELS.avgToleranceLow) {
      // Calculate proportional step for display
      const neededGain = 20 * Math.log10(TARGET_LEVELS.avgIdeal / avg);
      const step = Math.min(Math.round(neededGain * 0.5), 6);

      if (avg < TARGET_LEVELS.avgCritical) {
        health = GAIN_HEALTH.TOO_LOW;
        message = `Te laag +${step}dB`;
      } else {
        health = GAIN_HEALTH.LOW;
        message = `Laag +${step}dB`;
      }
    } else if (avg > TARGET_LEVELS.avgHigh) {
      const neededReduction = 20 * Math.log10(avg / TARGET_LEVELS.avgIdeal);
      const step = Math.min(Math.round(neededReduction * 0.5), 4);
      health = GAIN_HEALTH.HIGH;
      message = `Heet -${step}dB`;
    } else {
      health = GAIN_HEALTH.OPTIMAL;
      message = '';
    }

    ch.health = health;
    ch.healthMessage = message;
  }

  broadcastLevels() {
    if (this.channels.size === 0) return;

    const levels = [];
    this.channels.forEach((ch, channelNumber) => {
      levels.push({
        channel: channelNumber,
        name: ch.name,
        type: ch.type,
        level: ch.currentLevel,
        peak: ch.peakLevel,
        averageLevel: ch.averageLevel,
        gain: ch.currentGain,
        faderLevel: ch.faderLevel,
        muted: ch.muted,
        threshold: ch.config.threshold,
        isReducing: ch.isReducing,
        isIncreasing: ch.isIncreasing,
        health: ch.health,
        healthMessage: ch.healthMessage,
        gainLocked: ch.gainLocked,
        lowLevelDuration: ch.lowLevelDuration
      });
    });

    wsService.broadcast({
      type: 'meterLevels',
      data: levels
    });
  }

  getChannelStatus(channelNumber) {
    return this.channels.get(channelNumber) || null;
  }

  getAllChannelsStatus() {
    const status = [];
    this.channels.forEach((ch, num) => {
      status.push({
        channel: num,
        name: ch.name,
        type: ch.type,
        level: ch.currentLevel,
        peak: ch.peakLevel,
        averageLevel: ch.averageLevel,
        gain: ch.currentGain,
        threshold: ch.config.threshold,
        isReducing: ch.isReducing,
        isIncreasing: ch.isIncreasing,
        health: ch.health,
        healthMessage: ch.healthMessage,
        gainLocked: ch.gainLocked,
        config: ch.config
      });
    });
    return status;
  }

  // Lock/unlock gain for a channel (prevent auto-adjustments)
  setGainLock(channelNumber, locked) {
    const ch = this.channels.get(channelNumber);
    if (ch) {
      ch.gainLocked = locked;
      console.log(`[AutoGain] CH${channelNumber}: Gain ${locked ? 'locked' : 'unlocked'}`);
      return true;
    }
    return false;
  }

  // Toggle auto-recovery (gain increase for low signals)
  setAutoRecovery(enabled) {
    this.autoRecoveryEnabled = enabled;
    console.log(`[AutoGain] Auto-recovery ${enabled ? 'enabled' : 'disabled'}`);
  }

  isAutoRecoveryEnabled() {
    return this.autoRecoveryEnabled;
  }

  // Manually set gain for a channel
  setChannelGain(channelNumber, gain) {
    const ch = this.channels.get(channelNumber);
    if (ch) {
      ch.currentGain = gain;
      ch.targetGain = gain;
    }
    return mixerConnection.setGain(channelNumber, gain);
  }

  // Reset all channels to a specific gain
  resetAllGains(gainValue = -24) {
    this.channels.forEach((ch, num) => {
      ch.currentGain = gainValue;
      ch.targetGain = gainValue;
      ch.isReducing = false;
      mixerConnection.setGain(num, gainValue);
    });
    console.log(`[AutoGain] Reset all gains to ${gainValue}dB`);
  }
}

// Singleton
const autoGainController = new AutoGainController();

module.exports = autoGainController;
module.exports.CHANNEL_PRESETS = CHANNEL_PRESETS;
module.exports.GAIN_HEALTH = GAIN_HEALTH;
module.exports.TARGET_LEVELS = TARGET_LEVELS;
