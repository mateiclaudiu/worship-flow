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

*Gemaakt voor Worship Flow - Live Worship Management*
