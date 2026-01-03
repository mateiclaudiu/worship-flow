const express = require('express');
const router = express.Router();
const db = require('../services/database');
const mixerService = require('../services/mixer');
const { CHANNEL_PRESETS } = require('../services/mixer/autoGain');

// Get mixer config and status
router.get('/config', (req, res) => {
  const config = db.get().mixerConfig;
  res.json({
    ...config,
    connected: mixerService.connection.isConnected(),
    autoGainRunning: mixerService.autoGain.running
  });
});

// Update mixer config
router.put('/config', (req, res) => {
  const { ip, showName, enabled } = req.body;
  const data = db.get();

  data.mixerConfig = {
    ...data.mixerConfig,
    ip: ip || '',
    showName: showName || '',
    enabled: enabled || false
  };

  db.save();

  // Reconnect with new settings
  mixerService.reconnect();

  res.json({ success: true, config: data.mixerConfig });
});

// Get auto-gain config
router.get('/autogain', (req, res) => {
  const config = db.get().mixerConfig;
  const globalConfig = config.autoGain || {};

  // Enrich channels with preset values if missing
  const channels = (config.channels || []).map(ch => {
    const preset = ch.type && CHANNEL_PRESETS[ch.type] ? CHANNEL_PRESETS[ch.type] : null;
    return {
      ...ch,
      threshold: ch.threshold ?? preset?.threshold ?? globalConfig.threshold ?? 0.85,
      minGain: ch.minGain ?? preset?.minGain ?? globalConfig.minGain ?? -40,
      maxGain: ch.maxGain ?? preset?.maxGain ?? globalConfig.maxGain ?? 0,
      attackTime: ch.attackTime ?? preset?.attackTime ?? 50,
      releaseTime: ch.releaseTime ?? preset?.releaseTime ?? 500
    };
  });

  res.json({
    enabled: globalConfig.enabled || false,
    threshold: globalConfig.threshold || 0.85,
    minGain: globalConfig.minGain || -40,
    maxGain: globalConfig.maxGain || 0,
    channels,
    running: mixerService.autoGain.running,
    status: mixerService.autoGain.getAllChannelsStatus()
  });
});

// Update auto-gain config
router.put('/autogain', (req, res) => {
  const { enabled, threshold, minGain, maxGain, channels } = req.body;
  const data = db.get();

  data.mixerConfig.autoGain = {
    enabled: enabled ?? data.mixerConfig.autoGain?.enabled ?? false,
    threshold: threshold ?? data.mixerConfig.autoGain?.threshold ?? 0.85,
    minGain: minGain ?? data.mixerConfig.autoGain?.minGain ?? -40,
    maxGain: maxGain ?? data.mixerConfig.autoGain?.maxGain ?? 0,
    attackTime: 50,
    releaseTime: 500
  };

  if (channels) {
    data.mixerConfig.channels = channels;
  }

  db.save();

  // Restart auto-gain with new settings
  mixerService.autoGain.restart();

  res.json({ success: true, config: data.mixerConfig.autoGain });
});

// Add/update a channel for auto-gain
router.put('/autogain/channel/:num', (req, res) => {
  const channelNum = parseInt(req.params.num);
  const { name, autoGainEnabled, type, threshold, minGain, maxGain } = req.body;
  const data = db.get();

  if (!data.mixerConfig.channels) {
    data.mixerConfig.channels = [];
  }

  // Find or create channel config
  let channelConfig = data.mixerConfig.channels.find(c => c.number === channelNum);
  if (!channelConfig) {
    channelConfig = { number: channelNum };
    data.mixerConfig.channels.push(channelConfig);
  }

  // If type is specified, apply preset values
  if (type && CHANNEL_PRESETS[type]) {
    const preset = CHANNEL_PRESETS[type];
    channelConfig.type = type;
    channelConfig.threshold = threshold ?? preset.threshold;
    channelConfig.minGain = minGain ?? preset.minGain;
    channelConfig.maxGain = maxGain ?? preset.maxGain;
    channelConfig.attackTime = preset.attackTime;
    channelConfig.releaseTime = preset.releaseTime;
  } else {
    channelConfig.threshold = threshold ?? channelConfig.threshold;
    channelConfig.minGain = minGain ?? channelConfig.minGain;
    channelConfig.maxGain = maxGain ?? channelConfig.maxGain;
  }

  // Update channel config
  channelConfig.name = name ?? channelConfig.name ?? `CH ${channelNum}`;
  channelConfig.autoGainEnabled = autoGainEnabled ?? channelConfig.autoGainEnabled ?? false;

  db.save();

  // Update running auto-gain
  if (channelConfig.autoGainEnabled) {
    mixerService.autoGain.addChannel(channelNum, channelConfig);
  } else {
    mixerService.autoGain.removeChannel(channelNum);
  }

  res.json({ success: true, channel: channelConfig });
});

