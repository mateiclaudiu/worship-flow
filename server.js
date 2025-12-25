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
app.use(express.json());
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

// Frontend routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/dirigent', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dirigent.html')));
app.get('/zanger', (req, res) => res.sendFile(path.join(__dirname, 'public', 'zanger.html')));
app.get('/leider', (req, res) => res.sendFile(path.join(__dirname, 'public', 'leider.html')));
app.get('/presentatie', (req, res) => res.sendFile(path.join(__dirname, 'public', 'presentatie.html')));
app.get('/live', (req, res) => res.sendFile(path.join(__dirname, 'public', 'live.html')));
app.get('/mixer', (req, res) => res.sendFile(path.join(__dirname, 'public', 'mixer.html')));
app.get('/monitor', (req, res) => res.sendFile(path.join(__dirname, 'public', 'monitor.html')));

// Start server
const PORT = process.env.PORT || 3000;
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
║  For singers on other devices, use your local IP:         ║
║  • Zanger:     http://<your-ip>:${PORT}/zanger               ║
║  • Monitor:    http://<your-ip>:${PORT}/monitor              ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
