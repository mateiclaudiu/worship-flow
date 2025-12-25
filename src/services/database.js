const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_FILE = path.join(__dirname, '../../data.json');

function getDefaultDB() {
  return {
    songs: [],
    setlists: [],
    categories: [
      { id: uuidv4(), name: 'Pasen', type: 'category' },
      { id: uuidv4(), name: 'Kerst', type: 'category' },
      { id: uuidv4(), name: 'Advent', type: 'category' },
      { id: uuidv4(), name: 'Doopsel', type: 'category' },
      { id: uuidv4(), name: 'Huwelijk', type: 'category' },
      { id: uuidv4(), name: 'Uitvaart', type: 'category' },
      { id: uuidv4(), name: 'Communie', type: 'category' },
      { id: uuidv4(), name: 'Pinksteren', type: 'category' },
      { id: uuidv4(), name: 'Gewoon', type: 'category' },
      { id: uuidv4(), name: 'Pop', type: 'style' },
      { id: uuidv4(), name: 'Ballade', type: 'style' },
      { id: uuidv4(), name: 'Gospel', type: 'style' },
      { id: uuidv4(), name: 'Traditioneel', type: 'style' },
      { id: uuidv4(), name: 'Modern', type: 'style' },
      { id: uuidv4(), name: 'Aanbidding', type: 'style' },
    ],
    songHistory: [],
    mixerConfig: {
      ip: '',
      showName: '',
      enabled: false,
      channels: [],
      autoGain: {
        enabled: false,
        threshold: 0.85,
        minGain: -40,
        maxGain: 0,
        attackTime: 50,
        releaseTime: 500
      }
    }
  };
}

let db = null;

function load() {
  try {
    if (fs.existsSync(DB_FILE)) {
      db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      // Ensure mixerConfig exists with all fields
      if (!db.mixerConfig) {
        db.mixerConfig = getDefaultDB().mixerConfig;
        save();
      }
      if (!db.mixerConfig.autoGain) {
        db.mixerConfig.autoGain = getDefaultDB().mixerConfig.autoGain;
        save();
      }
      if (!db.mixerConfig.channels) {
        db.mixerConfig.channels = [];
        save();
      }
      return db;
    }
  } catch (e) {
    console.error('Error loading DB:', e);
  }
  db = getDefaultDB();
  save();
  return db;
}

function save() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function get() {
  if (!db) load();
  return db;
}

module.exports = {
  load,
  save,
  get,
  getDefaultDB
};