// Remove channel from auto-gain
router.delete('/autogain/channel/:num', (req, res) => {
  const channelNum = parseInt(req.params.num);
  const data = db.get();

  if (data.mixerConfig.channels) {
    data.mixerConfig.channels = data.mixerConfig.channels.filter(c => c.number !== channelNum);
    db.save();
  }

  mixerService.autoGain.removeChannel(channelNum);

  res.json({ success: true });
});

// Set gain for a specific channel
router.post('/channel/:num/gain', (req, res) => {
  const channelNum = parseInt(req.params.num);
  const { gain } = req.body;

  const success = mixerService.autoGain.setChannelGain(channelNum, gain);
  res.json({ success });
});

// Reset all gains
router.post('/reset-gains', (req, res) => {
  const { gain } = req.body;
  mixerService.autoGain.resetAllGains(gain ?? -24);
  res.json({ success: true });
});

// Set fader level
router.post('/channel/:num/fader', (req, res) => {
  const channelNum = parseInt(req.params.num);
  const { level } = req.body;

  const success = mixerService.connection.setFaderLevel(channelNum, level);
  res.json({ success });
});

// Mute/unmute channel
router.post('/channel/:num/mute', (req, res) => {
  const channelNum = parseInt(req.params.num);
  const { muted } = req.body;

  const success = mixerService.connection.setMute(channelNum, muted);
  res.json({ success });
});

// Load a snapshot
router.post('/snapshot', (req, res) => {
  const { scene } = req.body;
  if (!mixerService.connection.isConnected()) {
    return res.status(400).json({ error: 'Mixer niet verbonden' });
  }
  const loaded = mixerService.connection.loadSnapshot(scene);
  res.json({ success: loaded });
});

// Get mixer status
router.get('/status', (req, res) => {
  res.json(mixerService.getStatus());
});

// Get channel presets
router.get('/presets', (req, res) => {
  res.json(CHANNEL_PRESETS);
});

// Lock/unlock gain for a channel
router.post('/channel/:num/lock', (req, res) => {
  const channelNum = parseInt(req.params.num);
  const { locked } = req.body;

  const success = mixerService.autoGain.setGainLock(channelNum, locked);
  res.json({ success, locked });
});

// Toggle auto-recovery (gain increase for low signals)
router.post('/autogain/recovery', (req, res) => {
  const { enabled } = req.body;
  mixerService.autoGain.setAutoRecovery(enabled);
  res.json({ success: true, enabled });
});

// Get auto-recovery status
router.get('/autogain/recovery', (req, res) => {
  res.json({ enabled: mixerService.autoGain.isAutoRecoveryEnabled() });
});

