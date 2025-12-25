# EQ Preset: Sennheiser XSW 1-835

Geoptimaliseerd voor:
- **Ruimte:** Grote katholieke zaal met veel echo
- **Speakers:** Yamaha DZR 15" + subwoofer
- **Gebruik:** Zang & Spraak/Preek

---

## Microfoon Karakteristieken

| Eigenschap | Waarde | Impact |
|------------|--------|--------|
| Capsule | e835 (dynamisch) | Robuust, minder gevoelig dan condensor |
| Patroon | Cardioid | Goede feedback rejection |
| Frequentiebereik | 40Hz - 16kHz | Adequate voor vocals |
| Presence peak | ~3-5 kHz | Natuurlijke helderheid, soms te veel |
| Proximity effect | Sterk | Boost onder 200Hz bij dichtbij gebruik |

---

## Algemene Tips voor Galmende Ruimte

### Microfoon Techniek

```
GOED:                          SLECHT:
┌──────────┐                   ┌──────────┐
│    🎤    │ ← 2-5cm afstand   │          │
│    👄    │   (dichtbij)      │    🎤    │ ← 15+ cm
└──────────┘                   │    👄    │   (veel ruimte = veel galm)
                               └──────────┘
```

**Dichtbij = minder zaalgeluid opnemen = minder galm in mix**

### Gain Structure

```
Liever:  Hoge gain + lage fader
Niet:    Lage gain + hoge fader

Waarom:  Signaal-ruisverhouding beter,
         minder gevoelig voor feedback
```

---

## EQ voor ZANG (Worship)

### Soundcraft UI24 Settings (6-band + De-Esser)

```
┌────────────────────────────────────────────────────────────────┐
│  HPF     1       2       3       4      LPF    DE-ESSER       │
│  (blauw) (groen) (rood)  (paars) (goud) (bruin)               │
└────────────────────────────────────────────────────────────────┘

HPF (High Pass Filter)
├── Frequency: 100 Hz
├── Slope: 18 dB/oct
└── Waarom: Proximity effect + handling noise weg

Band 1 (Groen) - LOW MID CUT
├── Frequency: 250 Hz
├── Gain: -3 dB
├── Q: 1.5
└── Waarom: "Boxiness" van e835 + zaal mud

Band 2 (Rood) - MID
├── Frequency: 800 Hz
├── Gain: 0 dB (flat)
├── Q: 1.0
└── Waarom: Meestal niet nodig aanpassen

Band 3 (Paars) - PRESENCE
├── Frequency: 4 kHz
├── Gain: -1 dB
├── Q: 2.0
└── Waarom: e835 heeft al presence peak, temper in galmende zaal

Band 4 (Goud) - HIGH / AIR
├── Frequency: 10 kHz
├── Gain: -2 dB
├── Q: 1.0
└── Waarom: Reflecties temmen, minder vermoeiend

LPF (Low Pass Filter)
├── Frequency: 18 kHz (of UIT)
└── Waarom: Meestal niet nodig voor vocals

DE-ESSER
├── Frequency: 6 kHz
├── Threshold: -20 dB (pas aan op stem)
└── Waarom: S-klanken automatisch temmen
```

### Visueel - Zang

```
        HPF  1      2      3      4     LPF
         │   │      │      │      │      │
      +6 ─┼───┼──────┼──────┼──────┼──────┼─────
         │   │      │      │      │      │
       0 ═╪═══╪══════╪══════╪══════╪══════╪═════
         │   ●      │      ●      ●      │
      -3 ─┼─(250)───┼────(4k)──(10k)─────┼─────
         │  -3dB    │     -1dB  -2dB     │
      -6 ─┼───┼──────┼──────┼──────┼──────┼─────
         │   │      │      │      │      │
         └───┴──────┴──────┴──────┴──────┴─────
           100    500    2k    5k   10k  18k
```

---

## EQ voor SPRAAK / PREEK

Spraak heeft andere behoeften dan zang:
- **Verstaanbaarheid** is belangrijker dan muzikaliteit
- **Consonanten** moeten duidelijk zijn (s, t, k, p)
- **Minder dynamiek** dan zang

### Soundcraft UI24 Settings (6-band + De-Esser)

```
┌────────────────────────────────────────────────────────────────┐
│  HPF     1       2       3       4      LPF    DE-ESSER       │
│  (blauw) (groen) (rood)  (paars) (goud) (bruin)               │
└────────────────────────────────────────────────────────────────┘

HPF (High Pass Filter)
├── Frequency: 120 Hz
├── Slope: 18 dB/oct
└── Waarom: Spraak heeft geen low-end nodig, airco/rommel weg

Band 1 (Groen) - LOW MID CUT
├── Frequency: 300 Hz
├── Gain: -4 dB
├── Q: 1.2 (breed)
└── Waarom: "Preacher boom" elimineren, zaal buildup

Band 2 (Rood) - CLARITY BOOST
├── Frequency: 2.5 kHz
├── Gain: +2.5 dB
├── Q: 2.0
└── Waarom: Consonanten, verstaanbaarheid door galm heen

Band 3 (Paars) - PRESENCE
├── Frequency: 5 kHz
├── Gain: 0 dB (flat)
├── Q: 1.5
└── Waarom: Niet boosten, clarity zit al op band 2

Band 4 (Goud) - SIBILANCE CUT
├── Frequency: 6.5 kHz
├── Gain: -2.5 dB
├── Q: 2.5 (smal)
└── Waarom: S en T klanken temmen (backup voor de-esser)

LPF (Low Pass Filter)
├── Frequency: 12 kHz
└── Waarom: Spraak heeft geen "air" nodig, cut reflecties

DE-ESSER
├── Frequency: 5.5 kHz
├── Threshold: -15 dB (actiever dan bij zang)
└── Waarom: Spraak heeft meer sibilance door dichtbij mic
```

