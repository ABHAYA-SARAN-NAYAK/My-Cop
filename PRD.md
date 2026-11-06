# PRD: MyCop – Waste Link Management System

**Event:** SEVA FIRST INNOVATION CHALLENGE (BUILD. CHALLENGE. DOMINATE.)
**Team:** RISING INNOVATORS – Revesh Roshan V (Lead), Prabu Shanmugam S, Larshnn Sathyaa S
**Product name:** MyCop
**Tagline:** Where Waste Finds Its Purpose
**Pitch line:** Turning waste into worth with the Waste Link System
**Document type:** Build spec for an AI coding agent (Antigravity). Read this fully before writing any code.

---

## 0. READ THIS FIRST (Rules for the builder)

- This is a **hackathon showcase prototype**. It must look and feel like a real, finished product.
- There is **no real hardware, no real AI model, no real blockchain network**. Everything is **simulated in the browser** with realistic mock data.
- Exception: two things must be **really computed** in the browser, because judges may click and test them:
  1. **Blockchain ledger** – real SHA-256 hashes using the browser `crypto.subtle` API. Tamper detection must really work.
  2. **Shortest-distance truck assignment** – real distance math (Haversine formula) on real map coordinates.
- Every simulated feature must carry a small, tasteful badge: `Simulated demo`. Do not pretend it is real hardware.
- **No backend. No database. No paid API. No API keys.** Everything runs on the frontend. Data is saved in `localStorage` through a store.
- The app must run with `npm install && npm run dev` and work with zero setup.
- Every button, link, card, tab and form listed in this document must exist and do something visible. **No dead buttons. No "coming soon" screens.**
- Build in the phase order given in Section 18. After each phase, the app must run without errors.

---

## 1. Product Summary

MyCop is a smart platform that connects **people who create waste** with **recyclers who need it**.

- Smart IoT bins tell the system when they are full.
- The nearest truck is assigned automatically.
- Waste is sorted (AI camera + robotic gripper idea) into Plastic, Metal, Glass, Organic.
- Sorted waste is listed on a **digital waste marketplace** for recyclers, compost units, biogas plants and industries.
- Every batch is tracked on a **blockchain-style ledger** for transparency.
- Users earn **reward points** for good segregation.
- Municipalities get a **city dashboard** with live data and reports.

**Core idea in one line:** Waste has value, but nobody connected it to the right buyer. MyCop does.

---

## 2. Goals and Non-Goals

### Goals
- Wow the judges in the first 10 seconds (landing page).
- Let a judge click through the full waste journey in under 3 minutes: **Dispose → Track → Recycle → Reward**.
- Show all 3 pillars from the deck: **IoT Bins, Tracking App, Recycler Network**.
- Show the revenue model and business model clearly, not only the tech.
- Work perfectly on a laptop projector, and also on a phone.

### Non-Goals
- No real payments, real login, real GPS, real camera ML, real blockchain network.
- No admin backend or server code.
- No multi-language support (English only for now).

---

## 3. Users (Roles)

Four roles. The user picks one on the Login page (one-click demo login, no password needed).

| Role | Who | What they want |
|---|---|---|
| **Household / Restaurant (Generator)** | Urban homes, restaurants, industries | Dispose easily, track pickup, earn rewards |
| **Recycler / Buyer** | Recyclers, compost units, biogas plants | Find clean sorted waste, bid, buy |
| **Municipality / Admin** | City officials | See city-wide data, fleet, reports, impact |
| **Driver** | Truck driver | See assigned pickups, follow route, mark done |

Demo accounts (shown as cards on Login page):
- Generator: **Priya Nair** (Household, Chennai)
- Recycler: **GreenLoop Recyclers**
- Admin: **Chennai Smart City Office**
- Driver: **Karthik R.**

---

## 4. Tech Stack (use exactly this)

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** (with custom theme tokens from Section 6)
- **Framer Motion** (animations)
- **React Router v6** (routing)
- **Zustand** (state, with `persist` middleware to localStorage)
- **Recharts** (charts)
- **react-leaflet + Leaflet** with free OpenStreetMap tiles (maps). No API key.
- **lucide-react** (icons)
- **Sonner** or **react-hot-toast** (toasts)
- **canvas-confetti** (reward celebrations)
- **jsPDF** (optional, for the report download button; if too heavy, export CSV only)
- Fonts via Google Fonts: **Sora** (headings), **Inter** (body), **JetBrains Mono** (numbers and hashes)

---

## 5. Information Architecture and Routes

### Public
| Route | Page |
|---|---|
| `/` | Landing page |
| `/login` | Role selection / demo login |
| `/about` | Team + problem + vision |
| `*` | 404 page (fun, on brand) |

