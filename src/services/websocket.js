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
    // Rate limiting: track connections per IP
    this.connectionCounts = new Map();
    this.lastLogTime = 0;
  }

  init(server) {
    this.wss = new WebSocket.Server({ server });

    // Handle WebSocket server errors
    this.wss.on('error', (err) => {
      console.error('WebSocket server error:', err.message);
      // Don't crash on EADDRINUSE - the HTTP server will handle retry
    });

    this.wss.on('connection', (ws, req) => {
      const clientId = uuidv4();
      const clientType = new URL(req.url, 'http://localhost').searchParams.get('type') || 'singer';
      const clientIP = req.socket.remoteAddress || 'unknown';

      // Rate limiting: track connections per type
      const typeKey = `${clientType}-${clientIP}`;
      const count = (this.connectionCounts.get(typeKey) || 0) + 1;
      this.connectionCounts.set(typeKey, count);

      // Only log occasionally to prevent spam (max 1 log per 10 seconds per type)
      const now = Date.now();
      if (now - this.lastLogTime > 10000 || count <= 2) {
        console.log(`Client connected: ${clientType} from ${clientIP} (${this.clients.size + 1} total)`);
        this.lastLogTime = now;
      }

      this.clients.set(clientId, { ws, type: clientType, ip: clientIP });

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
        // Don't log every disconnect to reduce spam
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
