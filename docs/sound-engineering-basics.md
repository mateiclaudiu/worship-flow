# Sound Engineering Basics

Een praktische gids voor live geluid bij worship bands.

---

## 1. Het Signaalpad

```
Microfoon/Instrument
       │
       ▼
┌──────────────────┐
│  GAIN (Preamp)   │  ← Eerste versterking - HIER gaat het vaak mis!
│  -40dB tot +60dB │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│      EQ          │  ← Toonregeling (bass, mid, treble)
└──────────────────┘
       │
       ▼
┌──────────────────┐
│   Compressor     │  ← Dynamiek controle (optioneel)
└──────────────────┘
       │
       ▼
┌──────────────────┐
│     FADER        │  ← Mix volume (relatief tov andere kanalen)
│   -∞ tot +10dB   │
└──────────────────┘
       │
       ▼
   Speakers
```

---

## 2. Wat is dB (Decibel)?

Decibel is een **logaritmische schaal** - niet lineair!

| dB | Verhouding | Betekenis |
|----|------------|-----------|
| +6dB | 2x | Dubbele spanning |
| +3dB | ~1.4x | Merkbaar harder |
| 0dB | 1x | Referentiepunt |
| -3dB | ~0.7x | Merkbaar zachter |
| -6dB | 0.5x | Half zo luid |
| -20dB | 0.1x | 10x zachter |
| -40dB | 0.01x | 100x zachter! |

### Waarom logaritmisch?
Ons gehoor werkt ook logaritmisch. Het verschil tussen fluisteren en praten voelt hetzelfde als praten en schreeuwen.

---

## 3. Signaal Niveaus

Dit is CRUCIAAL om te snappen:

| Type | Niveau | Voorbeeld |
|------|--------|-----------|
| **Mic Level** | -60dB tot -40dB | Microfoon output (heel zwak!) |
| **Instrument Level** | -20dB tot -10dB | Gitaar pickup, bas DI |
| **Line Level** | -10dB tot +4dB | Keyboard, laptop, mixer output |

### Waarom dit belangrijk is:

```
Microfoon output:     ▁ (heel zwak)     → Heeft +40dB gain nodig
Keyboard output:   ███████ (al sterk)  → Heeft -20dB gain nodig
```

- **Als je keyboard gain op +40dB zet → CLIP! VERVORMING!**
- **Als je mic gain op -20dB zet → Je hoort alleen ruis**

---

## 4. Gain Staging: De Kunst

**Doel:** Elk punt in de keten op optimaal niveau houden.

```
         Te laag          Optimaal           Te hoog
            │                │                  │
            ▼                ▼                  ▼
Meter:  ░░░░░░░░░░░░   ███████░░░░░      ████████████ CLIP!
        ◄── ruis ──►   ◄─ sweet ─►       ◄─ distortion
```

### De -18dB Regel (Broadcast Standaard)

```
    0dB ─────────── MAXIMUM (nooit overschrijden!)
        │
   -6dB ─────────── Pieken mogen hier komen
        │
  -12dB ─────────── Luide passages
        │
  -18dB ─────────── ⭐ GEMIDDELD NIVEAU (target!)
        │
  -24dB ─────────── Zachte passages
        │
  -40dB ─────────── Ruisvloer (onder dit niveau = ruis)
```

**Waarom -18dB gemiddeld?**
- 18dB **headroom** boven gemiddelde voor onverwachte pieken
- Ver boven de **ruisvloer** (-60dB tot -90dB)

---

## 5. GAIN vs FADER: Het Verschil

### GAIN (Preamp)
- **Versterkt het ruwe signaal**
- Zet je **één keer** goed in (soundcheck)
- Beïnvloedt **signaal kwaliteit**
- Te laag = ruis, te hoog = vervorming

### FADER (Volume)
- **Mix balans** tussen kanalen
- Pas je **voortdurend** aan tijdens show
- Beïnvloedt **alleen volume**
- Kan niet "kapot" maken

### Analogie

```
GAIN  = Hoe hard iemand praat
FADER = Hoe hard je naar die persoon luistert

Als iemand fluistert (gain te laag), en je zet je oor
heel dichtbij (fader omhoog), hoor je ook alle
achtergrondgeluiden (ruis).

Als iemand schreeuwt (gain te hoog), maakt niet uit
hoe ver je wegloopt (fader omlaag), het is al vervormd.
```

---

## 6. EQ: Veelgemaakte Fout

### FOUT:
```
"Ik hoor de zanger niet goed"
→ EQ: +10dB bij 3kHz
→ Resultaat: Harsh, feedback, nog steeds zacht
```

