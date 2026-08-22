// Rotatie: hoe lang ligt een lied stil, afgezet tegen het ritme waarmee het normaal
// gezongen wordt. score = weken stil / eigen interval. 1.0 = op schema, 2.0 = dubbel zo
// lang stil als normaal. Doordat er tegen het eigen ritme afgewogen wordt, staan
// seizoensliedjes (Kerst, Pinksteren) niet het hele jaar bovenaan.
//
// Een setlist met een ingevulde datum telt als gezongen; er wordt niets opgeslagen.

const DAY = 24 * 60 * 60 * 1000;

// Datums die binnen dit venster van elkaar liggen zijn één gelegenheid: zaterdagoefening
// plus zondagdienst, kerstavond plus kerstdag. Bewust krap gehouden — twee opeenvolgende
// zondagen liggen 7 dagen uit elkaar en moeten twee gelegenheden blijven.
const CLUSTER_DAYS = 3;

const DEFAULT_INTERVAL_WEEKS = 8;
const MIN_INTERVAL_WEEKS = 0.5;

function toDay(value) {
  if (!value) return null;
  const ms = Date.parse(`${String(value).slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(ms) ? null : ms;
}

const isoDay = (ms) => new Date(ms).toISOString().slice(0, 10);

function median(numbers) {
  if (!numbers.length) return null;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

// Groepeert datums tot gelegenheden. Een nieuwe cluster begint zodra een datum minstens
// CLUSTER_DAYS na de eerste datum van de lopende cluster ligt; de laatste datum van een
// cluster is de datum van de gelegenheid.
function toOccasions(days) {
  const sorted = [...new Set(days)].sort((a, b) => a - b);
  const occasions = [];
  let clusterStart = null;

  for (const day of sorted) {
    if (clusterStart === null || day - clusterStart >= CLUSTER_DAYS * DAY) {
      occasions.push(day);
      clusterStart = day;
    } else {
      occasions[occasions.length - 1] = day;
    }
  }

  return occasions;
}

function daysBySong(setlists) {
  const days = new Map();

  for (const setlist of setlists || []) {
    const day = toDay(setlist.date);
    if (day === null) continue;

    for (const entry of setlist.songs || []) {
      if (!days.has(entry.songId)) days.set(entry.songId, []);
      days.get(entry.songId).push(day);
    }
  }

  return days;
}

/**
 * @param {object} data - de database ({ songs, setlists })
 * @param {Date|string} today - referentiedatum, expliciet meegegeven zodat dit testbaar is
 * @returns rij per lied, gesorteerd op score aflopend
 */
function computeRotation(data, today) {
  const todayDay = toDay(new Date(today).toISOString());
  const days = daysBySong(data.setlists);

  const rows = (data.songs || []).map((song) => {
    const occasions = toOccasions(days.get(song.id) || []);
    const past = occasions.filter((day) => day <= todayDay);
    const future = occasions.filter((day) => day > todayDay);

    const intervals = [];
    for (let i = 1; i < past.length; i++) {
      intervals.push((past[i] - past[i - 1]) / (7 * DAY));
    }

    const lastSungDay = past.length ? past[past.length - 1] : null;
    const sinceDay = lastSungDay !== null ? lastSungDay : toDay(song.createdAt);

    return {
      song,
      count: past.length,
      lastSung: lastSungDay !== null ? isoDay(lastSungDay) : null,
      plannedDate: future.length ? isoDay(future[0]) : null,
      // Een eigen ritme vraagt minstens twee gelegenheden.
      ownInterval: intervals.length ? median(intervals) : null,
      weeksSince: sinceDay === null ? 0 : Math.max(0, (todayDay - sinceDay) / (7 * DAY)),
    };
  });

  // Liedjes met te weinig historiek lenen het ritme van de portfolio.
  const portfolioInterval =
    median(rows.map((r) => r.ownInterval).filter((v) => v !== null)) ?? DEFAULT_INTERVAL_WEEKS;

  return rows
    .map((row) => {
      const intervalWeeks = Math.max(
        row.ownInterval !== null ? row.ownInterval : portfolioInterval,
        MIN_INTERVAL_WEEKS
      );

      return {
        songId: row.song.id,
        title: row.song.title,
        category: row.song.category || '',
        style: row.song.style || '',
        count: row.count,
        lastSung: row.lastSung,
        weeksSince: row.weeksSince,
        intervalWeeks,
        score: row.weeksSince / intervalWeeks,
        // Voorrang: planned boven never boven ok.
        status: row.plannedDate ? 'planned' : row.count ? 'ok' : 'never',
        plannedDate: row.plannedDate,
      };
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

module.exports = { computeRotation };
