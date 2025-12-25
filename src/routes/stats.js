const express = require('express');
const router = express.Router();
const db = require('../services/database');

// Get song statistics
router.get('/songs', (req, res) => {
  const data = db.get();
  const amenEntries = data.songHistory.filter(h => h.type === 'amen');

  // Count per song
  const counts = {};
  amenEntries.forEach(entry => {
    counts[entry.songId] = (counts[entry.songId] || 0) + 1;
  });

  // Build stats with song info
  const stats = Object.entries(counts)
    .map(([songId, count]) => {
      const song = data.songs.find(s => s.id === songId);
      const lastPerformed = amenEntries
        .filter(e => e.songId === songId)
        .sort((a, b) => new Date(b.performedAt) - new Date(a.performedAt))[0];

      return {
        songId,
        title: song?.title || 'Onbekend',
        count,
        lastPerformed: lastPerformed?.performedAt
      };
    })
    .sort((a, b) => b.count - a.count);

  res.json(stats);
});

module.exports = router;
