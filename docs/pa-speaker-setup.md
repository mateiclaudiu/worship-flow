# PA & Speaker Setup

Gids voor PA systeem configuratie en delay speakers.

---

## Systeem Overzicht

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│                         PODIUM                                     │
│                        🔊   🔊   ← Main speakers (L/R)            │
│                                                                    │
│                     Zone 1: Main coverage                          │
│                        (~0-25 meter)                               │
│                                                                    │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│                                                                    │
│                        🔊   🔊   ← Delay speakers                 │
│                                                                    │
│                     Zone 2: Delay coverage                         │
│                        (~25-50 meter)                              │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Waarom Delay Speakers?

### Het Probleem

Geluid verzwakt over afstand. Mensen achteraan horen:
- Minder volume
- Minder helderheid
- Meer galm (ruimte reflecties)

### De Oplossing

Extra speakers halverwege de zaal die het signaal "opfrissen".

**Maar:** Deze moeten VERTRAAGD worden, anders ontstaat echo.

---

## De Fysica: Waarom Delay Nodig Is

### Signaalsnelheden

| Medium | Snelheid | 25 meter duurt... |
|--------|----------|-------------------|
| Elektrisch (kabel) | ~300.000.000 m/s | ~0 ms |
| Geluid (lucht) | ~343 m/s | ~73 ms |

Elektrische signalen zijn **~1 miljoen keer sneller** dan geluid!

### Zonder Delay = Echo

```
Persoon staat 25m van main, 5m van delay speaker:

0 ms:    Signaal verstuurd
         ├── Main speaker: speelt direct
         └── Delay speaker: speelt direct (via kabel = instant)

15 ms:   Geluid van DELAY bereikt persoon (5m ÷ 343 m/s)
73 ms:   Geluid van MAIN bereikt persoon (25m ÷ 343 m/s)

RESULTAAT: Persoon hoort DELAY eerst, dan MAIN = ECHO!
```

### Met Delay = Natuurlijk

```
0 ms:    Signaal verstuurd
         ├── Main speaker: speelt direct
         └── Delay speaker: WACHT 73ms

73 ms:   Delay speaker begint nu te spelen
         Main geluid arriveert ook (door de lucht)

RESULTAAT: Beide komen tegelijk aan = geen echo!
```

---

## Delay Formule

```
Delay (ms) = Afstand (m) × 2.9

of preciezer:

Delay (ms) = Afstand (m) ÷ 343 × 1000
```

### Voorbeelden

| Afstand main → delay | Berekening | Delay instelling |
|----------------------|------------|------------------|
| 15 meter | 15 × 2.9 | ~44 ms |
| 20 meter | 20 × 2.9 | ~58 ms |
| 25 meter | 25 × 2.9 | ~73 ms |
| 30 meter | 30 × 2.9 | ~87 ms |

### Extra Vertraging (optioneel)

Sommige engineers voegen +5-10ms toe zodat de delay speaker NET NA de main komt. Dit versterkt het "Haas effect" - je brein lokaliseert geluid naar de eerste bron (main speakers op podium).

```
Delay = (Afstand × 2.9) + 5ms
```

---

## Soundcraft UI24 Configuratie

### Stap 1: Kies een Output

Gebruik een **AUX output** (niet FX send!):

```
FX Send = voor effecten (reverb, echo) → NIET voor delay speakers
AUX Out = voor monitors, delay speakers → WEL gebruiken
```

Vrije AUX outputs op UI24: AUX 1-10 (afhankelijk van wat al in gebruik is)

### Stap 2: Routing Instellen

```
UI24 → ROUTING → AUX [nummer]

├── Mode: POST-fader (volgt main mix)
├── Alle kanalen: 0 dB (zelfde als main)
└── Master level: naar smaak (-6 tot 0 dB)
```

### Stap 3: Delay Instellen

```
UI24 → SETTINGS → OUTPUTS → AUX [nummer]

└── DELAY: [berekende waarde in ms]
```

### Stap 4: Aansluiten

```
UI24 AUX OUT [nummer]
        │
        │ (XLR of 6.35mm jack kabel, 15-25m)
        │
        ▼
   Delay Speaker INPUT
```

---

## Hardware Setup

### Plaatsing