### CORRECT:
```
"Ik hoor de zanger niet goed"
→ Check GAIN: Is meter op ~40%? Nee? GAIN omhoog!
→ Check FADER: Staat die laag? Fader omhoog!
→ EQ alleen voor KLEUR, niet voor VOLUME
```

### EQ Vuistregel
- **Snijden (cut)** = OK, tot -12dB
- **Boosten** = Voorzichtig! Max +3dB tot +6dB

---

## 7. Meter Waarden Referentie

De Soundcraft UI24 stuurt meter levels als 0.0 tot 1.0:

| Waarde | Percentage | dB (approx) | Status |
|--------|------------|-------------|--------|
| 1.0 | 100% | 0dB | CLIP! |
| 0.85 | 85% | -1.5dB | Te heet |
| 0.70 | 70% | -3dB | Pieken OK |
| 0.50 | 50% | -6dB | Pieken ideaal |
| 0.40 | 40% | -8dB | Gemiddeld ideaal |
| 0.25 | 25% | -12dB | Rustige passages |
| 0.15 | 15% | -16dB | Aan de lage kant |
| 0.05 | 5% | -26dB | Te laag! |

---

## 8. Praktisch: Soundcheck Workflow

```
1. ALLE faders op 0dB (unity)
2. GAIN op -∞ (helemaal dicht)

3. Per kanaal:
   a. Laat muzikant spelen op NORMALE volume
   b. GAIN langzaam omhoog tot meter ~50% piek
   c. Check: gemiddelde rond 30-40%?
   d. ✓ Volgende kanaal

4. Pas daarna FADERS aan voor mix balans
5. EQ alleen voor kleurcorrecties
```

---

## 9. Typische Gain Settings per Instrument

| Instrument | Gain Range | Threshold | Opmerkingen |
|------------|------------|-----------|-------------|
| **Zang** | +5 tot +25dB | 82% | Dynamisch, snelle reactie nodig |
| **Spraak** | +10 tot +30dB | 78% | Minder dynamisch dan zang |
| **Koor mic** | +15 tot +35dB | 75% | Kan plotseling hard worden |
| **Keyboard** | -30 tot 0dB | 88% | Line level, zeer consistent |
| **Akoest. gitaar** | 0 tot +20dB | 75% | Dynamisch, scherpe transients |
| **Elektr. gitaar** | -10 tot +10dB | 80% | Via amp/DI, redelijk consistent |
| **Bas DI** | -20 tot +5dB | 85% | Consistent, slap kan pieken |
| **Kick drum** | 0 tot +15dB | 65% | Extreme transients! |
| **Snare** | 0 tot +15dB | 68% | Scherpe rimshots |
| **Overhead** | +5 tot +20dB | 70% | Cymbals pieken hard |
| **Backing track** | -30 tot -10dB | 90% | Al gemasterd |

---

## 10. Samenvatting

| Concept | Onthoud Dit |
|---------|-------------|
| **dB** | Logaritmisch: +6dB = 2x volume |
| **Gain** | Eerste versterking, zet EENMAAL goed |
| **Fader** | Mix balans, pas CONTINU aan |
| **-18dB** | Target gemiddeld niveau |
| **Headroom** | Ruimte voor pieken (12-18dB) |
| **EQ** | Voor KLEUR, niet voor volume! |

---

## 11. Veelvoorkomende Problemen

### "Ik hoor kanaal X niet goed"
1. Check GAIN (meter op ~40%?)
2. Check FADER (niet te laag?)
3. Check MUTE (niet gemute?)
4. **NIET** meteen naar EQ grijpen!

### "Er is feedback"
1. Welke mic? Identificeer het kanaal
2. GAIN iets omlaag
3. EQ: cut rond feedback frequentie
4. Check monitor positie tov mic

### "Het klinkt vervormd"
1. GAIN te hoog - meter clipt
2. Gain omlaag tot pieken onder 85%
3. Check of er geen clip indicator brandt

### "Er is veel ruis"
1. GAIN te laag
2. Gain omhoog tot gemiddelde ~40%
3. Check kabels (los? beschadigd?)

---

## 12. Keyboard & Line Level Instrumenten

### Volume op het Keyboard Zelf

**Zet je keyboard volume op 75-80%** (net onder max)

```
Keyboard volume:  ████████░░  (75-80%)
Mixer gain:       -20 tot 0 dB
Mixer fader:      Unity (0 dB) of naar smaak
```

**Waarom niet lager?**
- Keyboard is al **line level** (sterk signaal)
- Bij lager volume moet mixer gain omhoog → meer ruis
- Je verliest dynamisch bereik

**Waarom niet 100%?**
- Sommige keyboards clippen intern bij max volume
- Geen ruimte voor onverwachte pieken