### App (after login, inside app shell with sidebar)
| Route | Page | Roles |
|---|---|---|
| `/app` | Redirects to the role's home | all |
| `/app/dashboard` | Waste Link Dashboard (Generator) | Generator |
| `/app/dispose` | Dispose Waste flow | Generator |
| `/app/bins` | Smart Bin Monitor | Generator, Admin |
| `/app/tracking` | Pickup and Live Tracking | Generator, Admin, Driver |
| `/app/ai-sorter` | AI Segregation Lab | all |
| `/app/marketplace` | Digital Waste Marketplace | all |
| `/app/marketplace/:id` | Listing detail | all |
| `/app/ledger` | Blockchain Waste Ledger | all |
| `/app/rewards` | Rewards and Leaderboard | Generator |
| `/app/impact` | Environmental Impact | all |
| `/app/admin` | City Command Center | Admin |
| `/app/fleet` | Fleet and Routes | Admin, Driver |
| `/app/recycler` | Recycler Portal | Recycler |
| `/app/revenue` | Revenue Model and Calculator | all |
| `/app/canvas` | Business Model Canvas | all |
| `/app/notifications` | Notifications | all |
| `/app/settings` | Settings | all |

If a role opens a page not meant for them, show a friendly "Switch role" prompt (not an error).

---

## 6. Design System (IMPORTANT: colorful, modern, creative)

### 6.1 Design personality
- **Feeling:** Fresh, alive, optimistic, futuristic. Like "a smart city meets a living garden".
- **Not:** boring green-and-white NGO look. Not flat grey admin template.
- **Style keywords:** Bento grids, glassmorphism, soft gradients, glowing accents, rounded corners, big bold numbers, playful micro-animations.

### 6.2 Color tokens (define in `tailwind.config` and CSS variables)

**Base (Dark theme is default. Light theme is optional toggle.)**
| Token | Hex | Use |
|---|---|---|
| `bg-deep` | `#070B14` | Main dark background |
| `bg-surface` | `#0F1626` | Cards |
| `bg-elevated` | `#172033` | Hover, modals |
| `border-soft` | `rgba(255,255,255,0.08)` | Card borders |
| `text-main` | `#F1F5F9` | Main text |
| `text-muted` | `#94A3B8` | Secondary text |

**Brand gradient (signature, use on hero, key buttons, logo glow):**
`linear-gradient(135deg, #22E58B 0%, #14B8A6 35%, #3B82F6 70%, #8B5CF6 100%)`

**Waste category colors (use consistently everywhere: charts, bins, chips, map pins):**
| Category | Color | Hex |
|---|---|---|
| Recyclable (Plastic) | Electric Blue | `#38BDF8` |
| Organic | Fresh Green | `#4ADE80` |
| Metal | Steel Violet | `#A78BFA` |
| Glass | Aqua Teal | `#2DD4BF` |
| Landfill / Other | Warm Amber | `#FBBF24` |
| E-waste (extra) | Hot Pink | `#F472B6` |

**Status colors:** Success `#22C55E`, Warning `#F59E0B`, Danger `#EF4444`, Info `#3B82F6`.

**Light theme (if built):** bg `#F5F9F7`, cards `#FFFFFF`, same accent colors, text `#0F172A`.

### 6.3 Typography
- H1: Sora 56–72px desktop / 36px mobile, weight 800, gradient text allowed.
- H2: Sora 36–44px, weight 700.
- H3: Sora 20–24px, weight 600.
- Body: Inter 16px, line-height 1.6.
- Numbers, hashes, KPIs: JetBrains Mono.

### 6.4 Shape, space, effects
- Card radius: 20px. Buttons: 14px (pill for primary CTA). Inputs: 12px.
- Glass card: `background: rgba(255,255,255,0.04); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08);`
- Glow on hover: soft colored shadow matching the item's category color.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Background: dark with 2–3 large blurred gradient blobs (green, blue, purple) floating slowly behind content. Subtle grid or noise texture.

### 6.5 Motion rules (Framer Motion)
- Page transition: fade + slight upward slide, 300ms.
- Scroll reveal on landing sections (stagger children, 80ms).
- Counters: count-up animation on first view.
- Bin fill bars: animated liquid fill with a gentle wave.
- Hover: cards lift 4px and glow. Buttons scale 1.03.
- Respect `prefers-reduced-motion`: turn off blobs and big animations.

### 6.6 Logo
Build as inline SVG: circular recycling arrows (green) wrapped around a blue GPS location pin, with two small leaves. Wordmark "MyCop" in Sora 800 with the brand gradient. Tagline below in muted text.

### 6.7 Signature creative touches (must include)
1. **Floating waste particles** in the hero: small icons (bottle, leaf, can, glass) drift and then "snap" into the correct colored bin (looping animation).
2. **"Waste Journey" scroll-story:** as the user scrolls, a line travels through Collect → Sort → Connect → Recycle → Reuse, and each step lights up.
3. **Live ticker** at the top of the landing page: "♻️ 12.4 kg plastic just matched with GreenLoop · 🔔 Bin #A-17 is 92% full · 🚚 Truck T-04 arrived" (auto-scrolling, driven by the same simulator as the app).
4. **Bento grid** layouts on dashboards (cards of different sizes).
5. **Phone mockup** on the landing page showing the real MyCop dashboard screen inside (rendered with live components, not an image).

---

## 7. Global Components (build once, reuse)

