# Rotatie: welk lied hebben we al lang niet meer gezongen?

**Datum:** 2026-08-22
**Status:** goedgekeurd, klaar voor implementatieplan

## Probleem

Bij het samenstellen van een setlist is de vraag "welk lied hebben we al lang niet meer
gezongen?" nu niet te beantwoorden in de app. De Stats-tab toont alleen `Meest gezongen`
en `Recent gebruikt` — de omgekeerde vraag ontbreekt, en liedjes die in geen enkele
setlist zitten komen er helemaal niet in voor. De sorteeroptie "Recent" in de
Liedjes-tab sorteert op `updatedAt`, dus op bewerkdatum, niet op zangdatum.

## Uitgangspunten

- **Een setlist met een ingevulde datum telt als gezongen.** Geen extra registratie, geen
  nieuwe velden in `data.json`; alles blijft afgeleid uit `setlists[].date` en
  `setlists[].songs[].songId`.
- Het antwoord moet op twee plekken zichtbaar zijn: in de **Stats-tab** en tijdens het
  **samenstellen van een setlist**. De Liedjes-tab blijft ongemoeid.
- De rangschikking is een **rotatiescore** die "hoe lang stil" afweegt tegen het ritme van
  het lied zelf, zodat seizoensliedjes (Kerst, Pinksteren) niet het hele jaar bovenaan
  staan.
- De productiedatabase draait elders en bevat ongeveer een jaar aan gedateerde setlists.
  De `data.json` in deze repo is een testkopie met weinig historiek; het ontwerp mag daar
  niet op leunen, maar moet er wel zinnig op werken.

## Score

```
score = weken stil / eigen mediaan interval
```

`1.0` betekent precies op schema, `2.0` betekent dubbel zo lang stil als normaal. De
drempel voor "achterstallig" ligt vast op **2.0**; die wordt pas verschuifbaar gemaakt als
hij in de praktijk niet blijkt te kloppen.

## Component 1: `src/services/rotation.js`

Nieuwe module met één export: `computeRotation(data, today)`.

`today` is een verplichte parameter (een `Date` of ISO-datumstring), zodat de functie
deterministisch te testen is. De route geeft de actuele datum door.

Algoritme, per lied:

1. **Datums verzamelen.** Alle setlists met een niet-lege `date` waarin het lied voorkomt.
2. **Gelegenheden clusteren.** Een nieuwe cluster begint zodra een datum minstens 3 dagen na
   de *eerste* datum van de lopende cluster ligt; de laatste datum van de cluster is de datum
   van de gelegenheid. Dit vangt twee gevallen: zaterdagoefening plus zondagdienst is één keer
   zingen, en kerstavond plus kerstdag maakt het kerstinterval niet "2 dagen". Het venster is
   bewust krap: bij 14 dagen zouden twee opeenvolgende zondagen (7 dagen ertussen) tot één
   gelegenheid samensmelten, wat de telling structureel verkeerd maakt.
3. **Toekomst afsplitsen.** Gelegenheden na `today` tellen niet als gezongen. Staat een lied
   in zo'n setlist, dan krijgt het `status: 'planned'` en `plannedDate` (de eerstvolgende
   toekomstige datum). `status` kent één waarde met deze voorrang: `planned` boven `never`
   boven `ok`. De overige velden blijven altijd gevuld volgens de stappen hieronder, ook
   voor een ingepland lied.
4. `count` = aantal gelegenheden in het verleden.
   `lastSung` = datum van de laatste gelegenheid in het verleden.
   `weeksSince` = `(today - lastSung) / 7 dagen`.
5. **Interval.** `intervalWeeks` = mediaan van de tussentijden tussen opeenvolgende
   gelegenheden in het verleden. Mediaan en niet gemiddelde, zodat één uitschieter het
   ritme niet verziekt. Bij minder dan 2 gelegenheden valt het lied terug op de mediaan van
   alle liedjes die wél een eigen interval hebben; bestaat die ook niet, dan op 8 weken.
6. `score` = `weeksSince / intervalWeeks`.
7. **Nooit gezongen** (`count === 0`): `status: 'never'`, `lastSung: null`,
   `weeksSince` gemeten vanaf `song.createdAt`, `intervalWeeks` = portfoliomediaan. De score
   wordt op dezelfde manier berekend, zodat nooit-gezongen liedjes gewoon in dezelfde
   rangschikking meedoen.

De portfoliomediaan wordt in één doorgang berekend over de liedjes met minstens 2
gelegenheden, en daarna toegepast op de liedjes die hem nodig hebben.

