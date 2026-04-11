# EQ Preset: Korg Pa4X

Geoptimaliseerd voor:
- **Ruimte:** Grote katholieke zaal met veel echo
- **Speakers:** Yamaha DZR 15" + 1 subwoofer
- **Stijlen:** Country, schlager, ballad, pop, waltz, piano, **worship**
- **Afgestemd op:** Zang presets (zie [zang-presets.md](zang-presets.md))

---

## PA Systeem: Yamaha DZR 15" + Sub

### DZR 15 Instellingen (op speaker zelf)

```
D-CONTOUR: OFF
├── Waarom: D-Contour boost lage freq bij laag volume
└── In galmende zaal = meer modder

HPF: 80 Hz (of 100 Hz met sub)
├── Laat sub het lage werk doen
└── DZR focust op 80Hz+

PRESET: FOH (Front of House)
└── Niet MONITOR mode
```

### Subwoofer Crossover

```
Crossover: 80-100 Hz
Sub Level: -3 tot -6 dB tov tops
├── Galmende ruimte = bas bouwt op
└── Liever te weinig sub dan te veel
```

---

## Ruimte Analyse

| Factor | Impact | Aanpak |
|--------|--------|--------|
| Vierkante zaal | Standing waves, flutter echo | Cut probleem frequenties |
| Veel echo/reverb | Mud buildup, onduidelijkheid | Reduce low-mids, less internal FX |
| Harde oppervlakken | Harsh reflecties | Tame high-mids |
| DZR + Sub | Veel low-end headroom | HPF keyboard hoger, sub level laag |

---

## Korg PA4X Frequentie Karakteristiek (Gemeten)

**Gebaseerd op analyse van multitrack opnames (06 KEYS.wav, 09/10 KEYS L/R.wav)**

### Meting Resultaten

```
Band            Gemeten      Beoordeling
─────────────────────────────────────────────────────
SUB (20-80Hz)   -47 tot -52 dB   ✓ Normaal
LOW (80-150Hz)  -40 tot -44 dB   ✓ Normaal
BODY (150-300)  -32 tot -38 dB   ✓ Goed
LOW-MID (300-500) -29 tot -37 dB ⚠️ DOMINANT (mud!)
MID (500-1k)    -29 tot -37 dB   ⚠️ DOMINANT
UPPER-MID (1-2k) -35 tot -43 dB
PRESENCE (2-4k) -42 tot -51 dB   ⚠️ TE ZWAK (12-15dB lager dan mids!)
BRILLIANCE (4-6k) -50 tot -58 dB ⚠️ LAAG
AIR (8k+)       -60 tot -68 dB   Zeer laag
```

### Visueel Profiel (onbewerkt)

```
dB
-30 ─────────────████████───────────────────────────
-35 ────────████████████████────────────────────────
-40 ────████████████████████████────────────────────
-45 ─███████████████████████████████────────────────
-50 ████████████████████████████████████████────────
-55 ████████████████████████████████████████████────
-60 ████████████████████████████████████████████████
    SUB  LOW  BODY L-MID MID  U-MID PRES BRIL AIR
         80   150  300  500  1k   2k   4k   8k
                   ↑              ↑
              TE VEEL         TE WEINIG
              (mud)          (presence)
```

### Conclusie

| Probleem | Frequentie | Impact | Oplossing |
|----------|------------|--------|-----------|
| **MUD** | 300-500Hz | Klinkt "boxy", modderig | Cut -3 tot -4dB @ 400Hz |
| **GEEN PRESENCE** | 2-4kHz | Klinkt ver weg, dof | Boost +2dB @ 3kHz |
| **DONKER** | 4kHz+ | Geen lucht/helderheid | Boost +1dB @ 8kHz |

**Dit is een eigenschap van de Korg PA4X zelf**, niet van specifieke styles. Alle presets hebben daarom dezelfde basis-correctie nodig.

### Basis EQ Correctie (alle stijlen)

```
| Band | Freq | Gain | Waarom |
|------|------|------|--------|
| 1 | 400Hz | -3dB | Mud zit hier (gemeten) |
| 2 | 800Hz | 0dB | Flat |
| 3 | 3kHz | +2dB | Presence toevoegen (gemeten 12dB te laag) |
| 4 | 8kHz | +1dB | Air/helderheid |
```

---

## Korg Pa4X Instellingen

### Op de Keyboard Zelf

**BELANGRIJK:** Verminder eerst de interne effecten!

