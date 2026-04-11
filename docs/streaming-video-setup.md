# Streaming & Video Setup

Multi-camera live streaming setup voor worship diensten.

---

## Systeem Overzicht

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│   📱 CAM 1 ──HDMI──┐                                               │
│   📱 CAM 2 ──HDMI──┼──► ATEM Mini Pro ──► Internet ──► YouTube    │
│   📱 CAM 3 ──HDMI──┘         ▲                         Facebook   │
│                              │                         Kerk website│
│                         ┌────┴────┐                                │
│                         │ AUX 2   │                                │
│                         │ (audio) │                                │
│                         └────┬────┘                                │
│                              │                                     │
│                     Soundcraft UI24                                │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Hardware

### Video Switcher: Blackmagic ATEM Mini Pro

| Specificatie | Waarde |
|--------------|--------|
| Video inputs | 4x HDMI |
| Audio inputs | 2x 3.5mm stereo |
| Output | USB-C (webcam), HDMI, Ethernet (direct stream) |
| Streaming | Direct naar YouTube/Facebook/RTMP |
| Prijs | ~€450 |

**Waarom ATEM Mini Pro:**
- Direct streamen zonder laptop
- Hardware = stabiel, geen crashes
- Multiview op externe monitor
- Audio mixing ingebouwd
- Picture-in-picture mogelijk
- Industrie standaard

### Camera's: 3x Smartphones

Telefoons werken uitstekend als camera's:
- 4K capable
- Goede autofocus
- Altijd bij de hand
- Geen extra investering

**Benodigde adapters:**

Voor iPhone (Lightning):
```
Apple Lightning Digital AV Adapter
├── Prijs: ~€55 (origineel) of ~€20 (third-party)
├── Output: HDMI
└── Let op: Heeft USB port voor stroom (nodig bij lang streamen!)
```

Voor iPhone 15+ (USB-C):
```
USB-C naar HDMI adapter
├── Prijs: ~€20-30
└── USB-C passthrough voor stroom
```

Voor Android (USB-C):
```
USB-C naar HDMI adapter
├── Prijs: ~€15-25
├── Check: Telefoon moet "DP Alt Mode" ondersteunen
└── Samsung/Pixel werken meestal goed
```

### Mounts & Statieven

```
Per camera:
├── Telefoon statief mount: €10-15
├── Statief (of klem): €20-50
└── HDMI kabel 2-3m: €10

Budget optie: Goedkope tripods van Amazon/Bol
Pro optie: SmallRig phone cage + statieven
```

---

## Audio Setup (AUX 2 → ATEM)

### Kabel
```
Soundcraft UI24          ATEM Mini Pro
    AUX 2 OUT      →     MIC 1 of MIC 2
   (6.35mm TRS)          (3.5mm TRS)

Kabel: 6.35mm TRS naar 3.5mm TRS
Prijs: ~€10-15
Lengte: 3-5 meter (afhankelijk van setup)
```

### ATEM Audio Settings
```
ATEM Software Control → Audio tab:
├── MIC 1: ON
├── Level: 0 dB (unity)
├── HDMI inputs: Audio OFF (we gebruiken mixer audio)
└── AFV (Audio Follow Video): OFF
```

---

## Streaming Mix (AUX 2 op UI24)

### Waarom Dedicated AUX voor Stream?

```
FOUT - Externe mic op telefoon:
  🎤 Externe mic → 📱 GSM → Stream
  Resultaat: "Onder water", ruis, galm, amateur

CORRECT - Direct van mixer:
  🎛️ Soundcraft UI24 → AUX 2 OUT → ATEM/telefoon → Stream
  Resultaat: Professionele kwaliteit, gecontroleerd
```

**Stream mix ≠ FOH mix:**
- Stream kijkers gebruiken laptop speakers, earbuds, telefoons
- Fouten zijn duidelijker hoorbaar (geen ruimte-akoestiek)
- Moet "gepolijst" klinken met processing

---

