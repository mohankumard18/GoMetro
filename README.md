# GoMetro — Know your route. Never Miss your stop. 🚇🤖

> **India's Multi-City Intelligent Metro Travel Companion**  
> *Plan your route. Understand every interchange. Never miss your stop.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 The Core Insight

Metro systems can be stressful for first-time or infrequent passengers: missing stops, confusing platform transfers, and inaudible or crowded train announcements.
The core problem in urban commuting is not simply buying a ticket — **it is the lack of continuous, personalized journey guidance on the passenger's own phone.**

**GoMetro addresses this by turning a route into an active journey:**
1. **Plan** the route before boarding with exact walking links and platform directions.
2. **Guide** the passenger through interchanges.
3. **Warn** the passenger before the destination with proactive **"2 stations away"** and **"next stop"** notifications.
4. **Connect** commuters to official and authorized ticketing providers without acting as an unverified reseller.

---

## 🚀 Key Features

### 1. 🔔 Signature Experience: "2 Stations Away" Alert
- Instead of relying on train displays or constantly staring at GPS, GoMetro alerts the commuter's device:
  - **3 Stops Away**: Preparation notice.
  - **2 Stops Away**: **"🔔 Your destination is 2 stations away. Please get ready to exit."** (Plays gentle 3-tone Web Audio chime and fires browser push notifications).
  - **1 Stop Away**: **"🚨 Next stop: [Destination]. Please prepare to get down."**
  - **Arrival**: Celebratory arrival alert with confetti!
- Built-in **Commuter Simulator** with *Auto-Play* and step controls for seamless demonstration.

### 2. 🗺️ Multi-City Transit Support (6 Indian Systems)
Built on a city-independent graph architecture with official network colors and verified station facilities:
- **Hyderabad Metro (HMR)**: Red Line, Blue Line, Green Line (Ameerpet, MGBS, Parade Ground interchanges).
- **Bengaluru Namma Metro (BMRCL)**: Purple Line and Green Line (Majestic interchange).
- **Mumbai Metro (MMRDA)**: Line 1 (Versova–Andheri–Ghatkopar), Line 2A, Line 7.
- **Chennai Metro (CMRL)**: Blue Line and Green Line (Central and Alandur interchanges).
- **Delhi NCR Metro (DMRC)**: Yellow Line, Blue Line, and Airport Express (Rajiv Chowk and New Delhi interchanges).
- **Kochi Metro (KMRL)**: 25 stations from Aluva to Tripunithura Terminal (Vyttila mobility hub).

### 3. 🧠 Deterministic Dijkstra Route Engine
- **Graph Adjacency Model**: Stations as nodes, metro tracks as edges.
- **Dijkstra Multi-Criteria Cost Weighting**:
  $$\text{Cost} = \text{Travel Time} + (\text{Transfers} \times \text{Interchange Penalty}) + \text{Walking Time}$$
- Detects line direction (e.g. *"Board Blue Line towards Raidurg"*), transfer platforms, and calculates distance-based fares.

### 4. 🧭 Interactive Schematic Metro Map & Station Facilities
- Subway-style track view for each city's network.
- Tap any station to view verified accessibility features:
  - 🛗 Elevators / Lifts
  - 🪜 Escalators
  - 🅿️ Vehicle Parking
  - 🚻 Washrooms
  - 🚌 Feeder buses / skywalks
  - ♿ Wheelchair assistance

### 5. 🎫 Official Ticketing Redirection
- **Product Principle**: GoMetro is not an unauthorized ticket issuer.
- Directs commuters to official and authorized booking channels:
  - **Official WhatsApp QR Booking** (Instant paperless QR ticket)
  - **Official Metro Operator Portals & Apps**
  - **Authorized UPI Apps** (Paytm Metro, PhonePe Metro)

### 6. 🤖 Grounded GoMetro AI Assistant
- Conversational navigation assistant grounded strictly in verified transit datasets.
- Explains complex routes in simple steps, answers facility and accessibility queries, and guides commuters if they miss a station.
- Optional Gemini API key integration.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Lucide Icons |
| **Build Tool** | Vite 8.3 |
| **Algorithms** | Graph Data Structures, Dijkstra's Algorithm, BFS |
| **Audio & Alerts** | Web Audio API (Synthesized transit chimes), Web Notifications API |
| **Geospatial** | Haversine Formula, HTML5 Geolocation API |
| **PWA** | Web App Manifest, Standalone App mode |

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/mohankumard18/GoMetro.git

# 2. Navigate to project directory
cd GoMetro

# 3. Install dependencies
npm install

# 4. Start the local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build
```bash
npm run build
```
Creates an optimized production bundle in `dist/`.

---

## 📱 Mobile Roadmap (Phase 2)
The React Native / Expo mobile application (`gometro-mobile`) directly reuses this transit engine and introduces:
- Background geofencing with `expo-location`.
- Native heads-up lock-screen push notifications with `expo-notifications`.
- Haptic tactile feedback with `expo-haptics`.

---

## 📄 License
This project is licensed under the MIT License.
