# Spraak Presets

EQ en processing presets voor sprekers (preek, gebed, mededelingen).

---

## Spraak vs Zang: Belangrijke Verschillen

| Aspect | Zang | Spraak |
|--------|------|--------|
| Doel | Mooi klinken | **Verstaanbaar** zijn |
| Frequentie focus | Warmte + presence | **Presence + articulatie** |
| HPF | 80-120Hz | **100-150Hz** (hoger) |
| LPF | Meestal uit | **10-12kHz aan** |
| Compressie | Licht-medium | **Medium-strak** |
| Dynamiek | Behouden | **Consistenter** maken |

---

## Basis Spraak EQ (Startpunt)

Gebruik dit als startpunt voor alle sprekers:

### Man - Spraak Basis

| Band | Freq | Gain | Q | Doel |
|------|------|------|---|------|
| HPF | 100Hz | - | steep | Rommel/plosief weg |
| 1 | 200Hz | -2dB | 1.5 | Boominess verminderen |
| 2 | 800Hz | -1dB | 2.0 | Nasaal/telefoon verminderen |
| 3 | 2.5kHz | +2dB | 2.0 | Verstaanbaarheid |
| 4 | 5kHz | +1dB | 1.5 | Articulatie (consonanten) |
| LPF | 12kHz | - | steep | Ruis/hiss weg |

### Vrouw - Spraak Basis

| Band | Freq | Gain | Q | Doel |
|------|------|------|---|------|
| HPF | 120Hz | - | steep | Rommel/plosief weg |
| 1 | 250Hz | -2dB | 1.5 | Boominess verminderen |
| 2 | 1kHz | -1dB | 2.0 | Nasaal verminderen |
| 3 | 3kHz | +2dB | 2.0 | Verstaanbaarheid |
| 4 | 5kHz | +1dB | 1.5 | Articulatie |
| LPF | 12kHz | - | steep | Ruis/hiss weg |

### Compressie - Spraak Basis

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | -20dB | Vang dynamiek variatie |
| Ratio | 4:1 | Consistenter dan zang |
| Attack | 10ms | Snel genoeg voor spraak |
| Release | 80ms | Snel herstel |
| Makeup | +3dB | Compenseer |

---

## Spreker Presets

### [TEMPLATE - Kopieer voor nieuwe spreker]

```markdown
## [Naam] ([Rol: Preek/Gebed/Mededelingen])

[Korte beschrijving stem en spreekstijl]

### Stem karakteristieken

| Eigenschap | Waarde |
|------------|--------|
| Type | [Man/Vrouw] |
| Karakter | [warm/helder/nasaal/etc] |
| Volume | [zacht/normaal/luid/wisselend] |
| Tempo | [snel/normaal/langzaam] |
| Probleem | [specifieke issues] |

### EQ Settings

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | Hz | - | steep | |
| 1 | Hz | dB | | |
| 2 | Hz | dB | | |
| 3 | kHz | dB | | |
| 4 | kHz | dB | | |
| LPF | kHz | - | steep | |

### Compressie

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | dB | |
| Ratio | :1 | |
| Attack | ms | |
| Release | ms | |
| Makeup | dB | |

### Troubleshooting

| Situatie | Aanpassing |
|----------|------------|
| | |
| | |
| | |
```

---

## [Naam Spreker 1] (Preek)

*[Nog in te vullen na analyse recording]*

### Stem karakteristieken

| Eigenschap | Waarde |
|------------|--------|
| Type | |
| Karakter | |
| Volume | |
| Tempo | |
| Probleem | |

### EQ Settings

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | Hz | - | steep | |
| 1 | Hz | dB | | |
| 2 | Hz | dB | | |
| 3 | kHz | dB | | |
| 4 | kHz | dB | | |
| LPF | kHz | - | steep | |

### Compressie

| Parameter | Waarde |
|-----------|--------|
| Threshold | dB |
| Ratio | :1 |
| Attack | ms |
| Release | ms |
| Makeup | dB |

### Troubleshooting

| Situatie | Aanpassing |
|----------|------------|
| Niet verstaanbaar | 2.5-3kHz boost verhogen |
| Te veel S-klanken | De-esser of 5-7kHz cut |
| Boomend/dreunerig | HPF verhogen of 150Hz cut |
| Mompelend | 3-4kHz boost |
| Wisselend volume | Threshold verlagen, ratio verhogen |