```
MENU → EFFECTS → MASTER REVERB
├── Reverb Level: 30-40% (ipv 60-70%)
├── Type: Hall of Room (niet Cathedral!)
└── Mix: Dry-biased

MENU → EFFECTS → MASTER DELAY
└── Delay Level: 20-30% of UIT
```

De zaal voegt al reverb toe - dubbele reverb = modder.

---

## Soundcraft UI24 EQ Settings

### Kies je Setup

**Scenario A: Alles via L/R** (standaard bij styles)
- Drums, bass, keys komen allemaal uit L/R
- HPF laag houden om bass te behouden

**Scenario B: Split outputs** (aanbevolen)
- Keys via L/R, Drums+Bass via OUT 1/2
- HPF hoger op keys kanaal mogelijk
- Zie: [Audio Apparatuur](audio-apparatuur-claudiu.md) voor routing

---

### Scenario A: Alles via L/R (met styles)

```
┌────────────────────────────────────────────────────────────────┐
│  HPF     1       2       3       4      LPF    DE-ESSER       │
│  (blauw) (groen) (rood)  (paars) (goud) (bruin)               │
└────────────────────────────────────────────────────────────────┘

HPF (High Pass Filter)
├── Frequency: 40 Hz of UIT
├── Slope: 18 dB/oct
└── Waarom: Bass zit in L/R, niet wegsnijden!

Band 1 (Groen) - LOW MID CUT
├── Frequency: 200 Hz
├── Gain: -2 dB (minder dan split setup)
├── Q: 1.5
└── Waarom: Mud reduction, maar bass body behouden

Band 2 (Rood) - MID CLARITY
├── Frequency: 800 Hz
├── Gain: 0 dB (flat)
├── Q: 1.0
└── Waarom: Meestal flat

Band 3 (Paars) - PRESENCE
├── Frequency: 3 kHz
├── Gain: -1 dB
├── Q: 2.0
└── Waarom: Ruimte maken voor zang! Claudia/David boosten hier +3dB

Band 4 (Goud) - HIGH / AIR
├── Frequency: 8 kHz
├── Gain: -1.5 dB
├── Q: 1.0
└── Waarom: Hihat/cymbal temmen + reflecties
```

---

### Scenario B: Split - Keys via L/R (zonder drums/bass)

```
┌────────────────────────────────────────────────────────────────┐
│  HPF     1       2       3       4      LPF    DE-ESSER       │
│  (blauw) (groen) (rood)  (paars) (goud) (bruin)               │
└────────────────────────────────────────────────────────────────┘

HPF (High Pass Filter)
├── Frequency: 80 Hz
├── Slope: 18 dB/oct
└── Waarom: Alleen keys, sub doet low-end via drums+bass kanaal

Band 1 (Groen) - LOW MID CUT
├── Frequency: 200 Hz
├── Gain: -3 dB
├── Q: 1.5
└── Waarom: Mud reduction, arrangements zitten hier vol

Band 2 (Rood) - MID CLARITY
├── Frequency: 800 Hz
├── Gain: 0 dB (flat)
├── Q: 1.0
└── Waarom: Meestal flat, tenzij piano te "honky" klinkt

Band 3 (Paars) - PRESENCE
├── Frequency: 3 kHz
├── Gain: -1 dB
├── Q: 2.0
└── Waarom: Ruimte maken voor zang! Claudia/David boosten hier +3dB

Band 4 (Goud) - HIGH / AIR
├── Frequency: 8 kHz
├── Gain: -1.5 dB
├── Q: 1.0
└── Waarom: Reflecties temmen, warmere sound

LPF (Low Pass Filter)
├── Frequency: 16 kHz (of UIT)
└── Waarom: Pa4X heeft weinig nuttige content boven 16kHz

DE-ESSER
├── Status: UIT
└── Waarom: Niet relevant voor keyboard
```

### Visueel

```
        HPF  1      2      3      4     LPF
         │   │      │      │      │      │
      +6 ─┼───┼──────┼──────┼──────┼──────┼─────
         │   │      │      │      │      │
      +3 ─┼───┼──────┼──────┼──────┼──────┼─────
         │   │      │      │      │      │
       0 ═╪═══╪══════╪══════╪══════╪══════╪═════
         │   ●      │      ●      ●      │
      -3 ─┼─(200)───┼───(3kHz)─(8kHz)────┼─────
         │  -3dB    │   -1dB  -1.5dB     │
      -6 ─┼───┼──────┼──────┼──────┼──────┼─────
         │   │      │      │      │      │
         └───┴──────┴──────┴──────┴──────┴─────
            80    200  800   3k    8k   16k
                           ↑
                    ruimte voor zang
```

