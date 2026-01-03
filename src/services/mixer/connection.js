const { SoundcraftUI } = require('soundcraft-ui-connection');
const db = require('../database');
const wsService = require('../websocket');

class MixerConnection {
  constructor() {
    this.mixer = null;
    this.connected = false;
    this.subscriptions = [];
    this.onConnectedCallbacks = [];
  }

  // Register a callback to be called when connection is established
  onConnected(callback) {
    this.onConnectedCallbacks.push(callback);
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
        const wasConnected = this.connected;
        // Status can be string 'OPEN' or object {type: 'OPEN'}
        const statusType = typeof status === 'object' ? status.type : status;
        this.connected = statusType === 'OPEN';
        console.log(`Mixer connection status: ${statusType}`);
        wsService.broadcast({
          type: 'mixerStatus',
          data: { connected: this.connected }
        });

        // Call onConnected callbacks when connection is first established
        if (this.connected && !wasConnected) {
          console.log('Mixer connected - calling onConnected callbacks');
          this.onConnectedCallbacks.forEach(cb => {
            try { cb(); } catch (e) { console.error('onConnected callback error:', e); }
          });
        }
      });
      this.subscriptions.push(statusSub);

      this.mixer.connect();
      console.log(`Connecting to Soundcraft UI24 at ${config.ip}...`);

      // Log connection errors (if conn property exists)
      if (this.mixer.conn && this.mixer.conn.error$) {
        const errorSub = this.mixer.conn.error$.subscribe(error => {
          console.error('Mixer connection error:', error);
          wsService.broadcast({
            type: 'mixerError',
            data: { error: error.message || String(error) }
          });
        });
        this.subscriptions.push(errorSub);
      }

      return true;
    } catch (e) {
      console.error('Failed to connect to mixer:', e.message);
      console.error('Full error:', e);
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

  // Set gain for a channel in dB (-6 to +57 dB range on UI24)
  setGain(channel, gainValueDB) {
    if (!this.mixer || !this.connected) return false;
    try {
      // Gain is on hardware channels, not master input
      this.mixer.hw(channel).setGainDB(gainValueDB);
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
  // Returns vuData: { vuPre, vuPost, vuPostFader }
  onMeterLevel(channel, callback) {
    if (!this.mixer) return null;
    try {
      // Use vuProcessor for VU meter data
      let logCount = 0;
      const sub = this.mixer.vuProcessor.input(channel).subscribe(vuData => {
        // Debug: log first few values to see the actual range
        if (logCount < 5) {
          console.log(`[VU Debug] CH${channel}: vuPre=${vuData.vuPre}, vuPost=${vuData.vuPost}, vuPostFader=${vuData.vuPostFader}`);
          logCount++;
        }
        // Pass the pre-fader level to the callback
        callback(vuData.vuPre);
      });
      this.subscriptions.push(sub);
      return sub;
    } catch (e) {
      console.error(`Failed to subscribe to meter for channel ${channel}:`, e.message);
      return null;
    }
  }

  // Subscribe to gain value for a channel (returns dB value)
  onGainChange(channel, callback) {
    if (!this.mixer) return null;
    try {
      // Gain is on hardware channels
      const sub = this.mixer.hw(channel).gainDB$.subscribe(callback);
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

  // =====================
  // AUX Level Read-back
  // =====================

  // Subscribe to AUX send level for a channel
  onAuxSendLevelChange(channel, auxNumber, callback) {
    if (!this.mixer) return null;
    try {
      const sub = this.mixer.aux(auxNumber).input(channel).faderLevel$.subscribe(callback);
      this.subscriptions.push(sub);
      return sub;
    } catch (e) {
      console.error(`Failed to subscribe to AUX ${auxNumber} send for channel ${channel}:`, e.message);
      return null;
    }
  }

  // Subscribe to AUX master level
  onAuxMasterLevelChange(auxNumber, callback) {
    if (!this.mixer) return null;
    try {
      const sub = this.mixer.aux(auxNumber).faderLevel$.subscribe(callback);
      this.subscriptions.push(sub);
      return sub;
    } catch (e) {
      console.error(`Failed to subscribe to AUX ${auxNumber} master:`, e.message);
      return null;
    }
  }

  // Get current AUX send levels for multiple channels (one-time read)
  getAuxSendLevels(auxNumber, channels) {
    if (!this.mixer || !this.connected) return null;

    const levels = {};

    return new Promise((resolve) => {
      let received = 0;
      const total = channels.length;

      channels.forEach(ch => {
        try {
          const sub = this.mixer.aux(auxNumber).input(ch).faderLevel$.subscribe(level => {
            levels[ch] = level;
            received++;
            sub.unsubscribe();

            if (received >= total) {
              resolve(levels);
            }
          });

          // Timeout fallback
          setTimeout(() => {
            if (!levels[ch]) {
              levels[ch] = 0.75; // Default
              received++;
              sub.unsubscribe();
              if (received >= total) resolve(levels);
            }
          }, 1000);
        } catch (e) {
          levels[ch] = 0.75;
          received++;
          if (received >= total) resolve(levels);
        }
      });
    });
  }

  // Get current AUX master level (one-time read)
  getAuxMasterLevel(auxNumber) {
    if (!this.mixer || !this.connected) return Promise.resolve(0.75);

    return new Promise((resolve) => {
      try {
        const sub = this.mixer.aux(auxNumber).faderLevel$.subscribe(level => {
          sub.unsubscribe();
          resolve(level);
        });

        // Timeout fallback
        setTimeout(() => {
          sub.unsubscribe();
          resolve(0.75);
        }, 1000);
      } catch (e) {
        resolve(0.75);
      }
    });
  }
}

// Singleton
const mixerConnection = new MixerConnection();

module.exports = mixerConnection;
