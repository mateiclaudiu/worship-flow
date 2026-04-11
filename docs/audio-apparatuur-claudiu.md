# Audio Apparatuur Overzicht

## Kerk Setup (Elim Kerk)

### Mixer

| Item | Model | Opmerkingen |
|------|-------|-------------|
| Digitale mixer | Soundcraft Ui24R | 24 kanalen, 10 aux outputs, multitrack recording via USB, webinterface |

### PA Systeem

| Item | Model | Specs |
|------|-------|-------|
| Main speakers | 2× Yamaha DZR15 | 15", actief |
| Subwoofer | Yamaha DXS15mkII | 15", actief |

### Monitoring

| Item | Model | Specs |
|------|-------|-------|
| Floor wedges | 2× Yamaha DHR12M | 12", 1000W peak, coaxiaal |
| In-ear systeem | Xvive (draadloos) | Gedeeld door zangers (1 oor setup) |

**Monitor Toewijzing:**

```
┌─────────────────────────────────────────────────────────────┐
│                        PODIUM                                │
│                                                              │
│                      [KEYBOARD]                              │
│                                                              │
│        Monitor 1                    Monitor 2                │
│          🔊                           🔊                     │
│     (AUX 3)                       (AUX 4)                   │
│                                                              │
│     👤 Claudia                    👤 Ina                     │
│     👤 Carmen                     👤 Lidia                   │
│     (Lead + Harmony)              (Backups)                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

| Monitor | AUX | Zangers | Reden |
|---------|-----|---------|-------|
| Monitor 1 | AUX 3 | Claudia + Carmen | Lead + 2de stem harmony - moeten elkaar horen |
| Monitor 2 | AUX 4 | Ina + Lidia | Backups - moeten lead volgen |

### Draadloze Microfoons

| Item | Model | Opmerkingen |
|------|-------|-------------|
| Microfoons | 8× Sennheiser XSW 1-835 | Dynamisch, cardioid |
| Receivers | Meerdere dual receivers | XSW 1-835 DUAL-E sets |
| Mic sensitivity | 0 dB | Op de handheld zelf |

### Keyboard Setup

| Item | Model | Opmerkingen |
|------|-------|-------------|
| Keyboard | Korg PA4X | Arranger workstation |
| Expression pedal | Korg EXP-2 | Volume control |
| DI-box | Radial ProDI | Passief, groen |

**Korg PA4X Output Routing (3-weg split):**

```
┌─────────────────────────────────────────────────────────────┐
│                      KORG PA4X                               │
│                                                              │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐        │
│  │   L/R OUT   │   │   OUT 1     │   │   OUT 2     │        │
│  │             │   │             │   │             │        │
│  │  Live Spel  │   │ Drums+Bass  │   │   Arrange   │        │
│  │  Upper      │   │ Kick        │   │ Strings     │        │
│  │  Lower      │   │ Snare       │   │ Brass       │        │
│  │  Piano      │   │ HiHat       │   │ Pads        │        │
│  │  Melodie    │   │ Bass        │   │ Guitar      │        │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘        │
│         │                 │                 │                │
└─────────┼─────────────────┼─────────────────┼────────────────┘
          │                 │                 │
          ▼                 ▼                 ▼
    Mixer CH ?        Mixer CH ?       Mixer CH ?
    (stereo)          (mono)           (mono)
```

**Instellen op Korg:**

```
MENU → AUDIO & VIDEO → AUDIO OUT → SUB OUT ASSIGN

SUB OUT 1: Drums, Percussion, Bass
SUB OUT 2: Acc1-5 (Strings, Brass, Pad, Guitar, etc.)
LEFT/RIGHT: Upper1-3, Lower (wat je speelt)
```

**Mixer Kanaal Toewijzing:**

| Korg Output | Mixer Kanaal | Inhoud | HPF |
|-------------|--------------|--------|-----|
| L/R | Stereo | Live spel (piano, melodie) | 80 Hz |
| OUT 1 | Mono | Drums + Bass | 40 Hz of UIT |
| OUT 2 | Mono | Arrangement (pads, strings, brass) | 100 Hz |

**Voordelen 3-weg split:**

| Voordeel | Uitleg |
|----------|--------|
| **Live vs Backing** | Je spel apart van arrangement |
| **Aparte EQ** | Arrangement harder EQ'en voor mud zonder live spel te beïnvloeden |
| **Flexibele mix** | Brass te luid? Alleen arrangement kanaal omlaag |
| **Betere monitors** | Zangers: meer live spel, minder pads |
| **Stream controle** | Arrangement dempen voor podcast-feel |

**EQ per Kanaal:**

| Kanaal | Focus | EQ Tips |
|--------|-------|---------|
| Live Spel (L/R) | Piano, melodie | 400Hz -3dB, 3kHz +2dB |
| Drums+Bass (OUT 1) | Ritme, punch | HPF 40Hz, 100Hz +1dB |
| Arrangement (OUT 2) | Vulling, sfeer | 400Hz -4dB (meer cut!), 3kHz +1dB |

**Monitor Sends:**

| Kanaal | AUX 3 (Lead) | AUX 4 (Backup) |
|--------|--------------|----------------|
| Live Spel | 70% | 60% |
| Drums+Bass | 40% | 60% |
| Arrangement | 30% | 30% |

**Stream Sends (AUX 2):**

| Kanaal | Send | Reden |
|--------|------|-------|
| Live Spel | 0 dB | Basis |
| Drums+Bass | -4 dB | Kleine speakers |
| Arrangement | -3 dB | Ondersteunend |

### Livestream

| Item | Details |
|------|---------|
| Routing | Aux send → XLR/3.5mm adapter → GSM |
| Platform | Smartphone (Facebook/YouTube) |

---

## Thuis Setup

| Item | Model | Opmerkingen |
|------|-------|-------------|
| Digitale mixer | Soundcraft Ui12 | Voor presets maken, multitrack playback |
| Koptelefoon | Sony WH-1000XM3 | Gebruik met kabel voor mixing |

---

## Kabels & Accessoires

| Item | Model | Gebruik |
|------|-------|---------|
| Mic kabels | Roland RMC-G10 Gold Series | XLR male-female |

---

## Signaalflow & Routing

### Mixer Outputs

| Output | Bestemming | Gebruik |
|--------|------------|---------|
| Main L/R | Yamaha DZR15 + DXS15mkII | Hoofdgeluid zaal |
| AUX 1 | Zaal speakers | Spraak/preek (apart van muziek) |
| AUX 2 | ATEM Mini Pro | Streaming audio |
| AUX 3 | DHR12M wedge 1 | Monitor: Claudia + Carmen |
| AUX 4 | DHR12M wedge 2 | Monitor: Ina + Lidia |

---

### Monitor Mix (2 Monitors)

**Waarom 2 aparte mixes?**
- Claudia + Carmen = Lead + Harmony → moeten elkaar goed horen
- Ina + Lidia = Backups → moeten lead (Claudia) volgen

---

#### AUX 3: Monitor 1 (Claudia + Carmen)

```
UI24 → AUX 3 SENDS