```
┌────────────────────────────────────────────────────┐
│                   PODIUM                           │
│                  🔊     🔊  ← Main L/R             │
│                                                    │
│                                                    │
│                                                    │
│                                                    │
│      🔊              🔊     ← Delay speakers       │
│      │               │                             │
│      │←── 10-15m ──→│      (gelijkmatig verdeeld) │
│                                                    │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Hoogte

| Plaatsing | Resultaat |
|-----------|-----------|
| Op de grond | Slecht - geluid in benen, veel reflecties |
| Op statief (2.5-3m) | Goed - over hoofden, naar achteren |
| Muurbeugel (3m+) | Best - stabiel, uit de weg |

### Richting

Delay speakers richten naar **ACHTEREN**, niet naar voren:

```
         ↓ Main speakers (naar publiek)
    🔊       🔊

    👤 👤 👤 👤 👤  (voorste rijen - gedekt door main)

    🔊       🔊
         ↓ Delay speakers (naar achterste rijen)

    👤 👤 👤 👤 👤  (achterste rijen - gedekt door delay)
```

---

## Volume Balans

Delay speakers moeten **zachter** dan main:

```
Main speakers:   0 dB (referentie)
Delay speakers: -3 tot -6 dB

Waarom zachter?
├── Delay speakers zijn dichterbij achterste rijen
├── Main speakers doen nog steeds werk
└── Te luid = geluid "komt van midden zaal" ipv podium
```

---

## Aanbevolen Speakers voor Delays

Delay speakers hoeven niet premium te zijn:

| Model | Type | Prijs | Opmerking |
|-------|------|-------|-----------|
| Behringer B112D | Actief 12" | ~€250 | Budget, prima voor delay |
| Behringer B115D | Actief 15" | ~€300 | Meer laag |
| Behringer B215D | Actief 2×15" | ~€400 | Krachtig |
| QSC CP12 | Actief 12" | ~€450 | Betere kwaliteit |
| RCF ART 312-A | Actief 12" | ~€500 | Pro kwaliteit |

Voor delays: **actief** (ingebouwde versterker) = makkelijker setup

---

## Checklist Delay Speaker Setup

### Voorbereiding

- [ ] Afstand main → delay speaker gemeten
- [ ] Delay tijd berekend (afstand × 2.9 ms)
- [ ] Vrije AUX output geïdentificeerd
- [ ] Kabels lang genoeg (+ marge)
- [ ] Statieven/beugels beschikbaar

### Configuratie

- [ ] AUX output routing: POST-fader, alle kanalen 0 dB
- [ ] Delay ingesteld op output
- [ ] Volume: -3 tot -6 dB onder main
- [ ] Speakers fysiek geplaatst en gericht

### Testen

- [ ] Spraak test: geen echo hoorbaar?
- [ ] Loop door de zaal: volume consistent?
- [ ] Check overgangszones (waar main en delay overlappen)

---

## Troubleshooting

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| Echo hoorbaar | Delay te kort | Delay verhogen |
| Geluid "komt van midden" | Delay te luid | Volume delay verlagen |
| Gat in coverage | Speakers te ver uit elkaar | Speakers dichter bij elkaar of toevoegen |
| Delay te luid vooraan | Speaker verkeerd gericht | Naar achteren richten, niet naar voren |
| Bas-buildup | Overlapping frequenties | HPF op delay speakers (~100Hz) |

---

## Geavanceerd: Meerdere Delay Zones

Voor zeer diepe ruimtes (>50m):

```
┌────────────────────────────────────────────────────────────────┐
│                        PODIUM                                  │
│                       🔊   🔊  Main                            │
│                                                                │
│            Zone 1 (0-20m) - Main coverage                      │
│                                                                │
│                       🔊   🔊  Delay 1 (~58ms)                 │
│                                                                │
│            Zone 2 (20-40m) - Delay 1 coverage                  │
│                                                                │
│                       🔊   🔊  Delay 2 (~116ms)                │
│                                                                │
│            Zone 3 (40-60m) - Delay 2 coverage                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

Elke delay ring krijgt meer delay:
- Delay 1: 20m × 2.9 = ~58ms
- Delay 2: 40m × 2.9 = ~116ms

---

*Worship Flow - PA & Speaker Setup v1.0*