# Deployment Guide - Worship Flow

Handleiding voor het live zetten van Worship Flow.

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
│  │   INTERNET   │                    │   OFFLINE    │         │
│  │              │                    │   (PWA)      │         │
│  │  • Planning  │                    │              │         │
│  │  • Setlists  │                    │  • Setlist   │         │
│  │  • Liedjes   │                    │  • Liedjes   │         │
│  └──────────────┘                    │  • Dirigent  │         │
│         │                            └──────────────┘         │
│         │                                   │                 │
│         ▼                                   ▼                 │
│  ┌──────────────┐                    ┌──────────────┐         │
│  │   Railway/   │                    │   Mixer PC   │         │
│  │   Render     │                    │   (lokaal)   │         │
│  │   Cloud      │                    │              │         │
│  └──────────────┘                    └──────────────┘         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Optie 1: Railway (Aanbevolen)

Railway is de makkelijkste manier om Node.js apps te deployen.

### Stap 1: GitHub Repository

```bash
# In de worship-flow directory
git init
git add .
git commit -m "Initial commit"

# Maak repo op GitHub, dan:
git remote add origin https://github.com/JOUW-USERNAME/worship-flow.git
git push -u origin main
```

### Stap 2: Railway Account

1. Ga naar [railway.app](https://railway.app)
2. Sign up met GitHub
3. Klik **"New Project"**
4. Kies **"Deploy from GitHub repo"**
5. Selecteer `worship-flow`

### Stap 3: Configuratie

Railway detecteert automatisch Node.js. Check deze settings:

```
Settings → General:
├── Root Directory: /
├── Build Command: (leeg laten, geen build nodig)
└── Start Command: npm start

Settings → Variables:
└── PORT: (Railway zet dit automatisch)

Settings → Networking:
└── Generate Domain: ✓ (krijg je URL zoals worship-flow.up.railway.app)
```

### Stap 4: Custom Domain (optioneel)

```
Settings → Networking → Custom Domain

Voeg toe: worship.jouwnaam.nl

DNS instelling bij je domein provider:
Type: CNAME
Naam: worship
Waarde: worship-flow.up.railway.app
```

### Stap 5: Persistent Storage

**Belangrijk:** Railway reset standaard alle files bij elke deploy. Voor data.json:

```
Settings → Volumes → Add Volume

├── Mount Path: /app/data.json
└── Size: 1GB (meer dan genoeg)
```

Update `server.js` om environment-aware data path te gebruiken:

```javascript
// In src/services/database.js, verander:
const DATA_PATH = process.env.DATA_PATH || path.join(__dirname, '../../data.json');
```

---

## Optie 2: Render

Alternatief voor Railway met gratis tier.

### Stap 1: Account & Deploy

1. Ga naar [render.com](https://render.com)
2. Sign up met GitHub
3. **New** → **Web Service**
4. Connect GitHub repo
5. Configureer:

```
Name: worship-flow
Region: Frankfurt (EU)
Branch: main
Build Command: npm install
Start Command: npm start
Instance Type: Free (of Starter voor sneller)
```

### Stap 2: Environment Variables

```
PORT = 10000  (Render default)
NODE_ENV = production
```

### Stap 3: Persistent Disk

Voor data.json persistent storage:

```
Disks → Add Disk
├── Name: worship-data
├── Mount Path: /var/data
└── Size: 1GB
```

Update database path naar `/var/data/data.json`.

---

## Optie 3: VPS / Self-Hosted

Voor volledige controle, draai op eigen server.

### Vereisten

- Ubuntu 22.04 (of soortgelijk)
- Node.js 18+
- PM2 (process manager)
- Nginx (reverse proxy)
- Let's Encrypt (SSL)

### Setup Script

```bash
# 1. Node.js installeren
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. App clonen
cd /var/www
git clone https://github.com/JOUW-USERNAME/worship-flow.git
cd worship-flow
npm install

# 3. PM2 installeren & starten
npm install -g pm2
pm2 start server.js --name worship-flow
pm2 startup
pm2 save

# 4. Nginx configuratie
sudo nano /etc/nginx/sites-available/worship-flow
```

### Nginx Config

```nginx
server {
    listen 80;
    server_name worship.jouwnaam.nl;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# 5. Enable site & SSL
sudo ln -s /etc/nginx/sites-available/worship-flow /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 6. Let's Encrypt SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d worship.jouwnaam.nl
```

---

## PWA Offline Mode

De app werkt offline dankzij de PWA (Progressive Web App) setup.

### Hoe het werkt

1. **Eerste bezoek (online)**: Browser cached automatisch:
   - Alle HTML pagina's
   - JavaScript, CSS
   - Setlists en liedjes (via API cache)

2. **In de kerk (offline)**:
   - App laadt vanuit cache
   - Alle gecachede content beschikbaar
   - Mixer features werken lokaal (zelfde netwerk als mixer)

### App Installeren

**Op iPhone/iPad:**
1. Open de app in Safari
2. Tik op Share icon (vierkant met pijl omhoog)
3. Scroll en tik **"Zet op beginscherm"**
4. Tik **"Voeg toe"**

**Op Android:**
1. Open de app in Chrome
2. Tik op menu (3 puntjes)
3. Tik **"Toevoegen aan startscherm"** of **"Installeren"**

**Op Desktop (Chrome):**
1. Open de app
2. Klik op install icon in de URL balk (plus in vierkant)
3. Of: Menu → **"Worship Flow installeren"**

### Cache Updaten

Wanneer je thuis bent met internet, open de app om de cache te verversen:

```
App openen → Service Worker checkt updates → Cache wordt bijgewerkt
```

---

## Workflow: Thuis vs Kerk

### Thuis (Planning)

```
1. Open https://worship.jouwnaam.nl
2. Maak/bewerk setlists
3. Voeg liedjes toe
4. Alles wordt automatisch opgeslagen
```

### Onderweg naar Kerk

```
1. Open de app (met internet)
2. Check dat setlist geladen is
3. Hiermee is cache geüpdatet met laatste data
```

### In de Kerk (Offline/Lokaal)

```
OPTIE A: Offline PWA
├── Open geïnstalleerde app
├── Setlist is gecached
└── Geen internet nodig

OPTIE B: Lokale Server
├── Start server op mixer laptop
├── npm start
├── Andere devices verbinden via lokaal IP
└── Full functionaliteit incl. mixer control
```

---

## Architectuur: Twee Modi

### Cloud Mode (Planning)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│   Railway    │────▶│   data.json  │
│   (thuis)    │◀────│   Server     │◀────│   (cloud)    │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Local Mode (Live Performance)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Tablet     │────▶│   Laptop     │────▶│  Soundcraft  │
│   (dirigent) │◀────│   Server     │◀────│   UI24       │
└──────────────┘     └──────────────┘     └──────────────┘
        │                   │
        │            ┌──────┴──────┐
        │            │             │
        ▼            ▼             ▼
   ┌────────┐   ┌────────┐   ┌────────┐
   │ Zanger │   │ Monitor│   │  Live  │
   │  view  │   │  view  │   │  view  │
   └────────┘   └────────┘   └────────┘
```

---

## Data Synchronisatie

### Probleem

Cloud en lokaal hebben aparte data.json files.

### Oplossing: Export/Import

Voeg toe aan de app (toekomstige feature):

```
Settings → Export Data → Download JSON
Settings → Import Data → Upload JSON
```

### Workaround (Nu)

```bash
# Cloud data downloaden
curl https://worship.jouwnaam.nl/api/songs > songs.json
curl https://worship.jouwnaam.nl/api/setlists > setlists.json

# Lokaal importeren (handmatig data.json mergen)
```

---

## Checklist Deployment

### Voorbereiding

- [ ] GitHub account aangemaakt
- [ ] Repository gepusht naar GitHub
- [ ] Railway/Render account aangemaakt

### Deployment

- [ ] App deployed naar cloud platform
- [ ] Custom domain geconfigureerd (optioneel)
- [ ] SSL werkend (https://)
- [ ] Persistent storage voor data.json

### PWA Setup

- [ ] App geïnstalleerd op telefoon/tablet
- [ ] Offline mode getest
- [ ] Cache refresh getest

### Testing

- [ ] Planning features werken online
- [ ] Setlists laden correct
- [ ] Offline mode toont gecachede data
- [ ] Lokale server + mixer werkt

---

## PWA Icons Maken

De app heeft icons nodig voor installatie. Maak deze aan:

### Optie 1: Online Generator

1. Ga naar [favicon.io](https://favicon.io/favicon-generator/)
2. Maak icon met tekst "WF" of logo
3. Download en plaats in `/public/icons/`:
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)

### Optie 2: Figma/Canva

Maak 512x512 icon met:
- Achtergrond: #f39c12 (oranje)
- Tekst/symbool: wit
- Export als PNG

```bash
# Resize voor beide formaten
# macOS:
sips -z 192 192 icon-512.png --out icon-192.png

# Of ImageMagick:
convert icon-512.png -resize 192x192 icon-192.png
```

---

## Troubleshooting

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| App laadt niet offline | Cache niet gevuld | Open app met internet eerst |
| Data weg na deploy | Geen persistent storage | Volume/disk toevoegen |
| WebSocket error in cloud | Proxy config | Check nginx/platform WS support |
| Mixer werkt niet vanuit cloud | Netwerk isolatie | Mixer alleen lokaal bereikbaar |
| Install prompt komt niet | Geen HTTPS | SSL certificaat fixen |

---

## Kosten Overzicht

| Platform | Gratis Tier | Betaald |
|----------|-------------|---------|
| Railway | $5 credit/maand | $5-20/maand |
| Render | 750 uur/maand | $7/maand |
| Vercel | Unlimited static | $20/maand (niet geschikt, geen backend) |
| VPS (Hetzner) | - | €4/maand |
| VPS (DigitalOcean) | - | $6/maand |

**Aanbeveling:** Railway of Render gratis tier is voldoende voor planning gebruik.

---

*Worship Flow - Deployment Guide v1.0*