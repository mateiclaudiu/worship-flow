# PA Systeem: Yamaha DZR 15" + Subwoofer

Geoptimaliseerd voor: **Grote katholieke zaal met veel echo**

---

## Systeem Overzicht

```
┌─────────────────────────────────────────────────────────────────┐
│                         SOUNDCRAFT UI24                          │
│                              │                                   │
│                    ┌─────────┴─────────┐                        │
│                    │                   │                        │
│               MAIN L/R             AUX 1                        │
│                    │              (Zaal Speakers)               │
│         ┌──────────┼──────────┐        │                        │
│         │          │          │        │                        │
│         ▼          ▼          ▼        ▼                        │
│    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                  │
│    │DZR 15  │ │DZR 15  │ │  SUB   │ │Zaal    │                  │
│    │  (L)   │ │  (R)   │ │        │ │Speakers│                  │
│    └────────┘ └────────┘ └────────┘ └────────┘                  │
│                                                                  │
│    ◄──────── MAIN PA ─────────►      ◄─SPRAAK─►                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Yamaha DZR 15" Specificaties

| Eigenschap | Waarde |
|------------|--------|
| Type | 2-weg actief |
| Woofer | 15" |
| Driver | 2" compression |
| Vermogen | 2000W peak |
| Frequentiebereik | 42Hz - 20kHz |
| Max SPL | 137dB peak |
| DSP | Ja, met FIR filters |
| Gewicht | 26.5 kg |

---

## DZR 15 Instellingen

### Achterpaneel Switches

```
┌─────────────────────────────────────────┐
│  YAMAHA DZR15-D REAR PANEL              │
│                                         │
│  [D-CONTOUR]     [HPF]      [OUTPUT]    │
│  ○ OFF ←         ○ FLAT     ○ FOH  ←    │
│  ○ ON            ○ 80Hz ←   ○ MONITOR   │
│                  ○ 100Hz                │
│                  ○ 120Hz                │
└─────────────────────────────────────────┘

Aanbevolen voor jullie zaal:
├── D-CONTOUR: OFF
├── HPF: 80Hz of 100Hz (met sub)
└── OUTPUT: FOH
```

### D-CONTOUR: Waarom UIT?

```
D-Contour AAN:
├── Boost lage frequenties bij laag volume
├── Bedoeld voor kleine ruimtes
└── In galmende zaal = modder + feedback

D-Contour UIT:
├── Flat response
├── Beter in reflectieve ruimte
└── Sub doet het lage werk
```

### HPF Instelling

```
Zonder sub: FLAT (laat DZR full-range)
Met sub:    80Hz of 100Hz

80Hz:  Meer overlap met sub, vollere sound
100Hz: Schonere scheiding, minder modder

Aanbevolen: 100Hz (galmende zaal = minder lage freq beter)
```

---

## Subwoofer Instellingen

### Crossover

```
Crossover Frequentie: 80-100Hz

Waarom:
├── Matcht DZR HPF setting
├── Voorkomt frequentie gat of overlap
└── Sub doet 30-100Hz, DZR doet 100Hz+
```

### Phase

```
0° (normaal):   Sub en tops in fase
180° (reverse): Als sub ACHTER publiek staat

Test: Speel muziek, flip phase, kies vollere optie
```

### Sub Level

```
Galmende zaal aanbeveling:
├── Start: -6dB tov tops
├── Verhoog langzaam tot "voelbaar maar niet dominant"
├── Bas bouwt op in reflectieve ruimte
└── Minder is meer!

Vuistregel: Als je de sub duidelijk HOORT, is het te veel.
            Je moet hem VOELEN.
```

---

## Plaatsing

### Main Speakers (DZR 15")

```
┌───────────────────────────────────────────────────┐
│                     ALTAAR                        │
│                                                   │
│    [DZR L]                           [DZR R]     │
│      ↘                                  ↙        │
│        ↘                              ↙          │
│          ↘                          ↙            │
│            ↘                      ↙              │
│              ────────────────────                │
│              │    PUBLIEK       │                │
│              │                  │                │
│              │                  │                │
│              │                  │                │
│              ────────────────────                │
└───────────────────────────────────────────────────┘

Hoogte: Tweeter op oorhoogte (zittend) of hoger
Hoek:   15-30° naar binnen gericht
Afstand: Ver genoeg van muren om reflecties te minimaliseren
```

### Subwoofer

```
Optie A: Centered (aanbevolen)
┌─────────────────────────────────┐
│           ALTAAR                │
│      [L]  [SUB]  [R]           │
└─────────────────────────────────┘

Optie B: Onder podium / verborgen
- Voorkomt visuele afleiding
- Pas op voor resonantie met holle vloer

