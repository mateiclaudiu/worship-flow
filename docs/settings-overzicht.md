# Settings Overzicht

Alle apparaat instellingen op 1 pagina. Geoptimaliseerd voor: **grote katholieke zaal met veel echo**.

---

## 1. Yamaha DZR15 (Main Speakers)

| Setting | Waarde | Reden |
|---------|--------|-------|
| D-CONTOUR | **OFF** | Voorkomt modder in galmende zaal |
| HPF | **80Hz** (of 100Hz met sub) | Sub doet het lage werk |
| OUTPUT | **FOH** | Niet Monitor mode |
| Volume knop | **12 uur** | Unity gain |

---

## 2. Yamaha DXS15mkII (Subwoofer)

| Setting | Waarde | Reden |
|---------|--------|-------|
| Crossover | **80-100Hz** | Matcht DZR HPF |
| Level | **-3 tot -6dB** tov tops | Bas bouwt op in galmende zaal |
| Phase | **0°** (test met 180°) | Kies vollere optie |
| HPF | **30-40Hz** | Rommel eruit |

---

## 3. Yamaha DHR12M (Floor Wedges)

| Setting | Waarde | Reden |
|---------|--------|-------|
| D-CONTOUR | **OFF** | Feedback preventie |
| HPF | **100Hz** | Geen lage rommel in monitors |
| OUTPUT | **MONITOR** | Geoptimaliseerd voor vloer |
| Level | Naar smaak | Start laag, verhoog tot comfortabel |

---

## 4. Sennheiser XSW 1-835 (Microfoons)

### Op de handheld zelf:

| Setting | Waarde |
|---------|--------|
| Sensitivity | **0 dB** |
| Mute switch | Uit (of naar voorkeur) |

### Op de mixer - ZANG:

| Band | Freq | Gain | Q |
|------|------|------|---|
| HPF | 100Hz | - | 18dB/oct |
| 1 | 250Hz | -3dB | 1.5 |
| 2 | 800Hz | 0dB | 1.0 |
| 3 | 4kHz | -1dB | 2.0 |
| 4 | 10kHz | -2dB | 1.0 |

### Op de mixer - SPRAAK/PREEK:

| Band | Freq | Gain | Q |
|------|------|------|---|
| HPF | 120Hz | - | 18dB/oct |
| 1 | 300Hz | -4dB | 1.2 |
| 2 | 2.5kHz | +2.5dB | 2.0 |
| 3 | 5kHz | 0dB | 1.5 |
| 4 | 6.5kHz | -2.5dB | 2.5 |
| LPF | 12kHz | - | - |

---

## 5. Korg PA4X (Keyboard)

### Op de keyboard zelf:

| Setting | Waarde | Reden |
|---------|--------|-------|
| Master Reverb | **30-40%** | Zaal voegt al reverb toe |
| Master Delay | **20-30% of UIT** | Voorkom dubbele echo |

### EQ Carving bij Meerdere Geluiden (Anti-Modder)

**Het probleem:** De PA4X heeft 8 parts. Rechterhand speelt vaak piano + pads + strings tegelijk. Dit geeft modderig geluid in de 300-800Hz range waar alle instrumenten concurreren.

**Oplossingen:**

#### 1. EQ per Achtergrond-instrument (op de Korg zelf)

Per style/sound kun je de EQ per part aanpassen:

| Instrument | Low | Mid | High | Reden |
|------------|-----|-----|------|-------|
| Strings | -3dB | -2dB | +1dB | Ruimte voor piano |
| Pads | -4dB | -2dB | +2dB | Alleen "air" |
| Orgel | -3dB | -1dB | +1dB | Minder body |
| Piano | **0dB** | **0dB** | **0dB** | Hoofdinstrument = flat |

**Hoe:** `MENU → MIXER/TUNING → TRACK EQ → [selecteer part]`

#### 2. Maximaal 2 van 3 tegelijk

Nooit piano + pads + strings tegelijk. Kies combinaties:
- Piano + Strings (pads uit)
- Piano + Pads (strings uit)
- Strings + Pads (piano rustig of uit)

#### 3. Kerk-optimalisatie (galm in zaal)

Voor gebruik in grote kerkzaal:

| Setting | Waarde | Reden |
|---------|--------|-------|
| Master Reverb | **UIT** | Zaal voegt al galm toe |
| Master Compressor | **UIT** | Dynamiek behouden |
| Master EQ High | **+1 tot +2dB** | Compenseer afstand |
| Master EQ Low | **-1 tot -2dB** | Voorkom brom opbouw |