### Stap 1: Balans Aanpassingen

```
UI24 → AUX SENDS → AUX 2

Mode: POST-fader (volgt main mix als basis)

Per kanaal (relatief tov FOH):
├── Preek/Spraak:    +2 tot +3 dB  (belangrijkste!)
├── Zang:            +2 tot +3 dB  (duidelijk hoorbaar)
├── Keys/Pads:        0 dB         (vult mix)
├── Akoest. gitaar:   0 dB
├── Elektrisch:      -2 dB
├── Bas:             -3 dB         (kleine speakers = weinig lows)
├── Drums:           -6 dB         (bloedt al in andere mics)
└── Room mic:        +6 dB         (sfeer, als je die hebt)
```

**Waarom drums zachter?**
- Drums bloeden in alle mics → al aanwezig
- Kleine speakers kunnen geen lage freq aan
- Timing-fouten vallen meer op bij harde drums

---

### Stap 2: Compressie op AUX 2 Master (CRUCIAAL)

```
UI24 → AUX 2 → Processing → COMP

├── Threshold:  -18 dB    (pakt alles vanaf gemiddeld niveau)
├── Ratio:      4:1       (stevige compressie)
├── Attack:     10-15 ms  (snel genoeg voor transiënten)
├── Release:    100-150 ms
├── Makeup:     +3 tot +6 dB
└── Knee:       Soft (als beschikbaar)
```

**Wat dit doet:**
- Luide pieken worden getemperd (drummer slaat te hard = minder erg)
- Zachte passages komen omhoog (gemompel wordt verstaanbaar)
- Consistent volume voor kijkers

---

### Stap 3: EQ op AUX 2 Master

**Let op:** Kies het juiste preset voor de situatie!

#### A. Spraak/Preek EQ (primair)

```
UI24 → AUX 2 → Processing → EQ

┌────────────────────────────────────────────────────────────────┐
│  HPF     1       2       3       4      LPF                    │
└────────────────────────────────────────────────────────────────┘

├── HPF:         100 Hz        (rommel weg)
├── Band 1:      +2 dB @ 250Hz, Q=1.5  (body/warmte toevoegen)
├── Band 2:      +1 dB @ 800Hz, Q=2.0  (borst/volheid)
├── Band 3:      -2 dB @ 5kHz, Q=2.0   (sibilance "S" dempen)
├── Band 4:      -1 dB @ 8kHz, Q=1.5   (harshness weg)
└── LPF:         12 kHz        (hoge ruis weg)
```

**Visueel:**
```
        HPF  1      2      3      4     LPF
         │   │      │      │      │      │
      +3 ─┼───┼──────┼──────┼──────┼──────┼─────
         │   ●      │      │      │      │
      +2 ─┼─(250)───┼──────┼──────┼──────┼─────
         │  +2dB    ●      │      │      │
      +1 ─┼───┼──(800)─────┼──────┼──────┼─────
         │   │   +1dB      │      │      │
       0 ═╪═══╪══════╪══════╪══════╪══════╪═════
         │   │      │      │      ●      │
      -1 ─┼───┼──────┼──────┼───(8kHz)───┼─────
         │   │      │      ●   -1dB      │
      -2 ─┼───┼──────┼───(5kHz)──────────┼─────
         │   │      │   -2dB             │
         └───┴──────┴──────┴──────┴──────┴─────
           100   250  800   5k    8k   12k
                  ↑           ↑
              body          sibilance cut
```

**Waarom deze settings:**
- **+2dB @ 250Hz** = geeft warmte en body terug
- **+1dB @ 800Hz** = voegt "borst" toe aan de stem
- **-2dB @ 5kHz** = dempt de scherpe "S" en "T" klanken
- **-1dB @ 8kHz** = vermindert harshness
- **LPF @ 12kHz** = hoge frequentie ruis weg

#### B. Muziek/Worship EQ (alternatief)