// One-shot optimize all channels (manual trigger)
router.post('/autogain/optimize', async (req, res) => {
  if (!mixerService.connection.isConnected()) {
    return res.json({ success: false, error: 'Mixer niet verbonden' });
  }

  const config = db.get().mixerConfig;
  const channels = config.channels || [];
  const adjustments = [];

  // Get current levels and calculate optimal gain for each channel
  for (const ch of channels) {
    const status = mixerService.autoGain.getChannelStatus(ch.number);
    if (!status) continue;

    const avgLevel = status.averageLevel || 0;
    const currentGain = status.currentGain || 0;

    // Target: -18dB average (0.125 linear)
    const targetAvg = 0.125;

    // Skip if no signal or already optimal
    if (avgLevel < 0.01) {
      adjustments.push({ channel: ch.number, action: 'skip', reason: 'no signal' });
      continue;
    }

    if (avgLevel >= 0.08 && avgLevel <= 0.18) {
      adjustments.push({ channel: ch.number, action: 'skip', reason: 'already optimal' });
      continue;
    }

    // Calculate needed gain change
    const neededGainChange = 20 * Math.log10(targetAvg / avgLevel);
    const clampedChange = Math.max(-12, Math.min(12, Math.round(neededGainChange)));

    if (Math.abs(clampedChange) < 1) {
      adjustments.push({ channel: ch.number, action: 'skip', reason: 'change too small' });
      continue;
    }

    const newGain = Math.max(ch.minGain || -40, Math.min(ch.maxGain || 10, currentGain + clampedChange));

    // Apply the gain change
    mixerService.autoGain.setChannelGain(ch.number, newGain);

    adjustments.push({
      channel: ch.number,
      action: 'adjusted',
      from: currentGain,
      to: newGain,
      change: clampedChange
    });
  }

  console.log('[Optimize All] Adjustments:', adjustments);
  res.json({ success: true, adjustments });
});

// =====================
// AUX Send Controls (for monitor mixes)
// =====================

// Set AUX send level for a channel
router.post('/channel/:num/aux/:aux', (req, res) => {
  const channelNum = parseInt(req.params.num);
  const auxNum = parseInt(req.params.aux);
  const { level } = req.body;

  const success = mixerService.connection.setAuxSendLevel(channelNum, auxNum, level);
  res.json({ success });
});

// Set AUX master level
router.post('/aux/:aux/master', (req, res) => {
  const auxNum = parseInt(req.params.aux);
  const { level } = req.body;

  const success = mixerService.connection.setAuxMasterLevel(auxNum, level);
  res.json({ success });
});

// Mute/unmute AUX send for a channel
router.post('/channel/:num/aux/:aux/mute', (req, res) => {
  const channelNum = parseInt(req.params.num);
  const auxNum = parseInt(req.params.aux);
  const { muted } = req.body;

  const success = mixerService.connection.setAuxSendMute(channelNum, auxNum, muted);
  res.json({ success });
});

// Set AUX send pre/post fader
router.post('/channel/:num/aux/:aux/post', (req, res) => {
  const channelNum = parseInt(req.params.num);
  const auxNum = parseInt(req.params.aux);
  const { post } = req.body;

  const success = mixerService.connection.setAuxSendPost(channelNum, auxNum, post);
  res.json({ success });
});

// =====================
// Monitor Configuration
// =====================

// Get monitor config
router.get('/monitor/config', (req, res) => {
  const config = db.get().mixerConfig;

  // Default config if not set
  const monitorConfig = config.monitorConfig || {
    auxNumber: 3,
    vocalChannels: [2, 3, 4],
    instrumentChannels: [5, 6, 7, 8, 9, 10, 11, 12]
  };

  res.json(monitorConfig);
});

// Update monitor config
router.put('/monitor/config', (req, res) => {
  const { auxNumber, vocalChannels, instrumentChannels } = req.body;
  const data = db.get();

  data.mixerConfig.monitorConfig = {
    auxNumber: auxNumber ?? 3,
    vocalChannels: vocalChannels || [2, 3, 4],
    instrumentChannels: instrumentChannels || [5, 6, 7, 8, 9, 10, 11, 12]
  };

  db.save();

  res.json({ success: true, config: data.mixerConfig.monitorConfig });
});

// =====================
// AUX Level Read-back (for monitor mix sync)
// =====================