- **Navbar (public):** Logo, links (Problem, Solution, How it Works, Features, Impact, Revenue, Team), theme toggle, `Login` ghost button, `Launch Demo` gradient button. Becomes sticky glass on scroll. Hamburger menu on mobile.
- **App Shell:** Left sidebar (collapsible, icons + labels, role-based items, active glow), top bar (page title, search box, `Presenter Mode` toggle, notification bell with badge, theme toggle, profile menu with `Switch Role` and `Logout`), main content area, mobile bottom tab bar.
- **Cards:** `StatCard` (icon, label, big number, trend arrow, mini sparkline), `GlassCard`, `BinCard`, `ListingCard`, `PickupCard`, `RewardCard`, `NotificationItem`.
- **Charts:** `WastePieChart` (donut with center total), `TrendLineChart`, `BarCompare`, `Sparkline`, `GaugeRing`.
- **Badges/Chips:** Category chip (colored), Status chip, `Simulated demo` chip, Verified-on-ledger chip with shield icon.
- **Feedback:** Toast, Skeleton loaders (show for 500ms on page load for realism), Empty states with illustrations, Confetti burst.
- **Modals/Drawers:** Confirm modal, Detail drawer (right side), Image preview.
- **Buttons:** Primary (gradient), Secondary (glass), Ghost, Danger, Icon button. States: hover, active, focus ring, disabled, loading spinner.
- **Form controls:** Input, Select, Textarea, Toggle, Slider, Radio cards, Checkbox, File drop zone, Stepper, Tabs, Segmented control, Date/time picker (native input styled).
- **Presenter Mode Panel** (see Section 15).

---

## 8. Mock Data and Simulation Engine

Create `src/data/` and `src/sim/`. All numbers must be consistent across pages (the same totals show on dashboard, impact page and admin page).

### 8.1 Dashboard data (fix for the deck's chart error)
The deck's pie chart numbers do not add to 100%. Use these instead:
- Total waste collected today: **85.4 kg**
- Recyclable: **42%** (35.9 kg)
- Organic: **36%** (30.7 kg)
- Landfill: **22%** (18.8 kg)
- CO₂ saved: **56.8 kg**
- Energy saved: **120 kWh**
- Plastic recycled: **230 items**
- Recent pickups: 10:15 AM Recycle Bin Emptied · 11:30 AM Organic Bin Emptied · 1:45 PM All Bins Collected
- Bin status: Recyclable = Full (collect now), Organic = Near Full, Landfill = Collecting

### 8.2 Entities (TypeScript types)
- `User` (id, name, role, area, avatar, points, tier)
- `Bin` (id, type, location {lat,lng,label}, fillPercent, status, lastEmptied, batteryPercent, signalStrength, temperatureC, gasLevel for organic)
- `Pickup` (id, binId, status: Requested | Assigned | OnTheWay | PickedUp | Sorting | Delivered, truckId, etaMinutes, createdAt, timeline[])
- `Truck` (id, driverName, location, capacityKg, loadKg, status)
- `Batch` (id, category, weightKg, purity %, origin, status, listingId?)
- `Listing` (id, batchId, title, category, weightKg, pricePerKg, purity, location, distanceKm, seller, verified, bids[])
- `Block` (index, timestamp, batchId, event, data, prevHash, hash)
- `Reward` (id, name, pointsCost, icon, description)
- `Notification` (id, type, title, body, time, read)
- `Transaction` (id, listingId, amount, buyer, date)

Seed: **24 bins** across Chennai areas (T. Nagar, Adyar, Velachery, Anna Nagar, Guindy, Tambaram, Porur, OMR), **6 trucks**, **18 marketplace listings**, **30 ledger blocks**, **8 rewards**, **20 notifications**, 6 recyclers/buyers.

### 8.3 Simulator (`src/sim/engine.ts`)
- Runs a tick every 3 seconds.
- Bins slowly fill (random 0.5–3%). When a bin passes 85%, create a notification "Bin #X is 85% full" and a pickup request automatically. At 100% show Full.
- When a pickup is created, run **nearest truck assignment** (Haversine distance, pick the closest truck with free capacity). Show the distance math in the UI (see Section 10.4).
- Trucks move along their path on the map toward the bin, then toward the sorting center. Update ETA.
- When delivered, create a Batch, add a ledger block, and (if sorted) create a marketplace listing.
- Every event pushes to the **live ticker** and **notification list**.
- Sim can be paused/resumed and sped up (1x, 2x, 5x) from Presenter Mode.

---

## 9. Landing Page (`/`) – Section by Section

Goal: tell the entire deck story in a scroll, in a beautiful way.

1. **Live ticker bar** (top, see 6.7).
2. **Hero**
   - Small pill: `SEVA FIRST INNOVATION CHALLENGE · Team RISING INNOVATORS`
   - H1: `Waste has value. We connect it.` (with "value" in brand gradient)
   - Sub: `MyCop links waste generators with recyclers using smart bins, live tracking and transparent records.`
   - Buttons: `Launch Live Demo` (gradient, goes to `/login`), `Watch the Journey` (glass, scrolls to journey section).
   - Right side: animated floating particles dropping into 3 glowing colored bins + phone mockup with live dashboard.
   - Below: 4 live stat counters (Waste Tracked kg, Active Smart Bins, Recyclers Connected, CO₂ Saved kg).
