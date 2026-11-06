# MyCop – Waste Link Management System

> **Where Waste Finds Its Purpose.**  
> *Turning waste into worth with the Waste Link System.*

**Event:** SEVA FIRST INNOVATION CHALLENGE (BUILD. CHALLENGE. DOMINATE.)  
**Team:** RISING INNOVATORS – Revesh Roshan V (Lead), Prabu Shanmugam S, Larshnn Sathyaa S  
**Document Reference:** [PRD.md](file:///c:/Users/LENOVO/Desktop/mycop/PRD.md)

---

## 1. Quick Start

Zero configuration, zero API keys, zero backend setup required:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Or build for production preview
npm run build
npm run preview
```

Open `http://localhost:5173` in your browser.

---

## 2. Real vs. Simulated Capabilities

As specified in PRD Section 0:

### 🟢 Real Computations (Built & Tested in Browser)
1. **Cryptographic Blockchain Ledger:**
   - Real **SHA-256** hash generation via the native browser `crypto.subtle` API.
   - Genuine tamper detection: modifying block data causes a cryptographic hash mismatch and turns subsequent blocks invalid.
   - Built-in **Verify Chain**, **Tamper Block #N**, and **Repair Chain** functions.
2. **Nearest-Truck Assignment Algorithm:**
   - Real **Haversine Geodesic Distance Formula** ($R = 6371\text{ km}$) computed on real Chennai coordinates.
   - Evaluates all available trucks, capacity checks, and sorts by shortest distance.
   - Live **"Why this truck?"** mathematical proof card displayed in the UI.
3. **Local State Persistence:**
   - Full Zustand state synchronization with `localStorage` across page reloads.
4. **Offline Vector Map Fallback:**
   - Standalone SVG topological map of Chennai wards (T. Nagar, Adyar, Velachery, Anna Nagar, Guindy, Tambaram, Porur, OMR) ensuring zero-latency presentation even with no internet connection.

### 🟡 Simulated Demo Features (Clearly Badged in UI)
1. **IoT Bin Sensors:** Ultrasonic fill levels, LoRaWAN signal bars, battery percentages, and methane gas levels.
2. **Physical Trucks:** GPS fleet movement and driver communication.
3. **AI Segregation Hardware:** Camera vision classification and robotic pneumatic gripper mechanics.
4. **Payments:** Marketplace transactions and reward coupon redemptions.

---

## 3. Judge Presentation Demo Script (3 Minutes)

Follow this step-by-step path during your 3-minute pitch (or click **▶ Run Full Demo** in the **Presenter Mode Panel** by pressing `P`):

1. **(0:00 - 0:30) Landing Page & The Vision**
   - Head to `/` (Landing Page).
   - Point out the live ticker stream at the top: *"♻️ 12.4 kg plastic just matched with GreenLoop..."*
   - Show the hero floating particles dropping into colored bins and the interactive live phone mockup.
   - Scroll through the 6-stage **Waste Journey** and the **Traditional vs MyCop** comparison table.
   - *Key Pitch Line:* *"Waste has immense value, but cities lacked the system to connect it to the right buyer. MyCop does."*

2. **(0:30 - 0:50) One-Click Login & Generator Dashboard**
   - Click **Launch Live Demo** -> Choose **Generator (Priya Nair)**.
   - Point to the exact verified numbers: **85.4 kg collected today**, **42% Recyclable / 36% Organic / 22% Landfill** (100% balanced donut chart).
   - Show the 3 liquid-fill smart bins (Recyclable is Full, Organic is Near Full).

3. **(0:50 - 1:20) Dispose Waste & Shortest-Distance Dispatch**
   - Click **Dispose Waste** (`/app/dispose`).
   - Pick Plastic, set weight to 12 kg, click **Confirm Disposal & Dispatch**.
   - Confetti triggers! Green points are awarded.
   - Go to **Live Tracking** (`/app/tracking`) -> inspect the **"Why this truck?"** card:
     - Real Haversine distance proves **Truck TRK-04** was selected for having the shortest distance (1.8 km).

4. **(1:20 - 1:45) AI Segregation Lab**
   - Navigate to **AI Segregation Lab** (`/app/ai-sorter`).
   - Watch the conveyor belt, camera scanning grid, confidence score (98.4%), and robotic gripper sorting items into Plastic, Organic, Metal, and Glass bins.
   - Click **List Sorted Batch on Marketplace**.

5. **(1:45 - 2:10) Blockchain Ledger & Tamper Proof**
   - Navigate to **Blockchain Ledger** (`/app/ledger`).
   - Point out the 30 chained blocks with native browser **SHA-256** hashes.
   - Click **Tamper Block #2**: Chain immediately flags **TAMPERING DETECTED** in glowing red.
   - Click **Repair Chain**: Hashes re-calculate and integrity is restored to green.
   - *Key Pitch Line:* *"Nobody can cheat the ESG record or forge recycled material origins."*

6. **(2:10 - 2:30) Recycler Market Purchase & Rewards**
   - Press `2` to switch to **Recycler (GreenLoop)**.
   - Go to **Marketplace** (`/app/marketplace`) -> Open the batch -> Click **Buy Now**.
   - Confetti bursts, transaction ledger block is minted.
   - Switch back to Priya (`1`) -> Go to **Rewards** (`/app/rewards`) -> Redeem a Chennai Metro transit voucher with earned points.

7. **(2:30 - 3:00) Municipal Command Center & Revenue Model**
   - Press `3` to switch to **Admin (Chennai Smart City Office)** (`/app/admin`).
   - Show city-wide ward analytics and click **Notify Authorities** (Step 4 of deck architecture).
   - Open **Revenue Model** (`/app/revenue`) and demonstrate the interactive financial projection calculator.
   - Conclude with: *"Sustainable, scalable, and profitable. Turning waste into worth with MyCop."*

---

## 4. Keyboard Shortcuts for Presenters

| Key | Action |
|---|---|
| `P` | Toggle Presenter Control Panel |
| `1` | Quick Switch to **Generator (Priya Nair)** |
| `2` | Quick Switch to **Recycler (GreenLoop)** |
| `3` | Quick Switch to **Admin (Chennai Smart City)** |
| `4` | Quick Switch to **Driver (Karthik R.)** |
| `Space` | Pause / Resume Live Simulation Engine |
| `R` | Reset All Demo Data to Genesis Seed |

---

## 5. Technology Stack

- **Runtime & Bundler:** Vite 6, React 18, TypeScript
- **Styling & Design System:** Tailwind CSS, Custom Glassmorphism, Responsive Bento Grids
- **Animations:** Framer Motion, Canvas Confetti
- **State Management:** Zustand with `localStorage` persistence middleware
- **Data Visualization:** Recharts (Donut, Area Trends, Bar Charts)
- **Mapping:** React Leaflet + OpenStreetMap tiles & Offline SVG Vector Fallback Map
- **Icons & Typography:** Lucide React, Sora, Inter, JetBrains Mono
- **Cryptography:** Native Web Crypto API (`crypto.subtle.digest`)

---
*Built by Team RISING INNOVATORS for SEVA FIRST INNOVATION CHALLENGE.*
