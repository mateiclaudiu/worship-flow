const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

class WebSocketService {
  constructor() {
    this.wss = null;
    this.clients = new Map();
    this.currentState = {
      setlistId: null,
      currentSongIndex: 0,
      currentSectionIndex: 0,
      currentSongId: null,
      cue: null,
      cueTimestamp: null
    };
    this.messageHandlers = [];
  }

  init(server) {
    this.wss = new WebSocket.Server({ server });

    this.wss.on('connection', (ws, req) => {
      const clientId = uuidv4();
      const clientType = new URL(req.url, 'http://localhost').searchParams.get('type') || 'singer';

      this.clients.set(clientId, { ws, type: clientType });
      console.log(`Client connected: ${clientId} (${clientType})`);

      // Send current state to new client
      ws.send(JSON.stringify({ type: 'state', data: this.currentState }));

      ws.on('message', (message) => {
        try {
          const msg = JSON.parse(message);
          this.handleMessage(clientId, msg);
        } catch (e) {
          console.error('Invalid message:', e);
        }
      });

      ws.on('close', () => {
        this.clients.delete(clientId);
        console.log(`Client disconnected: ${clientId}`);
      });
    });

    return this;
  }

  onMessage(handler) {
    this.messageHandlers.push(handler);
  }

  handleMessage(clientId, msg) {
    // Let external handlers process first
    for (const handler of this.messageHandlers) {
      handler(clientId, msg);
    }

    switch (msg.type) {
      case 'setState':
        this.currentState = { ...this.currentState, ...msg.data };
        this.broadcast({ type: 'state', data: this.currentState });
        break;

      case 'cue':
        this.currentState.cue = msg.data.cue;
        this.currentState.cueTimestamp = Date.now();
        this.broadcast({ type: 'cue', data: msg.data });
        // Clear cue after 3 seconds
        setTimeout(() => {
          if (this.currentState.cueTimestamp === msg.data.timestamp) {
            this.currentState.cue = null;
            this.broadcast({ type: 'cue', data: { cue: null } });
          }
        }, 3000);
        break;

      case 'navigate':
        this.currentState.currentSongIndex = msg.data.songIndex ?? this.currentState.currentSongIndex;
        this.currentState.currentSectionIndex = msg.data.sectionIndex ?? this.currentState.currentSectionIndex;
        this.broadcast({ type: 'state', data: this.currentState });
        break;

      case 'selectSong':
        this.currentState.setlistId = msg.data.setlistId;
        this.currentState.currentSongId = msg.data.songId;
        this.broadcast({ type: 'selectSong', data: msg.data });
        break;
    }
  }

  broadcast(message) {
    const data = JSON.stringify(message);
    this.clients.forEach(({ ws }) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    });
  }

  getState() {
    return this.currentState;
  }

  setState(newState) {
    this.currentState = { ...this.currentState, ...newState };
  }
}

// Singleton instance
const wsService = new WebSocketService();

module.exports = wsService;