Retourwaarde: een array met per lied
`{ songId, title, category, style, count, lastSung, weeksSince, intervalWeeks, score, status, plannedDate }`,
gesorteerd op `score` aflopend. **Alle** liedjes uit `data.songs` zitten erin, ook die in
geen enkele setlist voorkomen.

## Component 2: `GET /api/stats/songs`

De route in `src/routes/stats.js` wordt een dunne wrapper rond `computeRotation(db.get(), new Date())`.

Dit is een breaking change ten opzichte van de huidige respons: de lijst bevat nu ook
nooit-gezongen liedjes, is gesorteerd op score in plaats van op `count`, en `lastUsed` heet
voortaan `lastSung`. Er is precies één consument (`public/dirigent.html`), die in dezelfde
wijziging wordt aangepast.

## Component 3: Stats-tab — derde kaart

In `public/dirigent.html`, naast `Meest gezongen` en `Recent gebruikt`, komt een kaart
**"Al lang niet meer gezongen"** met de top 10 op score.

- Regelopmaak bij `status: 'ok'`: titel plus `23w stil · normaal om de 6w · 3.8×`.
- Regelopmaak bij `status: 'never'`: titel plus `nog nooit gezongen · 40w in de lijst`.
- Liedjes met `status: 'planned'` vallen uit deze kaart; die zijn al geregeld.
- Boven de kaart één toggle **"nooit-gezongen tonen"**, standaard aan. Bij een portfolio van
  100+ liedjes kunnen nooit-gezongen nummers de lijst opeten; met de toggle uit blijven de
  vergeten liedjes uit het actieve repertoire over.

De twee bestaande kaarten sorteren voortaan expliciet client-side, omdat de server niet
langer op `count` sorteert: `Meest gezongen` op `count` aflopend, `Recent gebruikt` op
`lastSung` aflopend.

## Component 4: Setlist-editor — beschikbare liedjes

In `renderAvailableSongs()` in `public/dirigent.html`:

- De metaregel wordt uitgebreid van `Bb • Aanbidding` naar `Bb • Aanbidding • 23w stil`,
  respectievelijk `• nooit gezongen` of `• zo 30/8 ingepland`.
- Kleuraccent op de rij, in deze voorrang: `status: 'planned'` gedimd, daarna
  `status: 'never'` neutraal, daarna `score >= 2` achterstallig (accentkleur), anders geen
  accent.
- Boven de kolom een sorteerknop **A-Z ↔ Achterstallig eerst**. Standaard A-Z, zodat het
  huidige gedrag onveranderd blijft voor wie de knop niet gebruikt.
- De rotatiedata komt uit dezelfde `/api/stats/songs`, één keer opgehaald bij het openen van
  de editor en bijgehouden in een `rotationById`-map. Bij het toevoegen of verwijderen van
  een lied wordt de map hergebruikt; ze wordt niet per klik opnieuw opgehaald.

## Testen

Het project heeft nog geen testframework. Voorstel: `node --test` (ingebouwd in Node, geen
extra dependency), met `"test": "node --test"` in `package.json` en de tests in
`src/services/rotation.test.js`.

Scenario's:

1. Lied dat elke 4 weken terugkomt en nu 10 weken stil ligt → score ongeveer 2.5.
2. Kerstlied op 24 en 25 december in twee opeenvolgende jaren → clustering geeft 2
   gelegenheden en een interval van ongeveer 52 weken, niet 0.
3. Zaterdagoefening en zondagdienst in dezelfde week → één gelegenheid, `count` is 1.
4. Twee opeenvolgende zondagen → 2 gelegenheden (regressietest op het clustervenster).
5. Lied dat in geen enkele setlist zit → `status: 'never'`, interval is de portfoliomediaan,
   weken geteld vanaf `createdAt`.
6. Lied dat alleen in een setlist met een datum in de toekomst zit → `status: 'planned'`,
   `plannedDate` gevuld, telt niet als gezongen.
7. Lied met precies één gelegenheid → valt terug op de portfoliomediaan.
8. Setlists zonder datum tellen niet mee.
9. Lege portfolio zonder enig interval → fallback van 8 weken.

## Buiten scope

- Registratie van "gezongen" tijdens de Live-console.
- Handmatig invoeren of corrigeren van zangdatums, en het importeren van historiek van vóór
  de app.
- Wijzigingen aan de Liedjes-tab, inclusief de bestaande sorteeroptie "Recent" die op
  `updatedAt` sorteert.
- Een instelbare drempel voor "achterstallig".
