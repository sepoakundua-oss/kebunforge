# 🌱 KebunForge — Garden RPG Adventure

> **🔗 Live Demo:** [https://kebunforge.vercel.app](https://kebunforge.vercel.app)

KebunForge adalah game berkebun bergaya RPG yang menggabungkan simulasi berkebun dengan mekanik quest, crafting, leveling, dan leaderboard. Pemain memilih tipe kebun, menyelesaikan task untuk melawan hama, craft alat berkebun, dan membangun streak pertumbuhan harian.

---

## 📑 Daftar Isi

- [Tech Stack](#-tech-stack)
- [Arsitektur & Infrastruktur](#-arsitektur--infrastruktur)
- [Struktur Project](#-struktur-project)
- [Data Model & State Management](#-data-model--state-management)
- [Halaman & Fitur](#-halaman--fitur)
- [Sistem Game](#-sistem-game)
- [Theme & Styling](#-theme--styling)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Navigasi & User Flow](#-navigasi--user-flow)

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

> **Tidak ada backend.** Semua data adalah mock/in-memory via Zustand. Tidak ada database, tidak ada API routes, tidak ada autentikasi nyata. Dirancang sebagai demo frontend yang fully client-side.

---

## 🏗 Arsitektur & Infrastruktur

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

- **Static (SSG):** `/`, `/auth`, `/onboarding`, `/dashboard`, `/map`, `/activity`, `/garden`, `/inventory`, `/leaderboard`, `/rewards`, `/progress`, `/devices` — semua di-pre-render sebagai static HTML
- **Dynamic (SSR):** `/quest/[id]` — server-rendered on demand (parameterized route)
- **Client Hydration:** Semua page menggunakan `'use client'` directive, interaksi sepenuhnya client-side

### State Flow

```
User Action → Component → Zustand Store (set) → Re-render → UI Update
                  ↑                                    │
                  └────────── useKebunStore ────────────┘
```

Tidak ada async calls, tidak ada loading states, tidak ada error handling untuk network. Semua data tersedia instan dari store.

---

## 📁 Struktur Project

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
│   │   └── page.tsx              # 3-step wizard: pilih garden type → devices → ready
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
│   │   └── page.tsx              # Free guided activities: composting, pruning, dll
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
│   │   └── page.tsx              # HP shop: beli item dengan Harvest Points
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
│   ├── StreakBadge.tsx           # Growth streak counter dengan bloom animation
│   ├── HPBar.tsx                 # Level indicator + Harvest Points progress bar
│   └── DeviceStatus.tsx          # Device connection status badges
│
├── lib/
│   └── store.ts                  # Zustand global store (semua state app)
│
├── public/                       # Static assets (favicon, dll)
│
├── next.config.mjs               # Next.js config (minimal)
├── tailwind.config.ts            # Tailwind theme: custom colors, animations
├── postcss.config.mjs            # PostCSS: tailwindcss + autoprefixer
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies & scripts
└── README.md                     # ← Kamu di sini
```

---

## 📊 Data Model & State Management

### Zustand Store (`lib/store.ts`)

Seluruh state aplikasi disimpan dalam satu Zustand store bernama `useKebunStore`. Tidak ada persistence (data reset saat refresh).

### Types & Interfaces

```typescript
// Garden Types (4 pilihan di onboarding)
type GardenType = "tropical" | "desert" | "aquatic" | "forest";

// Activity Types (tipe task/quest)
type ActivityType = "planting" | "harvesting" | "weeding" | "watering"
                  | "composting" | "pruning" | "mulching";

// Difficulty Tiers
type Difficulty = "starter" | "easy" | "medium" | "hard" | "master";

// Material Types (resources dari quest)
type MaterialType = "seed" | "nutrient" | "compost" | "rare_seed" | "golden_fertilizer";

// Tool Slots (6 slot equipment)
type ToolSlot = "hand" | "soil" | "water" | "cut" | "protect" | "fertilizer";

// Rarity Tiers
type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";
```

### Core Interfaces

```typescript
interface User {
  userName: string;        // Nama pemain
  email: string;           // Email (mock)
  gardenType: GardenType;  // Tipe kebun pilihan
  level: number;           // Level = floor(harvestPoints / 500) + 1
  harvestPoints: number;   // XP equivalent
  streak: number;          // Harian streak counter
}

interface GardenStats {
  totalGrowth: number;     // Total growth points
  totalHarvests: number;   // Jumlah harvest
  plantsAlive: number;     // Tanaman hidup
  soilHealth: number;      // 0-100%
  sunlightHours: number;   // Jam sinar matahari
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
| `setUser(data)` | Set user info dari auth/onboarding |
| `completeTask(taskId)` | Tandai task selesai, tambah HP + materials |
| `craftTool(toolId)` | Kurangi materials, buka tool |
| `equipTool(toolId)` | Equip tool ke slot |
| `toggleDevice(deviceId)` | Connect/disconnect smart device |
| `buyReward(rewardId)` | Beli item dari reward shop |
| `updateStreak()` | Increment daily streak |

---

## 📄 Halaman & Fitur

### 1. Landing Page (`/`)
- Hero section dengan tagline "Cultivate Your Legend"
- 4 garden type cards (Tropical, Desert, Aquatic, Forest) dengan preview stats
- Fitur highlights (6 kartu)
- CTA ke `/auth`

### 2. Auth (`/auth`)
- Form: nama + email
- Mock authentication → set user state → redirect ke `/onboarding`

### 3. Onboarding (`/onboarding`)
- **Step 1:** Pilih Garden Type (4 opsi dengan deskripsi + stat bonuses)
- **Step 2:** Connect Devices (opsional, skip allowed)
- **Step 3:** Confirmation → redirect ke `/dashboard`

### 4. Dashboard (`/dashboard`)
- 4 stat cards: Plants Alive, Soil Health, Sunlight Hours, Water Level
- Recent tasks (3 terakhir)
- Connected devices status
- Growth streak badge
- Quick action buttons

### 5. Map / Task Board (`/map`)
- Filter tabs by ActivityType
- Grid of TaskCards
- Setiap card: icon, title, difficulty badge, HP reward, material reward
- Click → navigasi ke `/quest/[id]`

### 6. Quest Detail (`/quest/[id]`)
- **Phase 1 — Info:** Detail task, enemy info, rewards preview
- **Phase 2 — Battle:** Animasi "planting battle" (growing vs pest)
- **Phase 3 — Victory:** Reward summary, HP gained, materials earned
- AnimatePresence transitions antar phase

### 7. Activities (`/activity`)
- Guided garden activities: composting, pruning, mulching, watering
- Setiap activity: durasi, instruksi step-by-step, growth reward

### 8. Garden Health (`/garden`)
- Line chart: soil pH trend
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
- Podium: top 3 dengan avatar, nama, HP
- Ranked list: posisi 4-10
- Weekly reset indicator

### 11. Rewards (`/rewards`)
- Shop grid: items purchasable dengan HP
- Items: seed packs, tool blueprints, cosmetics, boost
- Buy button disabled jika HP tidak cukup

### 12. Progress (`/progress`)
- Stat bars: strength, stamina, agility (mapped ke gardening skills)
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

## ⚔️ Sistem Game

### Level System
```
Level = floor(HarvestPoints / 500) + 1
```
- Level 1: 0-499 HP
- Level 2: 500-999 HP
- Level 3: 1000-1499 HP
- dst.

### Garden Types & Bonuses

| Type | Bonus | Description |
|------|-------|------------|
| 🌴 Tropical | Growth +20% | Kebun tropis, tanaman tumbuh cepat |
| 🏜️ Desert | Protection +20% | Tahan hama, konservasi air |
| 🌊 Aquatic | Harvest +20% | Tanaman air, hasil melimpah |
| 🌲 Forest | Balanced +10% | Ekosistem hutan, semua stat bonus |

### Difficulty Tiers

| Tier | Enemy | HP Reward | Material Drop |
|------|-------|-----------|--------------|
| ⭐ Starter | Aphids | 50 HP | Seed x2 |
| ⭐⭐ Easy | Locusts | 100 HP | Seed x3, Nutrient x1 |
| ⭐⭐⭐ Medium | Drought | 200 HP | Compost x2, Rare Seed x1 |
| ⭐⭐⭐⭐ Hard | Weeds | 350 HP | Rare Seed x2, Nutrient x3 |
| ⭐⭐⭐⭐⭐ Master | Frost Dragon | 500 HP | Golden Fertilizer x1 |

### Crafting System

Tools membutuhkan material dari quest completion:

```
Recipe example:
  Golden Watering Can (Epic, water slot)
  ├── Rare Seed x3
  ├── Compost x5
  └── Golden Fertilizer x1
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

### Custom CSS Utilities (globals.css)

| Class | Description |
|-------|------------|
| `.glass` | Glassmorphism card (backdrop-blur + border) |
| `.glow-green` | Green shadow glow effect |
| `.glow-amber` | Amber shadow glow effect |
| `.grid-pattern` | Subtle background grid pattern |

### Responsive Breakpoints

- **Mobile:** Bottom tab navigation (5 items), stacked layouts
- **Desktop (md+):** Left sidebar (w-80), grid layouts (2-3 columns)
- **Large (lg+):** 3-4 column grids

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Install & Run

```bash
# Clone
git clone https://github.com/sepoakundua-oss/kebunforge.git
cd kebunforge

# Install dependencies
npm install

# Development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### Build & Production

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

### NPM Scripts

| Script | Command | Description |
|--------|---------|------------|
| `dev` | `next dev` | Development server dengan hot reload |
| `build` | `next build` | Production build (SSG + SSR) |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | ESLint check |

---

## 🌐 Deployment

### Vercel (Recommended)

Project sudah di-deploy ke Vercel:

```bash
# Deploy manual
npx vercel --prod

# Atau via Vercel Dashboard:
# 1. Import repo dari GitHub
# 2. Framework: Next.js (auto-detected)
# 3. Deploy
```

**Live URL:** [https://kebunforge.vercel.app](https://kebunforge.vercel.app)

### GitHub Repository

**Repo:** [https://github.com/sepoakundua-oss/kebunforge](https://github.com/sepoakundua-oss/kebunforge)

---

## 🔄 Navigasi & User Flow

```
                    ┌──────────┐
                    │ Landing  │ (/)
                    │  Page    │
                    └────┬─────┘
                         │ "Mulai Berkebun"
                         ▼
                    ┌──────────┐
                    │   Auth   │ (/auth)
                    │  Sign In │
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

## 📝 Catatan Teknis

- **No Backend:** Pure client-side SPA. Semua data mock di Zustand. Reset on refresh.
- **No Real Auth:** Email/name form hanya set state, tidak ada validasi server.
- **No Real Device Integration:** Smart devices adalah placeholder UI.
- **MiMo AI:** Deskripsi di UI saja, tidak ada integrasi AI aktual.
- **Responsive:** Desktop sidebar + mobile bottom bar, semua halaman fully responsive.
- **Animations:** Framer Motion `fadeUp`, `stagger`, `AnimatePresence` untuk page transitions dan quest battle phases.