### Scenario B: Drums+Bass kanaal (OUT 1/2)

```
┌────────────────────────────────────────────────────────────────┐
│  HPF     1       2       3       4      LPF    DE-ESSER       │
└────────────────────────────────────────────────────────────────┘

HPF (High Pass Filter)
├── Frequency: 40 Hz of UIT
└── Waarom: Bass moet door! Sub vangt <40Hz op

Band 1 (Groen) - SUB BASS PUNCH
├── Frequency: 80 Hz
├── Gain: +1 dB
├── Q: 1.0
└── Waarom: Kick/bass fundament versterken

Band 2 (Rood) - MUD CUT
├── Frequency: 400 Hz
├── Gain: -2 dB
├── Q: 1.5
└── Waarom: Ruimte maken, bass strakker

Band 3 (Paars) - ATTACK/PRESENCE
├── Frequency: 2.5 kHz
├── Gain: +1 dB
├── Q: 2.0
└── Waarom: Kick attack, bass definitie

Band 4 (Goud) - HIGH
├── Frequency: 8 kHz
├── Gain: -1 dB
├── Q: 1.0
└── Waarom: Hihat/cymbal temmen in galmende zaal
```

---

## Per Muziekstijl - Fijnafstelling

> **Let op:** Deze aanpassingen zijn voor het KEYS kanaal.
> Bij Scenario A (alles L/R): wees voorzichtiger met cuts (bass zit erin!)

### Country / Acoustic Piano

| Band | Freq | Scenario A | Scenario B | Q |
|------|------|------------|------------|---|
| 1 | 400Hz | -2 dB | -3 dB | 1.5 |
| 2 | 800Hz | 0 dB | 0 dB | 1.0 |
| 3 | 3kHz | +1 dB | +2 dB | 2.0 |
| 4 | 8kHz | 0 dB | +1 dB | 1.0 |

Acoustic piano/gitaar stapelen @ 400Hz. Presence boost voor definitie.

### Schlager / Waltz

| Band | Freq | Scenario A | Scenario B | Q |
|------|------|------------|------------|---|
| 1 | 400Hz | -3 dB | -4 dB | 1.2 |
| 2 | 800Hz | -1 dB | -2 dB | 1.0 |
| 3 | 3kHz | +1 dB | +1 dB | 2.0 |
| 4 | 8kHz | -1 dB | -1 dB | 0.8 |

Dense arrangements → bredere Q (0.8-1.2) voor meer cut. 800Hz cut voor accordeon/brass ruimte. Presence boost voor helderheid.

### Ballad / E-Piano

| Band | Freq | Scenario A | Scenario B | Q |
|------|------|------------|------------|---|
| 1 | 400Hz | -2 dB | -3 dB | 1.5 |
| 2 | 800Hz | 0 dB | 0 dB | 1.0 |
| 3 | 3kHz | +1 dB | +2 dB | 2.0 |
| 4 | 8kHz | 0 dB | +1 dB | 1.0 |

**Gebaseerd op meting:** Piano + ac. gitaar + strings stapelen @ 300-500Hz → cut daar, niet @ 200Hz. Presence (2-4kHz) was 12dB te laag → boost nodig. Korg interne tremolo/chorus laag houden.

### Pop / Uptempo

| Band | Freq | Scenario A | Scenario B | Q |
|------|------|------------|------------|---|
| 1 | 400Hz | -2 dB | -3 dB | 1.5 |
| 2 | 800Hz | 0 dB | -1 dB | 1.0 |
| 3 | 3kHz | +1 dB | +1 dB | 2.0 |
| 4 | 8kHz | 0 dB | +1 dB | 1.0 |

Mud cut @ 400Hz. Presence boost voor keys helderheid. Ruimte voor zang komt via zang-EQ boost @ 2.5kHz (niet keys cut).

### Worship / Hillsong

| Band | Freq | Scenario A | Scenario B | Q |
|------|------|------------|------------|---|
| 1 | 400Hz | -3 dB | -4 dB | 1.2 |
| 2 | 800Hz | 0 dB | 0 dB | 1.0 |
| 3 | 3kHz | **0 dB** | **0 dB** | 2.0 |
| 4 | 8kHz | 0 dB | +1 dB | 1.0 |

**Worship-specifiek:**
- Mud cut @ 400Hz - pads/synths stapelen hier
- 3kHz FLAT (niet cut!) - keys hebben presence nodig, zang krijgt ruimte via eigen EQ boost
- 8kHz lichte boost voor "shimmer" (alleen Scenario B - bij A zitten cymbals erin)
- Korg reverb naar **20%** max - de zaal doet de rest