**Parametric EQ:**
```
├── HPF:         80 Hz
├── Band 1:      0 dB @ 200Hz (flat)
├── Band 2:      +1 dB @ 2kHz, Q=2.0 (zang duidelijkheid)
├── Band 3:      -1 dB @ 5kHz, Q=2.0 (minder scherp)
├── Band 4:      +1 dB @ 10kHz, Q=1.5 (shimmer)
└── LPF:         14 kHz
```

**Graphic EQ voor Muziek/Worship:**
```
UI24 → AUX 2 → GEQ

Frequentie:  Fader:   Doel:
─────────────────────────────────────
  63 Hz       0 dB
  80 Hz       0 dB
 100 Hz      +1 dB    ← kick/bass fundament
 125 Hz      +1 dB    ← kick/bass body
 160 Hz       0 dB
 200 Hz       0 dB    ← flat (ruimte voor keys)
 250 Hz      -1 dB    ← mud verminderen
 315 Hz      -1 dB    ← mud verminderen
 400 Hz       0 dB
 500 Hz       0 dB
 630 Hz       0 dB
 800 Hz       0 dB
  1k Hz       0 dB
1.25k Hz      0 dB
 1.6k Hz     +1 dB    ← zang presence
  2k Hz      +1 dB    ← zang presence
2.5k Hz      +1 dB    ← zang clarity
3.15k Hz     +1 dB    ← attack keys/gitaar
  4k Hz       0 dB
  5k Hz      -1 dB    ← sibilance dempen
6.3k Hz      -1 dB    ← sibilance dempen
  8k Hz       0 dB
 10k Hz      +1 dB    ← shimmer/air
12.5k Hz     +1 dB    ← shimmer/air
 16k Hz       0 dB
─────────────────────────────────────
```

**Visueel profiel Muziek:**
```
      +2 ────────────────────────────────────────
      +1 ──●●─────────────────●●●●──────────●●──
       0 ══════●●●●●●●●●●●●●●══════●●══●●●●════●
      -1 ────────●●────────────────────●●───────
      -2 ────────────────────────────────────────
         63 100 200 400 800 2k 3k 5k 8k 10k 16k
              ↑   ↑       ↑       ↑     ↑
            kick mud   zang   sibilance shimmer
           BOOST CUT  BOOST     CUT    BOOST
```

---

#### B2. Korg PA4X Kanalen voor Stream

De Korg heeft aparte outputs → aparte mixer kanalen:

```
Korg PA4X                    Soundcraft UI24R
───────────────────────      ───────────────────────
LEFT/RIGHT  ──────────────►  Keys kanaal (CH?)
OUT 1/2     ──────────────►  Drums+Bass kanaal (CH?)
```

**AUX 2 Send levels per kanaal (relatief t.o.v. FOH):**

| Mixer Kanaal | Bron | AUX 2 Send | Reden |
|--------------|------|------------|-------|
| Keys (L/R) | Korg L/R | 0 dB | Basis niveau, pads vullen mix |
| Drums+Bass | Korg OUT 1/2 | -3 tot -6 dB | Kleine speakers, bleed in mics |
| Zang | Mics | +2 dB | Moet duidelijk doorkomen |
| Preek | Mic | +3 dB | Belangrijkste bij spraak |

**Let op:** AUX EQ is master → geldt voor ALLES. Je kunt alleen:
- Per kanaal: **send level** aanpassen
- Op AUX bus: **master EQ** (geldt voor alle kanalen)

**Tips:**
- Drums/bass bloeden al in zang mics → extra dempen op AUX 2
- Keys/pads vullen de mix → normaal niveau houden
- Stream heeft geen subwoofer → lage bas nutteloos
- Bij twijfel: test met laptop speaker of telefoon

---

#### C. De-esser voor Spraak (optioneel, extra effectief)

Als EQ niet genoeg is, voeg de-esser toe op het spraak kanaal zelf:

```
UI24 → Preek kanaal → Processing → DE-ESSER

├── Frequency:   5-6 kHz
├── Threshold:   -25 tot -20 dB
├── Range:       -4 tot -6 dB
└── Attack:      Fast
```

