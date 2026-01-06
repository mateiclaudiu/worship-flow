# Frequentie Gids

Van intuïtie naar precisie: leer frequenties herkennen en corrigeren.

---

## Van 4-Knop naar Parametric EQ

### Het Probleem

Met een simpele 4-knop EQ voelde je intuïtief wat nodig was:

```
LOW    |  LOW-MID  |  HIGH-MID  |  HIGH
"body"    "warmte"   "helderheid" "lucht"
```

Met parametric EQ heb je 100x meer opties = overweldigend.

### De Oplossing: Denk Nog Steeds in 4 Zones

| 4-Knop gevoel | Parametric vertaling |
|---------------|---------------------|
| **LOW** meer/minder | 80-150Hz, Q=1.0 |
| **LOW-MID** meer/minder | 200-400Hz, Q=1.5 |
| **HIGH-MID** meer/minder | 2-4kHz, Q=2.0 |
| **HIGH** meer/minder | 8-12kHz, Q=1.0 |

**Start daar.** Dat is 80% van het werk.

### Parametric = 4 Knoppen + Precisie

| 4-Knop | Parametric voordeel |
|--------|---------------------|
| "LOW voelt modderig" | Nu kun je kiezen: 100Hz? 150Hz? 200Hz? |
| "HIGH-MID te scherp" | 2kHz? 3kHz? 4kHz? Waar precies? |
| Brede aanpassing | Q=0.5 (breed) of Q=4.0 (chirurgisch) |

---

## Noot → Frequentie Referentie

### Muzieknoten

| Noot | Freq | Typisch gebruik |
|------|------|-----------------|
| E1 | 41Hz | Laagste bas |
| A1 | 55Hz | Bas fundamenteel |
| E2 | 82Hz | Bas, kick drum |
| A2 | 110Hz | Lage mannenstem grondtoon |
| E3 | 165Hz | Bariton grondtoon |
| **A3** | **220Hz** | Alt/mezzo grondtoon |
| C4 (midden C) | 262Hz | Midden stem |
| E4 | 330Hz | Sopraan grondtoon |
| A4 (stemtoon) | 440Hz | Standaard tuning referentie |
| C5 | 523Hz | Hoge sopraan |
| A5 | 880Hz | Zeer hoog |

### Octaaf Regel

Elke octaaf omhoog = frequentie × 2

```
A2 = 110Hz
A3 = 220Hz  (× 2)
A4 = 440Hz  (× 2)
A5 = 880Hz  (× 2)
```

---

## Frequentie Zones: Klank → Probleem → Oplossing

### LOWS (20-250Hz)

| Freq | Klinkt als | Probleem | Oplossing |
|------|-----------|----------|-----------|
| 20-60Hz | Dreun, trillen | Rommel, wind, onhoorbaar | HPF (high-pass filter) |
| 60-100Hz | Bas, punch, kick | Boomend in zaal | Cut -3dB of HPF hoger |
| 100-150Hz | Body, warmte, volheid | Modder bij meerdere bronnen | Cut op niet-essentiële kanalen |
| 150-200Hz | Volheid, mannenstem body | "Retro" klank, ouderwets | Cut -2 tot -3dB |
| 200-250Hz | Warmte vrouwenstem | Modderig, maskering | Lichte cut, behoud bij warme stem |

### LOW-MIDS (250-500Hz)

| Freq | Klinkt als | Probleem | Oplossing |
|------|-----------|----------|-----------|
| 250-300Hz | Warmte, body | "Mud", bronnen maskeren elkaar | Cut bij overcrowding |
| 300-400Hz | "Boxy", kartonnen doos | Hol, goedkoop geluid | Cut -2dB, Q=2 |
| 400-500Hz | Honky, begin nasaal | Holle neus-klank | Cut -2dB |

### MIDS (500Hz-2kHz)

| Freq | Klinkt als | Probleem | Oplossing |
|------|-----------|----------|-----------|
| 500-800Hz | Body, volheid, hout | "Boxy" als teveel | Cut -1 tot -2dB bij holle klank |
| 800Hz-1kHz | Nasaal, telefoon, neus | Keelklank, gespannen | Cut -2 tot -3dB |
| 1-2kHz | Punch, attack, scherpte | Scherp, gespannen, agressief | Cut bij "gespannen" stem |

### HIGH-MIDS (2-6kHz) ⭐ BELANGRIJKSTE ZONE

