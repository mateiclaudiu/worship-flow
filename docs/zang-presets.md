# Zang Presets & Vocal Engineering

Specifieke EQ en processing presets per zanger, plus educatieve achtergrond.

**Let op:** Deze presets zijn geoptimaliseerd voor een **grote, hoge kerkzaal met veel galm/echo**.

---

## Galmende Zaal: Algemene Principes

Onze kerk heeft veel natuurlijke reverb. Dit beïnvloedt hoe we EQ toepassen:

### Waarom galm de mix beïnvloedt

```
Droge ruimte:          Galmende kerk:

Direct geluid ──►      Direct geluid ──►
                       Vroege reflecties ──► (10-50ms)
                       Late reverb ──► (50-500ms+)

Resultaat: helder      Resultaat: modderig, onduidelijk
```

### EQ Aanpassingen voor Galm

| Frequentie | Probleem in galm | Oplossing |
|------------|------------------|-----------|
| **<150Hz** | Bouwt op, dreunt | HPF **hoger** zetten (100-120Hz) |
| **200-500Hz** | Galm accumuleert, "mud" | **Meer cutten** (-3 tot -4dB) |
| **2-4kHz** | Moet door galm snijden | **Meer boosten** (+3dB) |
| **>10kHz** | Ruimte absorbeert al | LPF vaak niet nodig |

### De "Galm Regel"

> In een galmende ruimte: **cut meer, boost meer, extremer werken**.
> De ruimte "verzacht" alles - je EQ moet compenseren.

---

## Basis: Frequentie Anatomie van de Stem

Elke stem bestaat uit lagen:

```
Grondtoon (80-400Hz)      →  De noot die je zingt
Harmonischen (400-4kHz)   →  Het "karakter" en herkenbaarheid
Lucht/adem (4kHz+)        →  Helderheid en presence
Sibilanten (5-8kHz)       →  S, T, F klanken
```

### Belangrijke les

> Om een stem beter hoorbaar te maken, boost je NIET de grondtoon (dat maakt het modderig). Je boost de harmonischen (2-4kHz) - daar zit de herkenbaarheid.

### Stem types en frequenties

| Stem type | Grondtoon bereik | Harmonischen focus |
|-----------|------------------|-------------------|
| Bas (man) | 80-250Hz | 1-2kHz |
| Bariton (man) | 100-300Hz | 1.5-2.5kHz |
| Tenor (man) | 130-400Hz | 2-3kHz |
| Alt (vrouw) | 175-450Hz | 2-3.5kHz |
| Mezzo (vrouw) | 200-500Hz | 2.5-4kHz |
| Sopraan (vrouw) | 250-600Hz | 3-5kHz |

---

## Claudia (Leadzang)

Warme, diepe vrouwenstem (mezzo/alt). Zingt typisch in Am, Bbm, Bb, Cm.

### Stem karakteristieken

