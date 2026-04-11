# Spraak Presets

EQ en processing presets voor sprekers (preek, gebed, mededelingen).

**Let op:** Deze presets zijn geoptimaliseerd voor een **grote, hoge kerkzaal met veel galm/echo**.

---

## Galmende Zaal: Impact op Spraak

Spraak heeft het MEEST last van galm - verstaanbaarheid is kritiek:

| Probleem | Waarom | Oplossing |
|----------|--------|-----------|
| **Galm maskeert consonanten** | T, K, P verdwijnen in reverb | Meer presence boost |
| **Lows bouwen op** | Kerk resoneert in lage freq | Hogere HPF |
| **Boominess versterkt** | 300-500Hz accumuleert | Agressievere cut |
| **Woorden lopen in elkaar** | Reverb tail overlapt | Snellere compressie |

### De Regel voor Spraak in Galm

> **Spraak moet HELDERDER dan normaal** - de zaal verzacht alles.
> Cut meer lows, boost meer highs, geen reverb effect toevoegen!

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

## Basis Spraak EQ (Startpunt - Galmende Zaal)

Gebruik dit als startpunt voor alle sprekers in onze galmende kerk:

### Man - Spraak Basis (galmende zaal)

| Band | Freq | Gain | Q | Doel |
|------|------|------|---|------|
| HPF | **120Hz** | - | steep | Bas buildup voorkomen |
| 1 | 200Hz | **-3dB** | 1.5 | Boominess + galm verminderen |
| 2 | 800Hz | -1dB | 2.0 | Nasaal/telefoon verminderen |
| 3 | 2.5kHz | **+3dB** | 2.0 | **Verstaanbaarheid door galm** |
| 4 | 5kHz | **+2dB** | 1.5 | Articulatie (consonanten door galm) |
| LPF | **UIT** | - | - | Zaal absorbeert highs al |

### Vrouw - Spraak Basis (galmende zaal)

| Band | Freq | Gain | Q | Doel |
|------|------|------|---|------|
| HPF | **140Hz** | - | steep | Bas buildup voorkomen |
| 1 | 250Hz | **-3dB** | 1.5 | Boominess + galm verminderen |
| 2 | 1kHz | -1dB | 2.0 | Nasaal verminderen |
| 3 | 3kHz | **+3dB** | 2.0 | **Verstaanbaarheid door galm** |
| 4 | 5kHz | **+2dB** | 1.5 | Articulatie door galm |
| LPF | **UIT** | - | - | Zaal absorbeert highs al |

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

## Pastoor (Preek/Amvon)

Mannenstem, preek vanaf amvon. Boomend in de lage mids, verstaanbaarheid kan beter.

### Audio Analyse (gemeten)

*Gebaseerd op analyse van `samples/0019/19 AMVON.wav`*

| Frequentie Band | Energie (dB) | Interpretatie |
|-----------------|--------------|---------------|
| LOW (<150Hz) | -49.0 dB | Schoon |
| BODY (150-250Hz) | -46.5 dB | Mannenstem grondtoon |
| **BOOMINESS (300-500Hz)** | **-42.9 dB** | **DOMINANT - boomend!** |
| NASAL (600-1kHz) | -47.7 dB | Normaal |
| **VERSTAANBAARHEID (2-4kHz)** | **-49.7 dB** | **Zwak - boost nodig** |
| SIBILANCE (4.5-6.5kHz) | -54.9 dB | Laag - geen probleem |
| HIGH (>8kHz) | -58.6 dB | Zeer laag |

**Dynamiek:**
- Integrated Loudness: -36.9 LUFS
- Loudness Range: 8.2 LU (typisch voor spraak)

### Stem karakteristieken

| Eigenschap | Waarde |
|------------|--------|
| Type | Man |
| Karakter | Boomend, vol, lage stem |
| Volume | Normaal |
| Tempo | Normaal |
| Probleem | Te veel 300-500Hz (boomend), te weinig presence |

