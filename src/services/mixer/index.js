const connection = require('./connection');
const autoGain = require('./autoGain');
const db = require('../database');
const wsService = require('../websocket');

class MixerService {
  constructor() {
    this.connection = connection;
    this.autoGain = autoGain;
  }

  init() {
    // Register callback to start auto-gain when connected
    this.connection.onConnected(() => {
      console.log('Mixer connected - starting auto-gain');
      this.autoGain.start();
    });

    // Connect to mixer if configured
    this.connection.connect();

    // Listen for song selection to load mixer scenes
    wsService.onMessage((clientId, msg) => {
      if (msg.type === 'selectSong' && msg.data.songId) {
        this.onSongSelected(msg.data.songId);
      }
    });

    return this;
  }

  onSongSelected(songId) {
    const song = db.get().songs.find(s => s.id === songId);
    if (song && song.mixerScene) {
      const loaded = this.connection.loadSnapshot(song.mixerScene);
      if (loaded) {
        wsService.broadcast({
          type: 'mixerSceneLoaded',
          data: { scene: song.mixerScene, songId }
        });
      }
    }
  }

  reconnect() {
    this.autoGain.stop();
    this.connection.disconnect();

    setTimeout(() => {
      if (this.connection.connect()) {
        setTimeout(() => this.autoGain.start(), 1000);
      }
    }, 500);
  }

  getStatus() {
    return {
      connected: this.connection.isConnected(),
      autoGainRunning: this.autoGain.running,
      channels: this.autoGain.getAllChannelsStatus()
    };
  }
}

// Singleton
const mixerService = new MixerService();

module.exports = mixerService;
