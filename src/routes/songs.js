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

  // Get unique songs from history, sorted by most recent
  const recentSongIds = [...new Set(
    data.songHistory
      .filter(h => h.type === 'amen' || h.performedAt)
      .sort((a, b) => new Date(b.performedAt || b.playedDate) - new Date(a.performedAt || a.playedDate))
      .map(h => h.songId)
  )].slice(0, limit);

  // Get song details
  const recentSongs = recentSongIds
    .map(id => data.songs.find(s => s.id === id))
    .filter(Boolean)
    .map(song => {
      const lastPlayed = data.songHistory
        .filter(h => h.songId === song.id)
        .sort((a, b) => new Date(b.performedAt || b.playedDate) - new Date(a.performedAt || a.playedDate))[0];
      return {
        ...song,
        lastPerformed: lastPlayed?.performedAt || lastPlayed?.playedDate
      };
    });

  res.json(recentSongs);
});

// Get single song
router.get('/:id', (req, res) => {
  const data = db.get();
  const song = data.songs.find(s => s.id === req.params.id);

  if (song) {
    const history = data.songHistory
      .filter(h => h.songId === req.params.id)
      .sort((a, b) => new Date(b.playedDate) - new Date(a.playedDate))
      .slice(0, 5)
      .map(h => {
        const setlist = data.setlists.find(s => s.id === h.setlistId);
        return { ...h, setlist_name: setlist?.name };
      });
    res.json({ ...song, history });
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Create song
router.post('/', (req, res) => {
  const { title, lyrics, key, tempo, category, style, karaoke_link, structure, mixerScene } = req.body;
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  data.songs.push(song);
  db.save();
  res.json({ id: song.id });
});

// Update song
router.put('/:id', (req, res) => {
  const { title, lyrics, key, tempo, category, style, karaoke_link, structure, mixerScene } = req.body;
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
  data.songHistory = data.songHistory.filter(h => h.songId !== req.params.id);

  // Remove from setlists
  data.setlists.forEach(sl => {
    sl.songs = (sl.songs || []).filter(s => s.songId !== req.params.id);
  });

  db.save();
  res.json({ success: true });
});

// Log song as performed (AMEN button)
router.post('/:id/amen', (req, res) => {
  const { setlistId } = req.body;
  const data = db.get();
  const song = data.songs.find(s => s.id === req.params.id);

  if (!song) {
    return res.status(404).json({ error: 'Song not found' });
  }

  const entry = {
    id: uuidv4(),
    songId: req.params.id,
    setlistId: setlistId || null,
    performedAt: new Date().toISOString(),
    type: 'amen'
  };

  data.songHistory.push(entry);
  db.save();

  res.json({ success: true, id: entry.id });
});

// Song feedback
router.post('/:id/feedback', (req, res) => {
  const { setlistId, keyUsed, tempoFeedback, keyFeedback, notes } = req.body;
  const data = db.get();

  const history = {
    id: uuidv4(),
    songId: req.params.id,
    setlistId,
    playedDate: new Date().toISOString().split('T')[0],
    played_date: new Date().toISOString().split('T')[0],
    key_used: keyUsed,
    tempo_feedback: tempoFeedback,
    key_feedback: keyFeedback,
    notes,
    createdAt: new Date().toISOString()
  };

  data.songHistory.push(history);
  db.save();
  res.json({ id: history.id });
});

module.exports = router;
