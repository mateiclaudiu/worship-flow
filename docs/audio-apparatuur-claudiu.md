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

**Korg PA4X Output Routing:**

```
LEFT/RIGHT  →  Keys/Melodie (HPF 80Hz op mixer)
OUT 1/2     →  Drums + Bass (HPF 40Hz of uit)
```

Instellen op Korg: `MENU → AUDIO & VIDEO → AUDIO OUT → SUB OUT ASSIGN`

Voordelen:
- Keys apart van ritme sectie = cleaner mix
- HPF op keys zonder bass te beïnvloeden
- Drums+Bass extra naar monitors = zangers houden tempo

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
| AUX 3 | DHR12M wedges + Xvive | Monitor mix zangers |
| AUX (livestream) | XLR → 3.5mm → GSM | Facebook/YouTube stream |

### Monitor Mix (AUX 3)

Zangers ontvangen:
- Eigen stem + andere zangers
- Drums+Bass kanaal (extra) → voor tempo
- Keys (normaal niveau)

```
┌─────────────────────────────────────────────────┐
│              SOUNDCRAFT Ui24R                   │
│                                                 │
│  Zang ──┬──→ Main L/R ──→ DZR15 + Sub          │
│         └──→ AUX 3 ────→ DHR12M / Xvive        │
│                                                 │
│  Keys ──┬──→ Main L/R                          │
│         └──→ AUX 3 (normaal)                   │
│                                                 │
│  Drums+ ┬──→ Main L/R                          │
│  Bass   └──→ AUX 3 (extra voor tempo)          │
│                                                 │
│  Preek ─┬──→ Main L/R                          │
│         └──→ AUX 1 ────→ Zaal speakers         │
└─────────────────────────────────────────────────┘
```