### Visueel - Spraak

```
        HPF  1      2      3      4     LPF
         │   │      │      │      │      │
      +6 ─┼───┼──────┼──────┼──────┼──────┼─────
         │   │      ●      │      │      │
      +3 ─┼───┼───(2.5k)───┼──────┼──────┼─────
         │   │    +2.5dB   │      │      │
       0 ═╪═══╪══════╪══════╪══════╪══════╪═════
         │   ●      │      │      ●      │
      -3 ─┼─(300)───┼──────┼───(6.5k)────┼─────
         │  -4dB    │      │    -2.5dB   │
      -6 ─┼───┼──────┼──────┼──────┼──────┼─────
         │   │      │      │      │      │
         └───┴──────┴──────┴──────┴──────┴─────
           120    500   2.5k   5k  6.5k  12k
```

---

## Compressor Settings

### Voor Zang

```
Threshold: -18 dB
Ratio: 3:1
Attack: 10 ms
Release: 100 ms
Makeup Gain: +2 dB

Zachter:  Dynamiek behouden voor expressie
```

### Voor Spraak

```
Threshold: -15 dB
Ratio: 4:1
Attack: 5 ms
Release: 80 ms
Makeup Gain: +3 dB

Harder: Consistenter volume, beter verstaanbaar
        Minder dynamiek nodig bij preek
```

---

## Feedback Prevention

De e835 is redelijk feedback-resistent, maar in galmende zaal:

### Ring Out Procedure

1. Fader op 0dB
2. Gain langzaam omhoog tot lichte feedback
3. Noteer frequentie (meestal 250Hz, 2kHz, of 4kHz)
4. Kleine cut (-3dB, smalle Q) op die frequentie
5. Herhaal tot stabiel

### Typische Probleem Frequenties e835

```
250 Hz  - "Woofy" feedback (proximity + room)
800 Hz  - "Honky" feedback
2.5 kHz - "Nasal" feedback
4 kHz   - "Harsh" feedback
```

---

## Zaal Speakers (AUX 1) - Spraak

Voor de verspreide zaal speakers (preek):

```
Mixer EQ zelfde als spraak preset
Extra HPF @ 150Hz indien mogelijk
Geen sub send (alleen tops)

Delay:
├── Meet afstand naar verste speaker
├── 3ms per meter
└── Bijv: 10m = 30ms delay
```

---

## Snapshots Opslaan

### Snapshot 1: "Vocal_Zang_XSW835"
- HPF 100Hz
- 250Hz: -3dB
- 4kHz: -1dB
- 10kHz: -2dB
- Compressor: 3:1

### Snapshot 2: "Vocal_Spraak_XSW835"
- HPF 120Hz
- 300Hz: -4dB
- 2.5kHz: +2.5dB
- 6.5kHz: -2.5dB
- Compressor: 4:1

---

## Checklist Soundcheck

### Zang Mic
- [ ] HPF @ 100Hz actief
- [ ] 250Hz cut (-3dB)
- [ ] Presence NIET boosten
- [ ] 10kHz high shelf cut
- [ ] Compressor 3:1
- [ ] Gain: peaks @ -12dB
- [ ] Feedback check gedaan

### Preek Mic
- [ ] HPF @ 120Hz actief
- [ ] 300Hz cut (-4dB)
- [ ] 2.5kHz boost (+2dB)
- [ ] Sibilance cut @ 6.5kHz
- [ ] Compressor 4:1
- [ ] Gain: peaks @ -12dB
- [ ] AUX 1 (zaal speakers) level OK

---

## Probleemoplossing

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| Boomy/muddy | Proximity + room | Meer cut @ 250-300Hz |
| Niet verstaanbaar | Galm maskeert consonanten | Boost 2.5kHz, cut low-mids |
| Feedback | Gain te hoog of EQ verkeerd | Ring out, identificeer freq |
| Scherp/harsh | Reflecties + presence | Cut 4-6kHz |
| S-klanken te hard | Sibilance | Smalle cut @ 6-8kHz |
| "Boxig" geluid | e835 karakteristiek | Cut 200-400Hz |

---

*Worship Flow - EQ Preset voor Sennheiser XSW 1-835 in reflectieve ruimte*
