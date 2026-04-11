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

### Op de mixer - ZANG PRESETS

Zie **[zang-presets.md](zang-presets.md)** voor:
- Per-zanger EQ presets (Claudia, etc.)
- Frequentie anatomie van de stem
- Compressie settings
- De-esser settings
- Troubleshooting

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

### Stijl-specifieke Settings (Kerk)

Per stijl-categorie de optimale settings voor gebruik in kerkzaal:

#### Ballad / Worship
| Part | Volume | EQ Low | EQ Mid | EQ High |
|------|--------|--------|--------|---------|
| Piano | 0dB | 0 | 0 | 0 |
| Pads | **-3 tot -6dB** | -3 | -2 | +1 |
| Strings | 0dB (alleen refrein) | -2 | -1 | +1 |

**Tip:** Strings alleen bij refrein, pads zacht of uit bij couplet.

#### Pop / Schlager (met gitaren)
| Part | Volume | EQ Low | EQ Mid | EQ High |
|------|--------|--------|--------|---------|
| Piano | 0dB | 0 | 0 | 0 |
| Gitaar | 0dB | **-2** | 0 | **+2** |
| Synth Pads | -3dB | **-4** | -1 | +1 |

**Tip:** Drums + Bass via SUB OUT voor aparte mixer EQ.

#### Swing / Waltz / Polka
| Part | Volume | EQ Low | EQ Mid | EQ High |
|------|--------|--------|--------|---------|
| Piano | 0dB | 0 | 0 | 0 |
| Bass | 0dB | **+1** | **-2** | 0 |
| Brass | 0dB | -1 | 0 | +1 |

**Tip:** Minder parts = minder aanpassingen nodig.

#### Romanian (Hora, Etno, Estam)
| Part | Volume | EQ Low | EQ Mid | EQ High |
|------|--------|--------|--------|---------|
| Accordeon | 0dB | 0 | **-3** | **+1** |
| Viool/Strings | 0dB | **-3** | **-2** | +1 |
| Ţambal | 0dB | 0 | 0 | **-1** |
| Bas | 0dB | +1 | -1 | 0 |

**Tip:** Accordeon en strings concurreren beide in 300-800Hz - één van beide zachter of EQ carven.

#### Aanbevolen User Styles
Maak deze kerk-geoptimaliseerde styles:
1. `WORSHIP-KERK` - Pads laag, reverb uit
2. `POP-KERK` - Gitaren helder, synths gedempt
3. `ROEMEENS-KERK` - Accordeon/strings EQ carved

---

### Style Editing (Minder Drukke Arrangementen)

Factory styles zijn gemaakt voor demo's - vaak te vol voor live kerk. Maak je eigen kerk-versies.

#### Wat je kunt aanpassen

| Element | Hoe | Effect |
|---------|-----|--------|
| Parts uitzetten | MIXER → mute Pad2, String2 | Direct minder druk |
| Velocity verlagen | STYLE EDIT → velocity -20% | Zachter, minder agressief |
| Fills simplificeren | STYLE EDIT → eenvoudigere fill patterns | Minder chaos bij overgangen |
| Drum pattern | STYLE EDIT → minder hi-hat/percussion | Rustiger groove |

#### Praktisch Voorbeeld: Worship Ballad

**Factory versie (te druk):**
```
Piano + Pad1 + Pad2 + Strings + Bass + Drums + Percussion = 7 elementen
```

**Kerk-versie (clean):**
```
Piano + Pad1 (zacht) + Bass + Kick/Snare only = 4 elementen
```

**Hoe te maken:**
1. `STYLE PLAY → MENU → STYLE EDIT`
2. Ga naar `MIXER/TUNING`
3. Mute: Pad2, Strings, Percussion
4. Volume Pad1: -6dB
5. `WRITE → USER STYLE`

---

### Sound Selectie (Wat Klinkt Live het Best)

Vuistregel: Kies sounds met **snelle attack** en **minder lage harmonics**.

#### Piano Sounds

##### Yamaha C5 Set van Ruben (Main Piano)