| Eigenschap | Waarde |
|------------|--------|
| Type | Vrouw, mezzo-sopraan/alt |
| Karakter | Warm, vol, diep maar niet te |
| Toonsoorten | Am, Bbm, Bb, Cm |
| Grondtoon bereik | ~200-450Hz |
| Referentie | Vergelijkbaar met [Paula Hriscu](https://open.spotify.com/artist/1ZswKwEayUiVnSwkrfh9Yg) |

**Over de stemtype:** Claudia's stem heeft van nature de juiste balans tussen warmte en helderheid - vergelijkbaar met Paula Hriscu (Roemeense folk). Geen extra high-frequency boost nodig; de highs zijn al aanwezig.

### Audio Analyse (gemeten)

*Gebaseerd op analyse van `samples/0019/11 VOX DARK BLUE.wav`*

| Frequentie Band | Energie (dB) | Interpretatie |
|-----------------|--------------|---------------|
| LOW (<150Hz) | -40.3 dB | Schoon - weinig rommel |
| **BODY (150-350Hz)** | **-29.9 dB** | **DOMINANT - haar kracht** |
| **MID (350-650Hz)** | **-29.9 dB** | **Sterk - volle stem** |
| NASAAL (1-1.4kHz) | -40.5 dB | Laag - NIET nasaal! |
| PRESENCE (2-4kHz) | -43.8 dB | Relatief zwak - boost nodig |
| SIBILANCE (4.5-6.5kHz) | -51.9 dB | Zeer laag - geen S-probleem |
| AIR (>6kHz) | -51.2 dB | Weinig - "dark voice" |

**Dynamiek:**
- Integrated Loudness: -24.6 LUFS
- Loudness Range: 12.7 LU (behoorlijk dynamisch)
- True Peak: -9.6 dBFS

### EQ Settings (verfijnd op basis van meting + galmende zaal)

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | **100Hz** | - | steep | ~~80Hz~~ → 100Hz voor galmende zaal (minder bas buildup) |
| 1 | 250Hz | **-2.5dB** | 1.5 | ~~-1.5dB~~ → -2.5dB (galm accumuleert hier) |
| 2 | 500Hz | **-2dB** | 2.0 | ~~-1dB~~ → -2dB (meer ruimte maken) |
| 3 | 2.5kHz | **+3dB** | 2.0 | ~~+2.5dB~~ → +3dB (moet door galm snijden!) |
| 4 | 5kHz | **+1.5dB** | 1.5 | ~~+1dB~~ → +1.5dB (articulatie in galm) |

**Analyse conclusie:** Haar stem heeft uitstekende warmte (250-500Hz dominant) maar mist relatief veel presence (2-4kHz). In galmende zaal is de presence boost van +3dB essentieel om door de natuurlijke reverb te snijden. De extra low-mid cuts compenseren voor galm-accumulatie.

### Visuele EQ curve (galmende zaal)

```
     +3dB |                    __
     +2dB |                   /  \    /
     +1dB |                  /    \  /
      0dB |___              /      \/
     -1dB |   \            /
     -2dB |    \___    ___/
     -3dB |        \__/
          100 250  500  800  2.5k  5k  10k  Hz
              ↑    ↑         ↑     ↑
            body  mid    presence articulatie
          -2.5dB -2dB     +3dB  +1.5dB
           (galm) (galm)  (snijden)
```

### Waarom deze keuzes (onderbouwd met meting)

| Keuze | Reden (gemeten) |
|-------|-----------------|
| HPF op 80Hz | LOW zone meet -40dB = al schoon, behoudt haar body |
| -1.5dB @ 250Hz | BODY zone meet -29.9dB = dominant, lichte cut maakt ruimte |
| -1dB @ 500Hz | MID zone ook -29.9dB = iets te veel body, balanceer |
| **+2.5dB @ 2.5kHz** | **PRESENCE meet -43.8dB = 14dB lager dan body! Moet omhoog** |
| +1dB @ 5kHz | Helpt articulatie, sibilance (-51.9dB) is geen risico |
| GEEN nasaal cut | Meet -40.5dB @ 1-1.4kHz = al weinig nasaal, cut onnodig |

### Toonsoort-specifieke notities

| Toonsoort | Laagste noot | Grondtoon freq | Aandachtspunt |
|-----------|--------------|----------------|---------------|
| Am | A3 | 220Hz | Warmte zit hier - niet te veel cutten |
| Bbm | Bb3 | 233Hz | Idem |
| Bb | Bb3 | 233Hz | Majeur = vaak wat helderder arrangement |
| Cm | C4 | 262Hz | Iets hoger - kan wat meer 200Hz cut verdragen |

### Compressie

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | -18dB | Iets lager - vang ook zachtere passages |
| Ratio | 3:1 | Zacht genoeg voor natuurlijke dynamiek |
| Attack | 15ms | Laat de "attack" van woorden door |
| Release | 100ms | Natuurlijk verval |
| Makeup | +2dB | Compenseer |

### Troubleshooting (galmende zaal)

| Situatie | Aanpassing |
|----------|------------|
| Stem klinkt dun/koud | 250Hz cut verminderen naar -1.5dB (galm voegt warmte toe) |
| Stem klinkt modderig | 250Hz cut verhogen naar **-3.5dB** + HPF naar **120Hz** |
| Moeilijk verstaanbaar | 2.5kHz boost verhogen naar **+3.5dB** |
| Te scherpe S-klanken | De-esser - onwaarschijnlijk (meet -51.9dB) |
| Stem "verdwijnt" in keyboard | 3kHz boost naar **+3.5dB** + keyboard 3kHz cut |
| Klinkt te "dark"/dof | 8kHz +1.5dB (galm absorbeert highs) |
| **Galm maskeert stem** | 400Hz cut **-3dB** toevoegen, presence naar **+3.5dB** |

---

## Ina (Backup Vocal)

Keelstem, dun in de highs, weinig warmte. Geen getrainde zangeres.

### Stem karakteristieken

| Eigenschap | Waarde |
|------------|--------|
| Type | Vrouw, backup |
| Karakter | Dun, keelklank, gespannen highs |
| Probleem | Zingt vanuit keel, niet vanuit buik |
| Rol | Backup voor Claudia |

### Audio Analyse (gemeten)

*Gebaseerd op analyse van `samples/0019/12 VOX RED.wav`*

| Frequentie Band | Ina (dB) | vs Claudia | Interpretatie |
|-----------------|----------|------------|---------------|
| LOW (<150Hz) | -44.4 dB | -4 dB | Schoon |
| **WARMTE (150-350Hz)** | **-34.6 dB** | **-5 dB** | **BEVESTIGD: weinig warmte** |
| **MID (350-650Hz)** | **-35.4 dB** | **-5.5 dB** | **BEVESTIGD: weinig body** |
| NASAAL (1-1.4kHz) | -42.9 dB | -2 dB | Licht meer nasaal |
| PRESENCE (2-4kHz) | -44.9 dB | -1 dB | Vergelijkbaar zwak |
| SIBILANCE (4.5-6.5kHz) | -50.6 dB | +1 dB | Iets meer S-klanken |
| HIGH (>6kHz) | -51.3 dB | gelijk | Vergelijkbaar |

**Dynamiek:**
- Integrated Loudness: -30.0 LUFS (5.4 dB zachter dan Claudia)
- Loudness Range: 9.4 LU (minder dynamisch)

**Analyse conclusie:** Metingen bevestigen de beschrijving - haar warmte/body zones zijn ~5dB zwakker dan Claudia. De warmte boost is essentieel.

### Aanpak

**Doel:** Blenden met lead, zwaktes verbergen - NIET als lead laten klinken.

| Probleem | Frequentie | Meting bevestigt | Oplossing |
|----------|------------|------------------|-----------|
| Dun/schraal | 200-300Hz | -5dB vs Claudia | Boost +2.5dB |
| Keelklank/spanning | 1-2kHz | -2.4dB vs Claudia | Lichte cut -2dB |
| Scherpe highs | 4-6kHz | +1.3dB vs Claudia | Cut -2dB |

### EQ Settings (verfijnd op basis van meting + galmende zaal)

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | **120Hz** | - | steep | ~~100Hz~~ → 120Hz (galmende zaal, backup hoeft geen diepe lows) |
| 1 | 250Hz | **+1.5dB** | 1.5 | ~~+2.5dB~~ → +1.5dB (minder boost in galm - galm voegt warmte toe) |
| 2 | 1.5kHz | **-2dB** | 2.0 | Keelklank dempen |
| 3 | 3kHz | **+1dB** | 2.0 | ~~0dB~~ → +1dB (backup moet ook door galm, lichte boost) |
| 4 | 5kHz | **-2dB** | 1.5 | Scherpte dempen |

**Galm notitie:** In galmende zaal hoeft backup minder warmte-boost - de ruimte voegt al "body" toe. Wel lichte presence boost zodat ze niet volledig verdwijnt.

### Visuele EQ curve (galmende zaal)

```
     +3dB |
     +2dB |  /\
     +1dB | /  \                  /\
      0dB |/    \________________/  \
     -1dB |                          \    __
     -2dB |                           \__/  \
     -3dB |
          120 250  800  1.5k 3k  5k  8k  Hz
               ↑        ↑   ↑   ↑
            warmte   nasal pres scherp
            +1.5dB   -2dB +1dB -2dB
```

### Compressie (strakker dan lead)

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | -22dB | Lager - vang meer inconsistenties |
| Ratio | **4:1** | Strakker - meer controle |
| Attack | 10ms | Snel |
| Release | 80ms | Sneller - houdt volume consistent |
| Makeup | +3dB | Compenseer |

### Mix niveau

**-4 tot -6dB** onder Claudia. Ondersteunt, concurreert niet.

### Troubleshooting (galmende zaal)

| Situatie | Aanpassing |
|----------|------------|
| Klinkt nog steeds dun | 250Hz boost naar **+2dB** (galm voegt al wat toe) |
| Keelklank nog hoorbaar | 1.5kHz cut verhogen naar -3dB |
| Te scherp/irritant | 5kHz cut verhogen naar -3dB |
| Extreme highs nog aanwezig | LPF @ 12kHz (maar galm absorbeert al highs) |
| Verdwijnt in mix | 3kHz boost naar **+2dB** (presence door galm) |
| Oneven volume | Threshold naar -24dB, ratio naar **5:1** |
| Blend niet met Claudia | Match HPF (beide **120Hz**) |
| **Galm maakt haar onhoorbaar** | 3kHz boost naar **+2dB**, NIET meer warmte |

---

## Lidia (Backup Vocal)

Keelstem met ongecontroleerde lows. Geen projectie, "komt van ver".

### Stem karakteristieken

| Eigenschap | Waarde |
|------------|--------|
| Type | Vrouw, backup |
| Karakter | Keelklank, sterke maar slechte lows, geen focus |
| Probleem | Ongecontroleerde borstresonantie, geen projectie |
| Rol | Backup voor Claudia |

### Aanpak

**Doel:** Slechte lows verwijderen, focus toevoegen, blenden met mix.

| Probleem | Frequentie | Oplossing |
|----------|------------|-----------|
| Ongecontroleerde lows | 100-200Hz | Cut + hogere HPF |
| Keelklank | 1-2kHz | Cut |
| "Komt van ver" / geen focus | 3-4kHz | Kleine boost (projectie helpen) |

### EQ Settings (galmende zaal)

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | **180Hz** | - | steep | ~~150Hz~~ → 180Hz (galm + slechte lows = erger) |
| 1 | 200Hz | **-4dB** | 1.5 | ~~-3dB~~ → -4dB (boominess + galm = veel erger) |
| 2 | 1.5kHz | **-3dB** | 2.0 | Nasaal/keelklank dempen |
| 3 | 3.5kHz | **+1.5dB** | 2.0 | ~~+1dB~~ → +1.5dB (projectie door galm) |
| 4 | 6kHz | **-2dB** | 1.5 | Scherpte dempen |

**Galm notitie:** Lidia's "ongecontroleerde lows" worden veel erger in galmende zaal. Agressievere HPF en low cut nodig. De galm "vult" haar body zone al, dus geen boost nodig daar.

### Visuele EQ curve (galmende zaal)

```
     +3dB |
     +2dB |
     +1dB |                  /\
      0dB |______           /  \
     -1dB |      \         /    \
     -2dB |       \       /      \____
     -3dB |        \_____/
     -4dB |
          180 200  800  1.5k 3.5k 6k  8k  Hz
          ↑    ↑        ↑    ↑    ↑
         HPF  boom   nasaal focus scherp
         hoog -4dB    -3dB +1.5dB -2dB
              (galm maakt haar lows erger)
```

### Compressie (strakst)

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | -24dB | Nog lager - alles vangen |
| Ratio | **5:1** | Strak - veel controle nodig |
| Attack | 8ms | Zeer snel |
| Release | 60ms | Snel |
| Makeup | +4dB | Compenseer |

### Mix niveau

**-4 tot -6dB** onder Claudia. Ondersteunt, concurreert niet.

### Troubleshooting (galmende zaal)

| Situatie | Aanpassing |
|----------|------------|
| Lows nog steeds hoorbaar/slecht | HPF verhogen naar **200Hz** (galm versterkt lows!) |
| Klinkt boomend | 200Hz cut verhogen naar **-5dB** |
| Geen projectie/focus | 3.5kHz boost verhogen naar **+2.5dB** |
| Keelklank nog hoorbaar | 1.5kHz cut verhogen naar -4dB |
| Extreme highs/ruis | LPF @ 12kHz (galm absorbeert al highs) |
| Klinkt nog steeds "van ver" | Presence boost naar **+2.5dB** + meer monitor |
| Zeer oneven volume | Ratio verhogen naar **6:1** |
| **Galm maakt lows oncontroleerbaar** | HPF naar **200Hz**, 200Hz cut naar **-5dB** |

---

## Carmen (Hoge Harmony / 2de Stem)

Hoge sopraan, zingt harmony boven lead. Schraal, diffuus, soms irritante highs.

### Stem karakteristieken

| Eigenschap | Waarde |
|------------|--------|
| Type | Vrouw, sopraan |
| Karakter | Schraal, diffuus, geen body |
| Probleem | Irritante highs, soms te krachtig, vals met muziek |
| Rol | Hoge 2de stem / harmony |

### Audio Analyse (gemeten)

*Gebaseerd op analyse van `samples/0019/14 VOX LIGHT BLUE.wav`*

| Frequentie Band | Carmen | vs Claudia | vs Ina | Interpretatie |
|-----------------|--------|------------|--------|---------------|
| LOW (<150Hz) | -44.5 dB | -4 dB | gelijk | Schoon |
| WARMTE (150-350Hz) | -33.4 dB | -3.5 dB | +1 dB | Minder warmte dan lead |
| MID (350-650Hz) | -33.0 dB | -3 dB | +2 dB | Minder body |
| **DIFFUUS (600-800Hz)** | **-34.1 dB** | - | - | **Actief - hier zit diffuus** |
| **NASAL (1-1.4kHz)** | **-37.8 dB** | **+2.7 dB** | **+5 dB** | **MEEST nasaal van allen!** |
| **PRESENCE (2-4kHz)** | **-40.8 dB** | **+3 dB** | **+4 dB** | **MEEST presence - irritant!** |
| HIGH (>6kHz) | -49.4 dB | +1.8 dB | +1.9 dB | Meeste highs |

**Dynamiek:**
- Integrated Loudness: -26.3 LUFS
- Loudness Range: 9.7 LU (minder dynamisch)
- **True Peak: -8.2 dBFS** (HOOGSTE pieken - bevestigt "te krachtig")

**Analyse conclusie:** Het "irritante" karakter komt NIET alleen van 5kHz, maar ook van de presence zone (2-4kHz) die 3dB hoger is dan Claudia. De nasaal zone is ook onverwacht hoog - dit veroorzaakt het "diffuse" geluid.

### Arrangement regel (BELANGRIJK)

| Carmen moet zingen | Carmen moet NIET zingen |
|-------------------|------------------------|
| Hoge harmony (boven lead) | Laagste noot van akkoord |
| 2de stem boven Claudia | Basnoten / lage tertsen |
| Dezelfde noot als lead (versterking) | Tegenstem onder lead |

**Waarom:** Haar hoge dunne stem is niet gemaakt voor lage noten. Klinkt scheef en onnatuurlijk.

**Regel:** Carmen altijd **boven of gelijk** aan lead, nooit eronder.

### Aanpak (verfijnd op basis van meting)

| Probleem | Frequentie | Meting | Oplossing |
|----------|------------|--------|-----------|
| Schraal/geen body | 300-400Hz | -3dB vs Claudia | Boost +2dB |
| **Diffuus/nasaal** | **1-1.4kHz** | **+2.7dB vs Claudia** | **Cut -2dB (NIEUW!)** |
| **Irritante presence** | **2-4kHz** | **+3dB vs Claudia** | **Cut -1.5dB (NIEUW!)** |
| Irritante highs | 5kHz | +1dB vs Claudia | Cut -2dB |
| Te krachtig | pieken | -8.2dBFS peaks | Strakke compressie |

### EQ Settings (verfijnd op basis van meting + galmende zaal)

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | **140Hz** | - | steep | ~~120Hz~~ → 140Hz (galmende zaal, sopraan hoeft geen lows) |
| 1 | 350Hz | **+1dB** | 1.5 | ~~+2dB~~ → +1dB (galm voegt body toe) |
| 2 | 1.2kHz | **-2.5dB** | 2.0 | ~~-2dB~~ → -2.5dB (nasaal resoneert in galm) |
| 3 | 3kHz | **-2dB** | 2.0 | ~~-1.5dB~~ → -2dB (haar presence teveel + galm) |
| 4 | 5kHz | **-2.5dB** | 1.5 | ~~-2dB~~ → -2.5dB (highs + galm = schril) |

**Galm notitie:** Carmen's probleem-frequenties (nasaal, te veel presence, irritante highs) worden ERGER in galm. Agressievere cuts nodig. Haar geluid "stapelt" door de reflecties. De diffuus zone (700Hz) wordt niet apart geadresseerd - de galm maskeert dit deels.

### Visuele EQ curve (galmende zaal)

```
     +3dB |
     +2dB |
     +1dB |    /\
      0dB |___/  \__________
     -1dB |                 \__
     -2dB |                    \____
     -3dB |                         \____
          140 350  800 1.2k 3k   5k   10k  Hz
               ↑        ↑   ↑    ↑
             body    nasal pres irritant
             +1dB   -2.5dB -2dB -2.5dB
              (galm compenseert haar tekort aan body)
```

### Compressie (STRAK - gemeten pieken tot -8.2dBFS!)

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | **-18dB** | Lager - vang vroeg (pieken tot -8.2dBFS!) |
| Ratio | **5:1** | Strakker dan anderen - ze piekt hard |
| Attack | **5ms** | Zeer snel - vang pieken direct |
| Release | 80ms | Snel herstel |
| Makeup | +2dB | Compenseer |

**Gemeten:** Haar pieken zijn de hoogste van alle zangers (-8.2 dBFS). Strakke compressie is essentieel.

### Monitor tip

**Vals zingen met muziek** = ze hoort zichzelf niet.

Oplossing: Meer van haarzelf in haar monitor/in-ear. Ze overcompenseert (te krachtig, vals) omdat ze haar eigen stem niet hoort boven de muziek.

### Mix niveau

**-4 tot -5dB** onder Claudia. Harmony ondersteunt, domineert niet.

### Troubleshooting (galmende zaal)

| Situatie | Aanpassing |
|----------|------------|
| Klinkt nog steeds schraal | 350Hz boost naar **+1.5dB** (galm voegt body toe) |
| Nog steeds diffuus | 700Hz cut naar **-2.5dB** + 1.2kHz naar **-3dB** |
| **Irritant in presence zone** | 3kHz cut naar **-2.5dB** (galm versterkt irritatie) |
| Irritante highs nog aanwezig | 5kHz cut naar **-3dB** |
| Extreme highs blijven irritant | LPF @ **10kHz** (agressiever in galm) |
| Te krachtig / overstemt lead | Threshold naar -20dB, ratio naar **6:1** |
| Zingt vals met muziek | MEER van haarzelf in monitor! |
| Zingt lage noten (klinkt scheef) | Arrangement aanpassen - zij alleen BOVEN lead |
| Blend niet met anderen | 3kHz cut naar **-2.5dB** |
| **Galm versterkt haar irritante frequenties** | Alle cuts **+0.5dB** agressiever |

---

## Naomi (Lead / Harmony - Top Zangeres)

18 jaar, natuurlijk talent met alles aanwezig: body, vibrato, volume.

### Stem karakteristieken

| Eigenschap | Waarde |
|------------|--------|
| Type | Vrouw, mezzo-sopraan |
| Karakter | Vol, warm, goed vibrato, natuurlijke kracht |
| Niveau | Top zangeres - alles aanwezig |
| Rol | Lead of harmony |

### Audio Analyse (gemeten)

*Gebaseerd op analyse van `samples/15 VOX GREEN.wav`*

| Frequentie Band | Energie (dB) | Interpretatie |
|-----------------|--------------|---------------|
| SUB (<80Hz) | -50.9 dB | ✓ Schoon |
| LOW (80-150Hz) | -41.5 dB | ✓ OK |
| BODY (150-300Hz) | -34.0 dB | ✓ Warmte aanwezig |
| LOW-MID (300-500Hz) | -31.9 dB | ⚠️ Verhoogd (boxy) |
| MID (500-1kHz) | **-30.3 dB** | ⚠️ DOMINANT (nasaal range) |
| UPPER-MID (1-2kHz) | -34.6 dB | Neutraal |
| PRESENCE (2-4kHz) | **-39.7 dB** | ⚠️ ZWAK (10dB onder mid!) |
| BRILLIANCE (4-6kHz) | -44.0 dB | Weinig lucht |
| SIBILANCE (6-8kHz) | -47.7 dB | ✓ Geen S-probleem |
| AIR (8-12kHz) | -50.2 dB | Weinig shimmer |

**Analyse conclusie:** Haar stem klinkt live uitstekend, maar de Sennheiser XSW 1-835 (dynamische mic) verliest haar presence/brilliance. De mic karakteristiek, niet haar stem, veroorzaakt het "doffe" geluid. EQ moet compenseren voor mic verlies.

### EQ Settings (compensatie voor mic + galmende zaal)

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | **100Hz** | - | steep | Standaard voor vrouwenstem |
| 1 | 400Hz | **-3dB** | 1.5 | Boxy/mud weg |
| 2 | 800Hz | **-2dB** | 2.0 | Nasaal range dempen |
| 3 | 2.5kHz | **+4dB** | 2.0 | Presence terughalen (mic verliest dit!) |
| 4 | 5kHz | **+3dB** | 1.5 | Brilliance/lucht toevoegen |

**Of simpeler:** High shelf +4dB vanaf 2kHz

### Visuele EQ curve

```
     +4dB |                    ___/
     +3dB |                   /
     +2dB |                  /
     +1dB |                 /
      0dB |___             /
     -1dB |   \           /
     -2dB |    \____     /
     -3dB |         \___/
          100 400  800  2k  2.5k  5k  8k  Hz
               ↑    ↑         ↑    ↑
             boxy nasal    presence lucht
             -3dB -2dB      +4dB  +3dB
```

### Compressie (licht - zij is goed)

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | -16dB | Hoger - laat haar dynamiek door |
| Ratio | **2.5:1** | Zacht - natuurlijk |
| Attack | 15ms | Snel genoeg voor worship |
| Release | 100ms | Natuurlijk |
| Makeup | +1dB | Minimaal |

**Waarom lichte compressie:** Top zangeres met goede controle. Niet "platdrukken" - laat haar expressie door.

### Mix niveau

| Situatie | Fader |
|----------|-------|
| Naomi zingt lead | **0dB** (gelijk aan Claudia) |
| Naomi zingt harmony | **-3dB** |

Ze is goed genoeg om op lead niveau te zitten.

### Troubleshooting

| Situatie | Aanpassing |
|----------|------------|
| Klinkt nog steeds dof | 2.5kHz boost naar **+5dB**, 5kHz naar **+4dB** |
| Klinkt boxy/nasaal | 400Hz cut naar **-4dB**, 800Hz naar **-3dB** |
| Te scherp na boost | 2.5kHz Q verbreden naar 1.5 |
| Verdwijnt in mix | Presence naar +5dB |
| **Mic verliest haar kwaliteit** | High shelf +4dB @ 2kHz (compenseert mic) |

---

## David (Lead / Harmony - Beste Zanger)

Warme bariton-tenor met veel lows. Beste zanger, zingt niet continu. Doel: Italiaanse romantische stijl ("Ti Amo").

### Stem karakteristieken

| Eigenschap | Waarde |
|------------|--------|
| Type | Man, bariton-tenor (kan hoge noten) |
| Karakter | Warm, veel body, soms te veel lows |
| Probleem | Klinkt "retro"/ouderwets door teveel body |
| Niveau | Beste zanger van de groep |
| Rol | Lead of harmony (niet continu) |

### Doel: Italiaanse romantische stem

**"Ti Amo" stijl** = warm maar helder, emotioneel, gepolijst, niet modderig.

| Huidige stem | Doel |
|--------------|------|
| Te veel lows/body | Warm maar gecontroleerd |
| Klinkt "retro"/bas | Modern, romantisch |
| Veel potentieel | Italiaanse ballade kwaliteit |

### Aanpak

Het probleem is te veel body zonder helderheid = klinkt ouderwets.
Italiaanse zangers hebben warmte + presence + lucht = modern romantisch.

| Probleem | Frequentie | Oplossing |
|----------|------------|-----------|
| Te veel bas/body | 100-200Hz | Cut (body controleren) |
| "Retro" klank | 300-500Hz | Cut (oude radio freq weg) |
| Mist moderniteit | 3-4kHz | Boost (presence/helderheid) |
| Mist "lucht" | 8-10kHz | Boost (adem/romantiek) |

### EQ Settings (galmende zaal)

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | **100Hz** | - | steep | ~~80Hz~~ → 100Hz (galmende zaal, lows bouwen op) |
| 1 | 150Hz | **-4dB** | 1.5 | ~~-3dB~~ → -4dB (bas + galm = boomend) |
| 2 | 400Hz | **-3dB** | 2.0 | ~~-2dB~~ → -3dB (retro freq + galm = erger) |
| 3 | 3kHz | **+3dB** | 2.0 | ~~+2dB~~ → +3dB (moet door galm snijden!) |
| 4 | 8kHz | **+2dB** | 1.5 | ~~+1.5dB~~ → +2dB (lucht voor Italiaans effect) |

**Galm notitie:** David's "retro" probleem (te veel lows/body) wordt ERGER in galmende zaal. Agressievere cuts nodig in lows. Maar het "Ti Amo" effect werkt nog steeds - de presence en lucht boost helpen door de galm snijden. De 800Hz zone wordt niet apart geadresseerd - de galm compenseert dit.

### Visuele EQ curve (galmende zaal)

```
     +3dB |                     /\
     +2dB |                    /  \    /\
     +1dB |                   /    \  /  \
      0dB |                  /      \/
     -1dB |                 /
     -2dB |                /
     -3dB |    ___________/
     -4dB |___/
          100 150 400  800  2k   3k   8k   Hz
              ↑   ↑              ↑    ↑
            bas retro        presence lucht
            -4dB -3dB          +3dB  +2dB
            (galm maakt zijn lows/retro erger)
```

### Compressie (licht - hij is goed)

| Parameter | Waarde | Waarom |
|-----------|--------|--------|
| Threshold | -16dB | Hoger - laat dynamiek door |
| Ratio | **2.5:1** | Zacht - natuurlijk |
| Attack | 20ms | Langzaam - emotie behouden |
| Release | 120ms | Langzaam - smooth |
| Makeup | +1dB | Minimaal |

**Waarom lichte compressie:** Hij is de beste zanger. Laat zijn dynamiek en emotie door. Niet "platdrukken" zoals bij minder ervaren zangers.

### Het "Ti Amo" effect

| Element | Hoe |
|---------|-----|
| Warmte | Behouden door niet te agressief te cutten |
| Helderheid | +3dB @ 3kHz |
| Romantische "lucht" | +2dB @ 8kHz |
| Geen modder | Cut @ 150Hz en 400Hz |

### Mix niveau

| Situatie | Fader |
|----------|-------|
| David zingt lead | **0dB** (gelijk aan Claudia) |
| David zingt harmony | **-3dB** (iets onder lead) |

Hij is goed genoeg om op gelijke hoogte met Claudia te zitten wanneer hij lead zingt.

### Troubleshooting (galmende zaal)

| Situatie | Aanpassing |
|----------|------------|
| Klinkt nog steeds "retro"/oud | 400Hz cut naar **-4dB** (galm versterkt retro) |
| Te veel bas/body | 150Hz cut naar **-5dB** + HPF naar **120Hz** |
| Mist helderheid | 3kHz boost naar **+3.5dB** (door galm snijden) |
| Mist "lucht"/romantiek | 8kHz boost naar **+2.5dB** |
| Klinkt te dun (teveel gecut) | 150Hz cut naar -3dB (galm voegt body toe) |
| Overstemt Claudia als lead | Fader -2dB of presence naar +2.5dB |
| **Galm maakt retro-klank erger** | 400Hz cut naar **-4dB**, HPF naar **120Hz** |
| **Ti Amo effect verloren in galm** | 8kHz boost naar **+2.5dB**, 3kHz naar **+3.5dB** |

---

## Vocal Mix Overzicht

### Fader balans

| Stem | Rol | Fader | Compressie |
|------|-----|-------|------------|
| Claudia | Lead | **0dB** (referentie) | 3:1, natuurlijk |
| David | Lead/harmony | **0dB** of **-3dB** | 2.5:1, licht |
| Ina | Backup | **-5dB** | 4:1, strak |
| Lidia | Backup | **-5dB** | 5:1, zeer strak |
| Carmen | Hoge harmony | **-4dB** | 4:1, strak |

### Presence strategie

| Stem | Presence boost @ 2.5-3kHz | Reden |
|------|---------------------------|-------|
| Claudia | **+2dB** | Lead - snijdt door mix |
| David | **+2dB** | Lead kwaliteit - mag presence hebben |
| Ina | **0dB** | Zou spanning benadrukken |
| Lidia | **+1dB** | Helpt met projectie |
| Carmen | **0dB** | Zou irritante highs versterken |

**Waarom dit werkt:** Claudia en David hebben presence boost (lead niveau). Backups vullen aan zonder te concurreren.

### Harmony posities

| Zanger | Positie t.o.v. lead |
|--------|---------------------|
| David | **Lead of harmony** (flexibel - kan beide) |
| Carmen | **Boven** lead (hoge harmony) |
| Ina | **Onder of gelijk** aan lead |
| Lidia | **Onder of gelijk** aan lead |

**Regels:**
- Carmen nooit onder de lead - haar stem is daar niet voor gemaakt
- David kan lead overnemen of harmony zingen - beste zanger, meest flexibel

---

## Template: Nieuwe Zanger Toevoegen

Kopieer dit template voor nieuwe zangers:

```markdown
## [Naam] ([Rol])

[Korte beschrijving stem]

### Stem karakteristieken

| Eigenschap | Waarde |
|------------|--------|
| Type | [Man/Vrouw], [bas/bariton/tenor/alt/mezzo/sopraan] |
| Karakter | [warm/helder/scherp/vol/dun/etc] |
| Toonsoorten | [typische keys] |
| Grondtoon bereik | ~[X-Y]Hz |

### EQ Settings

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | Hz | - | steep | |
| 1 | Hz | dB | | |
| 2 | Hz | dB | | |
| 3 | kHz | dB | | |
| 4 | kHz | dB | | |

### Compressie

| Parameter | Waarde |
|-----------|--------|
| Threshold | dB |
| Ratio | :1 |
| Attack | ms |
| Release | ms |
| Makeup | dB |
```

---

## Algemene Zang EQ (Als Startpunt)

Gebruik dit als je geen specifieke preset hebt:

### Vrouw - Algemeen

| Band | Freq | Gain | Q |
|------|------|------|---|
| HPF | 100Hz | - | 18dB/oct |
| 1 | 250Hz | -3dB | 1.5 |
| 2 | 800Hz | 0dB | 1.0 |
| 3 | 3kHz | +2dB | 2.0 |
| 4 | 8kHz | +1dB | 1.0 |

### Man - Algemeen

| Band | Freq | Gain | Q |
|------|------|------|---|
| HPF | 80Hz | - | 18dB/oct |
| 1 | 200Hz | -2dB | 1.5 |
| 2 | 500Hz | -1dB | 1.5 |
| 3 | 2.5kHz | +2dB | 2.0 |
| 4 | 6kHz | +1dB | 1.0 |

---

## Effecten voor Zang (Galmende Kerk)

### Wat WEL werkt

| Effect | Wat het doet | Aanbevolen |
|--------|--------------|------------|
| Compressie | Consistenter volume | Ja, altijd |
| EQ | Stem door mix laten snijden | Ja, altijd |
| De-esser | Minder scherpe S-klanken | Ja, indien nodig |
| Saturation | Warmte toevoegen | Subtiel |
| Exciter | Helderheid toevoegen | Zeer subtiel |

### Wat NIET werkt

| Effect | Waarom niet |
|--------|-------------|
| Reverb | Zaal voegt al galm toe - dubbel = modder |
| Delay | Echo + zaal reverb = chaos |
| Chorus | Kan werken maar vaak te veel "beweging" |

---

## De-esser Settings

Voor scherpe S-klanken (vooral bij vrouwen):

| Parameter | Waarde |
|-----------|--------|
| Frequency | 5-8kHz |
| Threshold | -20dB |
| Reduction | Max -6dB |

**Tip:** S-klanken triggeren galm in de zaal. De-esser maakt dit zachter.

---

## Toonsoort & Transpose: Gemengde Groep

### Stembereik Overzicht

```
Octaven:        C2    C3    C4    C5    C6
                │     │     │     │     │
David (Tenor):  ──────[████████]──────────   (C3 - C5)
David (Bariton):────[████████]────────────   (A2 - A4)
                      │     │
Vrouwen (Alt):  ──────────[████████]──────   (F3 - F5)
Vrouwen (Sopraan):────────────[████████]──   (C4 - C6)
                              │
                         OVERLAP ZONE
                          (C4 - A4)
```

### Vuistregels Vrouwenstemmen

| Range | Frequentie | Gevoel |
|-------|------------|--------|
| Te laag | < B3 | "Drukken", geen power, "heuummm" |
| Sweet spot | D4 - D5 | Comfortabel, natuurlijke kracht |
| Te hoog | > E5 | Schreeuwen, gespannen |

### Probleem: Te Lage Toonsoort

**Symptomen:**
- Zangers moeten "drukken" op stem
- Klinkt laag, gedrukt ("heuummm")
- Spraak klinkt beter dan zang
- Geen power of projectie

**Oplossing:** Transpose OMHOOG

| Van | Naar | Semitones | Effect |
|-----|------|-----------|--------|
| Bb | B | +1 | Iets hoger |
| Bb | **C** | **+2** | **Vaak sweet spot voor vrouwen** |
| Bb | Db | +3 | Meer power, check of hoge noten OK |
| Bb | D | +4 | Veel power, kan te hoog worden |

**Op de Korg:**
```
MENU → TUNING → TRANSPOSE → +2 (of +3)
```

### Probleem: Te Hoge Toonsoort

**Symptomen:**
- Zangers schreeuwen / gespannen
- Stem klinkt dun, geen body
- Missen noten of "kraken"

**Oplossing:** Transpose OMLAAG

| Van | Naar | Semitones | Effect |
|-----|------|-----------|--------|
| E | Eb | -1 | Iets lager |
| E | D | -2 | Comfortabeler |
| E | C | -4 | Veel lager |

### Gemengde Groep: Man + Vrouwen

| Toonsoort | Vrouwen | David | Resultaat |
|-----------|---------|-------|-----------|
| Bb (laag) | Drukken, geen power | Comfortabel | ❌ Vrouwen lijden |
| **C (+2)** | **Comfortabel** | **Iets hoger, maar OK** | **✓ Compromis** |
| D (+4) | Lekker hoog, power | Moet pushen | ❌ David lijdt |

### David als Backing: Strategie

**Situatie:** David zingt backing, vrouwen zijn lead.

**Regel:** Optimaliseer toonsoort voor de LEAD (vrouwen), David past zich aan.

| David's Optie | Hoe | Wanneer |
|---------------|-----|---------|
| **Octaaf lager** | Zingt melodie in C3 ipv C4 | Meeste nummers |
| **Harmony eronder** | Terts of kwint onder melodie | Refreinen |
| **Rustig meedoen** | Minder volume, volgen | Verzen |

**Voordelen:**
- Vrouwen krijgen hun power-register (C, D, Eb)
- David's lage stem vult mix aan (body)
- Geen compromis nodig op toonsoort

**Monitor tip:** David moet lead (Claudia/Naomi) duidelijk horen om te volgen.

### Praktische Transpose Tabel

| Originele Key | Te laag voor vrouwen? | Transpose naar |
|---------------|----------------------|----------------|
| G | Ja | A (+2) of Bb (+3) |
| Ab | Ja | Bb (+2) of B (+3) |
| A | Soms | B (+2) |
| Bb | Vaak | **C (+2)** of Db (+3) |
| B | Soms | C (+1) of D (+3) |
| C | Meestal OK | - |
| D | Meestal OK | - |
| Eb | Check hoge noten | D (-1) als te hoog |
| E | Vaak te hoog | D (-2) |
| F | Vaak te hoog | Eb (-2) of D (-3) |

### Korg Songbook Tip

Maak **2 entries per nummer** als je verschillende bezettingen hebt:

```
Amazing Grace - Vrouwen Lead (C)
Amazing Grace - David Lead (G)
```

---

## Zang + Keyboard Balans

Als stem verdwijnt achter keyboard:

| Aanpassing | Waar |
|------------|------|
| +2dB @ 3kHz | Op zangkanaal |
| -2dB @ 3kHz | Op keyboard kanaal |

Dit "maakt ruimte" voor de stem in de mix zonder volume te verhogen.

---

*Worship Flow - Zang Presets*