### Ingebouwde EQ: Laat FLAT

| Instelling | Aanbeveling |
|------------|-------------|
| Bass EQ | 0 (flat) |
| Mid EQ | 0 (flat) |
| Treble EQ | 0 (flat) |

**Redenen:**
1. **EQ'en doe je op de mixer** - overzicht over totale mix
2. **Patches klinken verschillend** - piano EQ werkt niet voor strings
3. **Engineer moet weten wat binnenkomt** - onverwachte EQ bemoeilijkt troubleshooting

**Uitzondering:** Als je keyboard een structureel probleem heeft (bijv. resonantie bij 200Hz in élke patch), kun je dat op het keyboard cutten. Meld dit wel aan de engineer.

### Andere Line Level Bronnen

Dezelfde regels gelden voor:
- Laptops/tablets (backing tracks)
- Synths en modules
- E-drums brain output
- DJ controllers

```
Bron volume:    75-80%
Mixer gain:     Negatief tot unity (-30 tot 0 dB)
EQ op bron:     FLAT
```

---

## Audio Analyse: Frequentie Meting met ffmpeg

Om EQ beslissingen te onderbouwen kun je audio bestanden analyseren per frequentieband.

### Methode

**Benodigdheden:**
- ffmpeg (command line tool)
- WAV of MP3 bestand

**Bash Script:**

```bash
#!/bin/bash
# audio-analyze.sh - Frequentie analyse per band

file="$1"

echo "=== FREQUENTIE ANALYSE ==="
echo "Bestand: $file"
echo ""

# Overall stats
echo "Overall:"
ffmpeg -i "$file" -af "astats=metadata=1:reset=0" -f null - 2>&1 | \
    grep -E "(RMS level|Peak level)" | head -2

echo ""
echo "Per frequentieband:"

# Analyseer per band
for band in \
    "20:80:SUB" \
    "80:150:LOW" \
    "150:300:BODY" \
    "300:500:LOW-MID" \
    "500:1000:MID" \
    "1000:2000:UPPER-MID" \
    "2000:4000:PRESENCE" \
    "4000:6000:BRILLIANCE" \
    "6000:8000:SIBILANCE" \
    "8000:12000:AIR"
do
    IFS=':' read -r low high name <<< "$band"
    rms=$(ffmpeg -i "$file" -af \
        "highpass=f=$low,lowpass=f=$high,astats=metadata=1:reset=0" \
        -f null - 2>&1 | grep "RMS level dB" | awk '{print $NF}')
    printf "%-15s %s dB\n" "$name:" "$rms"
done
```

**Gebruik:**

```bash
chmod +x audio-analyze.sh
./audio-analyze.sh "path/to/audio.wav"
```

### Interpretatie

| Band | Frequentie | Wat het betekent |
|------|------------|------------------|
| SUB | 20-80Hz | Rommel, subwoofer |
| LOW | 80-150Hz | Kick/bass fundament |
| BODY | 150-300Hz | Warmte, volheid |
| LOW-MID | 300-500Hz | Vaak "mud", boxy |
| MID | 500-1kHz | Stem fundamentals |
| UPPER-MID | 1-2kHz | Nasaal gebied |
| PRESENCE | 2-4kHz | Verstaanbaarheid, helderheid |
| BRILLIANCE | 4-6kHz | Air, consonanten |
| SIBILANCE | 6-8kHz | S, T klanken |
| AIR | 8-12kHz | Shimmer, lucht |

### Probleem Detectie

**Richtlijnen:**

| Conditie | Betekenis | Actie |
|----------|-----------|-------|
| LOW-MID > BODY | Muddy/boxy geluid | Cut @ 300-500Hz |
| PRESENCE < MID -10dB | Klinkt ver weg, dof | Boost @ 2-4kHz |
| SIBILANCE > PRESENCE | Scherp, sissen | Cut @ 6-8kHz of de-esser |
| SUB > -40dB | Rommel/handling noise | HPF verhogen |

### Voorbeeld Output

```
=== FREQUENTIE ANALYSE ===
Bestand: samples/0019/06 KEYS.wav

Overall:
Peak level dB: -2.541380
RMS level dB: -24.803839

Per frequentieband:
SUB:            -47.3 dB
LOW:            -40.1 dB
BODY:           -31.8 dB
LOW-MID:        -29.1 dB   ← DOMINANT (probleem!)
MID:            -29.2 dB   ← DOMINANT
PRESENCE:       -41.8 dB   ← TE LAAG (12dB verschil!)
BRILLIANCE:     -50.6 dB
```

**Conclusie:** Cut nodig @ 400Hz, boost nodig @ 3kHz.

---

*Gemaakt voor Worship Flow - Live Worship Management*