**Tip:** De-esser werkt beter per kanaal dan op de AUX master.

---

#### D. Graphic EQ voor Spraak (alternatief voor parametric)

Als je de uitgebreide/grafische EQ gebruikt ipv parametric:

```
UI24 → AUX 2 → GEQ

Frequentie:  Fader:   Doel:
─────────────────────────────────────
  63 Hz       0 dB
  80 Hz      -2 dB    ← plosives dempen
 100 Hz      -2 dB    ← plosives dempen
 125 Hz       0 dB
 160 Hz      +1 dB    ← body
 200 Hz      +2 dB    ← body
 250 Hz      +2 dB    ← body (warmte)
 315 Hz      +1 dB
 400 Hz       0 dB
 500 Hz       0 dB
 630 Hz      +1 dB
 800 Hz      +1 dB    ← borst/volheid
  1k Hz       0 dB
1.25k Hz      0 dB
 1.6k Hz      0 dB
  2k Hz       0 dB
2.5k Hz      -1 dB    ← snijdend dempen
3.15k Hz     -2 dB    ← snijdend dempen
  4k Hz      -2 dB    ← snijdend dempen
  5k Hz      -3 dB    ← sibilance (S)
6.3k Hz      -2 dB    ← sibilance (S)
  8k Hz      -1 dB    ← harshness
 10k Hz      -1 dB
12.5k Hz     -2 dB
 16k Hz      -3 dB
─────────────────────────────────────
```

**Visueel profiel:**
```
      +2 ──────●●─────────────────────────────
      +1 ────●────●─────●●────────────────────
       0 ══●══════●●══●════●●●●●══════════════
      -1 ──────────────────────●──────●●──────
      -2 ●●─────────────────────●●─────────●──
      -3 ─────────────────────────●─────────●─
         63 100 200 400 800 2k 4k 6k 8k 12k 16k
              ↑       ↑       ↑
           plosives  body  snijdend/S
            CUT      BOOST    CUT
```

---

#### E. Compressor Aanpassing voor Plosives

Als je "phhfff" plosives hoort op de stream (maar niet in de zaal):

```
UI24 → AUX 2 → Processing → COMP

├── Attack:   30-50 ms    (was 10-15 ms)
│             ↑
│             Langzamer = plosive glipt erdoor
│
├── Ratio:    3:1         (was 4:1, optioneel verlagen)
└── Rest:     ongewijzigd
```

**Waarom helpt dit?**
```
Snelle attack (10ms):     Langzame attack (40ms):

    phhff                     phhff
    ████  ← gepakt!           ░░██  ← glipt door
    ████                      ████

= plosive versterkt       = plosive ontsnapt
```

**Extra:** Zet HPF op het preek KANAAL zelf op 150-180 Hz.

---

**Algemene tips voor stream audio:**
- Stream kijkers gebruiken laptop speakers, earbuds, telefoons
- Die kunnen geen 40Hz weergeven → HPF gebruiken
- Spraak moet WARM klinken, niet scherp
- Test altijd met oortjes én laptop speaker

---

### Stap 4: Limiter (laatste in chain)

```
UI24 → AUX 2 → Processing → LIMITER

├── Threshold:  -3 dB
├── Release:    50-100 ms
└── Output:     -1 dB (nooit 0dB raken)
```

**Waarom?**
- Onverwachte piek = clipt niet
- YouTube/Facebook comprimeren opnieuw - geef ze headroom

---

### Stap 5: FX voor Stream (Reverb + Delay)

FX op de stream heeft twee doelen:
1. **Minder droog/steriel** - stream klinkt professioneler
2. **Fouten maskeren** - kleine zangfouten worden verhuld

**Waarom werkt dit?**
```
DROOG:                    MET FX:

  ♪ valse noot            ♪ valse noot
  │                       │░░░░░░░  ← reverb tail
  │                       │░░░░░░░
  ▼                       ▼░░░░░░░

= fout duidelijk          = fout vervaagt in reverb
```