**Hoe:** `MENU → EFFECTS → MASTER` of via Global settings

#### 4. Opslaan als User Style of Performance

Sla je kerk-settings op zodat je niet elke keer moet instellen:
- **User Style:** `WRITE → STYLE` (behoudt EQ en effects)
- **Performance:** `MENU → PERFORMANCE → WRITE` (complete snapshot)

---

### Scenario A: Alles via L/R (standaard bij styles)

Drums, bass, keys komen allemaal uit L/R.

**Op de mixer - L/R kanaal:**

| Band | Freq | Gain | Q | Opmerking |
|------|------|------|---|-----------|
| HPF | **40Hz of UIT** | - | - | Bass behouden! |
| 1 | 200Hz | -2dB | 1.5 | Minder cut dan split |
| 2 | 800Hz | 0dB | 1.0 | Flat |
| 3 | 3kHz | +1dB | 2.0 | Voorzichtig (drums!) |
| 4 | 8kHz | -1.5dB | 1.0 | Hihat/cymbals temmen |

---

### Scenario B: Split outputs (aanbevolen)

Keys via L/R, Drums+Bass via OUT 1/2.

**Korg instelling:** `MENU → AUDIO & VIDEO → AUDIO OUT → SUB OUT ASSIGN → Drum + Bass`

```
LEFT/RIGHT  →  Keys/Melodie
OUT 1/2     →  Drums + Bass
```

**Op de mixer - KEYS (L/R):**

| Band | Freq | Gain | Q |
|------|------|------|---|
| HPF | 80Hz | - | 18dB/oct |
| 1 | 200Hz | -3dB | 1.5 |
| 2 | 800Hz | 0dB | 1.0 |
| 3 | 3kHz | +1.5dB | 2.0 |
| 4 | 8kHz | -1.5dB | 1.0 |

**Op de mixer - DRUMS+BASS (Out 1/2):**

| Band | Freq | Gain | Q |
|------|------|------|---|
| HPF | 40Hz of UIT | - | - |
| 1 | 80Hz | +1dB | 1.0 |
| 2 | 400Hz | -2dB | 1.5 |
| 3 | 2.5kHz | +1dB | 2.0 |
| 4 | 8kHz | -1dB | 1.0 |

**Voordeel:** Drums+Bass extra naar monitors → zangers houden tempo

---

## 6. Radial ProDI (DI-box)

| Setting | Waarde | Reden |
|---------|--------|-------|
| PAD | **OFF** (meestal) | Alleen AAN bij zeer hot signaal |
| Ground Lift | **OFF** (start) | AAN bij brom/buzz |
| Merge | **OFF** | Stereo naar mixer |

---

## 7. Xvive In-Ear (Draadloos)

| Setting | Waarde |
|---------|--------|
| Volume | Start 50%, pas aan op gehoor |
| Kanaal | Vrij van interferentie |

**Tip:** Gebruik 1 oor in, 1 oor uit voor ruimtegevoel.

---

## 8. Soundcraft Ui24R (Mixer)

### Gain Targets:

| Type | Gain (start) | Peak target |
|------|--------------|-------------|
| Zang mic | +15dB | -12dB |
| Keyboard | -20dB | -12dB |
| Drums+Bass | -15dB | -12dB |

### AUX Routing:

| AUX | Bestemming | Inhoud |
|-----|------------|--------|
| Main L/R | DZR15 + Sub | Alles |
| AUX 1 | Zaal speakers | Spraak/preek |
| AUX 3 | DHR12M + Xvive | Monitor mix (extra drums) |
| AUX ? | Livestream | Mix voor stream |

---

## Checklist voor Soundcheck

### Speakers
- [ ] DZR D-Contour: OFF
- [ ] DZR HPF: 80Hz
- [ ] DZR Output: FOH
- [ ] Sub level: -3 tot -6dB
- [ ] DHR12M: MONITOR mode

### Bronnen
- [ ] Mic sensitivity: 0dB
- [ ] Korg reverb: 30-40%
- [ ] Korg routing gekozen (A: alles L/R of B: split)
- [ ] DI ground lift: getest

### Mixer - Korg
- [ ] **Scenario A:** HPF 40Hz of UIT op L/R (bass behouden!)
- [ ] **Scenario B:** HPF 80Hz op keys, 40Hz op drums+bass

### Mixer - Algemeen
- [ ] Gains geset (peaks @ -12dB)
- [ ] HPF per kanaal actief
- [ ] EQ presets geladen
- [ ] AUX sends gecheckt
- [ ] Monitors comfortabel voor zangers

---

*Worship Flow - Settings Overzicht*
