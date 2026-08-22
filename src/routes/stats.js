const express = require('express');
const router = express.Router();
const db = require('../services/database');
const { computeRotation } = require('../services/rotation');

// Rotatie per lied: hoe lang stil, afgezet tegen het eigen ritme. Zie services/rotation.js.
// Bevat alle liedjes, ook die in geen enkele setlist zitten, gesorteerd op score aflopend.
router.get('/songs', (req, res) => {
  res.json(computeRotation(db.get(), new Date()));
});

module.exports = router;