### EQ Settings (op basis van meting + galmende zaal)

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | **120Hz** | - | steep | ~~100Hz~~ → 120Hz (galmende zaal = bas buildup) |
| 1 | 200Hz | **-2dB** | 1.5 | ~~-1dB~~ → -2dB (body + galm = boomend) |
| 2 | 400Hz | **-4dB** | 2.0 | ~~-3dB~~ → -4dB (boominess + galm = veel erger!) |
| 3 | 2.5kHz | **+3.5dB** | 2.0 | ~~+2.5dB~~ → +3.5dB (KRITIEK: verstaanbaarheid door galm!) |
| 4 | 5kHz | **+2dB** | 1.5 | ~~+1dB~~ → +2dB (consonanten moeten door galm snijden) |
| LPF | **UIT** | - | - | ~~12kHz~~ → UIT (zaal absorbeert highs al, we hebben ze nodig) |

**Galm notitie:** Spraak in galmende kerk is het moeilijkste scenario voor verstaanbaarheid. De boominess van de pastoor (+galm) maakt woorden modderig. Agressieve low-mid cut en sterke presence boost zijn ESSENTIEEL.

### Visuele EQ curve (galmende zaal)

```
     +4dB |                    __
     +3dB |                   /  \
     +2dB |                  /    \   /
     +1dB |                 /      \ /
      0dB |__              /        X
     -1dB |  \            /
     -2dB |   \__        /
     -3dB |      \      /
     -4dB |       \____/
          120 200 400  800  2.5k  5k    Hz
              ↑   ↑          ↑    ↑
            body boom    verstaan arti
            -2dB -4dB     +3.5dB +2dB
            (galm maakt boominess VEEL erger)
```

### Compressie

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | -20dB | Spraak niveau vangen |
| Ratio | 4:1 | Consistente spraak |
| Attack | 10ms | Snel genoeg |
| Release | 80ms | Snel herstel |
| Makeup | +3dB | Compenseer |

### Troubleshooting (galmende zaal)

| Situatie | Aanpassing |
|----------|------------|
| Nog steeds boomend | 400Hz cut verhogen naar **-5dB** + HPF naar **140Hz** |
| Niet verstaanbaar | 2.5kHz boost verhogen naar **+4dB** |
| Te veel S-klanken | De-esser - onwaarschijnlijk (meet -54.9dB) |
| Mompelend | 3-4kHz boost **+2dB** toevoegen |
| Wisselend volume | Threshold verlagen naar -22dB, ratio naar **5:1** |
| Klinkt "ver weg" | 2.5kHz naar **+4dB** + 400Hz naar **-5dB** |
| **Galm maskeert woorden** | 300-500Hz cut naar **-5dB**, presence naar **+4dB** |
| **Woorden lopen in elkaar** | Compressie release naar **60ms** |

---

### Pastoor Podcast EQ (Post-Productie in Audacity)

Voor het omzetten van live opnames naar podcast-kwaliteit. Doel: warmer, intiemer geluid.

**Verschil Live vs Podcast:**

| Aspect | Live (Kerk) | Podcast |
|--------|-------------|---------|
| Doel | Door galm snijden | Warm, intiem |
| Low-mids | Agressief cutten | Body toevoegen |
| Highs | Boosten voor articulatie | Dempen (minder scherp) |
| Compressie | Medium | Strak |

**Audio Analyse (19 AMVON - original.wav):**

```
Band            Energie     Probleem
─────────────────────────────────────────────────────
SUB (20-80Hz)   -47.2 dB
LOW (80-150Hz)  -40.8 dB
BODY (150-300)  -34.1 dB
LOW-MID (300-500) -31.1 dB ⚠️ DOMINANT (koekendoos)
MID (500-1k)    -30.0 dB   ⚠️ DOMINANT
PRESENCE (2-4k) -34.1 dB   ⚠️ Mist intimiteit
BRILLIANCE+     -39 tot -45 dB
```

**Audacity Workflow:**

1. **Effect → Filter Curve EQ:**

```
Frequentie:  Gain:     Doel:
─────────────────────────────────────
  80 Hz      HPF       Rommel weg
 200 Hz      +3 dB     Warmte/body toevoegen
 400 Hz      -4 dB     "Koekendoos" mud weg
 500 Hz      -3 dB
1600 Hz      -1 dB     Scherpe 'g' dempen
2000 Hz      +1 dB     Presence (minder dan live)
2500 Hz      +2 dB
3150 Hz      +2 dB
8000 Hz      -1 dB     Harshness weg
12000 Hz     -2 dB     Ruis weg
```

**Visueel:**

