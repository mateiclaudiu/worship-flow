# Zang Presets & Vocal Engineering

Specifieke EQ en processing presets per zanger, plus educatieve achtergrond.

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

### EQ Settings

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | **80Hz** | - | steep | Lager dan standaard - haar stem gaat diep, behoud body |
| 1 | 200Hz | **-2dB** | 1.5 | Lichte mud cut, maar warmte behouden |
| 2 | 350Hz | **-1dB** | 2.0 | "Boxiness" verminderen (holle klank) |
| 3 | 2.5kHz | **+2dB** | 2.0 | Presence - stem snijdt door mix |
| 4 | 5kHz | **+1dB** | 1.5 | Articulatie - woorden verstaanbaar |
| 5 | 10kHz | **0dB** | - | Flat laten - warme stem heeft geen extra "lucht" nodig |

### Visuele EQ curve

```
     +3dB |
     +2dB |                    /\
     +1dB |                   /  \    /
      0dB |--____            /    \  /
     -1dB |      \    __    /      \/
     -2dB |       \__/  \__/
     -3dB |
          80  200  400  800  2k   4k  8k  Hz
              ↑    ↑         ↑    ↑
           warmte boxiness presence articulatie
           behoud  cut      boost   boost
```

### Waarom deze keuzes

| Keuze | Reden |
|-------|-------|
| HPF op 80Hz ipv 100Hz | Warme stem heeft meer body nodig, 80Hz behoudt borstresonantie |
| -2dB @ 200Hz (niet -3dB) | Te veel cut = stem wordt dun en koud |
| -1dB @ 350Hz | "Boxiness" zit hier - klinkt als zingen in een doos |
| +2dB @ 2.5kHz | Dit is de "presence" zone - maakt stem hoorbaar boven muziek |
| +1dB @ 5kHz | Consonanten (T, K, P) worden helderder = betere verstaanbaarheid |

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

### Troubleshooting

| Situatie | Aanpassing |
|----------|------------|
| Stem klinkt dun/koud | 200Hz cut verminderen naar -1dB |
| Stem klinkt modderig | 200Hz cut verhogen naar -3dB |
| Moeilijk verstaanbaar | 2.5kHz boost verhogen naar +3dB |
| Te scherpe S-klanken | De-esser toevoegen (5-8kHz) |
| Stem "verdwijnt" in keyboard | 3kHz boost + keyboard 3kHz cut |

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

### Aanpak

**Doel:** Blenden met lead, zwaktes verbergen - NIET als lead laten klinken.

| Probleem | Frequentie | Oplossing |
|----------|------------|-----------|
| Dun/schraal | 200-300Hz | Boost (warmte toevoegen) |
| Keelklank/spanning | 1-2kHz | Cut (nasaal/spanning weg) |
| Scherpe highs | 4-6kHz | Cut (scherpte dempen) |

### EQ Settings

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | 100Hz | - | steep | Standaard |
| 1 | 250Hz | **+2dB** | 1.5 | Warmte toevoegen die ontbreekt |
| 2 | 1.5kHz | **-3dB** | 2.0 | Keelklank/nasaal dempen |
| 3 | 3kHz | **0dB** | - | NIET boosten (zou spanning benadrukken) |
| 4 | 5kHz | **-2dB** | 1.5 | Scherpte dempen |

### Visuele EQ curve

```
     +3dB |
     +2dB |  /\
     +1dB | /  \
      0dB |/    \__________
     -1dB |               \      __
     -2dB |                \    /  \
     -3dB |                 \__/    \
          80  200  400  800  1.5k 3k  5k  8k  Hz
               ↑             ↑       ↑
            warmte        nasaal  scherpte
            toevoegen      cut      cut
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

### EQ Settings

| Band | Freq | Gain | Q | Waarom |
|------|------|------|---|--------|
| HPF | **150Hz** | - | steep | Hoger dan normaal - slechte lows eruit |
| 1 | 200Hz | **-3dB** | 1.5 | Boominess/ongecontroleerde lows dempen |
| 2 | 400Hz | **+1dB** | 2.0 | Beetje body terugbrengen |
| 3 | 1.5kHz | **-3dB** | 2.0 | Nasaal/keelklank dempen |
| 4 | 3.5kHz | **+1dB** | 2.0 | Helpt met projectie/focus |
| 5 | 6kHz | **-2dB** | 1.5 | Scherpte dempen |

### Visuele EQ curve

```
     +3dB |
     +2dB |
     +1dB |        /\              /\
      0dB |____   /  \            /  \
     -1dB |    \ /    \          /    \
     -2dB |     X      \        /      \____
     -3dB |             \______/
          80  200  400  800  1.5k 3.5k 6k  8k  Hz
          ↑    ↑    ↑        ↑    ↑    ↑
         HPF  boom body   nasaal focus scherp
         hoog cut  terug   cut  boost  cut
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

---

## Vocal Mix Overzicht

### Fader balans

| Stem | Rol | Fader | Compressie |
|------|-----|-------|------------|
| Claudia | Lead | **0dB** (referentie) | 3:1, natuurlijk |
| Ina | Backup | **-5dB** | 4:1, strak |
| Lidia | Backup | **-5dB** | 5:1, zeer strak |

### Presence strategie

| Stem | Presence boost @ 2.5-3kHz |
|------|---------------------------|
| Claudia | **+2dB** (snijdt door mix) |
| Ina | **0dB** (zou spanning benadrukken) |
| Lidia | **+1dB** (helpt met projectie, voorzichtig) |

**Waarom dit werkt:** Claudia heeft de presence boost, dus zij "leidt". Backups vullen aan zonder te concurreren.

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

## Zang + Keyboard Balans

Als stem verdwijnt achter keyboard:

| Aanpassing | Waar |
|------------|------|
| +2dB @ 3kHz | Op zangkanaal |
| -2dB @ 3kHz | Op keyboard kanaal |

Dit "maakt ruimte" voor de stem in de mix zonder volume te verhogen.

---

*Worship Flow - Zang Presets*
