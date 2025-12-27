# Deployment Guide - Worship Flow

Handleiding voor het live zetten van Worship Flow.

**Live URL:** https://worship-flow.onrender.com

---

## Overzicht

```
┌────────────────────────────────────────────────────────────────┐
│                     WORSHIP FLOW                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  THUIS / ONDERWEG                    IN DE KERK               │
│  ═══════════════════                 ═════════════            │
│                                                                │
│  ┌──────────────┐                    ┌──────────────┐         │
│  │   INTERNET   │                    │   LOKAAL     │         │
│  │              │                    │   SERVER     │         │
│  │  • Planning  │                    │              │         │
│  │  • Setlists  │                    │  • Mixer     │         │
│  │  • Liedjes   │                    │  • Live sync │         │
│  └──────────────┘                    │  • Dirigent  │         │
│         │                            └──────────────┘         │
│         │                                   │                 │
│         ▼                                   ▼                 │
│  ┌──────────────┐                    ┌──────────────┐         │
│  │   Render     │                    │   Laptop +   │         │
│  │   Cloud      │                    │   UI24 WiFi  │         │
│  └──────────────┘                    └──────────────┘         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Render Deployment (Aanbevolen)

### Stap 1: Account & Deploy

1. Ga naar [render.com](https://render.com)
2. Sign up met GitHub
3. **New +** → **Web Service**
4. Connect GitHub repo `worship-flow`
5. Configureer:

```
Name:             worship-flow
Region:           Frankfurt (EU)
Branch:           main
Root Directory:   (leeg)
Runtime:          Node
Build Command:    npm install
Start Command:    npm start
Instance Type:    Starter ($7/maand) of hoger
```

> **Let op:** Free tier heeft geen persistent disk - data gaat verloren!

### Stap 2: Persistent Disk

Data moet bewaard blijven tussen deploys:

```
Disks → Add Disk

Name:        worship-data
Mount Path:  /var/data
Size:        1 GB
```

### Stap 3: Environment Variables

```
Environment → Add Environment Variable

Key:    DATA_PATH
Value:  /var/data/data.json
```

### Stap 4: Deploy

Klik **Create Web Service**. Render bouwt en deployed automatisch.

Na ~2 minuten is je app live op:
```
https://worship-flow.onrender.com
```

---

## Data Synchronisatie

### Lokale data uploaden naar cloud

```bash
curl -X POST https://worship-flow.onrender.com/api/import \
  -H "Content-Type: application/json" \
  -d @data.json
```

### Cloud data downloaden naar lokaal

```bash
curl https://worship-flow.onrender.com/api/export > data.json
```

### API Endpoints

| Endpoint | Methode | Beschrijving |
|----------|---------|--------------|
| `/api/export` | GET | Download alle data als JSON |
| `/api/import` | POST | Upload JSON, overschrijft data |

---

## Lokale Server (In de Kerk)

In de kerk draai je een lokale server voor mixer control.

### Setup

```bash
# 1. Clone of update repo
git pull origin main

# 2. Start server
npm start

# Server draait op http://localhost:3000
```

### Netwerk

```
┌─────────────────────────────────────────────────────────┐
│            SOUNDCRAFT UI24 NETWERK                      │
│                                                         │
│  ┌─────────┐    WebSocket     ┌─────────┐              │
│  │  UI24   │◄────────────────►│ Laptop  │              │
│  │ Mixer   │                  │ Server  │              │
│  └─────────┘                  └─────────┘              │
│                                    │                    │
│              ┌─────────────────────┼──────────┐        │
│              ▼                     ▼          ▼        │
│         ┌────────┐           ┌────────┐  ┌────────┐   │
│         │ Tablet │           │ Zanger │  │ Monitor│   │
│         │dirigent│           │  app   │  │  app   │   │
│         └────────┘           └────────┘  └────────┘   │
│                                                         │
│  Alle devices: http://192.168.x.x:3000                 │
└─────────────────────────────────────────────────────────┘
```

### Workflow: Voor de dienst

```bash
# 1. Download laatste data van cloud
curl https://worship-flow.onrender.com/api/export > data.json

# 2. Start lokale server
npm start

# 3. Verbind met UI24 WiFi netwerk
```

### Workflow: Na de dienst

```bash
# Upload lokale wijzigingen naar cloud
curl -X POST https://worship-flow.onrender.com/api/import \
  -H "Content-Type: application/json" \
  -d @data.json
```

---

## PWA Offline Mode

De app kan geïnstalleerd worden voor offline toegang.

### App Installeren

**iPhone/iPad:**
1. Open app in Safari
2. Tik Share → **"Zet op beginscherm"**

**Android:**
1. Open app in Chrome
2. Menu → **"Installeren"**

**Desktop:**
1. Open app in Chrome
2. Klik install icon in URL balk

### Wat werkt offline

| Feature | Offline (PWA) | Lokale Server |
|---------|---------------|---------------|
| Setlist bekijken | ✅ | ✅ |
| Liedjes lezen | ✅ | ✅ |
| Wijzigingen opslaan | ❌ | ✅ |
| Mixer control | ❌ | ✅ |
| Live sync | ❌ | ✅ |

> **Tip:** Voor volledige functionaliteit in de kerk, gebruik de lokale server.

---

## Checklist

### Eerste Setup

- [x] GitHub repo aangemaakt
- [x] Render account aangemaakt
- [x] Web Service geconfigureerd
- [x] Persistent Disk toegevoegd
- [x] DATA_PATH environment variable gezet
- [x] Lokale data geüpload naar cloud

### Voor Elke Dienst

- [ ] `git pull` voor laatste code
- [ ] `curl .../api/export > data.json` voor laatste data
- [ ] `npm start` op mixer laptop
- [ ] Verbind met UI24 WiFi

### Na Elke Dienst

- [ ] Upload wijzigingen: `curl -X POST .../api/import -d @data.json`

---

## PWA Icons

Plaats icons in `/public/icons/`:

| Bestand | Formaat |
|---------|---------|
| `icon-192.png` | 192x192 px |
| `icon-512.png` | 512x512 px |

Maak via [favicon.io](https://favicon.io/favicon-generator/) met:
- Tekst: "WF"
- Achtergrond: #f39c12 (oranje)

---

## Troubleshooting

| Probleem | Oplossing |
|----------|-----------|
| Data weg na deploy | Check DATA_PATH env var en disk mount |
| Import werkt niet | Wacht tot deploy klaar is (~2 min) |
| Mixer reageert niet | Check of laptop op UI24 WiFi zit |
| App laadt niet offline | Open eerst online om cache te vullen |
| 502 Bad Gateway | Check Render logs voor errors |

---

## Kosten

| Plan | Prijs | Features |
|------|-------|----------|
| Render Starter | $7/maand | Persistent disk, geen sleep |
| Render Free | $0 | Geen disk, slaapt na 15 min |

---

*Worship Flow - Deployment Guide v2.0*