---

## [Naam Spreker 2] (Gebed)

*[Nog in te vullen na analyse recording]*

---

## [Naam Spreker 3] (Mededelingen)

*[Nog in te vullen na analyse recording]*

---

## Gastspreker Preset

Voor onbekende gastsprekers, gebruik deze veilige instellingen:

### EQ Settings (Neutraal/Veilig)

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | 100Hz | - | steep | Standaard |
| 1 | 250Hz | -2dB | 1.5 | Lichte mud cut |
| 2 | 3kHz | +1.5dB | 2.0 | Voorzichtige presence |
| LPF | 12kHz | - | steep | Ruis weg |

### Compressie (Medium)

| Parameter | Waarde |
|-----------|--------|
| Threshold | -18dB |
| Ratio | 3:1 |
| Attack | 15ms |
| Release | 100ms |
| Makeup | +2dB |

**Tip:** Start hier en pas aan tijdens soundcheck als mogelijk.

---

## Spraak Troubleshooting Algemeen

| Probleem | Frequentie | Oplossing |
|----------|------------|-----------|
| **Niet verstaanbaar** | 2-4kHz | Boost +2 tot +3dB |
| **Mompelend** | 3-5kHz | Boost +2dB |
| **Boomend/dreunerig** | 100-200Hz | Cut -3dB of HPF hoger |
| **Nasaal/telefoon** | 800Hz-1.2kHz | Cut -2 tot -3dB |
| **Scherpe S-klanken** | 5-8kHz | De-esser of cut -3dB |
| **P/B plosieven (poppen)** | 80-150Hz | HPF hoger + pop filter |
| **Harde T/K klanken** | 4-6kHz | Cut -2dB, Q=2 |
| **Klinkt ver weg** | 2-4kHz | Boost presence |
| **Klinkt te dichtbij** | 200-400Hz | Cut (proximity effect) |
| **Wisselend volume** | - | Compressie ratio verhogen |
| **Feedback gevoelig** | Varies | Ring-out procedure |

---

## Proximity Effect bij Spraak

Spreker te dicht bij de mic = te veel bas (proximity effect).

| Afstand | Effect | Actie |
|---------|--------|-------|
| <10cm | Veel te veel bas | HPF naar 150Hz, cut 200Hz |
| 10-20cm | Beetje te veel bas | HPF naar 120Hz |
| 20-30cm | Normaal | Standaard HPF 100Hz |
| >30cm | Te weinig bas, te veel ruimte | Mic dichterbij, of boost 150Hz |

**Tip:** Train sprekers om consistente afstand te houden.

---

## Spraak Scene (Mixer)

Wanneer spraak begint (preek, mededelingen):

| Actie | Waarom |
|-------|--------|
| Muziek kanalen mute of -∞ | Focus op spreker |
| Spraak kanaal unmute | Spreker actief |
| Zaal/ambient speakers aan | Achterste rijen |
| Reverb UIT | Verstaanbaarheid |

---

## Gate op Spraak

Gate kan helpen bij spraak (lange pauzes):

| Parameter | Waarde |
|-----------|--------|
| Threshold | -40dB |
| Range | -15dB (niet volledig dicht) |
| Attack | 0.5ms |
| Hold | 300ms |
| Release | 150ms |

**Voordeel:** Minder ruis tussen zinnen, minder feedback risico.

**Let op:** Te agressieve gate kan woorden afkappen.

---

## Recordings Analyseren

Als je recordings hebt van sprekers:

### Wat te luisteren

| Luister naar | Noteer |
|--------------|--------|
| Algemene toon | Warm? Dun? Nasaal? |
| Probleem frequenties | Boomend? Scherp? |
| Dynamiek | Consistent? Wisselend? |
| S-klanken | Normaal? Overdreven? |
| Verstaanbaarheid | Goed? Mompelend? |

### Hoe te analyseren met EQ

1. Laad recording in DAW of speel via mixer
2. Gebruik parametric EQ met +6dB boost
3. Sweep door frequenties
4. Waar klinkt het PROBLEEM erger? = daar cutten
5. Waar klinkt het BETER? = daar licht boosten

---

*Worship Flow - Spraak Presets*