// Get current AUX send levels for specified channels
router.get('/aux/:aux/levels', async (req, res) => {
  const auxNum = parseInt(req.params.aux);
  const channelsParam = req.query.channels || '2,3,4,5,6,7,8,9,10,11,12';
  const channels = channelsParam.split(',').map(c => parseInt(c.trim()));

  if (!mixerService.connection.isConnected()) {
    return res.json({
      connected: false,
      levels: {},
      master: 0.75
    });
  }

  try {
    const [levels, master] = await Promise.all([
      mixerService.connection.getAuxSendLevels(auxNum, channels),
      mixerService.connection.getAuxMasterLevel(auxNum)
    ]);

    res.json({
      connected: true,
      auxNumber: auxNum,
      levels: levels || {},
      master: master || 0.75
    });
  } catch (e) {
    console.error('Failed to get AUX levels:', e);
    res.json({
      connected: true,
      levels: {},
      master: 0.75,
      error: e.message
    });
  }
});

// Set multiple AUX send levels at once (with multiplier support)
router.post('/aux/:aux/levels', async (req, res) => {
  const auxNum = parseInt(req.params.aux);
  const { levels, master } = req.body;

  if (!mixerService.connection.isConnected()) {
    return res.status(400).json({ error: 'Mixer niet verbonden' });
  }

  const results = { channels: {}, master: null };

  // Set individual channel levels
  if (levels && typeof levels === 'object') {
    for (const [ch, level] of Object.entries(levels)) {
      const channelNum = parseInt(ch);
      const clampedLevel = Math.max(0, Math.min(1, level));
      const success = mixerService.connection.setAuxSendLevel(channelNum, auxNum, clampedLevel);
      results.channels[channelNum] = { level: clampedLevel, success };
    }
  }

  // Set master level
  if (master !== undefined) {
    const clampedMaster = Math.max(0, Math.min(1, master));
    results.master = {
      level: clampedMaster,
      success: mixerService.connection.setAuxMasterLevel(auxNum, clampedMaster)
    };
  }

  res.json({ success: true, results });
});

// =====================
// Sync New Speaker - One-shot auto-gain for vocal channels
// =====================

// POST /api/mixer/sync-speaker
// Runs auto-gain on vocal channels for X seconds, then locks gains
router.post('/sync-speaker', async (req, res) => {
  const { channels, duration } = req.body;

  // Default: vocal channels 2,3,4 for 5 seconds
  const targetChannels = channels || [2, 3, 4];
  const syncDuration = duration || 5000;

  if (!mixerService.connection.isConnected()) {
    return res.json({ success: false, error: 'Mixer niet verbonden' });
  }

  console.log(`[Sync Speaker] Starting for channels ${targetChannels.join(',')} (${syncDuration}ms)`);

  // Unlock and enable auto-gain on target channels
  for (const ch of targetChannels) {
    mixerService.autoGain.setGainLock(ch, false);

    // Check if channel is already being monitored
    const status = mixerService.autoGain.getChannelStatus(ch);
    if (!status) {
      // Add channel temporarily for sync
      mixerService.autoGain.addChannel(ch, {
        name: `CH ${ch}`,
        type: 'vocal',
        autoGainEnabled: true
      });
    }

    // Reset hasInitialAdjustment to allow fresh JUMP
    const chData = mixerService.autoGain.channels.get(ch);
    if (chData) {
      chData.hasInitialAdjustment = false;
      chData.levelHistory = [];
      chData.averageLevel = 0;
    }
  }

  // After duration, lock the gains
  setTimeout(() => {
    const results = [];
    for (const ch of targetChannels) {
      const status = mixerService.autoGain.getChannelStatus(ch);
      if (status) {
        mixerService.autoGain.setGainLock(ch, true);
        results.push({
          channel: ch,
          gain: status.currentGain,
          avgLevel: status.averageLevel
        });
      }
    }
    console.log(`[Sync Speaker] Complete:`, results);

    // Broadcast completion to UI
    const wsService = require('../services/websocket');
    wsService.broadcast({
      type: 'syncSpeakerComplete',
      data: { channels: results }
    });
  }, syncDuration);

  res.json({
    success: true,
    channels: targetChannels,
    duration: syncDuration,
    message: `Syncing ${targetChannels.length} channels for ${syncDuration/1000}s`
  });
});

module.exports = router;