3. **Problem section** – "Cities drown in unmanaged waste." Four cards: Landfills, Poor Segregation, Low Recycling Rates, No Real-Time Tracking. Big quote card: *"Waste has value, but there is no smart system to connect it with the right recycler."* Row of "Who faces this": Urban Households, Industries, Municipalities, Restaurants (icon chips).
4. **Why it matters** – 3 big cards: Environmental Sustainability, Resource Recovery, Reduce Waste Dumping.
5. **Solution / Waste Journey** (scroll-story): Collect → Sort → Segregation → Connect → Recycle → Reuse. Each step has icon, 1-line text, and a small animation. Line fills as user scrolls.
6. **Three Pillars** – IoT Bins, Tracking App, Recycler Network (large bento cards with hover demo; IoT card shows a live bin filling).
7. **Uniqueness** – "Traditional Waste Collection vs MyCop" comparison table (6 rows: Tracking, Segregation, Buyer connection, Transparency, Cost, Eco impact; red cross vs green tick). Plus 3 highlight cards: Digital Waste Marketplace, AI-based Segregation, Blockchain Tracking. Line: "Why choose us: Cost Savings + Sustainability".
8. **Waste Management Recycling Process** – a horizontal animated diagram of the 6 stages: Collection, Transportation, Sorting, Cleaning & Pre-Processing, Recycling, Final Product Manufacturing. Draw with SVG/icons (no external images).
9. **How the System Works (Architecture)** – interactive 7-step flow: Consumers dispose → Data stored/analyzed in cloud → Alert on phone → Authorities informed → Nearest truck assigned → Waste routed to segregation → Camera + gripper sorts into Plastic / Metal / Glass / Organic. Clicking a step highlights it and shows a tooltip. Include a `Play` button that auto-plays the steps.
10. **Feature Showcase** – tabbed carousel (Dashboard, Smart Bins, Marketplace, Ledger, Rewards) showing real components.
11. **Impact Calculator** – slider: "Households in your area" (100–100,000) and "Waste per home/day (kg)". Output: waste diverted from landfill, CO₂ saved, trucks route savings, estimated revenue. Animated numbers.
12. **Roadmap** – 3 phases as a timeline: Prototype (Build) → Pilot (Test) → Scale-Up (Expand). Also the 4-stage pipeline: Smart Bin → Segregation → Recycling → Reporting.
13. **Revenue Model preview** – 3 cards: Subscription (Municipalities), B2B Partnerships (Industries & Recyclers), Licensing (Scalable). Tagline *Sustainable & Profitable*. Button `See full model` → `/app/revenue`.
14. **Challenges and Risks** – accordion with 4 groups (Technical, Financial, Operational, User Adoption), each with Risk and Our Mitigation side by side.
15. **Team** – 3 team cards with avatar initials, name, role. Team name badge: RISING INNOVATORS.
16. **Final CTA** – big gradient banner: `Turning waste into worth.` Buttons `Launch Live Demo`, `View Business Model`.
17. **Footer** – logo, tagline, quick links, "Built for SEVA FIRST INNOVATION CHALLENGE by RISING INNOVATORS", copyright.

---

## 10. App Pages – Detailed Spec

### 10.1 Login (`/login`)
- Split screen. Left: animated brand art + tagline. Right: "Choose how you want to explore MyCop".
- 4 role cards (Generator, Recycler, Municipality, Driver), each with icon, description, color accent, and `Continue as Priya Nair` style button.
- Small note: "Demo mode – no password needed."
- Button `Back to home`.
- After click: 1.2s animated loading (logo pulse) then go to the role's home.

### 10.2 Waste Link Dashboard (`/app/dashboard`) — Generator home
Bento grid layout, matching deck slide 9 but better looking.
- **Greeting header:** "Good morning, Priya 👋" + date + `Dispose Waste` primary button + `Schedule Pickup` secondary button.
- **Total Waste Collected Today:** huge number 85.4 kg with count-up and sparkline.
- **Waste Breakdown:** donut chart (Recyclable 42, Organic 36, Landfill 22) with center total, legend, hover tooltip.
- **Bin Status Overview:** 3 liquid-fill bin cards (Recyclable: Full, Organic: Near Full, Landfill: Collecting) each with `Request Pickup` button (disabled if already requested).
- **Recent Pickups:** timeline list (3 items from 8.1) with icons and `View all` link to tracking.
- **Environmental Impact:** 3 stat cards (CO₂ Saved 56.8 kg, Energy Saved 120 kWh, Plastic Recycled 230 items) with icons and a "Equal to planting X trees" line.
- **Collection Trends:** line chart (7 days / 30 days toggle) with 3 colored lines (Recyclable, Organic, Landfill) and legend toggles.
- **Rewards mini-card:** points, tier progress bar, `Redeem` button.
- **Live Pickup mini-map:** small map with truck moving; click opens `/app/tracking`.
- **Tips card:** rotating "Did you know" segregation tips.
- **Segregation Score ring:** 0–100 gauge with tips to improve.