---

#### A. FX Send per kanaal instellen

```
UI24 → Per kanaal → FX1 SEND (reverb) + FX2 SEND (delay)

                        FX1 (Reverb)    FX2 (Delay)
                        ────────────    ───────────
Preek:                  ████████░░ 70%  ░░░░░░░░░░ 0%
Lead zang (Claudia):    ██████░░░░ 50%  ████░░░░░░ 30%
Backup zang:            ████████░░ 70%  ██████░░░░ 50%  ← MEER voor fouten
Keys:                   ░░░░░░░░░░ 0%   ░░░░░░░░░░ 0%
Drums+Bass:             ██░░░░░░░░ 10%  ░░░░░░░░░░ 0%
```

**Let op:** Backup zangers krijgen MEER FX dan lead → maskeert fouten beter.

---

#### B. Reverb Settings (FX1) - Voor Stemmen

```
UI24 → FX → FX1 → Hall Reverb

├── Pre-delay:  20-30 ms
├── Decay:      1.2-1.8 sec      ← langer = meer maskering
├── Damping:    Medium-high (hoge freq sterven sneller)
└── Mix:        100% wet (het is een send-return setup)
```

**Tip voor fouten maskeren:** Langere decay (1.5-2.0 sec) verbergt meer.

---

#### B2. Delay Settings (FX2) - Voor Fouten Maskeren

Delay is ZEER effectief voor het maskeren van timing- en toonhoogtefouten.

```
UI24 → FX → FX2 → Delay

├── Type:       Stereo Delay (of Ping-Pong)
├── Time:       Dotted 8th (of 300-400 ms)
├── Feedback:   20-30%        ← niet te veel herhalingen
├── Mix:        100% wet
├── HPF:        200 Hz        ← houdt delay helder
└── LPF:        4-5 kHz       ← delay niet te scherp
```

**Waarom dotted 8th?**
```
Origineel:  ♪───────────────────
Delay:          ♪.──────────────   (dotted 8th later)

= vult gaten, maskeert timing fouten
```

**Sync met tempo (optioneel):**

| BPM | Dotted 8th (ms) |
|-----|-----------------|
| 70  | 643 ms |
| 80  | 563 ms |
| 90  | 500 ms |
| 100 | 450 ms |
| 120 | 375 ms |

---

#### C. FX Return routing (BELANGRIJK!)

Beide FX returns gaan ALLEEN naar stream, NIET naar PA:

```
UI24 → MIXER → FX1 RETURN + FX2 RETURN

┌─────────────────────────────────────────┐
│  FX1 RETURN (Reverb)                    │
│                                         │
│  MAIN FADER:  -∞ (of MUTE)             │  ← Geen reverb naar PA!
│                                         │
│  AUX SENDS:                             │
│  ├── AUX 1:   -∞                       │
│  ├── AUX 2:   0 dB  ✓                  │  ← Reverb naar stream
│  └── AUX 3:   -∞                       │
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  FX2 RETURN (Delay)                     │
│                                         │
│  MAIN FADER:  -∞ (of MUTE)             │  ← Geen delay naar PA!
│                                         │
│  AUX SENDS:                             │
│  ├── AUX 1:   -∞                       │
│  ├── AUX 2:   0 dB  ✓                  │  ← Delay naar stream
│  └── AUX 3:   -∞                       │
│                                         │
└─────────────────────────────────────────┘
```

#### Resultaat

```
Zang ───┬────────────────────────────────────► MAIN PA (droog)
        │
        ├──► FX1 SEND ──► REVERB ──► FX1 RETURN ──┐
        │                                         │
        └──► FX2 SEND ──► DELAY ──► FX2 RETURN ──┤
                                                  │
                              MAIN: beide -∞ ─────┤ (niets naar PA)
                                                  │
                              AUX 2: beide 0dB ───┴──► STREAM (met FX)
```

