const test = require('node:test');
const assert = require('node:assert');

const { computeRotation } = require('./rotation');

const DAY = 24 * 60 * 60 * 1000;
const TODAY = new Date('2026-08-22T12:00:00Z');

const daysAgo = (n) => new Date(TODAY.getTime() - n * DAY).toISOString().slice(0, 10);
const weeksAgo = (n) => daysAgo(n * 7);
const daysAhead = (n) => new Date(TODAY.getTime() + n * DAY).toISOString().slice(0, 10);

function song(id, createdWeeksAgo = 0) {
  return {
    id,
    title: id,
    category: 'Gewoon',
    style: 'Aanbidding',
    createdAt: new Date(TODAY.getTime() - createdWeeksAgo * 7 * DAY).toISOString(),
  };
}

function setlist(date, ...songIds) {
  return {
    id: `sl-${date}-${songIds.join('_')}`,
    date,
    songs: songIds.map((songId, position) => ({ songId, position })),
  };
}

const find = (result, songId) => result.find((r) => r.songId === songId);
const close = (actual, expected, tolerance = 0.05) =>
  assert.ok(
    Math.abs(actual - expected) < tolerance,
    `verwacht ~${expected}, kreeg ${actual}`
  );

test('lied met een ritme van 4 weken dat 10 weken stil ligt krijgt score 2.5', () => {
  const data = {
    songs: [song('a')],
    setlists: [
      setlist(weeksAgo(22), 'a'),
      setlist(weeksAgo(18), 'a'),
      setlist(weeksAgo(14), 'a'),
      setlist(weeksAgo(10), 'a'),
    ],
  };

  const a = find(computeRotation(data, TODAY), 'a');

  assert.strictEqual(a.count, 4);
  assert.strictEqual(a.status, 'ok');
  assert.strictEqual(a.lastSung, weeksAgo(10));
  close(a.intervalWeeks, 4);
  close(a.weeksSince, 10);
  close(a.score, 2.5);
});

test('kerstavond en kerstdag tellen als een gelegenheid, twee jaar geeft een interval van ~52 weken', () => {
  const data = {
    songs: [song('kerst')],
    setlists: [
      setlist('2024-12-24', 'kerst'),
      setlist('2024-12-25', 'kerst'),
      setlist('2025-12-24', 'kerst'),
      setlist('2025-12-25', 'kerst'),
    ],
  };

  const kerst = find(computeRotation(data, TODAY), 'kerst');

  assert.strictEqual(kerst.count, 2);
  assert.strictEqual(kerst.lastSung, '2025-12-25');
  close(kerst.intervalWeeks, 52.1, 0.2);
});

test('zaterdagoefening en zondagdienst tellen als een gelegenheid', () => {
  const data = {
    songs: [song('a')],
    setlists: [setlist('2026-06-13', 'a'), setlist('2026-06-14', 'a')],
  };

  const a = find(computeRotation(data, TODAY), 'a');

  assert.strictEqual(a.count, 1);
  assert.strictEqual(a.lastSung, '2026-06-14');
});

test('twee opeenvolgende zondagen tellen als twee gelegenheden', () => {
  const data = {
    songs: [song('a')],
    setlists: [setlist('2026-06-07', 'a'), setlist('2026-06-14', 'a')],
  };

  const a = find(computeRotation(data, TODAY), 'a');

  assert.strictEqual(a.count, 2);
  close(a.intervalWeeks, 1);
});

test('lied zonder setlist krijgt status never en telt de weken vanaf createdAt', () => {
  const data = {
    songs: [song('ritme'), song('nooit', 40)],
    setlists: [
      setlist(weeksAgo(12), 'ritme'),
      setlist(weeksAgo(8), 'ritme'),
      setlist(weeksAgo(4), 'ritme'),
    ],
  };

  const nooit = find(computeRotation(data, TODAY), 'nooit');

  assert.strictEqual(nooit.status, 'never');
  assert.strictEqual(nooit.count, 0);
  assert.strictEqual(nooit.lastSung, null);
  close(nooit.weeksSince, 40);
  close(nooit.intervalWeeks, 4);
  close(nooit.score, 10);
});

test('lied enkel in een toekomstige setlist krijgt status planned en telt niet als gezongen', () => {
  const data = {
    songs: [song('gepland', 6)],
    setlists: [setlist(daysAhead(7), 'gepland')],
  };

  const gepland = find(computeRotation(data, TODAY), 'gepland');

  assert.strictEqual(gepland.status, 'planned');
  assert.strictEqual(gepland.plannedDate, daysAhead(7));
  assert.strictEqual(gepland.count, 0);
  assert.strictEqual(gepland.lastSung, null);
});

test('lied met een enkele gelegenheid valt terug op de portfoliomediaan', () => {
  const data = {
    songs: [song('ritme'), song('eenmalig')],
    setlists: [
      setlist(weeksAgo(12), 'ritme'),
      setlist(weeksAgo(8), 'ritme'),
      setlist(weeksAgo(4), 'ritme'),
      setlist(weeksAgo(12), 'eenmalig'),
    ],
  };

  const eenmalig = find(computeRotation(data, TODAY), 'eenmalig');

  assert.strictEqual(eenmalig.status, 'ok');
  assert.strictEqual(eenmalig.count, 1);
  close(eenmalig.intervalWeeks, 4);
  close(eenmalig.score, 3);
});

test('setlists zonder datum tellen niet mee', () => {
  const data = {
    songs: [song('a', 5)],
    setlists: [setlist('', 'a'), { id: 'geen-datum', songs: [{ songId: 'a', position: 0 }] }],
  };

  const a = find(computeRotation(data, TODAY), 'a');

  assert.strictEqual(a.count, 0);
  assert.strictEqual(a.status, 'never');
});

test('zonder enig interval in de portfolio valt alles terug op 8 weken', () => {
  const data = {
    songs: [song('a')],
    setlists: [setlist(weeksAgo(16), 'a')],
  };

  const a = find(computeRotation(data, TODAY), 'a');

  close(a.intervalWeeks, 8);
  close(a.score, 2);
});

test('alle liedjes komen terug, gesorteerd op score aflopend', () => {
  const data = {
    songs: [song('recent'), song('lang-stil'), song('nooit', 30)],
    setlists: [
      setlist(weeksAgo(8), 'recent'),
      setlist(weeksAgo(4), 'recent'),
      setlist(weeksAgo(1), 'recent'),
      setlist(weeksAgo(40), 'lang-stil'),
      setlist(weeksAgo(36), 'lang-stil'),
    ],
  };

  const result = computeRotation(data, TODAY);

  assert.strictEqual(result.length, 3);
  for (let i = 1; i < result.length; i++) {
    assert.ok(
      result[i - 1].score >= result[i].score,
      `${result[i - 1].songId} (${result[i - 1].score}) moet voor ${result[i].songId} (${result[i].score}) staan`
    );
  }
  assert.strictEqual(result[result.length - 1].songId, 'recent');
});