**Korg Pa4X tips voor worship:**
```
Pads/Strings: Volume -3dB t.o.v. piano
Delay: UIT of sync'd dotted 8th, zeer laag (10-15%)
Reverb: 20-30% max (Hall, NIET Cathedral)
```

---

## Per Style - Volume Balans (Scenario B)

> Bij Scenario B: Drums+Bass EQ blijft vast, alleen volume aanpassen.

### Fader Posities (relatief t.o.v. 0dB)

| Style | Keys (L/R) | Drums+Bass | Opmerking |
|-------|------------|------------|-----------|
| **Ballad** | 0dB | -4dB | Keys dominant, drums subtiel |
| **Waltz** | 0dB | -2dB | Drums voor tempo, niet overheersend |
| **Country** | -1dB | 0dB | Drums/bass dragen het ritme |
| **Schlager** | -2dB | 0dB | Stevige ritme sectie |
| **Pop/Rock** | -2dB | +1dB | Drums vooraan |
| **Worship** | -2dB | -2dB | Zang centraal, keys+drums ondersteunen |
| **Piano Solo** | 0dB | -∞ (mute) | Alleen keys |

### Monitor Send (AUX 3) - Drums+Bass

| Style | Drums+Bass naar monitors |
|-------|--------------------------|
| Ballad | Laag (zangers volgen keys) |
| Waltz/Country | Medium |
| Pop/Schlager | Hoog (tempo kritisch) |
| Worship | Medium (zangers moeten tempo voelen, maar keys dominant) |

### Tips

- **Start met Keys @ 0dB** en pas Drums+Bass aan
- **Uptempo = meer drums** naar monitors
- **Ballad = minder drums**, zangers volgen piano/melodie
- Bij twijfel: vraag zangers of ze genoeg drums horen

---

## Soundcraft UI24 Snapshot Opslaan

1. **Op de mixer (via Soundcraft app of web UI):**
   - Stel bovenstaande EQ in op het keyboard kanaal
   - Ga naar: `SHOWS → [jouw show] → SNAPSHOTS`
   - Klik: `STORE`
   - Naam: `Keyboard_Pa4X_Hall`

2. **In Worship Flow:**
   - Koppel snapshot aan channel type "keyboard"
   - Laadt automatisch bij channel selectie

---

## Compressor (optioneel)

De Pa4X output is al redelijk consistent, maar voor extra controle:

```
Threshold: -12 dB
Ratio: 2:1 (licht)
Attack: 20 ms (snel genoeg voor piano transients)
Release: 150 ms
Makeup Gain: +1 dB
```

---

## Checklist voor Soundcheck

### Korg PA4X
- [ ] Interne reverb verlaagd naar 30-40%
- [ ] Delay uit of zeer laag
- [ ] Output routing correct (L/R of split met OUT 1/2)

### Mixer - Scenario A (alles via L/R)
- [ ] HPF @ 40Hz of UIT (bass behouden!)
- [ ] 200Hz cut: -2dB
- [ ] 3kHz: **-1dB** (ruimte voor zang!)
- [ ] 8kHz: -1.5dB

### Mixer - Scenario B (split outputs)
- [ ] L/R kanaal: HPF @ 80Hz, 200Hz -3dB, **3kHz -1dB**
- [ ] OUT 1/2 kanaal: HPF @ 40Hz of UIT
- [ ] Drums+Bass extra naar monitors

### Extra voor Worship
- [ ] 3kHz: **-2dB** (zang is prioriteit!)
- [ ] Korg reverb: max 20%
- [ ] Pads volume: -3dB t.o.v. piano

### Algemeen
- [ ] Faders op 0dB (unity)
- [ ] Snapshot opgeslagen

---

## Probleemoplossing

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| "Muddy/boomy" | Te veel low-mid | Meer cut @ 200Hz, check HPF |
| "Scherp/harsh" | Reflecties + presence | Reduce 3kHz, cut 8kHz meer |
| "Geen punch" | Te veel cut | Minder 200Hz cut, check fader |
| "Verdrinkt in mix" | Masking met andere instrumenten | Boost 2-3kHz, of cut andere instrumenten daar |
| "Te veel galm" | Korg reverb + zaal reverb | Korg reverb naar 20% |

---

*Worship Flow - EQ Preset voor Korg Pa4X in reflectieve ruimte*
