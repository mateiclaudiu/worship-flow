# Auto-Gain Systeem

Documentatie voor het automatische gain management systeem in Worship Flow.

---

## Overzicht

Het Auto-Gain systeem monitort real-time meter levels van de Soundcraft UI24 mixer en past automatisch de preamp gain aan om:

1. **Clipping te voorkomen** - gain omlaag bij te hoog signaal
2. **Te lage gain te detecteren** - waarschuwing + auto-correctie
3. **Visuele feedback** - health indicators per kanaal

---

## Hoe Het Werkt

**Target: -18dB gemiddeld (12.5%) met tolerance band -22dB tot -15dB (8% tot 18%)**

```
┌─────────────────────────────────────────────────────────────────┐
│                    METER MONITORING (10Hz)                      │
│                                                                 │
│   Mixer ──WebSocket──► Worship Flow ──► Avg Level Tracking     │
│                              │                                  │
│                              ▼                                  │
│                    ┌─────────────────┐                          │
│                    │ Peak > Thresh?  │  ──Ja──► GAIN -1dB      │
│                    │ (clipping)      │          (direct)        │
│                    └────────┬────────┘                          │
│                        Nee  │                                   │
│                             ▼                                   │
│                    ┌─────────────────┐                          │
│                    │ Avg < 3%?       │  ──Ja──► GAIN +3dB      │
│                    │ (< -30dB)       │          (na 3 sec)      │
│                    └────────┬────────┘                          │
│                        Nee  │                                   │
│                             ▼                                   │
│                    ┌─────────────────┐                          │
│                    │ Avg < 8%?       │  ──Ja──► GAIN +1-3dB    │
│                    │ (< -22dB)       │          (na 5 sec)      │
│                    └────────┬────────┘                          │
│                        Nee  │                                   │
│                             ▼                                   │
│                    ┌─────────────────┐                          │
│                    │ Avg > 18%?      │  ──Ja──► GAIN -1dB      │
│                    │ (> -15dB)       │          (per 2 sec)     │
│                    └────────┬────────┘                          │
│                        Nee  │                                   │
│                             ▼                                   │
│                    ┌─────────────────┐                          │
│                    │   OPTIMAL!      │  Target: 12.5% (-18dB)  │
│                    │   Geen actie    │                          │
│                    └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Health Status Levels

Gebaseerd op professionele gain staging: **-12dB peaks, -18dB gemiddeld**

| Status | Trigger | dB | Kleur | Actie |
|--------|---------|-----|-------|-------|
| `too_low` | Avg < 3% voor 3s | < -30dB | Rood + knipperen | Snel +3dB |
| `low` | Avg 3-8% | -30dB tot -22dB | Oranje | Geleidelijk +1-3dB |
| `optimal` | Avg 8-18% | -22dB tot -15dB | Groen | Geen actie |
| `high` | Avg > 20% | > -14dB | Oranje | Geleidelijk -1dB |
| `clipping` | Peak > threshold | > -1.5dB | Rood | Direct -1dB |

**Target: -18dB gemiddeld (12.5% lineair)**

---

## Kanaal Type Presets

Elk instrument type heeft geoptimaliseerde settings:

### Vocals & Spraak
| Type | Threshold | Min Gain | Max Gain | Attack | Release |
|------|-----------|----------|----------|--------|---------|
| Zang | 82% | -20dB | +15dB | 30ms | 500ms |
| Spraak | 78% | -15dB | +20dB | 50ms | 600ms |
| Koor | 75% | -20dB | +25dB | 40ms | 500ms |

### Instrumenten
| Type | Threshold | Min Gain | Max Gain | Attack | Release |
|------|-----------|----------|----------|--------|---------|
| Keyboard | 88% | -40dB | 0dB | 100ms | 1000ms |
| Akoest. Gitaar | 75% | -25dB | +20dB | 20ms | 400ms |
| Elektr. Gitaar | 80% | -30dB | +10dB | 50ms | 600ms |
| Bas | 85% | -35dB | +5dB | 40ms | 800ms |

### Drums
| Type | Threshold | Min Gain | Max Gain | Attack | Release |
|------|-----------|----------|----------|--------|---------|
| Kick | 65% | -40dB | +10dB | 10ms | 300ms |
| Snare | 68% | -35dB | +15dB | 10ms | 300ms |
| Overhead | 70% | -30dB | +20dB | 15ms | 400ms |
| Toms | 68% | -35dB | +15dB | 10ms | 300ms |

### Overig
| Type | Threshold | Min Gain | Max Gain | Attack | Release |
|------|-----------|----------|----------|--------|---------|
| Backing Track | 90% | -40dB | -10dB | 200ms | 2000ms |

---

## Configuratie

### Globale Settings

Via `/mixer` pagina:

- **Auto-Gain Actief**: Master toggle
- **Auto-verhogen bij zwak signaal**: Schakel auto-recovery in/uit
- **Threshold**: Globale clip threshold (overschreven door preset)
- **Min Gain**: Laagste toegestane gain

### Per Kanaal

- **Type**: Selecteer preset (vocal, keyboard, etc.)
- **Auto-Gain aan/uit**: Per kanaal toggle
- **Lock**: Voorkom alle automatische aanpassingen

---

## API Endpoints

### GET `/api/mixer/autogain`
Haal huidige auto-gain configuratie op.

### PUT `/api/mixer/autogain`
Update globale auto-gain settings.

### PUT `/api/mixer/autogain/channel/:num`
Configureer een specifiek kanaal.

```json
{
  "name": "Zang Lisa",
  "type": "vocal",
  "autoGainEnabled": true
}
```

### POST `/api/mixer/channel/:num/lock`
Lock/unlock een kanaal.

```json
{
  "locked": true
}
```

### POST `/api/mixer/autogain/recovery`
Toggle auto-recovery.

```json
{
  "enabled": true
}
```

---

## WebSocket Events

### `meterLevels` (elke 100ms)
```json
{
  "type": "meterLevels",
  "data": [{
    "channel": 1,
    "name": "Zang",
    "level": 0.45,
    "peak": 0.72,
    "averageLevel": 0.38,
    "gain": -12,
    "health": "optimal",
    "healthMessage": "Gain optimaal",
    "isReducing": false,
    "isIncreasing": false,
    "gainLocked": false
  }]
}
```

### `autoGainAdjust` (bij gain wijziging)
```json
{
  "type": "autoGainAdjust",
  "data": {
    "channel": 1,
    "level": 0.15,
    "gain": -9,
    "action": "increase",
    "health": "too_low",
    "message": "Gain verhoogd (te zwak signaal)"
  }
}
```

---

## Beperkingen

1. **Geen RMS detectie** - Alleen peak-based
2. **Geen frequency-aware limiting** - Bas kan vals triggeren
3. **Geen gain history/logging** - Geen terugkijken
4. **Afhankelijk van mixer verbinding** - Geen offline mode

---

## Toekomstige Verbeteringen

- [ ] RMS-based detectie voor sustained sounds
- [ ] Gain history logging
- [ ] Per-kanaal custom thresholds UI
- [ ] Frequency-weighted detection
- [ ] Preset import/export

---

*Worship Flow - Auto-Gain System v1.0*