| Bestemming | Krijgt |
|------------|--------|
| PA Speakers | Droge mix (geen FX) |
| Stream | Mix + reverb + delay (gepolijst, fouten gemaskeerd) |

---

### Processing Chain Samenvatting

```
Kanalen (aangepaste balans)
       │
       ├────────────────────────────────► AUX 2 (droog)
       │
       └──► FX SEND ──► REVERB ──► FX RETURN ──► AUX 2 (wet)
                                        │
                                   MAIN: -∞

AUX 2 Bus (droog + wet gecombineerd)
       │
       ▼
┌──────────────┐
│     EQ       │  Spraak: +2dB@250Hz, -2dB@5kHz (zie boven)
└──────────────┘
       │
       ▼
┌──────────────┐
│  Compressor  │  -18dB threshold, 4:1
└──────────────┘
       │
       ▼
┌──────────────┐
│   Limiter    │  -3dB ceiling
└──────────────┘
       │
       ▼
   AUX 2 OUT → ATEM/Telefoon → Stream
```

---

## Camera Posities

```
┌───────────────────────────────────────────────────────┐
│                     ALTAAR                            │
│                                                       │
│        📱 CAM 2              📱 CAM 3                │
│        (zijkant L)           (zijkant R)             │
│        worship leader        band overview           │
│        medium shot           wide shot               │
│              ↘                   ↙                   │
│                                                       │
│                  [PODIUM]                            │
│                  [SPREKER]                           │
│                                                       │
│                     │                                │
│                     │                                │
│                     ▼                                │
│                  📱 CAM 1                            │
│                  (centraal)                          │
│                  preacher/main                       │
│                  close-up                            │
│                                                       │
│                 [PUBLIEK]                            │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### Shot Types

| Camera | Positie | Shot | Gebruik |
|--------|---------|------|---------|
| CAM 1 | Center, achter publiek | Close-up / Medium | Preek, solist, default |
| CAM 2 | Zijkant links | Medium / Wide | Worship leader, piano |
| CAM 3 | Zijkant rechts | Wide | Band overview, groepsshot |

---

## ATEM Mini Pro Configuratie

### Knoppen Layout

```
┌─────────────────────────────────────────────────────────┐
│  [1]  [2]  [3]  [4]    [CUT] [AUTO]                    │
│                                                         │
│  [STILL] [PIP] [FTB]   [ON AIR]                        │
│                                                         │
│  Mic 1 ●───●  Mic 2 ●───●                              │
└─────────────────────────────────────────────────────────┘

1-4: Camera selectie
CUT: Harde snede
AUTO: Smooth transitie
FTB: Fade to Black
ON AIR: Start/stop stream
```

### Stream Setup (eenmalig)

```
ATEM Software Control → Output:
├── Platform: YouTube / Facebook / Custom RTMP
├── Server: rtmp://... (van platform)
├── Stream Key: xxxx-xxxx-xxxx
├── Quality: 1080p 6Mbps (of lager bij slechte internet)
└── Opslaan
```

### Scene Presets

```
Preset 1 - PREEK:
├── CAM 1 fullscreen
└── Harde cuts

Preset 2 - WORSHIP:
├── CAM 2/3 afwisselen
├── Smooth fades (1 sec)
└── Eventueel PIP

Preset 3 - WIDE:
├── CAM 3 fullscreen
└── Groepsshot

Preset 4 - TEKST/LYRICS:
├── Still image met lyrics
└── Of: input van presentatie laptop
```

---

## Bediening Tijdens Dienst

### Simpele Workflow

```
PREEK:
├── CAM 1 (close-up spreker)
├── Af en toe CAM 3 (wide voor variatie)
└── Cuts: om de 30-60 sec wisselen

WORSHIP:
├── CAM 2 (worship leader)
├── CAM 3 (band wide)
├── CAM 1 (solist indien van toepassing)
└── Cuts: op de muziek, elke 10-20 sec