| Freq | Klinkt als | Probleem | Oplossing |
|------|-----------|----------|-----------|
| **2-3kHz** | **PRESENCE** (stem herkenbaarheid) | Te veel = hard/schel | Boost voor lead, cut voor backup |
| 3-4kHz | Helderheid, articulatie, snijden | Agressief als teveel | Boost +2dB voor verstaanbaarheid |
| 4-5kHz | Consonanten (T, K, P) | Scherp, hard | Cut bij harde medeklinkers |
| 5-6kHz | Sibilance (S, F, SJ) | "Sissy" S-klanken | De-esser of cut -3dB |

### HIGHS (6-20kHz)

| Freq | Klinkt als | Probleem | Oplossing |
|------|-----------|----------|-----------|
| 6-8kHz | Scherpte, definitie, essentie | Schril, pijnlijk, vermoeiend | Cut -2dB |
| 8-10kHz | "Lucht", adem, openheid | Te veel = vermoeiend | Boost voor "romantiek", cut voor schraal |
| 10-16kHz | Sparkle, sheen, glans | Ruis, hiss | Cut of negeren |
| 16-20kHz | Ultra-hoog | Meeste mensen horen dit niet | Meestal negeren |

---

## Per Bron: Waar Zit Wat?

### Zang (Vrouw)

| Element | Frequentie | Actie |
|---------|------------|-------|
| Grondtoon | 200-400Hz | Niet boosten (modder) |
| Warmte | 200-300Hz | Behouden of licht cut |
| Nasaal/keel | 800Hz-1.5kHz | Cut -2 tot -3dB |
| **Presence** | **2-4kHz** | **Boost voor lead** |
| Articulatie | 4-5kHz | Boost +1dB voor verstaanbaarheid |
| S-klanken | 5-8kHz | De-esser indien nodig |
| Lucht/adem | 8-12kHz | Boost voor "Italiaans" effect |

### Zang (Man)

| Element | Frequentie | Actie |
|---------|------------|-------|
| Grondtoon | 100-250Hz | Niet boosten |
| Body/chest | 150-250Hz | Cut als "retro" klinkt |
| Nasaal/keel | 800Hz-1.5kHz | Cut -2 tot -3dB |
| **Presence** | **2-3kHz** | **Boost voor lead** |
| Articulatie | 3-5kHz | Boost +1dB |
| S-klanken | 4-7kHz | De-esser indien nodig |
| Lucht | 8-10kHz | Boost voor moderne sound |

### Spraak/Preek

| Element | Frequentie | Actie |
|---------|------------|-------|
| Mannelijke basis | 100-200Hz | HPF @ 100Hz |
| Vrouwelijke basis | 200-300Hz | HPF @ 120Hz |
| "P" en "B" plosieven | 100-200Hz | HPF helpt |
| Verstaanbaarheid | **2-4kHz** | **Boost +2dB** |
| "S" en "T" | 4-8kHz | De-esser of cut |

### Keyboard L/R (Melodie, Piano, Pads, Strings)

| Element | Frequentie | Actie |
|---------|------------|-------|
| Piano body | 100-300Hz | Behouden, lichte cut voor ruimte |
| Piano warmte | 200-400Hz | Cut als modderig |
| **Pads "mud" zone** | **300-800Hz** | **Cut -2 tot -4dB** |
| Strings body | 200-500Hz | Cut voor ruimte |
| Piano attack | 2-4kHz | Boost voor helderheid |
| Strings scherpte | 3-6kHz | Cut als schril |
| Piano "lucht" | 8-12kHz | Boost voor sparkle |

### Keyboard OUT 1/2 (Drums + Bass)

| Element | Frequentie | Actie |
|---------|------------|-------|
| Kick fundament | 60-80Hz | Behouden |
| Kick punch | 80-100Hz | Boost voor punch |
| Kick attack/click | 2-4kHz | Boost voor definitie |
| Bass fundament | 60-150Hz | Behouden |
| Bass definitie | 700Hz-1kHz | Boost voor "horen" van noten |
| Snare body | 200-300Hz | Behouden |
| Snare crack | 2-5kHz | Boost voor snap |
| Hi-hat/cymbals | 6-12kHz | Cut als te schril |

---

## Quick Reference: "Ik Hoor X, Wat Doe Ik?"