Kanaal:                 Send:       Waarom:
─────────────────────────────────────────────────
Claudia (mic):          ████████░░  80%    Hoort zichzelf
Carmen (mic):           ████████░░  80%    Hoort zichzelf
Ina (mic):              ████░░░░░░  40%    Achtergrond
Lidia (mic):            ████░░░░░░  40%    Achtergrond
Keys (L/R):             ██████░░░░  60%    Pitch referentie
Drums+Bass:             ████░░░░░░  40%    Tempo (niet te hard)
```

**Doel:** Claudia en Carmen horen primair ELKAAR voor strakke harmony.

---

#### AUX 4: Monitor 2 (Ina + Lidia)

```
UI24 → AUX 4 SENDS

Kanaal:                 Send:       Waarom:
─────────────────────────────────────────────────
Ina (mic):              ████████░░  80%    Hoort zichzelf
Lidia (mic):            ████████░░  80%    Hoort zichzelf
CLAUDIA (mic):          ████████░░  80%    LEAD VOLGEN! (belangrijk)
Carmen (mic):           ████░░░░░░  40%    Harmony referentie
Keys (L/R):             ██████░░░░  60%    Pitch referentie
Drums+Bass:             ██████░░░░  60%    Meer tempo (minder ervaren)
```

**Doel:** Ina en Lidia horen CLAUDIA (lead) extra luid om te kunnen volgen.

---

#### Visueel: Signaalflow

```
┌───────────────────────────────────────────────────────────────┐
│                    SOUNDCRAFT Ui24R                           │
│                                                               │
│  Claudia ─┬──→ Main L/R ──→ DZR15 + Sub                      │
│           ├──→ AUX 3 (80%) ──→ Monitor 1 (haar monitor)      │
│           └──→ AUX 4 (80%) ──→ Monitor 2 (backups volgen)    │
│                                                               │
│  Carmen ──┬──→ Main L/R                                      │
│           ├──→ AUX 3 (80%) ──→ Monitor 1 (haar monitor)      │
│           └──→ AUX 4 (40%) ──→ Monitor 2                     │
│                                                               │
│  Ina ────┬──→ Main L/R                                       │
│          ├──→ AUX 3 (40%) ──→ Monitor 1                      │
│          └──→ AUX 4 (80%) ──→ Monitor 2 (haar monitor)       │
│                                                               │
│  Lidia ──┬──→ Main L/R                                       │
│          ├──→ AUX 3 (40%) ──→ Monitor 1                      │
│          └──→ AUX 4 (80%) ──→ Monitor 2 (haar monitor)       │
│                                                               │
│  Keys ───┬──→ Main L/R                                       │
│          ├──→ AUX 3 (60%)                                    │
│          └──→ AUX 4 (60%)                                    │
│                                                               │
│  Drums+ ─┬──→ Main L/R                                       │
│  Bass    ├──→ AUX 3 (40%)  ← minder (ervaren zangers)        │
│          └──→ AUX 4 (60%)  ← meer (backups hebben tempo hulp)│
│                                                               │
│  Preek ──┬──→ Main L/R                                       │
│          └──→ AUX 1 ────→ Zaal speakers                      │
│                                                               │
│  Stream ─────→ AUX 2 ────→ ATEM Mini Pro                     │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

### Samenvatting AUX Gebruik

| AUX | Bestemming | Inhoud |
|-----|------------|--------|
| AUX 1 | Zaal speakers | Alleen spraak/preek |
| AUX 2 | Streaming | Volledige mix + FX |
| AUX 3 | Monitor 1 | Claudia + Carmen (lead/harmony) |
| AUX 4 | Monitor 2 | Ina + Lidia (backups, meer lead) |