### 10.3 Dispose Waste (`/app/dispose`) — the "Dispose" step of the user journey
3-step stepper:
1. **Choose waste type** – radio cards: Plastic, Organic, Metal, Glass, E-waste, Mixed. Each with icon and color.
2. **Add details** – weight slider (0.5–50 kg), photo drop zone (optional, preview shown), toggle "Already segregated?", note textarea, pickup time (Now / Today / Schedule).
3. **Confirm** – summary card, estimated points, estimated value (₹), `Confirm Disposal` button.
After confirm: confetti, success animation, toast, new pickup created, button `Track Pickup` and `Dispose More`.
Also a **QR Scan (simulated)** button: "Scan Bin QR" opens a modal with an animated scanner, then auto-selects a bin.

### 10.4 Smart Bin Monitor (`/app/bins`)
- Top filters: area select, category chips, status chips (All, Normal, Near Full, Full, Offline), search by bin ID. View toggle: `Grid | Map`.
- **Bin Card:** bin ID, type color, liquid fill with %, last emptied, battery, signal bars, temperature, gas level (organic), status chip, `Request Pickup` button, `Details` button.
- **Map view:** Leaflet map with colored pins by fill level (green <50, amber 50–85, red >85, grey offline). Pin popup shows card.
- **Details drawer:** 24-hour fill-level line chart, sensor readings, alert history, `Request Pickup`, `Mark as Emptied`, `Report Issue`.
- **Live badge** that pulses green while the simulator is running.
- **Alert banner** at top when any bin is above 85%.
- Admin only: `Add Bin` modal (form: type, area, lat/lng picker by clicking the map).

### 10.5 Pickup and Live Tracking (`/app/tracking`)
- **Left panel:** list of pickups with status chips and filter tabs (Active, Completed, All).
- **Center:** big Leaflet map: bin pins, truck markers (animated moving along route polyline), sorting center marker.
- **Right panel (selected pickup):**
  - Status timeline: Requested → Assigned → On the way → Picked up → Sorting → Delivered (current step glows).
  - ETA countdown.
  - **"Why this truck?" card:** shows distance of each truck to the bin (Haversine, in km) sorted, with the shortest highlighted and the text "Truck T-04 assigned – shortest distance (1.8 km)". This proves the shortest-distance logic from the deck.
  - Driver card (name, truck ID, `Call` button that shows a toast, `Message` button).
  - `Cancel Pickup` (with confirm modal) and `Share Tracking Link` (copies link, toast).
- Driver role: same page but with `Start Trip`, `Arrived`, `Mark Picked Up`, `Complete Delivery` buttons that move the status forward.