| Ik hoor... | Frequentie | Actie |
|------------|------------|-------|
| Dreun/rommel/wind | <80Hz | HPF hoger zetten |
| Booming/dreunerig | 80-150Hz | Cut -3dB |
| Modderig/onduidelijk/masked | 200-400Hz | Cut -2 tot -3dB |
| Hol/boxy/kartonnen doos | 300-500Hz | Cut -2dB, Q=2.0 |
| Nasaal/neusklank/telefoon | 800Hz-1.5kHz | Cut -3dB |
| Gespannen/keelklank | 1-2kHz | Cut -2dB |
| **Niet verstaanbaar** | 2-4kHz | **Boost +2dB** |
| Scherp/hard/agressief | 3-5kHz | Cut -2dB |
| Te veel S-klanken | 5-8kHz | De-esser of cut -3dB |
| Schril/pijnlijk/vermoeiend | 6-10kHz | Cut -2 tot -3dB |
| Dof/geen lucht/gesloten | 8-12kHz | Boost +1 tot +2dB |

---

## Jouw 4-Knop Intuïtie → Parametric Cheat Sheet

| Je denkt/voelt... | Parametric actie |
|-------------------|------------------|
| "Meer body nodig" | +2dB @ 100-150Hz, Q=1.0 |
| "Minder modder" | -3dB @ 200-300Hz, Q=1.5 |
| "Meer warmte" | +2dB @ 250Hz, Q=1.5 |
| "Minder boxy/hol" | -2dB @ 400Hz, Q=2.0 |
| "Minder nasaal" | -3dB @ 1kHz, Q=2.0 |
| "Meer duidelijkheid" | +2dB @ 3kHz, Q=2.0 |
| "Minder scherp" | -2dB @ 4-5kHz, Q=2.0 |
| "Meer lucht/openheid" | +1.5dB @ 10kHz, Q=1.0 |
| "Minder S-klanken" | -3dB @ 6kHz, Q=3.0 |

---

## Praktische Workflow

### Methode 1: Zone → Precisie

1. **Identificeer de zone** (denk in 4 knoppen)
   ```
   "Stem klinkt modderig" → LOW-MID zone → ergens 200-400Hz
   ```

2. **Kies startpunt**
   ```
   Start met 300Hz, Q=1.5, -2dB
   ```

3. **Luister en verfijn**
   ```
   Beter? → klaar
   Niet genoeg? → meer cut of andere freq
   ```

### Methode 2: Sweep Techniek (om probleem te vinden)

1. **Zet een band op +6dB** (overdreven boost)
2. **Sweep de frequentie langzaam** door de verdachte zone
3. **Waar klinkt het PROBLEEM het ergst?** = daar zit het
4. **Draai naar CUT** in plaats van boost
5. **Pas Q aan** - smaller voor chirurgisch, breder voor natuurlijk

### Q-Waarden Uitleg

| Q | Breedte | Gebruik |
|---|---------|---------|
| 0.5 | Zeer breed | Algemene toon-aanpassing |
| 1.0 | Breed | Natuurlijk, muzikaal |
| 1.5 | Medium | Meeste EQ werk |
| 2.0 | Medium-smal | Gericht probleem oplossen |
| 3.0-4.0 | Smal | Specifiek probleem (feedback, resonantie) |
| 6.0-10.0 | Zeer smal | Notch filter (feedback eliminatie) |

---

## Gouden Regels

### 1. Cut Before Boost
```
Probleem? → Eerst proberen weg te cutten
Pas boosten als cut niet werkt
```

### 2. Minder is Meer
```
±2-3dB = meestal genoeg
±6dB = waarschijnlijk te veel
```

### 3. Context Matters
```
Solo klinkt goed ≠ In mix klinkt goed
Altijd in CONTEXT van volledige mix beoordelen
```

### 4. HPF is Je Vriend
```
Alles wat geen bas NODIG heeft → HPF aan
Zang: 80-120Hz
Spraak: 100-150Hz
Keys: 40-80Hz (of hoger als split)
```

### 5. Presence = Herkenbaarheid
```
2-4kHz = waar stemmen "snijden" door de mix
Lead: boost hier
Backup: NIET boosten hier
```

---

## Frequentie Conflicten Oplossen

Wanneer bronnen elkaar maskeren:

| Conflict | Oplossing |
|----------|-----------|
| Zang + Keys vechten | Cut keys @ 2-4kHz, boost zang @ 3kHz |
| Bas + Kick vechten | Cut bas @ 80Hz, boost kick @ 60Hz (of omgekeerd) |
| Pads + Strings modder | Cut beiden @ 300-500Hz, verschillende Q |
| Meerdere zangers modder | Cut 200-400Hz op backups, niet op lead |

### EQ "Ruimte Maken"

```
     LEAD ZANG                    KEYBOARD
         ↓                            ↓
    [ +2dB @ 3kHz ]            [ -2dB @ 3kHz ]
         ↓                            ↓
    Zang snijdt erdoor         Keys maken ruimte
```

---

*Worship Flow - Frequentie Gids*
