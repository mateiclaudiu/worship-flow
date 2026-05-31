const express = require('express');
const router = express.Router();
const db = require('../services/database');

// Song statistics derived from setlist composition:
// - count = number of setlists that contain the song
// - lastUsed = date of the most recent setlist (with a date) containing the song
router.get('/songs', (req, res) => {
  const data = db.get();

  const counts = {};
  const lastUsed = {};

  for (const setlist of data.setlists) {
    for (const entry of setlist.songs || []) {
      const id = entry.songId;
      counts[id] = (counts[id] || 0) + 1;
      if (setlist.date && (!lastUsed[id] || setlist.date > lastUsed[id])) {
        lastUsed[id] = setlist.date;
      }
    }
  }

  const stats = Object.entries(counts)
    .map(([songId, count]) => {
      const song = data.songs.find(s => s.id === songId);
      return {
        songId,
        title: song?.title || 'Onbekend',
        count,
        lastUsed: lastUsed[songId] || null,
      };
    })
    .sort((a, b) => b.count - a.count);

  res.json(stats);
});

module.exports = router;
