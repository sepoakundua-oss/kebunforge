# 🌱 KebunForge — Garden RPG Adventure

> **🔗 Live Demo:** [https://kebunforge.vercel.app](https://kebunforge.vercel.app)

KebunForge is a gamified gardening RPG that combines farming simulation with quest mechanics, tool crafting, leveling, and leaderboards. Players choose a garden type, complete tasks to battle pests, craft gardening tools, and build daily growth streaks.

---

## 📑 Table of Contents

- [Tech Stack](#-tech-stack)
- [Infrastructure & Architecture](#-infrastructure--architecture)
- [Project Structure](#-project-structure)
- [Data Model & State Management](#-data-model--state-management)
- [Pages & Features](#-pages--features)
- [Game Systems](#-game-systems)
- [Theme & Styling](#-theme--styling)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Navigation & User Flow](#-navigation--user-flow)
- [Technical Notes](#-technical-notes)

---

## 🛠 Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js (App Router) | 14.2.21 | SSR/SSG, file-based routing |
| **Language** | TypeScript | 5.x | Type safety, DX |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS |
| **State** | Zustand | 5.0.13 | Global client-side store |
| **Animation** | Framer Motion | 12.x | Page transitions, micro-interactions |
| **Icons** | Lucide React | 0.460 | Icon library |
| **CSS Processing** | PostCSS + Autoprefixer | 8.x / 10.x | Tailwind compilation |
| **Deployment** | Vercel | — | Zero-config Next.js hosting |

> **No backend.** All data is mock/in-memory via Zustand. No database, no API routes, no real authentication. Designed as a fully client-side frontend demo.

---

## 🏗 Infrastructure & Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Vercel Edge/CDN                    │
│  ┌─────────────────────────────────────────────────┐ │
│  │           Next.js 14 (App Router)               │ │
│  │                                                  │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │ │
│  │  │  Pages   │  │Components│  │  Zustand     │  │ │
│  │  │ (app/)   │←→│(shared)  │←→│  Store       │  │ │
│  │  │          │  │          │  │  (lib/)      │  │ │
│  │  └──────────┘  └──────────┘  └──────────────┘  │ │
│  │         ↕              ↕                         │ │
│  │  ┌──────────────────────────────────────────┐   │ │
│  │  │         Tailwind + CSS Variables         │   │ │
│  │  │         Framer Motion Animations         │   │ │
│  │  └──────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
         │
         │ Client-side only (no API calls)
         ▼
   Browser (React SPA)
```

### Rendering Strategy

- **Static (SSG):** `/`, `/auth`, `/onboarding`, `/dashboard`, `/map`, `/activity`, `/garden`, `/inventory`, `/leaderboard`, `/rewards`, `/progress`, `/devices` — all pre-rendered as static HTML
- **Dynamic (SSR):** `/quest/[id]` — server-rendered on demand (parameterized route)
- **Client Hydration:** All pages use the `'use client'` directive; all interactivity is client-side

### State Flow

```
User Action → Component → Zustand Store (set) → Re-render → UI Update
                  ↑                                    │
                  └────────── useKebunStore ────────────┘
```

No async calls, no loading states, no network error handling. All data is instantly available from the store.

---

## 📁 Project Structure

```
kebunforge/
│
├── app/                          # Next.js App Router (pages)
│   ├── layout.tsx                # Root layout: HTML shell, font, metadata
│   ├── page.tsx                  # Landing page: hero, features, class preview
│   ├── globals.css               # CSS variables, theme, utility classes
│   │
│   ├── auth/
│   │   └── page.tsx              # Sign in form (name + email, mock auth)
│   │
│   ├── onboarding/
│   │   └── page.tsx              # 3-step wizard: garden type → devices → ready
│   │
│   ├── dashboard/
│   │   └── page.tsx              # Main hub: 4 stat cards, recent tasks, devices
│   │
│   ├── map/
│   │   └── page.tsx              # Task board: filter by type, grid of TaskCards
│   │
│   ├── quest/
│   │   └── [id]/
│   │       └── page.tsx          # Quest detail: 3-phase (info → battle → victory)
│   │
│   ├── activity/
│   │   └── page.tsx              # Free guided activities: composting, pruning, etc.
│   │
│   ├── garden/
│   │   └── page.tsx              # Garden health: soil pH, sunlight, water charts
│   │
│   ├── inventory/
│   │   └── page.tsx              # Tool crafting: recipe grid, equip toggle
│   │
│   ├── leaderboard/
│   │   └── page.tsx              # Weekly rankings: podium top 3 + list
│   │
│   ├── rewards/
│   │   └── page.tsx              # HP shop: purchase items with Harvest Points
│   │
│   ├── progress/
│   │   └── page.tsx              # Growth charts, harvest counter, streak calendar
│   │
│   └── devices/
│       └── page.tsx              # Smart garden device hub (connect/disconnect)
│
├── components/                   # Shared reusable components
│   ├── NavBar.tsx                # Sidebar (desktop, w-20) + bottom tab bar (mobile)
│   ├── TaskCard.tsx              # Task card: icon, difficulty badge, rewards
│   ├── StreakBadge.tsx           # Growth streak counter with bloom animation
│   ├── HPBar.tsx                 # Level indicator + Harvest Points progress bar
│   └── DeviceStatus.tsx          # Device connection status badges
│
├── lib/
│   └── store.ts                  # Zustand global store (all app state)
│
├── public/                       # Static assets (favicon, etc.)
│
├── next.config.mjs               # Next.js config (minimal)
├── tailwind.config.ts            # Tailwind theme: custom colors, animations
├── postcss.config.mjs            # PostCSS: tailwindcss + autoprefixer
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies & scripts
└── README.md                     # ← You are here
```

---

## 📊 Data Model & State Management

### Zustand Store (`lib/store.ts`)

All application state lives in a single Zustand store called `useKebunStore`. There is no persistence — data resets on page refresh.

### Types & Interfaces

```typescript
// Garden Types (4 choices during onboarding)
type GardenType = "tropical" | "desert" | "aquatic" | "forest";

// Activity Types (task/quest categories)
type ActivityType = "planting" | "harvesting" | "weeding" | "watering"
                  | "composting" | "pruning" | "mulching";

// Difficulty Tiers
type Difficulty = "starter" | "easy" | "medium" | "hard" | "master";

// Material Types (resources earned from quests)
type MaterialType = "seed" | "nutrient" | "compost" | "rare_seed" | "golden_fertilizer";

// Tool Slots (6 equipment slots)
type ToolSlot = "hand" | "soil" | "water" | "cut" | "protect" | "fertilizer";

// Rarity Tiers
type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";
```

### Core Interfaces

```typescript
interface User {
  userName: string;        // Player name
  email: string;           // Email (mock)
  gardenType: GardenType;  // Selected garden type
  level: number;           // Level = floor(harvestPoints / 500) + 1
  harvestPoints: number;   // XP equivalent
  streak: number;          // Daily streak counter
}

interface GardenStats {
  totalGrowth: number;     // Total growth points accumulated
  totalHarvests: number;   // Number of harvests completed
  plantsAlive: number;     // Currently living plants
  soilHealth: number;      // 0-100%
  sunlightHours: number;   // Hours of sunlight
  waterLevel: number;      // 0-100%
}

interface Task {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  difficulty: Difficulty;
  hpReward: number;           // Harvest Points reward
  materialReward: { type: MaterialType; amount: number }[];
  duration: string;           // e.g. "15 min"
  growthPoints: number;
  completed: boolean;
  locked: boolean;
}

interface Tool {
  id: string;
  name: string;
  slot: ToolSlot;
  rarity: Rarity;
  stats: { growth: number; harvest: number; protection: number };
  crafted: boolean;
  equipped: boolean;
  recipe: { type: MaterialType; amount: number }[];
}

interface Material {
  type: MaterialType;
  name: string;
  icon: string;
  count: number;
}

interface Device {
  id: string;
  name: string;
  model: string;
  connected: boolean;
  battery?: number;
}

interface RewardItem {
  id: string;
  name: string;
  description: string;
  cost: number;              // HP cost
  icon: string;
  owned: boolean;
}
```

### Store Actions

| Action | Description |
|--------|------------|
| `setUser(data)` | Set user info from auth/onboarding |
| `completeTask(taskId)` | Mark task complete, add HP + materials |
| `craftTool(toolId)` | Deduct materials, unlock tool |
| `equipTool(toolId)` | Equip tool to slot |
| `toggleDevice(deviceId)` | Connect/disconnect smart device |
| `buyReward(rewardId)` | Purchase item from reward shop |
| `updateStreak()` | Increment daily streak |

---

## 📄 Pages & Features

### 1. Landing Page (`/`)
- Hero section with tagline "Cultivate Your Legend"
- 4 garden type cards (Tropical, Desert, Aquatic, Forest) with stat previews
- Feature highlights (6 cards)
- CTA to `/auth`

### 2. Auth (`/auth`)
- Form: name + email
- Mock authentication → sets user state → redirects to `/onboarding`

### 3. Onboarding (`/onboarding`)
- **Step 1:** Choose Garden Type (4 options with descriptions + stat bonuses)
- **Step 2:** Connect Devices (optional, skippable)
- **Step 3:** Confirmation → redirects to `/dashboard`

### 4. Dashboard (`/dashboard`)
- 4 stat cards: Plants Alive, Soil Health, Sunlight Hours, Water Level
- Recent tasks (last 3)
- Connected devices status
- Growth streak badge
- Quick action buttons

### 5. Map / Task Board (`/map`)
- Filter tabs by ActivityType
- Grid of TaskCards
- Each card: icon, title, difficulty badge, HP reward, material reward
- Click → navigates to `/quest/[id]`

### 6. Quest Detail (`/quest/[id]`)
- **Phase 1 — Info:** Task details, enemy info, rewards preview
- **Phase 2 — Battle:** Animated "planting battle" (growing vs. pest)
- **Phase 3 — Victory:** Reward summary, HP gained, materials earned
- AnimatePresence transitions between phases

### 7. Activities (`/activity`)
- Guided garden activities: composting, pruning, mulching, watering
- Each activity: duration, step-by-step instructions, growth reward

### 8. Garden Health (`/garden`)
- Line chart: soil pH trend over time
- Bar chart: sunlight hours & water level
- Overall garden health score
- MiMo AI garden advisor placeholder

### 9. Inventory (`/inventory`)
- Grid of tools (crafted & uncrafted)
- Click uncrafted → recipe modal (material requirements + craft button)
- Click crafted → equip/unequip toggle
- Material counter sidebar
- Rarity color coding

### 10. Leaderboard (`/leaderboard`)
- Podium: top 3 with avatar, name, HP
- Ranked list: positions 4–10
- Weekly reset indicator

### 11. Rewards (`/rewards`)
- Shop grid: items purchasable with HP
- Items: seed packs, tool blueprints, cosmetics, boosts
- Buy button disabled when HP insufficient

### 12. Progress (`/progress`)
- Stat bars: strength, stamina, agility (mapped to gardening skills)
- Harvest history chart
- Growth streak calendar view
- Level progression

### 13. Devices (`/devices`)
- 4 smart garden devices:
  - Soil Sensor Pro
  - Moisture Meter 3
  - Grow Light X
  - Auto Water System
- Connect/disconnect toggle per device
- Battery level indicator

---

## ⚔️ Game Systems

### Level System
```
Level = floor(HarvestPoints / 500) + 1
```
- Level 1: 0–499 HP
- Level 2: 500–999 HP
- Level 3: 1000–1499 HP
- And so on...

### Garden Types & Bonuses

| Type | Bonus | Description |
|------|-------|------------|
| 🌴 Tropical | Growth +20% | Tropical garden, fast plant growth |
| 🏜️ Desert | Protection +20% | Pest resistant, water conservation |
| 🌊 Aquatic | Harvest +20% | Water plants, abundant yields |
| 🌲 Forest | Balanced +10% | Forest ecosystem, all-stat bonus |

### Difficulty Tiers

| Tier | Enemy | HP Reward | Material Drop |
|------|-------|-----------|--------------|
| ⭐ Starter | Aphids | 50 HP | Seed ×2 |
| ⭐⭐ Easy | Locusts | 100 HP | Seed ×3, Nutrient ×1 |
| ⭐⭐⭐ Medium | Drought | 200 HP | Compost ×2, Rare Seed ×1 |
| ⭐⭐⭐⭐ Hard | Weeds | 350 HP | Rare Seed ×2, Nutrient ×3 |
| ⭐⭐⭐⭐⭐ Master | Frost Dragon | 500 HP | Golden Fertilizer ×1 |

### Crafting System

Tools require materials earned from quest completion:

```
Recipe Example:
  Golden Watering Can (Epic, water slot)
  ├── Rare Seed ×3
  ├── Compost ×5
  └── Golden Fertilizer ×1
  → Stats: Growth +15, Harvest +10, Protection +5
```

### Rarity Colors

| Rarity | Color | Drop Rate |
|--------|-------|-----------|
| Common | Gray | 40% |
| Uncommon | Green | 30% |
| Rare | Blue | 18% |
| Epic | Purple | 9% |
| Legendary | Gold | 3% |

---

## 🎨 Theme & Styling

### Color Palette

```css
/* Primary — Green nature tones */
--green-500: #10b981;     /* Primary action */
--green-600: #059669;     /* Primary hover */
--green-700: #047857;     /* Emphasis */

/* Secondary — Amber sunlight */
--amber-500: #f59e0b;     /* Accent, rewards */
--amber-600: #d97706;     /* Accent hover */

/* Background — Dark green-tinted */
--bg-primary: #0a0f0d;    /* Page background */
--bg-secondary: #111a15;  /* Card background */
--bg-tertiary: #1a2820;   /* Elevated surfaces */

/* Glow Effects */
--glow-green: 0 0 20px rgba(16, 185, 129, 0.3);
--glow-amber: 0 0 20px rgba(245, 158, 11, 0.3);
```

### Custom CSS Utilities (`globals.css`)

| Class | Description |
|-------|------------|
| `.glass` | Glassmorphism card (backdrop-blur + border) |
| `.glow-green` | Green shadow glow effect |
| `.glow-amber` | Amber shadow glow effect |
| `.grid-pattern` | Subtle background grid pattern |

### Responsive Breakpoints

- **Mobile:** Bottom tab navigation (5 items), stacked layouts
- **Desktop (md+):** Left sidebar (w-80), grid layouts (2–3 columns)
- **Large (lg+):** 3–4 column grids

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Install & Run

```bash
# Clone the repository
git clone https://github.com/sepoakundua-oss/kebunforge.git
cd kebunforge

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

### NPM Scripts

| Script | Command | Description |
|--------|---------|------------|
| `dev` | `next dev` | Development server with hot reload |
| `build` | `next build` | Production build (SSG + SSR) |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | ESLint check |

---

## 🌐 Deployment

### Vercel (Recommended)

The project is deployed to Vercel:

```bash
# Deploy manually
npx vercel --prod

# Or via Vercel Dashboard:
# 1. Import repository from GitHub
# 2. Framework: Next.js (auto-detected)
# 3. Deploy
```

**Live URL:** [https://kebunforge.vercel.app](https://kebunforge.vercel.app)

### GitHub Repository

**Repo:** [https://github.com/sepoakundua-oss/kebunforge](https://github.com/sepoakundua-oss/kebunforge)

---

## 🔄 Navigation & User Flow

```
                    ┌──────────┐
                    │ Landing  │ (/)
                    │   Page   │
                    └────┬─────┘
                         │ "Start Farming"
                         ▼
                    ┌──────────┐
                    │   Auth   │ (/auth)
                    │ Sign In  │
                    └────┬─────┘
                         │
                         ▼
                    ┌──────────┐
                    │Onboarding│ (/onboarding)
                    │ 3 Steps  │
                    └────┬─────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │Dashboard │  │   Map    │  │ Activity │
    │  (Hub)   │→ │ (Tasks)  │→ │(Guided)  │
    └────┬─────┘  └────┬─────┘  └──────────┘
         │              │
         │              ▼
         │        ┌──────────┐
         │        │  Quest   │ (/quest/[id])
         │        │  Battle  │
         │        └──────────┘
         │
    ┌────┼────┬────────┬────────┬────────┐
    ▼    ▼    ▼        ▼        ▼        ▼
 Garden Inv. Leader. Rewards Progress Devices
  HP    Craft  Rank    Shop    Stats    IoT
```

### NavBar Links (Desktop Sidebar / Mobile Bottom Bar)

| # | Icon | Label | Route |
|---|------|-------|-------|
| 1 | 🏠 | Dashboard | `/dashboard` |
| 2 | 🗺️ | Quests | `/map` |
| 3 | 🌿 | Activity | `/activity` |
| 4 | 🔧 | Gear | `/inventory` |
| 5 | 🏆 | Rank | `/leaderboard` |
| 6 | 📊 | Stats | `/progress` |
| 7 | 📱 | Devices | `/devices` |

---

## 📝 Technical Notes

- **No Backend:** Purely client-side SPA. All data is mock state in Zustand. Resets on refresh.
- **No Real Auth:** Email/name form only sets state — no server-side validation.
- **No Real Device Integration:** Smart devices are placeholder UI.
- **MiMo AI:** Described in UI only — no actual AI integration.
- **Responsive:** Desktop sidebar + mobile bottom bar; all pages are fully responsive.
- **Animations:** Framer Motion `fadeUp`, `stagger`, and `AnimatePresence` for page transitions and quest battle phases.

---

## 📄 License

MIT