Optie C: Hoek (NIET aanbevolen in vierkante zaal)
- Standing waves worden erger
- Ongelijke bas distributie
```

---

## Systeem EQ (Main Output)

### Mixer Master EQ

Alleen als ALLE bronnen dit nodig hebben:

```
31 Hz:  -3dB (rommel)
63 Hz:   0dB
125 Hz: -2dB (room modes dempen)
250 Hz:  0dB (bron-specifiek)
500 Hz:  0dB
1 kHz:   0dB
2 kHz:   0dB
4 kHz:   0dB
8 kHz:  -1dB (reflecties temmen)
16 kHz: -2dB (air temmen)
```

### Room Mode Identificatie

Vierkante zalen hebben standing waves:

```
Bereken: Room mode = 343 / (2 × dimensie in meters)

Voorbeeld 10m × 10m zaal:
├── 343 / 20 = 17 Hz (te laag om te horen)
├── 2x: 34 Hz (voelbaar)
├── 4x: 68 Hz (duidelijk)
├── 8x: 137 Hz (problematisch!)
└── 16x: 274 Hz (ook problematisch)

Snij deze frequenties op master EQ indien nodig.
```

---

## Gain Structure

### Optimale Flow

```
Source (Keyboard, Mic)
         │
         ▼ (sterk signaal)
    ┌─────────┐
    │ Channel │
    │  Gain   │  → Peaks @ -12dB op meter
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │ Channel │
    │  EQ     │  → Geen extreme boosts
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │ Channel │
    │  Fader  │  → Unity (0dB) als startpunt
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │ Master  │
    │  Fader  │  → Unity (0dB)
    └────┬────┘
         │
         ▼ (sterk signaal)
    ┌─────────┐
    │  DZR    │
    │  Input  │  → Volumeknop @ 12 uur positie
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │  DZR    │
    │ Limiter │  → Beschermt speakers
    └─────────┘
```

### DZR Input Level

```
DZR Volume Knop:

     ┌───┐
     │12 │ ← IDEAAL (unity gain)
  9 ─┤   ├─ 3
     │ 6 │
     └───┘

Te laag (9 uur):  Mixer faders te hoog = ruis
Te hoog (3 uur):  Geen headroom, clipt sneller
```

---

## SPL Richtlijnen

### Worship Context

```
Spraak/Preek:      75-80 dB SPL
Rustige worship:   80-85 dB SPL
Energieke worship: 85-90 dB SPL
Absolute max:      95 dB SPL (bescherm gehoor!)

Meting: A-weighted, slow response
Positie: Midden in de zaal
```

### Galmende Zaal Compensatie

```
Reflecties voegen +3 tot +6 dB toe aan perceived volume.

Dus: Als je 85 dB wilt, mix op ~80 dB direct.
     Reflecties vullen de rest aan.
```

---

## Checklist Setup

### Voor de Dienst

- [ ] DZR D-Contour: OFF
- [ ] DZR HPF: 80Hz of 100Hz
- [ ] DZR Output: FOH
- [ ] DZR Volume: 12 uur positie
- [ ] Sub crossover: 80-100Hz
- [ ] Sub level: -3 tot -6dB
- [ ] Sub phase: getest
- [ ] Speakers gericht op publiek
- [ ] Mixer master fader: 0dB
- [ ] Systeem EQ: room modes gedempd

### Soundcheck

- [ ] Pink noise test (even coverage)
- [ ] Walk the room (hotspots/dead zones?)
- [ ] Sub level check (voelbaar, niet te hoorbaar)
- [ ] Feedback check op zang mics
- [ ] Speech intelligibility test (iemand lezen)

---

## Probleemoplossing

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| Modderig/boomy | Te veel sub, D-Contour aan | Sub -3dB, D-Contour OFF |
| Geen punch | Sub te laag, HPF te hoog | Sub level omhoog, HPF 80Hz |
| Scherp/harsh | Reflecties, te luid | Master EQ cut 4-8kHz, volume omlaag |
| Feedback | Te luid voor ruimte | Gain omlaag, ring out mics |
| Dode plekken | Speaker dekking | Adjust aiming, overweeg fill speakers |
| Standing waves | Vierkante zaal | Cut room mode frequencies |
| Geen stereo | Te ver uit elkaar | Speakers meer naar binnen richten |

---

## Onderhoud

### Maandelijks
- [ ] Connectors controleren
- [ ] Speaker grilles schoon
- [ ] Firmware update check

### Jaarlijks
- [ ] Professionele inspectie
- [ ] Room measurement (is EQ nog correct?)

---

*Worship Flow - PA Systeem Documentatie*
