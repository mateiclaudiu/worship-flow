const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../services/database');

// Get all songs
router.get('/', (req, res) => {
  const songs = [...db.get().songs].sort((a, b) => a.title.localeCompare(b.title));
  res.json(songs);
});

// Search songs
router.get('/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const songs = db.get().songs
    .filter(s => s.title.toLowerCase().includes(query))
    .sort((a, b) => {
      // Prioritize songs that start with the query
      const aStarts = a.title.toLowerCase().startsWith(query);
      const bStarts = b.title.toLowerCase().startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.title.localeCompare(b.title);
    })
    .slice(0, 20); // Limit results
  res.json(songs);
});

// Get recently performed songs
router.get('/recent/performed', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const data = db.get();

  // Walk dated setlists from newest to oldest, collecting unique songIds.
  const sortedSetlists = [...data.setlists]
    .filter(sl => sl.date)
    .sort((a, b) => b.date.localeCompare(a.date));

  const lastSeen = new Map(); // songId -> setlist.date (most recent)
  for (const sl of sortedSetlists) {
    for (const entry of sl.songs || []) {
      if (!lastSeen.has(entry.songId)) lastSeen.set(entry.songId, sl.date);
    }
  }

  const recentSongs = [...lastSeen.entries()]
    .slice(0, limit)
    .map(([songId, date]) => {
      const song = data.songs.find(s => s.id === songId);
      return song ? { ...song, lastPerformed: date } : null;
    })
    .filter(Boolean);

  res.json(recentSongs);
});

// Get single song
router.get('/:id', (req, res) => {
  const data = db.get();
  const song = data.songs.find(s => s.id === req.params.id);

  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Create song
router.post('/', (req, res) => {
  const { title, lyrics, key, tempo, category, style, karaoke_link, structure, mixerScene, korgStyleName } = req.body;
  const data = db.get();

  const song = {
    id: uuidv4(),
    title,
    lyrics,
    key,
    tempo,
    category,
    style,
    karaoke_link,
    structure,
    mixerScene,
    korgStyleName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  data.songs.push(song);
  db.save();
  res.json({ id: song.id });
});

// Update song
router.put('/:id', (req, res) => {
  const { title, lyrics, key, tempo, category, style, karaoke_link, structure, mixerScene, korgStyleName } = req.body;
  const data = db.get();
  const index = data.songs.findIndex(s => s.id === req.params.id);

  if (index !== -1) {
    data.songs[index] = {
      ...data.songs[index],
      title,
      lyrics,
      key,
      tempo,
      category,
      style,
      karaoke_link,
      structure,
      mixerScene,
      korgStyleName,
      updatedAt: new Date().toISOString()
    };
    db.save();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Delete song
router.delete('/:id', (req, res) => {
  const data = db.get();
  data.songs = data.songs.filter(s => s.id !== req.params.id);

  // Remove from setlists
  data.setlists.forEach(sl => {
    sl.songs = (sl.songs || []).filter(s => s.songId !== req.params.id);
  });

  db.save();
  res.json({ success: true });
});

module.exports = router;
