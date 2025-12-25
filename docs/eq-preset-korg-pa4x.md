# EQ Preset: Korg Pa4X

Geoptimaliseerd voor:
- **Ruimte:** Grote katholieke zaal met veel echo
- **Speakers:** Yamaha DZR 15" + 1 subwoofer
- **Stijlen:** Country, schlager, ballad, pop, waltz, piano

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

### Soundcraft UI24 Settings (6-band)

```
┌────────────────────────────────────────────────────────────────┐
│  HPF     1       2       3       4      LPF    DE-ESSER       │
│  (blauw) (groen) (rood)  (paars) (goud) (bruin)               │
└────────────────────────────────────────────────────────────────┘

HPF (High Pass Filter)
├── Frequency: 80 Hz
├── Slope: 18 dB/oct
└── Waarom: Sub doet alles onder 80Hz, keyboard niet nodig daar

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
├── Gain: +1.5 dB
├── Q: 2.0
└── Waarom: Helpt door mix snijden. Voorzichtig in galmende zaal!

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
      +3 ─┼───┼──────┼──────●──────┼──────┼─────
         │   │      │   (3kHz)    │      │
       0 ═╪═══╪══════╪══+1.5dB════╪══════╪═════
         │   ●      │      │      ●      │
      -3 ─┼─(200)───┼──────┼───(8kHz)────┼─────
         │  -3dB    │      │   -1.5dB    │
      -6 ─┼───┼──────┼──────┼──────┼──────┼─────
         │   │      │      │      │      │
         └───┴──────┴──────┴──────┴──────┴─────
            80    200  800   3k    8k   16k
```

---

## Per Muziekstijl - Fijnafstelling

### Country / Acoustic Piano
```
Band 2 (200Hz): -3 dB (standaard)
Band 3 (3kHz):  +1 dB (lichte presence)
Band 4 (8kHz):  0 dB (flat - akoestische helderheid behouden)
```

### Schlager / Waltz
```
Band 2 (200Hz): -4 dB (extra mud cut - dense arrangements)
Band 3 (3kHz):  0 dB (flat - accordeon zit hier al)
Band 4 (8kHz):  -2 dB (zachter, warmer)
```

### Ballad / E-Piano
```
Band 2 (200Hz): -2 dB (minder cut - warmte behouden)
Band 3 (3kHz):  0 dB (flat)
Band 4 (8kHz):  -1 dB (smooth)

Extra: Korg interne tremolo/chorus laag houden
```

### Pop / Uptempo
```
Band 2 (200Hz): -3 dB (standaard)
Band 3 (3kHz):  +2 dB (meer punch)
Band 4 (8kHz):  0 dB (bright maar controlled)
```

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

- [ ] Korg interne reverb verlaagd naar 30-40%
- [ ] Korg delay uit of zeer laag
- [ ] HPF @ 50Hz actief
- [ ] 200Hz cut toegepast (-3dB)
- [ ] Geen excessive presence boost
- [ ] High shelf -1 tot -2dB
- [ ] Fader op 0dB (unity)
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