GEBED:
├── CAM 3 (wide, rustig)
└── Geen cuts, stabiel beeld
```

### Tips

1. **Minder is meer** - Niet te veel switchen
2. **Op het ritme** - Switch op muziek accenten
3. **Anticipeer** - Switch net VOOR iets gebeurt
4. **Safe shot** - CAM 3 wide is altijd veilig

---

## Shopping List

| Item | Aantal | Prijs/stuk | Totaal |
|------|--------|------------|--------|
| ATEM Mini Pro | 1 | €450 | €450 |
| HDMI adapter (Lightning/USB-C) | 3 | €25 | €75 |
| HDMI kabel 3m | 3 | €10 | €30 |
| Telefoon tripod mount | 3 | €12 | €36 |
| Statief | 3 | €30 | €90 |
| Audio kabel 6.35mm→3.5mm | 1 | €12 | €12 |
| **Totaal** | | | **~€700** |

### Optioneel

| Item | Prijs | Waarom |
|------|-------|--------|
| Multiview monitor (7") | €80-150 | Alle camera's zien |
| Extra lange HDMI (5m) | €15 | Flexibeler positioneren |
| USB powerbanks | €30/stuk | Telefoons laden tijdens stream |
| Rode SC6-L (audio interface) | €50 | Backup audio naar telefoon |

---

## Troubleshooting

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| Geen beeld van telefoon | Adapter issue | Check adapter, herstart telefoon |
| Stream buffert | Internet te traag | Verlaag bitrate naar 4Mbps |
| Audio uit sync | ATEM audio delay | Audio tab → delay +/- frames |
| Telefoon oververhit | Lang streamen | Hoesje eraf, koeling, pauze |
| Zwart beeld op camera | Auto-lock | Disable auto-lock op telefoon |
| Geen geluid in stream | Audio input verkeerd | Check ATEM audio tab, MIC 1 ON |
| **"Koekendoos" geluid** | Te weinig lows, te veel highs | GEQ: +2dB @ 200-250Hz, -2dB @ 4-5kHz |
| **Te veel "S" (sibilance)** | Scherpe highs | GEQ: -3dB @ 5kHz, -2dB @ 6.3kHz |
| **Snijdend/scherp geluid** | Te veel presence | GEQ: -2dB @ 2.5-4kHz |
| **"Phhfff" plosives** | Compressor pakt lows | Attack naar 40ms, HPF 150Hz op kanaal |

---

## Pre-Stream Checklist

### 30 min voor dienst

- [ ] Alle telefoons opgeladen (>80%)
- [ ] Auto-lock uitgeschakeld op alle telefoons
- [ ] Camera apps open (native camera of Filmic)
- [ ] HDMI kabels aangesloten
- [ ] ATEM Mini Pro aan
- [ ] Audio kabel van AUX 2 aangesloten
- [ ] Multiview check - alle camera's zichtbaar
- [ ] Test stream (5 sec) naar private/unlisted
- [ ] Audio level check in ATEM

### 5 min voor dienst

- [ ] Stream gestart (ON AIR)
- [ ] "Starting soon" beeld of CAM 3 wide
- [ ] Audio levels goed
- [ ] Telefoons niet in slaapstand

### Na dienst

- [ ] Fade to Black
- [ ] Wacht 10 sec
- [ ] Stop stream
- [ ] Telefoons loskoppelen en opladen

---

## Workflow Diagram

```
Elke week:

Zaterdag (setup):
├── Statief posities checken
├── Test stream (5 min)
└── Snapshot laden: "Streaming_Mix"

Zondag (30 min voor):
├── Telefoons aansluiten
├── Camera check
├── Audio check
└── Pre-stream checklist doorlopen

Tijdens dienst:
├── Iemand bedient ATEM (switch duty)
├── Simpele cuts op ritme/inhoud
└── Bij twijfel: CAM 3 wide

Na dienst:
├── Stop stream
├── Telefoons opladen
└── Done!
```

---

*Worship Flow - Streaming & Video Setup v1.0*
