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
