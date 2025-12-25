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

```
UI24 → AUX 2 → Processing → EQ

├── HPF:         80-100 Hz     (rommel weg)
├── Low shelf:   -2 dB @ 150Hz (minder modder)
├── Mid boost:   +2 dB @ 2-3kHz (spraak helderheid)
├── High shelf:  +1 dB @ 8kHz  (lucht, niet te scherp)
└── LPF:         12-14 kHz     (optioneel, vermindert ruis)
```

**Waarom?**
- Stream kijkers gebruiken laptop speakers, earbuds, telefoon
- Die kunnen geen 40Hz weergeven → cut het weg
- Helderheid in mid-highs = verstaanbaarheid

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

### Stap 5: Reverb (alleen voor Stream)

Reverb maakt de stream minder "droog" en steriel. Maar: **niet alle kanalen krijgen reverb!**

#### A. FX Send per kanaal instellen

```
UI24 → Per kanaal → FX1 SEND

                        FX Send
Preek (CH1):        ████████░░  70-80%   ← veel
Zang 1 (CH2):       ██████░░░░  50-60%   ← normaal
Zang 2 (CH3):       ██████░░░░  50-60%   ← normaal
Zang 3 (CH4):       ██████░░░░  50-60%   ← normaal
Keys (CH5):         ░░░░░░░░░░  0%       ← GEEN (heeft eigen FX)
Gitaar (CH6):       ████░░░░░░  30-40%   ← beetje
Bas (CH7):          ░░░░░░░░░░  0%       ← geen
Drums (CH8+):       ██░░░░░░░░  10-20%   ← subtiel
```

#### B. Reverb Settings (FX1)

```
UI24 → FX → FX1 → Hall Reverb

├── Pre-delay:  20-30 ms
├── Decay:      1.2-1.8 sec
├── Damping:    Medium-high (hoge freq sterven sneller)
└── Mix:        100% wet (het is een send-return setup)
```

#### C. FX Return routing (BELANGRIJK!)

```
UI24 → MIXER → FX1 RETURN kanaal

┌─────────────────────────────────────────┐
│  FX1 RETURN                             │
│                                         │
│  MAIN FADER:  -∞ (of MUTE)             │  ← Geen reverb naar PA!
│                                         │
│  AUX SENDS:                             │
│  ├── AUX 1:   -∞                       │
│  ├── AUX 2:   0 dB  ✓                  │  ← Reverb ALLEEN naar stream
│  └── AUX 3:   -∞                       │
│                                         │
└─────────────────────────────────────────┘
```

#### Resultaat

```
Zang ───┬──────────────────────────► MAIN PA (droog)
        │
        └──► FX SEND ──► REVERB ──► FX RETURN
                                        │
                         MAIN: -∞ ──────┤ (geen reverb naar PA)
                                        │
                         AUX 2: 0dB ────┴──► STREAM (met reverb)
```

| Bestemming | Krijgt |
|------------|--------|
| PA Speakers | Droge mix (geen reverb) |
| Stream | Mix + reverb (gepolijst) |

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
│     EQ       │  HPF 80Hz, +2dB @ 3kHz
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
