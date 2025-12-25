const { SoundcraftUI } = require('soundcraft-ui-connection');
const db = require('../database');
const wsService = require('../websocket');

class MixerConnection {
  constructor() {
    this.mixer = null;
    this.connected = false;
    this.subscriptions = [];
  }

  connect() {
    const config = db.get().mixerConfig;

    if (!config.enabled || !config.ip) {
      console.log('Mixer not configured or disabled');
      return false;
    }

    this.disconnect(); // Clean up any existing connection

    try {
      this.mixer = new SoundcraftUI(config.ip);

      // Subscribe to connection status
      const statusSub = this.mixer.status$.subscribe(status => {
        this.connected = status === 'OPEN';
        console.log(`Mixer connection status: ${status}`);
        wsService.broadcast({
          type: 'mixerStatus',
          data: { connected: this.connected }
        });
      });
      this.subscriptions.push(statusSub);

      this.mixer.connect();
      console.log(`Connecting to Soundcraft UI24 at ${config.ip}...`);
      return true;
    } catch (e) {
      console.error('Failed to connect to mixer:', e.message);
      this.connected = false;
      return false;
    }
  }

  disconnect() {
    // Unsubscribe from all observables
    this.subscriptions.forEach(sub => {
      if (sub && typeof sub.unsubscribe === 'function') {
        sub.unsubscribe();
      }
    });
    this.subscriptions = [];

    if (this.mixer) {
      try {
        this.mixer.disconnect();
      } catch (e) {
        // Ignore disconnect errors
      }
      this.mixer = null;
    }
    this.connected = false;
  }

  isConnected() {
    return this.connected;
  }

  getMixer() {
    return this.mixer;
  }

  loadSnapshot(snapshotName) {
    if (!this.mixer || !this.connected || !snapshotName) {
      console.log('Cannot load scene:', {
        mixer: !!this.mixer,
        connected: this.connected,
        snapshot: snapshotName
      });
      return false;
    }

    try {
      const showName = db.get().mixerConfig.showName || 'Show';
      console.log(`Loading mixer scene: ${showName} / ${snapshotName}`);
      this.mixer.shows.loadSnapshot(showName, snapshotName);
      return true;
    } catch (e) {
      console.error('Failed to load mixer scene:', e.message);
      return false;
    }
  }

  // Get input channel
  input(channel) {
    if (!this.mixer) return null;
    return this.mixer.master.input(channel);
  }

  // Set gain for a channel (-40 to +40 dB typically, but we'll use raw values)
  setGain(channel, gainValue) {
    if (!this.mixer || !this.connected) return false;
    try {
      this.mixer.master.input(channel).setGain(gainValue);
      return true;
    } catch (e) {
      console.error(`Failed to set gain for channel ${channel}:`, e.message);
      return false;
    }
  }

  // Set fader level (0.0 to 1.0)
  setFaderLevel(channel, level) {
    if (!this.mixer || !this.connected) return false;
    try {
      this.mixer.master.input(channel).setFaderLevel(level);
      return true;
    } catch (e) {
      console.error(`Failed to set fader for channel ${channel}:`, e.message);
      return false;
    }
  }

  // Mute/unmute channel
  setMute(channel, muted) {
    if (!this.mixer || !this.connected) return false;
    try {
      if (muted) {
        this.mixer.master.input(channel).mute();
      } else {
        this.mixer.master.input(channel).unmute();
      }
      return true;
    } catch (e) {
      console.error(`Failed to set mute for channel ${channel}:`, e.message);
      return false;
    }
  }

  // Subscribe to meter level for a channel
  onMeterLevel(channel, callback) {
    if (!this.mixer) return null;
    try {
      const sub = this.mixer.master.input(channel).meterLevel$.subscribe(callback);
      this.subscriptions.push(sub);
      return sub;
    } catch (e) {
      console.error(`Failed to subscribe to meter for channel ${channel}:`, e.message);
      return null;
    }
  }

  // Subscribe to gain value for a channel
  onGainChange(channel, callback) {
    if (!this.mixer) return null;
    try {
      const sub = this.mixer.master.input(channel).gain$.subscribe(callback);
      this.subscriptions.push(sub);
      return sub;
    } catch (e) {
      console.error(`Failed to subscribe to gain for channel ${channel}:`, e.message);
      return null;
    }
  }

  // Subscribe to fader level for a channel
  onFaderChange(channel, callback) {
    if (!this.mixer) return null;
    try {
      const sub = this.mixer.master.input(channel).faderLevel$.subscribe(callback);
      this.subscriptions.push(sub);
      return sub;
    } catch (e) {
      console.error(`Failed to subscribe to fader for channel ${channel}:`, e.message);
      return null;
    }
  }

  // Subscribe to mute status for a channel
  onMuteChange(channel, callback) {
    if (!this.mixer) return null;
    try {
      const sub = this.mixer.master.input(channel).mute$.subscribe(callback);
      this.subscriptions.push(sub);
      return sub;
    } catch (e) {
      console.error(`Failed to subscribe to mute for channel ${channel}:`, e.message);
      return null;
    }
  }

  // Get channel name from mixer
  onNameChange(channel, callback) {
    if (!this.mixer) return null;
    try {
      const sub = this.mixer.master.input(channel).name$.subscribe(callback);
      this.subscriptions.push(sub);
      return sub;
    } catch (e) {
      console.error(`Failed to subscribe to name for channel ${channel}:`, e.message);
      return null;
    }
  }

  // =====================
  // AUX Send Controls
  // =====================

  // Set AUX send level for a channel (0.0 to 1.0)
  setAuxSendLevel(channel, auxNumber, level) {
    if (!this.mixer || !this.connected) return false;
    try {
      this.mixer.aux(auxNumber).input(channel).setFaderLevel(level);
      return true;
    } catch (e) {
      console.error(`Failed to set AUX ${auxNumber} send for channel ${channel}:`, e.message);
      return false;
    }
  }

  // Set AUX master fader level (0.0 to 1.0)
  setAuxMasterLevel(auxNumber, level) {
    if (!this.mixer || !this.connected) return false;
    try {
      this.mixer.aux(auxNumber).setFaderLevel(level);
      return true;
    } catch (e) {
      console.error(`Failed to set AUX ${auxNumber} master level:`, e.message);
      return false;
    }
  }

  // Mute/unmute AUX send for a channel
  setAuxSendMute(channel, auxNumber, muted) {
    if (!this.mixer || !this.connected) return false;
    try {
      if (muted) {
        this.mixer.aux(auxNumber).input(channel).mute();
      } else {
        this.mixer.aux(auxNumber).input(channel).unmute();
      }
      return true;
    } catch (e) {
      console.error(`Failed to set AUX ${auxNumber} mute for channel ${channel}:`, e.message);
      return false;
    }
  }

  // Set AUX send pre/post fader
  setAuxSendPost(channel, auxNumber, isPost) {
    if (!this.mixer || !this.connected) return false;
    try {
      if (isPost) {
        this.mixer.aux(auxNumber).input(channel).post();
      } else {
        this.mixer.aux(auxNumber).input(channel).pre();
      }
      return true;
    } catch (e) {
      console.error(`Failed to set AUX ${auxNumber} pre/post for channel ${channel}:`, e.message);
      return false;
    }
  }
}

// Singleton
const mixerConnection = new MixerConnection();

module.exports = mixerConnection;
