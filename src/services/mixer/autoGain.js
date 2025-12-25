const mixerConnection = require('./connection');
const db = require('../database');
const wsService = require('../websocket');

// Channel type presets met optimale thresholds
const CHANNEL_PRESETS = {
  vocal: {
    name: 'Zang',
    threshold: 0.82,      // Iets onder clip voor warmte
    minGain: -20,
    maxGain: 15,
    attackTime: 30,       // Snelle reactie op plotse schreeuw
    releaseTime: 500,
    description: 'Dynamische zang, snel reageren op pieken'
  },
  keyboard: {
    name: 'Keyboard/Keys',
    threshold: 0.88,      // Line level, zeer consistent
    minGain: -40,
    maxGain: 0,
    attackTime: 100,
    releaseTime: 1000,
    description: 'Arranger/synth, stabiel line signaal'
  },
  acoustic_guitar: {
    name: 'Akoestische Gitaar',
    threshold: 0.75,      // Veel headroom voor strumming pieken
    minGain: -25,
    maxGain: 20,
    attackTime: 20,       // Zeer snel voor transients
    releaseTime: 400,
    description: 'Dynamisch, scherpe aanslag pieken'
  },
  electric_guitar: {
    name: 'Elektrische Gitaar',
    threshold: 0.80,      // Amp/DI comprimeert al wat
    minGain: -30,
    maxGain: 10,
    attackTime: 50,
    releaseTime: 600,
    description: 'Via amp of DI, redelijk consistent'
  },
  bass: {
    name: 'Bas',
    threshold: 0.85,      // Consistent, maar slap/pop kan pieken
    minGain: -35,
    maxGain: 5,
    attackTime: 40,
    releaseTime: 800,
    description: 'DI signaal, let op slap pieken'
  },
  drums_kick: {
    name: 'Kick Drum',
    threshold: 0.65,      // VEEL headroom voor zware transients
    minGain: -40,
    maxGain: 10,
    attackTime: 10,       // Ultra snel
    releaseTime: 300,
    description: 'Extreme transients, maximale headroom'
  },
  drums_snare: {
    name: 'Snare',
    threshold: 0.68,      // Veel headroom
    minGain: -35,
    maxGain: 15,
    attackTime: 10,
    releaseTime: 300,
    description: 'Scherpe rimshots opvangen'
  },
  drums_overhead: {
    name: 'Overhead/Cymbals',
    threshold: 0.70,      // Cymbals zijn heel dynamisch
    minGain: -30,
    maxGain: 20,
    attackTime: 15,
    releaseTime: 400,
    description: 'Cymbals kunnen hard pieken'
  },
  drums_tom: {
    name: 'Toms',
    threshold: 0.68,
    minGain: -35,
    maxGain: 15,
    attackTime: 10,
    releaseTime: 300,
    description: 'Vergelijkbaar met kick'
  },
  backing_track: {
    name: 'Backing Track',
    threshold: 0.90,      // Al gemasterd, zeer consistent
    minGain: -40,
    maxGain: -10,
    attackTime: 200,
    releaseTime: 2000,
    description: 'Gemasterde audio, nauwelijks aanpassing nodig'
  },
  speech: {
    name: 'Spraak/Presentatie',
    threshold: 0.78,      // Meer headroom dan zang
    minGain: -15,
    maxGain: 20,
    attackTime: 50,
    releaseTime: 600,
    description: 'Spreker, minder dynamisch dan zang'
  },
  choir: {
    name: 'Koor Mic',
    threshold: 0.75,      // Kan plotseling hard worden
    minGain: -20,
    maxGain: 25,
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

// Target levels for optimal gain staging (based on dB)
// Conversion: -6dB = 50%, -12dB = 25%, -18dB = 12.5%, -24dB = 6.25%
const TARGET_LEVELS = {
  // Peak targets (-12dB ideal)
  peakIdeal: 0.25,        // -12dB - ideal peak level
  peakMax: 0.50,          // -6dB - absolute max for peaks
  peakMin: 0.10,          // -20dB - peaks too low

  // Average targets (-18dB ideal)
  avgIdeal: 0.125,        // -18dB - ideal average level
  avgHigh: 0.20,          // -14dB - average getting hot
  avgLow: 0.06,           // -24dB - average too low
  avgCritical: 0.03,      // -30dB - way too low, urgent action

  // Tolerance band (don't adjust if within this range)
  avgToleranceLow: 0.08,  // -22dB
  avgToleranceHigh: 0.18, // -15dB
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

    console.log('Starting auto-gain controller...');
    this.running = true;

    // Start monitoring configured channels
    const channelConfigs = config.channels || [];
    channelConfigs.forEach(ch => {
      if (ch.autoGainEnabled) {
        this.addChannel(ch.number, ch);
      }
    });

    // Broadcast meter levels to UI periodically
    this.broadcastInterval = setInterval(() => {
      this.broadcastLevels();
    }, 100); // 10 times per second

    console.log(`Auto-gain started for ${this.channels.size} channels`);
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
      levelHistoryMaxSize: 50, // ~5 seconds of samples at 10Hz
      averageLevel: 0,
      lowLevelDuration: 0, // How long signal has been too low
      lastLevelTime: 0,
      // Health status
      health: GAIN_HEALTH.OPTIMAL,
      healthMessage: '',
      gainLocked: false, // Manual lock to prevent auto-changes
      // Fader and mute state
      faderLevel: 0.75, // 0.0-1.0, default to ~0dB
      muted: false,
      config: {
        threshold: config.threshold ?? globalConfig.threshold ?? 0.85,
        minGain: config.minGain ?? globalConfig.minGain ?? -40,
        maxGain: config.maxGain ?? globalConfig.maxGain ?? 0,
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
      console.log(`Auto-gain enabled for channel ${channelNumber} (${channelData.name})`);

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
    ch.levelHistory.push(level);
    if (ch.levelHistory.length > ch.levelHistoryMaxSize) {
      ch.levelHistory.shift();
    }
    ch.averageLevel = ch.levelHistory.reduce((a, b) => a + b, 0) / ch.levelHistory.length;

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

          console.log(`[AutoGain] CH${channelNumber}: Level ${(level * 100).toFixed(0)}% > threshold, gain -> ${newGain}dB`);

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
    // === LOW SIGNAL - Proportional increase towards target ===
    else if (ch.averageLevel < TARGET_LEVELS.avgToleranceLow && ch.averageLevel > 0.01) {
      ch.lowLevelDuration += timeDelta;
      ch.isReducing = false;

      // Wait time: 2s for critical, 4s for low
      const waitTime = ch.averageLevel < TARGET_LEVELS.avgCritical ? 2000 : 4000;

      if (this.autoRecoveryEnabled && !ch.gainLocked && ch.lowLevelDuration > waitTime) {
        if (!ch.isIncreasing || now - ch.lastIncreaseTime > 1000) {
          ch.isIncreasing = true;
          ch.lastIncreaseTime = now;

          // Proportional: calculate needed gain, apply 50% capped at 6dB
          const neededGain = 20 * Math.log10(TARGET_LEVELS.avgIdeal / ch.averageLevel);
          const step = Math.min(Math.round(neededGain * 0.5), 6);
          const newGain = Math.min(maxGain, ch.currentGain + step);

          if (newGain !== ch.currentGain && step > 0) {
            ch.currentGain = newGain;
            ch.pendingStep = step; // Store for health message
            mixerConnection.setGain(channelNumber, newGain);

            console.log(`[AutoGain] CH${channelNumber}: Low signal, need +${neededGain.toFixed(0)}dB, applying +${step}dB -> ${newGain}dB`);

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

            console.log(`[AutoGain] CH${channelNumber}: Hot signal, need -${neededReduction.toFixed(0)}dB, applying -${step}dB -> ${newGain}dB`);

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
