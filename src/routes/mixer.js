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

module.exports = router;