```
      +3 ────●────────────────────────────────────
      +2 ─────────────────────────●●──────────────
      +1 ───────────────────────●────●────────────
       0 ══════════════════●●══════════●●●════════
      -1 ──────────────●─────────────────────●────
      -2 ───────────────────────────────────────●─
      -3 ────────────●────────────────────────────
      -4 ──────────●──────────────────────────────
         80  200  400 500 1.6k 2k 2.5k 3k 4k  8k 12k
              ↑    ↑    ↑         ↑
           warmte mud  'g'    presence
```

2. **Effect → Compressor:**

```
├── Threshold:     -18 dB
├── Noise Floor:   -50 dB
├── Ratio:         5:1 (strak voor podcast)
├── Attack:        0.03 sec (30ms) ← langzamer voor plosives!
├── Release:       0.15 sec
└── ✓ Make-up gain
```

3. **Effect → Limiter:**

```
├── Type:          Hard Limit
├── Limit to:      -1 dB
```

4. **Effect → Loudness Normalization:**

```
├── Normalize to:  -16 LUFS (podcast standaard)
```

**Troubleshooting Podcast:**

| Probleem | Oplossing |
|----------|-----------|
| Nog "koekendoos" | 400Hz cut naar -5dB |
| Te veel "S" | 5kHz -2dB toevoegen |
| Scherpe 'g' | 1.6kHz cut naar -2dB |
| Plosives "phhfff" | Attack naar 40-50ms |
| Te donker | 2.5kHz boost naar +3dB |
| Te veel ruis | LPF @ 10kHz toevoegen |

---

## [Naam Spreker 2] (Gebed)

*[Nog in te vullen na analyse recording]*

---

## [Naam Spreker 3] (Mededelingen)

*[Nog in te vullen na analyse recording]*

---

## Gastspreker Preset (Galmende Zaal)

Voor onbekende gastsprekers in onze galmende kerk:

### EQ Settings (Veilig maar aangepast voor galm)

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | **120Hz** | - | steep | Galmende zaal = bas buildup |
| 1 | 300Hz | **-2.5dB** | 1.5 | Boominess + galm dempen |
| 2 | 3kHz | **+2.5dB** | 2.0 | Verstaanbaarheid door galm |
| 3 | 5kHz | **+1dB** | 1.5 | Articulatie hulp |
| LPF | **UIT** | - | - | Zaal absorbeert highs al |

### Compressie (Medium-Strak)

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | -18dB | |
| Ratio | **4:1** | Strakker voor consistente spraak |
| Attack | 10ms | Snel |
| Release | 80ms | Snel herstel |
| Makeup | +3dB | |

**Tip voor galmende zaal:**
- Start met deze instellingen
- Als niet verstaanbaar: 3kHz boost verhogen
- Als boomend: 300Hz cut verhogen of HPF naar 140Hz
- NOOIT reverb/delay toevoegen!

---

## Spraak Troubleshooting Algemeen (Galmende Zaal)

| Probleem | Frequentie | Oplossing (galmende zaal) |
|----------|------------|---------------------------|
| **Niet verstaanbaar** | 2-4kHz | Boost **+3 tot +4dB** (meer dan normaal!) |
| **Mompelend** | 3-5kHz | Boost **+3dB** |
| **Boomend/dreunerig** | 100-200Hz | Cut **-4dB** of HPF naar **140Hz+** |
| **Nasaal/telefoon** | 800Hz-1.2kHz | Cut -2 tot -3dB |
| **Scherpe S-klanken** | 5-8kHz | De-esser - maar pas op: highs helpen door galm! |
| **P/B plosieven (poppen)** | 80-150Hz | HPF naar **150Hz** + pop filter |
| **Harde T/K klanken** | 4-6kHz | Lichte cut -1dB (niet teveel - helpt verstaanbaarheid) |
| **Klinkt ver weg** | 2-4kHz | Boost **+4dB** presence + 400Hz cut |
| **Klinkt te dichtbij** | 200-400Hz | Cut **-4dB** (proximity + galm = erger) |
| **Wisselend volume** | - | Compressie ratio naar **5:1** |
| **Feedback gevoelig** | Varies | Ring-out + **meer HPF** |
| **Galm maskeert woorden** | 300-500Hz | **Agressieve cut -4 tot -5dB** |
| **Woorden lopen in elkaar** | - | Snellere compressie release (60ms) |

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