### 10.6 AI Segregation Lab (`/app/ai-sorter`) — deck Slide 5 Step 7
Make this a showstopper. Label: `Simulated demo`.
- **Left:** conveyor belt visual with items on it (SVG icons: bottle, can, banana peel, glass jar, wrapper, etc.). A camera icon scans each item; a **grid overlay (grid segmentation)** appears over the item; a bounding box and label appear with confidence % (e.g., `Plastic bottle · 96.4%`).
- A **robotic gripper** (SVG arm animation) picks the item and drops it in the matching bin: Plastic, Metal, Glass, Organic (4 colored bins with counters).
- **Controls:** `Start`, `Pause`, `Reset`, speed slider, `Add Random Item`, `Upload Your Own Image` (drop zone; classify by a simple rule: pick a random category weighted by file name keywords like "bottle", "can", "glass", "peel"; show clearly that it is a simulation).
- **Right panel:** live log (Item #14 → Plastic → Bin 1), accuracy meter, items sorted counter, purity % per bin, and a "Pi + Camera module" hardware spec card (Raspberry Pi, camera, gripper) as info.
- Button `List sorted batch on Marketplace` creates a listing from the sorted bin contents.

### 10.7 Digital Waste Marketplace (`/app/marketplace`)
- **Header:** title, `Post Waste Listing` button (opens a form drawer), view toggle (Grid/List).
- **Filters (left sidebar / top bar):** category chips, price range slider, weight range, purity slider, distance slider, verified-only toggle, sort select (Newest, Price low-high, Closest, Purity).
- **Listing Card:** category color strip, title (e.g., "Clean PET Bottles – 120 kg"), weight, price per kg, purity badge, distance, seller, verified-on-ledger chip, `View Details` button, `Quick Bid` button.
- **Listing Detail (`/app/marketplace/:id`):**
  - Photo/illustration, key facts table, seller card, mini-map, **blockchain history** (list of blocks for this batch with hashes), price chart.
  - **Bid panel:** input for bid price, quantity, `Place Bid` button, `Buy Now` button. Bid appears in a live bid list instantly. Buy Now opens a checkout modal (simulated: summary, delivery option, `Confirm Order`) → confetti → creates Transaction and ledger block.
  - Recycler role also sees `Accept Bid` / `Reject Bid` if they are the seller of a listing.
- Empty state when filters return nothing, with `Clear filters` button.

### 10.8 Blockchain Waste Ledger (`/app/ledger`)
- **Top stats:** total blocks, batches tracked, chain status (Valid ✔ / Broken ✖), last block time.
- **Chain visual:** horizontal scrolling chain of block cards connected by animated links. Each block: index, timestamp, event (Collected, Segregated, Listed, Sold, Recycled), batch ID, short hash, previous hash (short).
- **Block detail drawer:** full data JSON and hashes.
- **Real hashing:** hash = SHA-256 of (index + timestamp + batchId + event + data + prevHash) using `crypto.subtle`.
- **Buttons:**
  - `Add Block (Simulate Event)` → form (batch, event, note) → new block appended with animation.
  - `Verify Chain` → animated check of each block, ends with green success.
  - `Tamper with Block #N` (demo) → edits the data in one block; chain turns red from that block forward with a "Tampering detected" alert. `Repair Chain` button restores. This is the main wow moment.
  - `Search by Batch ID` input.
  - `Export Ledger (JSON)` download.
- Explain in a small info card: "Why blockchain here? Buyers can trust where waste came from. Nobody can quietly change the record."

### 10.9 Rewards and Leaderboard (`/app/rewards`)
- **Header card:** points balance, tier (Seedling → Sprout → Tree → Forest Guardian) with progress bar to next tier.
- **How to earn** row: Segregate correctly (+10), On-time disposal (+5), Refer a friend (+50), Weekly streak (+25).
- **Rewards catalog grid** (8 rewards: Metro recharge, Grocery coupon, Plant sapling, Cinema ticket, Cloth bag, Donate to NGO, Discount on property tax, Plant a tree in your name). `Redeem` button → confirm modal → confetti → points drop → added to history.
- **Leaderboard:** top 10 in the area, current user highlighted, tabs (This Week, This Month, All Time).
- **Streak calendar** (heatmap of disposal days) and **Badges** (First Pickup, Zero Landfill Week, Compost Hero, etc.).
- **Points history** table.

### 10.10 Environmental Impact (`/app/impact`)
- Big animated "Planet card": trees equivalent, CO₂ saved, energy saved, water saved, landfill diverted.
- Charts: Monthly impact bar chart, category contribution donut, "You vs Your area average" bar compare.
- Share card: generates a shareable impact card (styled div) with `Download as Image` (use html-to-canvas or fallback: copy summary text) and `Share` button (toast).
- Period toggle: Week / Month / Year.

### 10.11 City Command Center (`/app/admin`) — Municipality
- **KPI row:** Total waste today, Bins online, Pickups active, Recycling rate %, CO₂ saved, Revenue this month.
- **City map (large):** Leaflet map with a heat layer (simulate with colored circles by area fill-level), bin pins, truck markers. Layer toggles (Bins, Trucks, Heat, Sorting centers).
- **Area table:** area, bins, avg fill, pickups today, recycling %, status; sortable; row click opens drawer.
- **Alerts feed:** live list (Bin full, Truck delay, Contamination detected) with `Assign Truck` / `Dismiss` buttons.
- **Charts:** waste by category (donut), daily waste by area (stacked bar), recycling rate trend (line).
- **Actions:** `Dispatch Truck` modal (choose bin and truck), `Generate Report` (opens report preview with `Download CSV` and `Download PDF` buttons), `Add Bin`, `Date range` picker.
- **Authority notification demo:** `Notify Authorities` button shows the "Authorities informed" step (deck architecture Step 4) with a toast and a log entry.

### 10.12 Fleet and Routes (`/app/fleet`)
- Truck list with status, load bar, driver, location.
- Map with route lines and stops (ordered by nearest-neighbor algorithm).
- `Optimize Route` button: runs nearest-neighbor on selected stops, animates the new route, shows "Saved X km (Y%) compared to default route".
- Driver view: today's stops as a checklist with `Navigate` (opens Google Maps link) and `Mark Done` buttons.

### 10.13 Recycler Portal (`/app/recycler`)
- KPIs: Active bids, Orders in transit, Inventory (kg by category), Spend this month.
- **Incoming supply feed:** live new listings matching their interests (settings: categories they buy).
- **My bids table** with status chips (Pending, Won, Lost) and `Withdraw` button.
- **Orders table** with tracking status and `Mark Received` button → adds ledger block "Recycled/Received".
- **Demand board:** "Post a Requirement" form (category, quantity, price) so generators can see buyer demand.
- Charts: purchase volume trend, price per kg trend by category.

### 10.14 Revenue Model and Calculator (`/app/revenue`)
- Cards for the 3 streams from the deck: Subscription (Municipalities), B2B Partnerships (Industries & Recyclers), Licensing (Scalable Solutions). Plus product sales: BioGas, Recycled Plastic.
- Target customers chips: Industries, Recyclers, Restaurants, Compost Units.
- **Interactive revenue calculator:** inputs (number of cities, bins per city, municipal fee per bin/month, avg marketplace commission %, monthly marketplace volume ₹, biogas sold, recycled plastic sold kg). Output: monthly revenue, yearly revenue, breakdown stacked chart, break-even month. Use clearly labeled **assumptions** and a note "Illustrative numbers".
- **Pricing strategy:** "Affordable, Scalable" with 3 plan cards (Starter for small areas, City, Enterprise) and `Select Plan` buttons (toast).
- Future scalability: a "Chennai → Tamil Nadu → India → Global Smart Cities" expanding map/timeline animation.

### 10.15 Business Model Canvas (`/app/canvas`)
- Classic 9-block canvas as a colorful grid, each block with its own color and icon, hover to expand. Content from the deck:
  - Key Partners: Municipalities, Recyclers, NGOs
  - Key Activities: Platform Maintenance, Network Management, Marketing
  - Key Resources: IoT Bins, AI, Blockchain
  - Value Proposition: Efficient, Eco-friendly Waste Management
  - Customer Relationships: Transparency, Trust, Gifts (rewards)
  - Channels: Mobile App, Municipal Tie-ups
  - Customer Segments: Waste Generators, Waste Processors, Logistics Providers
  - Cost Structure: Tech, Operations, Awareness
  - Revenue Streams: Municipalities, B2B Partnerships, Licensing
- Button `Download Canvas as PNG` (or `Print`), `Present Mode` (fullscreen).

### 10.16 Notifications (`/app/notifications`)
- Tabs: All, Alerts, Pickups, Marketplace, Rewards. List with icon, text, time, unread dot. Buttons: `Mark all as read`, `Clear all`, per-item `Mark read` and `Delete`. Live toast when new notification arrives.

### 10.17 Settings (`/app/settings`)
- Profile (name, area, avatar upload preview), Theme (dark/light/auto), Notification toggles, Simulation settings (speed), Recycler interests (multi-select), `Reset Demo Data` (confirm modal), `Switch Role`, `Logout`.

### 10.18 About (`/about`)
- Problem statement, vision, team cards, "How we built it" tech chips, link buttons (`Back to Home`, `Launch Demo`).

### 10.19 404
- Playful: a bin with a confused face and "This page got recycled." Button `Back to home`.

---

## 11. User Journey (must work end-to-end)

**Dispose → Track → Recycle → Reward**

1. Generator opens Dispose page, confirms plastic waste.
2. Pickup is created; nearest truck assigned (with the "Why this truck?" proof).
3. Truck moves on the map. Status moves forward.
4. Waste reaches the sorting center. AI Lab sorts it. A batch is created.
5. Ledger gets new blocks at each step (Collected → Segregated → Listed).
6. Batch appears on the Marketplace. A recycler places a bid and buys it.
7. Ledger records the sale. Generator receives reward points, with confetti and a notification.
8. Impact numbers on dashboard increase.

All of this must be possible from the UI in **under 3 minutes**, and Presenter Mode must be able to run it automatically.

---

## 12. State Management

Zustand stores (persisted to `localStorage`):
- `useAuthStore` (user, role)
- `useBinsStore`, `usePickupsStore`, `useFleetStore`
- `useMarketStore` (listings, bids, transactions)
- `useLedgerStore` (blocks, validity)
- `useRewardsStore` (points, history, redeemed)
- `useNotifStore`
- `useSimStore` (running, speed, tick)
- `useUIStore` (theme, sidebar, presenter mode)

Rule: any action in one store that affects another (e.g., delivery → ledger block + notification + points) must go through a single `actions.ts` file so logic stays in one place.

---

## 13. Responsiveness and Accessibility

- Breakpoints: 360, 768, 1024, 1280, 1536.
- Sidebar becomes a bottom tab bar on mobile. Tables become cards on mobile. Maps stay full width with a collapsible panel.
- Everything must work on a projector at 1920×1080 and on a phone.
- Keyboard accessible. Visible focus rings. All icons-only buttons have `aria-label`. Color is never the only signal (use icons and text for status). Contrast ratio AA for text.
- Respect `prefers-reduced-motion`.

---

## 14. Performance and Quality

- Lighthouse Performance 85+ on desktop.
- Lazy-load route pages and the map library.
- No console errors or warnings in a clean run.
- No layout shift on load (use skeletons).
- All images are SVG or CSS. No heavy external images.
- Maps must show a friendly fallback card if tiles fail to load (offline at the venue). **Important:** also create a simple SVG fallback map of the city so the demo never breaks if WiFi dies.

---

## 15. Presenter Mode (hackathon survival feature)

A floating, collapsible panel (bottom-right) toggled from the top bar or the keyboard shortcut `P`.

Buttons:
- `▶ Run Full Demo` – auto-plays the whole journey from Section 11 with narrated captions at the bottom ("Bin #A-17 is full…", "Nearest truck assigned…").
- `Fill a Bin` – forces a bin to 90% and triggers a pickup.
- `Dispatch Truck`
- `Sort a Batch`
- `Place Recycler Bid`
- `Tamper Ledger`
- `Add Reward Points`
- `Pause / Resume Simulation`, speed `1x 2x 5x`
- `Switch Role` quick tabs (Generator, Recycler, Admin, Driver)
- `Reset Demo`
- `Offline Mode` toggle (forces the SVG fallback map)

Keyboard shortcuts: `1–4` switch role, `P` toggle panel, `R` reset, `Space` pause/resume simulation.

---

## 16. Folder Structure

```
mycop/
├─ index.html
├─ package.json
├─ tailwind.config.ts
├─ src/
│  ├─ main.tsx, App.tsx, routes.tsx
│  ├─ styles/ (globals.css, tokens.css)
│  ├─ data/ (seed bins, trucks, listings, blocks, rewards, notifications)
│  ├─ sim/ (engine.ts, haversine.ts, route.ts, hash.ts)
│  ├─ store/ (all zustand stores, actions.ts)
│  ├─ components/
│  │  ├─ ui/ (Button, Card, Chip, Modal, Drawer, Tabs, Toggle, Slider, Stepper…)
│  │  ├─ charts/
│  │  ├─ maps/ (LiveMap, FallbackMap)
│  │  ├─ brand/ (Logo, Particles, PhoneMockup)
│  │  ├─ layout/ (Navbar, Sidebar, TopBar, AppShell, Footer, PresenterPanel)
│  │  └─ domain/ (BinCard, ListingCard, BlockCard, PickupTimeline…)
│  ├─ pages/
│  │  ├─ public/ (Landing, Login, About, NotFound)
│  │  └─ app/ (Dashboard, Dispose, Bins, Tracking, AiSorter, Marketplace, ListingDetail, Ledger, Rewards, Impact, Admin, Fleet, Recycler, Revenue, Canvas, Notifications, Settings)
│  └─ lib/ (format.ts, constants.ts)
└─ README.md
```

---

## 17. Acceptance Criteria (Definition of Done)

- [ ] `npm install && npm run dev` runs with no errors, no env variables, no keys.
- [ ] Landing page has all 17 sections from Section 9 and looks polished on desktop and mobile.
- [ ] All 4 roles can log in with one click and land on the right home page.
- [ ] Every page in Section 5 exists and every listed button does something visible.
- [ ] Dashboard numbers match Section 8.1 exactly (donut totals 100%).
- [ ] Simulator fills bins, auto-creates pickups, assigns nearest truck, and moves trucks on the map.
- [ ] "Why this truck?" shows real Haversine distances.
- [ ] Ledger uses real SHA-256; Tamper and Verify and Repair all work.
- [ ] AI Lab animation runs smoothly: scan → grid → label → gripper → bin.
- [ ] Marketplace filters, bids, Buy Now, and ledger update work.
- [ ] Rewards redeem works with confetti and points update.
- [ ] Presenter Mode "Run Full Demo" completes the whole journey without errors.
- [ ] Offline Mode works (fallback map), so the demo survives bad WiFi.
- [ ] Dark theme looks stunning; light theme (if built) has no unreadable text.
- [ ] No console errors. No broken layouts at 360px, 768px, 1280px, 1920px.
- [ ] `Simulated demo` badge visible on AI Lab, bins, and tracking pages.
- [ ] README includes: how to run, demo script, and list of simulated vs real parts.

---

## 18. Build Order (follow this order)

1. **Phase 1 – Foundation:** Vite + React + TS + Tailwind, tokens, fonts, UI components, layout shell, routing, stores, seed data.
2. **Phase 2 – Landing page:** all 17 sections, animations, particles, phone mockup, ticker.
3. **Phase 3 – Login + App shell + Dashboard + Dispose.**
4. **Phase 4 – Simulator + Bins + Tracking + Fleet (maps, Haversine, trucks).**
5. **Phase 5 – Ledger (real hashing) + Marketplace + Listing detail.**
6. **Phase 6 – AI Segregation Lab.**
7. **Phase 7 – Rewards + Impact + Admin + Recycler portal.**
8. **Phase 8 – Revenue + Canvas + Notifications + Settings + About + 404.**
9. **Phase 9 – Presenter Mode, offline fallback, polish, responsive checks, accessibility, README.**

---

## 19. Demo Script for the Judges (3 minutes) – put in README

1. **(0:00)** Landing page: "Waste has value. Nobody connected it. We did." Show live ticker and journey scroll.
2. **(0:30)** Click Launch Demo → Generator → Dashboard. Show the numbers and the full bin.
3. **(0:50)** Dispose waste → confirm → show "Why this truck?" proof on Tracking.
4. **(1:20)** AI Lab: show the camera + gripper sorting.
5. **(1:45)** Ledger: add a block, then **tamper** → chain turns red → repair. "Nobody can cheat the record."
6. **(2:10)** Switch to Recycler → buy the batch on Marketplace.
7. **(2:30)** Switch to Admin → City Command Center + Revenue calculator.
8. **(2:50)** Closing line: **"Turning waste into worth with MyCop."**

---

## 20. Known Gaps in the Original Deck (fixed in this build)

- Pie chart numbers did not add up to 100% → fixed in Section 8.1.
- Deck says "Man based segregation" → treated as **AI/camera + robotic segregation** (with optional manual sorting as backup).
- Deck lists "CLAUD" → shown as **Cloud**.
- Slide numbers skip (9 shown as 10, 10 shown as 11) → not relevant to the website.
- "Gifts" as customer relationship → implemented as the **Rewards** system.
- Revenue figures are not in the deck → the calculator uses clearly labeled illustrative assumptions.
