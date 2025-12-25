const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../services/database');

// Get all setlists
router.get('/', (req, res) => {
  const data = db.get();
  const setlists = [...data.setlists].sort((a, b) => {
    // Pinned items first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    // Then by date
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });
  res.json(setlists);
});

// Get single setlist with songs
router.get('/:id', (req, res) => {
  const data = db.get();
  const setlist = data.setlists.find(s => s.id === req.params.id);

  if (setlist) {
    const songs = (setlist.songs || [])
      .sort((a, b) => a.position - b.position)
      .map(ss => {
        const song = data.songs.find(s => s.id === ss.songId);
        return song ? { ...song, position: ss.position } : null;
      })
      .filter(Boolean);
    res.json({ ...setlist, songs });
  } else {
    res.status(404).json({ error: 'Setlist not found' });
  }
});

// Create setlist
router.post('/', (req, res) => {
  const { name, date, notes } = req.body;
  const data = db.get();

  const setlist = {
    id: uuidv4(),
    name,
    date,
    notes,
    status: 'voorbereiding',
    songs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  data.setlists.push(setlist);
  db.save();
  res.json({ id: setlist.id });
});

// Update setlist
router.put('/:id', (req, res) => {
  const { name, date, status, notes } = req.body;
  const data = db.get();
  const index = data.setlists.findIndex(s => s.id === req.params.id);

  if (index !== -1) {
    data.setlists[index] = {
      ...data.setlists[index],
      name,
      date,
      status,
      notes,
      updatedAt: new Date().toISOString()
    };
    db.save();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Setlist not found' });
  }
});

// Delete setlist
router.delete('/:id', (req, res) => {
  const data = db.get();
  data.setlists = data.setlists.filter(s => s.id !== req.params.id);
  db.save();
  res.json({ success: true });
});

// Toggle pin status
router.put('/:id/pin', (req, res) => {
  const data = db.get();
  const setlist = data.setlists.find(s => s.id === req.params.id);

  if (setlist) {
    setlist.pinned = !setlist.pinned;
    db.save();
    res.json({ success: true, pinned: setlist.pinned });
  } else {
    res.status(404).json({ error: 'Setlist not found' });
  }
});

// Add song to setlist
router.post('/:id/songs', (req, res) => {
  const { songId, position } = req.body;
  const data = db.get();
  const setlist = data.setlists.find(s => s.id === req.params.id);

  if (setlist) {
    if (!setlist.songs) setlist.songs = [];
    setlist.songs.push({ songId, position });
    db.save();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Setlist not found' });
  }
});

// Reorder songs in setlist
router.put('/:id/songs/reorder', (req, res) => {
  const { songs } = req.body;
  const data = db.get();
  const setlist = data.setlists.find(s => s.id === req.params.id);

  if (setlist) {
    songs.forEach(({ songId, position }) => {
      const song = (setlist.songs || []).find(s => s.songId === songId);
      if (song) song.position = position;
    });
    db.save();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Setlist not found' });
  }
});

// Remove song from setlist
router.delete('/:setlistId/songs/:songId', (req, res) => {
  const data = db.get();
  const setlist = data.setlists.find(s => s.id === req.params.setlistId);

  if (setlist) {
    setlist.songs = (setlist.songs || []).filter(s => s.songId !== req.params.songId);
    db.save();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Setlist not found' });
  }
});

module.exports = router;
