const express = require('express');
const http = require('http');
const path = require('path');

// Services
const db = require('./src/services/database');
const wsService = require('./src/services/websocket');
const mixerService = require('./src/services/mixer');

// Routes
const songsRouter = require('./src/routes/songs');
const setlistsRouter = require('./src/routes/setlists');
const mixerRouter = require('./src/routes/mixer');
const statsRouter = require('./src/routes/stats');

// Initialize
const app = express();
const server = http.createServer(app);

// Load database
db.load();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize WebSocket
wsService.init(server);

// Initialize Mixer Service
mixerService.init();

// API Routes
app.use('/api/songs', songsRouter);
app.use('/api/setlists', setlistsRouter);
app.use('/api/mixer', mixerRouter);
app.use('/api/stats', statsRouter);

// Categories endpoint
app.get('/api/categories', (req, res) => {
  res.json(db.get().categories);
});

// Export/Import endpoints for data sync
app.get('/api/export', (req, res) => {
  res.json(db.get());
});

app.post('/api/import', (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid data format' });
    }
    // Merge imported data with existing
    const current = db.get();
    if (data.songs) current.songs = data.songs;
    if (data.setlists) current.setlists = data.setlists;
    if (data.categories) current.categories = data.categories;
    if (data.songHistory) current.songHistory = data.songHistory;
    if (data.mixerConfig) current.mixerConfig = data.mixerConfig;
    db.save();
    res.json({ success: true, message: 'Data imported successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Frontend routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/dirigent', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dirigent.html')));
app.get('/live', (req, res) => res.sendFile(path.join(__dirname, 'public', 'live.html')));
app.get('/mixer', (req, res) => res.sendFile(path.join(__dirname, 'public', 'mixer.html')));
app.get('/monitor', (req, res) => res.sendFile(path.join(__dirname, 'public', 'monitor.html')));

// Start server
const PORT = process.env.PORT || 3000;

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, retrying in 1 second...`);
    setTimeout(() => {
      server.close();
      server.listen(PORT, '0.0.0.0');
    }, 1000);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                    WORSHIP FLOW                           ║
╠═══════════════════════════════════════════════════════════╣
║  Server running on port ${PORT}                              ║
║                                                           ║
║  Open in browser:                                         ║
║  • Home:       http://localhost:${PORT}                      ║
║  • Dirigent:   http://localhost:${PORT}/dirigent             ║
║  • Live:       http://localhost:${PORT}/live                 ║
║  • Mixer:      http://localhost:${PORT}/mixer                ║
║                                                           ║
║  For other devices, use your local IP:                    ║
║  • Monitor:    http://<your-ip>:${PORT}/monitor              ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  mixerService.connection.disconnect();
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  mixerService.connection.disconnect();
  server.close(() => process.exit(0));
});