**Download:** [Korg Forums - Yamaha C5 Set](http://www.korgforums.com/forum/phpBB3/viewtopic.php?t=113029)

| Eigenschap | Waarde |
|------------|--------|
| Grootte | 116MB (232MB uitgepakt) |
| Sounds | 24 totaal: 15 piano varianten + 9 E-piano's |
| Velocity layers | 6 |
| Locatie | User 2 Sounds (eerste 3 pagina's) |
| Compatibiliteit | Pa3x, Pa4x, Pa700, Pa1000 |

**Waarom deze set:**
- Factory piano's klinken "troebel in midden- en laagfrequentiegebied"
- Yamaha C5 samples zijn helderder en snijden beter door de mix
- 15 helderheidsgraden - kies wat past bij de zaal
- Inclusief Korg effecten: resonantie, pedal effects, key-off

**Installatie:**
1. Download en pak uit naar USB-stick
2. `MEDIA` knop → USB-drive
3. Navigeer naar map en laad in User 2 Sounds

**Aanbevolen varianten voor kerk:**
| Variant | Gebruik |
|---------|---------|
| Helder/Bright | Uptempo, vol arrangement |
| Medium | Algemeen gebruik |
| Warm | Solo piano, intiem |

##### Factory Sounds (Backup)

| Sound | Live? | Reden |
|-------|-------|-------|
| Grand Piano (Natural) | ✅ | Helder, snijdt door mix |
| Stage Piano | ✅ | Minder bas, zit niet in de weg |
| Bright Piano | ⚠️ | Kan schel zijn in zaal |
| Dark/Mellow Piano | ❌ | Verdwijnt in mix |

#### Pad Sounds

| Sound | Live? | Reden |
|-------|-------|-------|
| Simple Pad / Soft Pad | ✅ | Weinig harmonics, vult op |
| Analog Pad | ✅ | Warm, niet druk |
| Orchestral Pad | ⚠️ | Kan modderig worden |
| Synth Pad (bright) | ❌ | Vecht met zang |

#### String Sounds

| Sound | Live? | Reden |
|-------|-------|-------|
| Chamber Strings | ✅ | Klein ensemble, helder |
| Solo Violin/Cello | ✅ | Duidelijke lijn |
| Full Orchestra | ❌ | Te breed, modder |
| Slow Strings | ⚠️ | Attack te langzaam voor uptempo |

---

### Expression Pedaal Setup

#### Toepassingen

| Gebruik | Setting | Wanneer |
|---------|---------|---------|
| Volume swell | Expression → Master Vol | Algemene dynamiek |
| Pad only volume | Expression → Pad track | Piano hard, pads variabel |
| Orgel swell | Expression → Organ track | Authentiek orgelspel |

**Setup:** `MENU → CONTROLLERS → FOOT CONTROLLER → EXPRESSION`

#### Worship Tip
Zet expression op alleen Pad volume:
- **Couplet:** pedaal dicht (alleen piano)
- **Refrein:** pedaal open (piano + pad swell)

---

### Pad Sustain/Hold (Soepele Overgangen)

| Functie | Wat het doet |
|---------|--------------|
| PAD HOLD | Pad blijft klinken na loslaten toetsen |
| PAD SOSTENUTO | Alleen huidige noten vasthouden |

**Worship Toepassing:**
1. Speel laatste akkoord van lied
2. Druk HOLD knop
3. Pads blijven klinken
4. Predikant begint praten
5. Fade uit met expression pedaal

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

## 7. Xvive In-Ear Monitor Systeem

**Alleen voor:** Claudia (lead zangeres)

> De IEM is specifiek voor de lead zangeres zodat zij zichzelf goed kan horen
> en zuiver kan zingen. Backup zangers gebruiken het open oor + floor wedge.

### Hardware

| Component | Model | Gebruiker |
|-----------|-------|-----------|
| Zender/Ontvanger | Xvive U4 | Claudia |
| Oordoppen | **KZ ZSN Pro** | Claudia (1 oor) |

---

### Waarom Alleen Lead?

| Reden | Uitleg |
|-------|--------|
| **Lead bepaalt de toon** | Zij moet 100% zuiver zijn, anderen volgen haar |
| **Backup volgt lead** | Zij horen Claudia via zaal + wedge |
| **Eenvoudiger setup** | 1 IEM mix ipv 5 verschillende |
| **Minder apparatuur** | 1 Xvive systeem is genoeg |

---

### KZ ZSN Pro Karakteristieken

De ZSN Pro is een hybride IEM (1 BA + 1 DD) met een **V-shaped** geluidsprofiel:

```
Freq response:
      │
  +3dB│\                    /
      │ \                  /
   0dB│  \________________/
      │
  -3dB│
      └──────────────────────────
        100Hz  500Hz  2kHz  8kHz

        "V-shape" = boost bas + highs, dip mids
```

| Eigenschap | Effect | Compensatie in mix |
|------------|--------|-------------------|
| **Boosted bas** (<200Hz) | Kan boomy klinken | IEM mix: less bass |
| **Recessed mids** (500Hz-2kHz) | Stem kan wegvallen | IEM mix: +2dB @ 1-2kHz |
| **Boosted highs** (>6kHz) | Kan scherp/vermoeiend zijn | IEM mix: -2dB @ 8kHz |

---

### Één Oor Gebruik

**Setup:** ZSN Pro in **één oor**, ander oor **open**.

| Voordeel | Uitleg |
|----------|--------|
| Hoor de zaal | Connectie met gemeente behouden |
| Hoor andere zangers | Niet alleen je eigen stem |
| Natuurlijker gevoel | Niet afgesloten van omgeving |
| Minder gehoorschade | Lager volume nodig |

#### Welk oor?

| Situatie | Aanbeveling |
|----------|-------------|
| Rechthandig + keyboard rechts | IEM in **linker** oor (weg van keyboard) |
| Keyboard links | IEM in **rechter** oor |
| Geen voorkeur | Test beide, kies comfortabelst |

---

### Probleem: 1 Oor Klinkt Minder Duidelijk

**Klacht:** "Met 2 oortjes klinkt het helder, met 1 klinkt het dof/onduidelijk"

#### Waarom Dit Gebeurt

| Oorzaak | Uitleg |
|---------|--------|
| **Geen stereo** | Mono in 1 oor mist "ruimte" |
| **Bas overheerst** | Lage freq voelen sterker in 1 oor |
| **Omgeving maskeert** | Open oor vangt zaalgeluid dat IEM maskeert |
| **Volume te laag** | Compenseer niet genoeg voor open oor |

#### Oplossingen voor 1-Oor Helderheid

**1. EQ aanpassen (agressiever voor 1 oor)**

| Band | 2 oren | 1 oor aanpassing |
|------|--------|------------------|
| 100Hz | -3dB | **-5dB** (meer bas weg) |
| 250Hz | -2dB | **-3dB** (minder boomy) |
| 1.5kHz | +2dB | **+3dB** (meer helderheid) |
| 3kHz | 0dB | **+2dB** (meer presence) |
| 8kHz | -2dB | **0dB** (minder cut) |

**2. Volume iets hoger**

Met 1 oor moet je iets harder om boven zaalgeluid uit te komen:
- Start: 40% → voor 1 oor: **50-55%**
- Maar nooit boven 70%!

**3. Oordop dieper inbrengen**

Betere seal = betere isolatie = helderder geluid:
```
Te ondiep:        Goed:
   ◯──            ◯══──
   │              │
 Oor            Oor

Lekt geluid     Goede seal
```

**4. Ander oortip proberen**

| Tip type | Effect |
|----------|--------|
| Foam tips | Beste isolatie, warmste geluid |
| Silicone (meegeleverd) | Minder isolatie, meer omgeving |
| Comply tips | Beste van beide |

---

### IEM + Floor Monitor Combinatie

**Situatie:** Claudia heeft IEM (1 oor) + floor wedge beschikbaar.

#### Waarom Beide?

| IEM alleen | Wedge alleen | **Beide samen** |
|------------|--------------|-----------------|
| Kan te geïsoleerd voelen | Geen eigen stem | ✓ Balans |
| Mist "gevoel" van bas | Feedback risico | ✓ IEM = stem, Wedge = band |
| Geen stage presence | Niet zuiver genoeg | ✓ Beste van beide |

#### Hoe Te Balanceren

**Strategie:** IEM voor **stem**, Wedge voor **band gevoel**

| Bron | In IEM | In Wedge | Waarom |
|------|--------|----------|--------|
| **Claudia's stem** | **LUID** | **UIT!** | Anders echo/dubbel |
| Keyboard | Medium | Medium | Pitch in beide ok |
| Andere stemmen | Zacht | Medium | Blend via wedge |
| Drums/bas | Uit/minimaal | **Voelbaar** | Feel via wedge |

**BELANGRIJK:** Claudia's eigen stem = **ALLEEN in IEM, NIET in wedge!**

```
IEM (in oor):              Wedge (op vloer):
┌──────────────────┐       ┌──────────────────┐
│ ████████ STEM    │       │    (GEEN stem!)  │
│ ████ Keyboard    │       │ ████ Keyboard    │
│ ██ Anderen       │       │ ████ Anderen     │
│ █ Drums          │       │ ██████ Drums/bas │
└──────────────────┘       └──────────────────┘
   Stem + pitch               Band feel ONLY
```

#### Waarom Stem UIT in Wedge?

| Stem in beide | Probleem |
|---------------|----------|
| IEM + Wedge | Hoort zichzelf 2x met kleine delay |
| Resultaat | Echo, verwarring, vals zingen |

```
FOUT:                      GOED:
IEM ──► stem               IEM ──► stem ✓
         +
Wedge ──► stem (delay)     Wedge ──► band only ✓
         ↓                          ↓
      "Echo!"                  "Helder!"
```

#### Volume Verhouding

| Component | Level | Reden |
|-----------|-------|-------|
| IEM | **Primair** (50-60%) | Stem + pitch referentie |
| Wedge | **Secundair** (laag) | Band feel + bas |

**Regel:** Als je de wedge uitzet, moet je nog steeds kunnen zingen. IEM = primair.

#### Fase/Timing Problemen Voorkomen

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| "Echo" gevoel | IEM + wedge + zaal | Wedge zachter |
| Timing verwarrend | Verschillende delays | IEM = primair, wedge = feel only |
| Stem klinkt dubbel | Stem in beide | Stem UIT in wedge |

#### Setup Procedure (IEM + Wedge)

**Stap 1: IEM eerst**
1. Wedge UIT
2. IEM instellen tot Claudia zichzelf goed hoort
3. Keyboard toevoegen tot pitch referentie ok

**Stap 2: Wedge erbij**
1. IEM blijft zoals ingesteld
2. Wedge langzaam omhoog
3. Alleen drums/bas/band feel
4. **Stem UIT in wedge!**

**Stap 3: Check**
- "Hoor je jezelf duidelijk?" (moet via IEM)
- "Voel je de band?" (moet via wedge)
- "Is er echo/verwarring?" (wedge zachter)

#### Claudia's Keuze

| Situatie | Aanbeveling |
|----------|-------------|
| Rustig nummer (ballad) | IEM alleen, wedge uit |
| Energiek nummer | IEM + wedge voor feel |
| Spraak/gebed | IEM uit, wedge uit |
| Onzeker/nerveus | Wat zij prefereert |

**Uiteindelijk:** Claudia kiest wat voor haar werkt. Jij zorgt dat beide opties beschikbaar en goed ingesteld zijn.

---

### Monitor Setup Per Zanger

#### Overzicht

| Zanger | Monitor Type | Waarom |
|--------|--------------|--------|
| **Claudia** | **IEM (1 oor) + Wedge** | Lead moet zuiver zijn |
| Carmen | Wedge alleen | Volgt Claudia |
| Ina | Wedge alleen | Volgt Claudia |
| Lidia | Wedge alleen | Volgt Claudia |
| David | Wedge alleen | Volgt Claudia (of lead wanneer hij zingt) |

#### Wedge Mix voor Backup Zangers (Carmen, Ina, Lidia, David)

**Doel:** Claudia (lead) duidelijk horen zodat ze kunnen volgen.

| Bron | Level in Wedge | Waarom |
|------|----------------|--------|
| **Claudia** | **LUID** | Zij is de referentie |
| Eigen stem | Medium | Zichzelf horen |
| Keyboard | Medium | Toonhoogte |
| Andere backups | Zacht | Blend check |
| Drums/bas | Voelbaar | Energie/timing |

```
Backup Wedge Mix:
┌──────────────────────────────────┐
│ ████████████ CLAUDIA (lead)      │  ← Belangrijkst!
│ ██████ Eigen stem                │
│ ████ Keyboard                    │
│ ██ Andere backups                │
│ ████ Drums/bas (feel)            │
└──────────────────────────────────┘
```

#### Waarom Backups Claudia Moeten Horen

| Situatie | Als ze Claudia NIET horen | Als ze Claudia WEL horen |
|----------|---------------------------|--------------------------|
| Timing | Lopen achter/voor | ✓ Synchroon |
| Toonhoogte | Vals (eigen interpretatie) | ✓ Volgen haar pitch |
| Dynamiek | Te hard/zacht | ✓ Matchen haar level |
| Inzetten | Missen cues | ✓ Volgen haar inzet |

#### Wedge Troubleshooting (Backup Zangers)

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| "Ik hoor Claudia niet" | Te zacht in wedge | Claudia omhoog in AUX |
| "Ik hoor mezelf niet" | Eigen stem te zacht | Eigen kanaal omhoog |
| "Het is een chaos" | Alles even luid | Claudia = loudest, rest zachter |
| Carmen zingt vals | Hoort Claudia niet | Claudia VEEL luider in haar wedge |
| Feedback | Wedge te luid | Zachter + HPF omhoog |

#### Verschil Claudia vs Backup Monitoring

| Aspect | Claudia (IEM) | Backups (Wedge) |
|--------|---------------|-----------------|
| **Primaire focus** | Eigen stem | Claudia's stem |
| **Secundair** | Keyboard | Eigen stem |
| **Tertiair** | David/anderen | Keyboard |
| **Doel** | Zuiver leiden | Zuiver volgen |

```
Claudia (lead):           Backups:

"Ik moet MEZELF           "Ik moet CLAUDIA
 perfect horen"            perfect horen"
      ↓                         ↓
   IEM: eigen stem          Wedge: Claudia luid
```

---

### Claudia's IEM Mix

#### Wat in haar IEM:

| Bron | Level | Waarom |
|------|-------|--------|
| **Haar eigen stem** | **Loudest (0dB)** | Moet zichzelf horen om zuiver te zingen |
| Keyboard/piano | **-6dB** | Toonhoogte referentie voor haar |
| David (als hij zingt) | -10dB | Harmony check |
| Andere stemmen | -15dB | Minimaal - zij leidt |

#### Wat NIET in Claudia's IEM:

| Bron | Waarom |
|------|--------|
| Drums/bas | Hoort ze via open oor + vloer |
| Main mix | Verwarrend, latency |
| Reverb | Maskeert haar zuiverheid |
| Backup vocals luid | Zij moet LEIDEN, niet volgen |

#### Claudia's IEM Balans Diagram

```
Claudia's IEM mix:

[============================] Claudia stem (loudest)
[================]             Keyboard
[========]                     David (harmony)
[====]                         Andere stemmen
[  ]                           Drums/bas (minimaal)
```

---

### IEM AUX Processing (EQ + Compressor + Limiter)

Pas dit toe op de **AUX bus naar IEM** (niet op main mix):

#### EQ (voor ZSN Pro V-shape compensatie)

| Band | Freq | Gain | Waarom |
|------|------|------|--------|
| HPF | 80Hz | - | Rommel eruit |
| 1 | 100Hz | **-3dB** | Compenseer ZSN Pro bas boost |
| 2 | 250Hz | **-2dB** | Minder boomy in oor |
| 3 | 1.5kHz | **+2dB** | Compenseer ZSN Pro mid dip |
| 4 | 8kHz | **-2dB** | Compenseer ZSN Pro high boost |

#### Compressor op IEM AUX (als Limiter)

De Ui24R heeft geen aparte limiter - gebruik de **compressor met hoge ratio** als limiter:

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | **-10dB** | Vroeg ingrijpen voor comfort |
| Ratio | **10:1** | Bijna-limiter (beschermt gehoor) |
| Attack | **1ms** | Zeer snel - vang pieken direct |
| Release | **80ms** | Snel herstel |
| Makeup | **0dB** | NOOIT verhogen! |
| Knee | **Hard** | Geen zachte overgang |

**Waarom deze settings:**

| Keuze | Reden |
|-------|-------|
| Threshold -10dB | Grijpt in vóór het te luid wordt |
| Ratio 10:1 | Hoog genoeg om als limiter te werken |
| Attack 1ms | Pieken worden direct gevangen |
| Makeup 0dB | We willen NIET harder, alleen beschermd |

#### Signaalflow IEM AUX

```
Claudia's stem ──┐
Keyboard ────────┼──► AUX Bus ──► EQ ──► Compressor (10:1) ──► Xvive
Andere bronnen ──┘                            │
                                              ▼
                                   Pieken afgetopt = gehoor safe
```

#### Verschil Compressor vs Limiter Gebruik

| Doel | Threshold | Ratio | Attack |
|------|-----------|-------|--------|
| Compressor (dynamiek) | -18dB | 3:1 - 4:1 | 10-20ms |
| **Limiter (bescherming)** | **-10dB** | **10:1+** | **<2ms** |

Voor IEM gebruiken we **limiter-settings** = hoge ratio + snelle attack.

#### Wat Dit Doet

| Zonder | Met comp als limiter |
|--------|----------------------|
| Plotse pieken = schrikken | ✓ Pieken afgetopt |
| Keyboard akkoord = te luid | ✓ Gecontroleerd |
| Feedback burst = gehoorschade | ✓ Direct beperkt |
| Volume varieert veel | ✓ Stabiel

---

### Volume & Gehoorbescherming

| Regel | Waarom |
|-------|--------|
| **Start op 30%** | Je kunt altijd verhogen |
| **Max 70%** | Gehoorbescherming |
| **Als je schreeuwt = te luid** | Teken van te hoog volume |
| **Oor rust na dienst** | 15 min stilte helpt |

#### Teken van te luid IEM:

- Je praat harder dan normaal
- Oren tuiten na gebruik
- Je hoort de zaal niet meer met open oor
- Andere zangers klagen dat je te hard zingt

---

### Troubleshooting Claudia's IEM

| Claudia zegt... | Oorzaak | Oplossing |
|-----------------|---------|-----------|
| "Ik hoor mezelf niet" | Haar stem te laag in AUX | Verhoog haar kanaal in IEM AUX |
| "Het klinkt boomy" | ZSN Pro bas + haar warme stem | -3dB @ 100-200Hz in AUX |
| "Het is scherp/vermoeiend" | ZSN Pro high boost | -2dB @ 6-8kHz in AUX |
| "Ik zing vals" | Hoort keyboard niet goed | Keyboard omhoog in haar AUX |
| "Ik hoor de zaal niet" | IEM te luid of beide oren | Volume omlaag, check 1 oor |
| "De anderen zijn te luid" | Backup te hoog in mix | Backup vocals omlaag in AUX |
| "Ik hoor mezelf dubbel" | Main mix + IEM conflict | Main mix UIT in haar AUX |

#### Als Claudia Klaagt Over Zuiverheid Anderen

Dit is NIET een IEM probleem - dit is een backup probleem:
- Carmen hoort zichzelf niet → meer monitor wedge
- Ina/Lidia te luid → fader omlaag in main
- Claudia moet de referentie zijn, niet volgen

---

### IEM Training & Gewenning (voor Claudia)

#### Waarom IEM Vreemd Voelt

| Gevoel | Oorzaak | Dit is normaal |
|--------|---------|----------------|
| "Ik klink raar" | Hoort eigen stem anders (binnen hoofd) | Ja, went na 2-3x |
| "Ik voel me afgesloten" | Één oor dicht | Daarom 1 oor open |
| "Ik zing te hard/zacht" | Geen feedback van ruimte | Went na 3-4x |
| "Het voelt onnatuurlijk" | Nieuwe manier van horen | Went na 1-2 weken |

#### Gefaseerde Introductie (4 Weken Plan)

**Week 1: Thuis Oefenen**
| Dag | Oefening | Duur |
|-----|----------|------|
| Ma | IEM in, muziek luisteren (Spotify) | 15 min |
| Wo | IEM in, meezingen met opname | 15 min |
| Vr | IEM in, eigen stem opnemen en terugluisteren | 15 min |

**Week 2: Soundcheck Alleen**
| Sessie | Wat doen |
|--------|----------|
| 1 | IEM aansluiten, alleen Claudia's stem + keyboard |
| 2 | Volume instellen tot comfortabel |
| 3 | Paar nummers doorzingen, NIET tijdens dienst |

**Week 3: Halve Dienst**
| Moment | IEM status |
|--------|------------|
| Eerste 2 liedjes | IEM IN |
| Rest van dienst | IEM UIT (terug naar wedge) |
| Evaluatie na afloop | Wat ging goed/fout? |

**Week 4: Volledige Dienst**
| Moment | IEM status |
|--------|------------|
| Hele muziek deel | IEM IN |
| Noodplan | IEM eruit als het niet gaat |

---

#### Tips Voor Claudia

| Tip | Waarom |
|-----|--------|
| **Start met laag volume** | Je kunt altijd verhogen |
| **Geef het 3 diensten** | Eerste keer is ALTIJD raar |
| **Communiceer tijdens soundcheck** | "Meer van mezelf" / "Minder keyboard" |
| **Niet opgeven na 1x** | Iedereen heeft gewenningstijd nodig |
| **1 oor = essentieel** | Nooit beide oren dicht |

#### Wat Te Verwachten

```
Week 1: "Dit is raar, ik wil stoppen"
         ↓
Week 2: "Het went een beetje..."
         ↓
Week 3: "Ok, ik snap het nu"
         ↓
Week 4: "Ik wil niet meer zonder!"
```

#### Claudia's Checklist Vóór Dienst

- [ ] IEM opgeladen / batterij ok
- [ ] ZSN Pro schoon (oortips)
- [ ] Xvive ontvanger aan riem/broekband
- [ ] Test: "Hoor ik mezelf?"
- [ ] Test: "Hoor ik keyboard?"
- [ ] Volume comfortabel (niet te luid!)
- [ ] Open oor naar zaal gericht

---

#### Noodplan: Als Het Niet Werkt

| Situatie | Actie |
|----------|-------|
| IEM valt uit | Haal eruit, gebruik wedge |
| Claudia raakt in paniek | Haal eruit, kalmeer, probeer later |
| Geluid is verkeerd | Soundperson past AUX aan |
| Claudia wil stoppen | OK - wedge is altijd backup |

**Belangrijkste regel:** IEM moet HELPEN, niet stressen. Als het niet werkt, terug naar wedge - geen schande.

---

### Xvive U4 Settings

| Setting | Waarde | Reden |
|---------|--------|-------|
| Volume (ontvanger) | **40-60%** | Start laag |
| Kanaal | Test vrij van interferentie | Vermijd WiFi kanalen |
| Limiter | **AAN** | Bescherm gehoor |

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

## 9. Geavanceerde Mix Technieken

### Compressie (Dynamiek Controle)

Maakt zachte delen luider en luide delen zachter → consistenter volume.

#### Wanneer gebruiken

| Bron | Compressie? | Waarom |
|------|-------------|--------|
| Zang (solo) | ✅ Ja, licht | Fluisteren → belten consistent |
| Spraak/preek | ✅ Ja, medium | Verstaanbaarheid |
| Keyboard | ❌ Nee | Al gecomprimeerd in keyboard |
| Drums (uit keyboard) | ❌ Nee | Style heeft al dynamiek |

#### Settings voor Zang op UI24

| Parameter | Waarde | Uitleg |
|-----------|--------|--------|
| Threshold | -20dB | Wanneer compressie start |
| Ratio | 3:1 | Hoeveel demping |
| Attack | 10ms | Snel genoeg voor zang |
| Release | 100ms | Natuurlijk uitsterven |
| Makeup Gain | +3dB | Compenseer volumeverlies |

**Vuistregel:** Gain reduction meter mag max **-6dB** tonen. Meer = te veel.

---

### Gate / Expander (Mic Discipline)

Mic gaat "dicht" als er geen signaal is → minder ruis, minder feedback risico.

#### Wanneer gebruiken

| Bron | Gate? | Waarom |
|------|-------|--------|
| Zang mics | ⚠️ Voorzichtig | Kan woorden afkappen |
| Preek mic | ✅ Ja | Lange pauzes = stil |
| Keyboard DI | ❌ Nee | Altijd signaal |

#### Settings voor Spraak

| Parameter | Waarde |
|-----------|--------|
| Threshold | -40dB |
| Range | -20dB (niet volledig dicht) |
| Attack | 1ms |
| Hold | 200ms |
| Release | 100ms |

**Tip:** Gebruik "Expander" mode ipv hard gate - klinkt natuurlijker.

---

### Feedback Preventie

#### Waarom feedback?
Mic vangt speaker op → versterkt → speaker → mic → LOOP → piep!

#### Ring-out Procedure

Bij soundcheck, voordat mensen komen:

1. Zet mic op standplaats waar zanger zal staan
2. Fader langzaam omhoog tot je feedback hoort
3. Noteer de frequentie (bijv. 2.5kHz)
4. Zet notch filter op die frequentie: -3dB, Q=8
5. Herhaal tot je 6dB boven normale volume kunt zonder feedback

#### Typische Feedback Frequenties

| Freq | Klinkt als | Oorzaak |
|------|-----------|---------|
| 250Hz | Brom | Te dicht bij monitor |
| 800Hz | Hol/boxy | Kamer resonantie |
| 2-4kHz | Schel/piep | Mic direct naar speaker |
| 8kHz+ | Scherpe fluittoon | Hoog volume + reflecties |

#### Preventie Tips

- ✅ Mic ACHTER de speakers (in de "schaduw")
- ✅ Monitors gericht WEG van mic
- ✅ HPF aan op alle mics (100Hz+)
- ❌ Monitor naar plafond richten
- ❌ Gain te hoog (gebruik fader ipv gain)
- ❌ EQ boosten in feedback-gevoelige range

---

### Fase-uitlijning

#### Wanneer relevant?
Meerdere mics op dezelfde bron (bijv. 2 mics op koor, of mic + DI).

#### Het probleem
Geluid bereikt mics op verschillende tijden → sommige frequenties cancelen.

#### Oplossingen

| Situatie | Oplossing |
|----------|-----------|
| 2 mics, 1 persoon | **3:1 regel** - afstand tussen mics = 3x afstand tot bron |
| Mic + DI (bijv. gitaar) | Phase flip op DI kanaal testen |
| Choir mics | Gelijke afstand tot zangers |

#### Testen op UI24
1. Pan beide kanalen center
2. Speel/zing
3. Druk **Ø (phase)** knop op één kanaal
4. Kies versie met **meer bas en body**

---

### Room EQ / System Tuning

PA afstemmen op de akoestiek van de zaal.

#### Simpele Aanpak (zonder meetmic)

Luister kritisch naar spraak en pas Master EQ aan:

| Probleem | Oplossing |
|----------|-----------|
| Boomend/dreunerig | Low -2 tot -4dB |
| Mompelend/onduidelijk | Mid (2-4kHz) +2dB |
| Schel/hard | High -2dB |
| Echo/wazig | Verlaag volume, meer directe speakers |

#### Pro Aanpak (met meetmicrofoon)

##### Benodigdheden

| Item | Optie Budget | Optie Pro |
|------|--------------|-----------|
| Meetmicrofoon | Behringer ECM8000 (~€50) | Earthworks M23 (~€600) |
| Audio interface | Focusrite Scarlett Solo (~€100) | Bestaande mixer |
| Software | REW (gratis) | Smaart (~€800) |

**Budget totaal:** ~€150 met REW + ECM8000

##### REW Software Setup (Gratis)

1. Download REW: [roomeqwizard.com](https://www.roomeqwizard.com)
2. Sluit meetmic aan op interface/mixer
3. Calibreer mic in REW (of laad calibratie file voor ECM8000)

##### Meetprocedure

1. **Genereer roze ruis:**
   - In REW: `Tools → Generator → Pink Noise`
   - Of via Soundcraft: `MEDIA → Pink Noise`
   - Volume: normaal spraakvolume (~75dB SPL)

2. **Positioneer meetmic:**
   - Hoogte: oorhoogte van zittend publiek (~1.2m)
   - Positie: midden van zaal (primaire luisterplek)
   - Richting: naar speakers (of omni mic = maakt niet uit)

3. **Neem meting:**
   - In REW: `Measure → Start`
   - Wacht tot stabiel (5-10 sec)
   - Sla op als referentie

4. **Analyseer frequentie respons:**

   | Wat je ziet | Wat het betekent | Actie |
   |-------------|------------------|-------|
   | Piek bij 100Hz | Kamer resonantie (bas buildup) | Cut -3dB @ 100Hz |
   | Dip bij 250Hz | Fase cancellatie | Speaker positie aanpassen |
   | Piek bij 2kHz | Reflectie van harde muur | Cut -2dB @ 2kHz |
   | Afval boven 8kHz | Normaal (lucht absorptie) | Licht boost +1dB |

5. **Pas Master EQ aan:**
   - Doel: zo vlak mogelijke lijn
   - Prioriteit: 200Hz - 4kHz (spraakgebied)
   - Accepteer: lichte afval onder 80Hz en boven 12kHz

##### Voorbeeld Meting Kerkzaal

```
Typische problemen grote kerk:

     +6dB |
     +3dB |    /\
      0dB |---/  \----____/\____--------
     -3dB |              \/
     -6dB |
          50   100  250  500  1k  2k  4k  8k  Hz
              ↑         ↑
           Bas piek   Dip (echo)
```

**Correctie EQ:**
- 80Hz: -3dB (Q=1.0)
- 500Hz: +2dB (Q=1.5)
- Resultaat: vlakkere respons, betere spraakverstaanbaarheid

##### Tips

- Meet op meerdere posities (links, rechts, achter) en middel
- Meet ZONDER publiek én MET publiek (mensen absorberen hoog)
- Sla metingen op voor vergelijking later
- Kleine aanpassingen (±3dB) zijn meestal genoeg

---

### Akoestische Panelen Plaatsen met REW

Met een meetmic kun je de ideale positie voor akoestische panelen vinden.

#### Wat REW toont

**ETC (Energy Time Curve)** laat reflecties zien:

```
Direct geluid     Eerste reflectie    Late reflecties (reverb)
     |                  |                  |||||||
     ▼                  ▼                  ▼▼▼▼▼▼▼
─────█─────────────────█──────────────────██████████────
     0ms              20-40ms            80ms+

     ↑                  ↑
   Goed!           Dit dempen met panelen
```

#### Reflectie → Muur afstand berekenen

```
Reflectie timing (ms) × 0.343 (m/ms) ÷ 2 = afstand tot muur

Voorbeeld: 25ms × 0.343 ÷ 2 = 4.3 meter
```

#### Prioriteit plaatsing (beperkt aantal panelen)

| Prioriteit | Locatie | Effect |
|------------|---------|--------|
| 1 | Achter spreekplek/podium | Minder reflectie in mics, minder feedback |
| 2 | Eerste reflectiepunt zijmuren | Grootste impact op helderheid |
| 3 | Achterwand | Slapback echo dempen |
| 4 | Plafond boven podium | Als bereikbaar |

#### Eerste reflectiepunt vinden (zonder meten)

Simpele methode met spiegel:
1. Zit op luisterpositie
2. Laat iemand spiegel langs zijmuur schuiven
3. Waar je de speaker ZIET in de spiegel = eerste reflectiepunt
4. Daar paneel plaatsen

#### Meetprocedure voor paneel plaatsing

1. **Baseline meting** - Meet zonder panelen, sla op
2. **Analyseer ETC** - Vind sterkste reflectie, bereken welke muur
3. **Plaats paneel** - Op berekende locatie
4. **Meet opnieuw** - Vergelijk met baseline
5. **Check verbetering** - Is die reflectie gedaald?
6. **Herhaal** - Voor elk volgend paneel

#### Realistische verwachtingen (4 panelen)

| Aspect | Verbetering |
|--------|-------------|
| RT60 (reverb tijd) | ❌ Minimaal (te weinig m²) |
| Eerste reflecties | ✅ Meetbaar verschil |
| Spraakverstaanbaarheid | ✅ Hoorbaar beter |
| Bas problemen | ❌ Niet (veel meer m² nodig) |

**Vuistregel:** 4 panelen slim geplaatst > 8 panelen willekeurig.

---

### Monitor Mixing

#### Gouden Regel
Monitors zijn NIET dezelfde mix als FOH. Zangers hebben andere behoeften.

#### Wat zangers willen in monitors

| Element | In monitor? | Niveau |
|---------|-------------|--------|
| Eigen stem | ✅ Ja | Luid |
| Andere zangers | ✅ Ja | Medium |
| Keyboard | ✅ Ja | Medium |
| Drums/click | ✅ Ja | Medium |
| Bas | 🔸 Optioneel | Zacht (voelen, niet horen) |
| Volledige mix | ❌ Nee | Dat is FOH |

#### AUX Setup op UI24

```
AUX 1: Zaal speakers (spraak/preek)
AUX 3: Floor monitors + in-ears (zang + keys + drums)
AUX 5: Livestream (aparte mix)
```

#### Monitor EQ (anders dan FOH)

| Aanpassing | Waarom |
|------------|--------|
| HPF 150Hz | Minder brom, minder feedback |
| +2dB @ 2-4kHz | Stemhelderheid |
| Notch filters | Op feedback frequenties |

#### In-Ear vs Floor Wedge

| Aspect | Floor Wedge | In-Ear |
|--------|-------------|--------|
| Feedback risico | Hoog | Laag |
| Volume controle | Beperkt | Per persoon |
| Geluidskwaliteit | Afhankelijk van zaal | Consistent |
| Gehoorschade | Minder controle | Meer controle |
| Ruimtegevoel | Natuurlijk | Kunstmatig |

**Tip:** Combineer: 1 oor in-ear, 1 oor open voor ruimtegevoel.

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
