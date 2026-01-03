# Worship Flow 🎹

Een live worship management tool voor kerkmuzikanten. Beheer liedjes, bouw setlists, en dirigeer je zangers real-time.

## Features

- **Liedjes Database**: Beheer 100+ liedjes met tekst, toonhoogte, tempo, categorieën en stijlen
- **Setlist Builder**: Maak setlists voor oefening (zaterdag) en live (zondag)
- **Live Dirigent Console**: Stuur real-time cues naar zangers (1-2-3!, Pauze, Bis, etc.)
- **Live View**: Unified presentatie en zanger interface met teksten en live sync
- **Accent Markering**: Markeer lettergrepen met `**tekst**` voor nadruk
- **Feedback Systeem**: Log feedback per lied (tempo, toonhoogte) met historiek
- **Real-time Sync**: WebSocket verbinding tussen dirigent en zangers

## Installatie

```bash
# 1. Zorg dat Node.js geïnstalleerd is (v18+)
# Download van: https://nodejs.org

# 2. Ga naar de project folder
cd worship-flow

# 3. Installeer dependencies
npm install

# 4. Start de server
npm start
```

## Gebruik

Na het starten zie je:

```
╔═══════════════════════════════════════════════════════════╗
║                    WORSHIP FLOW                           ║
╠═══════════════════════════════════════════════════════════╣
║  Server running on port 3000                              ║
║                                                           ║
║  Open in browser:                                         ║
║  • Home:     http://localhost:3000                        ║
║  • Dirigent: http://localhost:3000/dirigent               ║
║  • Live:     http://localhost:3000/live                   ║
║  • Mixer:    http://localhost:3000/mixer                  ║
╚═══════════════════════════════════════════════════════════╝
```

### Voor de Dirigent (jij):

1. Open `http://localhost:3000/dirigent` op je laptop
2. Voeg liedjes toe via de "Liedjes" tab
3. Maak een setlist via de "Setlists" tab
4. Klik "Start Live" om te beginnen

### Voor Zangers:

1. Verbind met hetzelfde WiFi netwerk (jouw hotspot)
2. Open `http://<jouw-ip>:3000/live` op hun telefoon
3. Ze zien automatisch de teksten wanneer jij live start

### Jouw IP vinden:

**Windows:**
```cmd
ipconfig
```
Zoek naar "IPv4 Address" (bijv. 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig | grep inet
```

## Tekst Formatting

In de tekst-editor kun je accenten markeren:

```
Stille nacht, heilige nacht
Davids Zoon, lang verwacht
Die miljoenen eens zaligen zal
Wordt geboren in **Beth**lehems stal
```

`**Beth**` wordt getoond als **Beth** (vet + goud) bij de zangers.

Gebruik `---` om secties te scheiden:

```
Vers 1:
Eerste vers tekst hier...

---

Refrein:
Refrein tekst hier...
```

## Keyboard Shortcuts (Live Mode)

| Toets | Actie |
|-------|-------|
| `←` | Vorige sectie |
| `→` | Volgende sectie |
| `Space` | Pauze cue |
| `1` | "1-2-3!" cue |
| `N` | Volgend lied |
| `P` | Vorig lied |

## Data

Alle data wordt opgeslagen in `data.json`. Maak regelmatig een backup!

## Troubleshooting

**Zangers kunnen niet verbinden?**
- Check of ze op hetzelfde netwerk zitten
- Firewall kan poort 3000 blokkeren
- Probeer de server te herstarten

**WebSocket verbinding verbroken?**
- De app probeert automatisch opnieuw te verbinden
- Herlaad de pagina als het niet lukt

---

Gebouwd met ❤️ voor worship teams
