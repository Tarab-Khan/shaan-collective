<div align="center">

# 👑 THE SHAAN COLLECTIVE
### *Where Royalty Lives — Haute Couture, Heritage Ghararas & Royal Menswear*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

</div>

---

## ✦ Overview

**The Shaan Collective** is a luxury e-commerce platform crafted for haute couture ethnic fashion. The storefront delivers a regal user experience with dynamic gold aesthetics, velvet textures, interactive animations, description-aware smart filtering, live inventory synchronization, a full-featured testing Express backend, and an **Atelier Management Console (`/admin`)**.

---

## ✨ Key Features

### 1. ⚜️ Royal Storefront & Catalog Experience
- **Opening Animation**: Grand cinematic curtains and royal seal reveal powered by **GSAP**.
- **Collection Pages**:
  - **Women's Atelier**: Bridal, Wedding, Festive, and Party Ghararas & Lehengas.
  - **Men's Royal Collection**: Handcrafted Bandhgalas, Sherwanis, and Royal Jackets.
  - **Jewellery & Accessories**: Kundan, Polki, Heritage Necklaces, Footwear, Belts, and Stoles.
- **Smart 49-Item Pagination**: Centered `PAGE X OF Y` badges and intelligent range buttons.
- **Description-Aware Dynamic Filters**:
  - Automatically extracts categories, fabrics, colors, and occasions from newly added items.
  - Smart keyword matching across titles, tags, and product descriptions.
  - Dedicated **Apply Price** button preventing unwanted viewport jumps while entering numbers.

### 2. ⚡ Live Inventory & Stock Vault
- **Stock Status Badges**:
  - `✦ IN STOCK (X AVAILABLE)`
  - `⚡ ONLY X LEFT IN VAULT` (when stock $\le 3$)
  - `SOLD OUT` (when stock $= 0$, automatically disables purchase).
- **Automatic Stock Deduction**: Orders placed at checkout decrement backend inventory units in real-time.

### 3. 🔒 Seamless Checkout & Payment Simulation
- **Luxury Slide-over Navigation Drawer & Mobile Responsiveness**.
- **Interactive Size Guide & Size Selectors** across all apparel and accessories.
- **256-Bit Encrypted Payment Gateway Simulator**:
  - Supports **Credit/Debit Card**, **UPI / QR**, **Net Banking**, and **Concierge / COD**.
  - Simulates payment gateway validation, failure tests, and receipt issuance.
- **Royal Order Confirmation**: Generates custom order tracking IDs (e.g. `SC-2026-XXXXXX`) and transaction IDs.

### 4. ⚙️ Atelier Admin Portal (`/admin`)
- Accessible via the direct URL **`/admin`** or through the **Navbar drawer** and **Footer**.
- **Management Capabilities**:
  - **`+ ADD NEW ROYAL PIECE`**: Add new items with image uploads, tags, custom sizes, fabrics, and initial stock.
  - **Inline Stock Adjuster**: Increase or decrease stock quantity on the fly.
  - **Hero Banners Management**: Live preview and instant upload of header images for Home, Women, Men, Jewellery, and Accessories.
  - **Live Order & Stock Deduction Audit Log**: Real-time transaction history.
  - **Backend Server & API Vault Tab**: Live server health check, registered users, saved addresses, and payment logs.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19, React Router v7 |
| **Styling & Design System** | Tailwind CSS v4, Custom Royal Gold Palettes, Glassmorphism |
| **Motion & Animations** | GSAP (GreenSock Animation Platform) |
| **State Management** | React Context API (`ProductContext`, `CartContext`, `WishlistContext`) |
| **Backend API Server** | Node.js, Express 5, CORS |
| **Persistence** | Persistent JSON Store (`server/db.json`) + Client LocalStorage Fallback |
| **Build Tool** | Vite 8 |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd shaan-collective
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

### Running the Application

You can choose from several npm scripts:

| Command | Action | URL |
| :--- | :--- | :--- |
| `npm run dev:all` | **(Recommended)** Runs both Express backend & Vite frontend concurrently | Frontend: `http://localhost:5173`<br>Backend: `http://localhost:5000` |
| `npm run dev` | Runs Vite frontend development server only | `http://localhost:5173` |
| `npm run server` | Runs Express backend API server only | `http://localhost:5000` |
| `npm run build` | Builds the production bundle | `dist/` |
| `npm run preview` | Previews the production build locally | `http://localhost:4173` |

---

## 📡 REST API Endpoints

The testing Express backend (`server/server.js`) exposes the following endpoints:

### Authentication & Users
- `GET /api/health` — Server health status & database statistics
- `POST /api/auth/otp/send` — Request simulated OTP (Testing OTP: `1234`)
- `POST /api/auth/otp/verify` — Verify OTP & retrieve customer profile
- `POST /api/auth/register` — Register a new patron profile
- `PUT /api/auth/profile` — Update customer details
- `GET /api/auth/users` — List all registered users

### Addresses & Shipping
- `GET /api/addresses` — Fetch saved shipping addresses (filter by `?phone=`)
- `POST /api/addresses` — Save new shipping address

### Catalog & Inventory
- `GET /api/products` — Retrieve all product collections and hero banners
- `POST /api/products` — Add a new piece to inventory
- `PUT /api/products/:type/:id` — Update product details and stock units
- `DELETE /api/products/:type/:id` — Remove a piece from catalog
- `POST /api/products/reset` — Reset catalog to initial default placeholders

### Orders & Payment Simulation
- `POST /api/orders/checkout` — Place order, authorize payment & deduct stock
- `GET /api/orders` — List all placed orders with items and addresses
- `GET /api/payments` — Audit trail of payment transactions

---

## 📁 Project Directory Structure

```
shaan-collective/
├── .gitignore                  # Git ignore configuration
├── package.json                # Project dependencies & npm scripts
├── requirements.txt            # Environment requirements specification
├── vite.config.js              # Vite configuration
├── index.html                  # HTML entry point
│
├── server/                     # Express Testing Backend
│   ├── server.js               # REST API endpoints & gateway simulation
│   └── db.json                 # Persistent database storage
│
└── src/                        # React Frontend Source
    ├── assets/                 # High-resolution royal imagery & logos
    ├── components/             # Reusable UI Components
    │   ├── AuthModal.jsx       # OTP Authentication & Profile Modal
    │   ├── CatalogFilterSidebar.jsx # Smart Filter Sidebar with counts
    │   ├── CatalogTopBar.jsx   # Search & Sort Controls
    │   ├── Footer.jsx          # Royal Atelier Footer
    │   ├── GoldDecorations.jsx # SVGs, Flowers & Sparkles
    │   ├── Navbar.jsx          # Navigation Bar & Mobile Slide Drawer
    │   ├── OpeningAnimation.jsx# GSAP Royal Curtains Intro
    │   ├── Pagination.jsx      # 49-Items Page Navigator
    │   ├── ProductCard.jsx     # Luxury Product Grid Card
    │   └── SizeGuideModal.jsx  # Interactive Measurements Guide
    │
    ├── context/                # Context State Providers
    │   ├── CartContext.jsx     # Bag & Checkout State
    │   ├── ProductContext.jsx  # Dynamic Catalog & Inventory Store
    │   └── WishlistContext.jsx # Wishlist Management
    │
    ├── data/                   # Initial Placeholder & Seed Datasets
    │   ├── products.js         # Women Ghararas seed
    │   ├── menProducts.js      # Men Jackets seed
    │   ├── accessoryProducts.js# Accessories seed
    │   └── jewelleryProducts.js# Jewellery seed
    │
    ├── pages/                  # Route Pages
    │   ├── Main.jsx            # Home Page
    │   ├── Gharara.jsx         # Women Gharara Catalog
    │   ├── WomenCollection.jsx # Women Occasion Collections
    │   ├── Men.jsx             # Men Royal Catalog
    │   ├── MenCollection.jsx   # Men Occasion Collections
    │   ├── Jewellery.jsx       # Jewellery Catalog
    │   ├── Accessories.jsx     # Accessories Catalog
    │   ├── ProductDetails.jsx  # Gharara Details & Stock Indicator
    │   ├── MenDetails.jsx      # Men Jacket Details
    │   ├── AccessoryDetails.jsx# Accessory Details
    │   ├── JewelleryDetails.jsx# Jewellery Details
    │   ├── Cart.jsx            # Shopping Bag
    │   ├── Checkout.jsx        # Address & Contact Checkout
    │   ├── Payment.jsx         # 256-Bit Encrypted Payment Simulator
    │   ├── OrderSuccess.jsx    # Royal Order Confirmation Receipt
    │   ├── Wishlist.jsx        # Saved Favorites
    │   ├── AdminDashboard.jsx  # Atelier Management Console (/admin)
    │   ├── AboutUs.jsx         # Heritage & Atelier Story
    │   ├── ContactUs.jsx       # Concierge & Inquiries
    │   ├── Shipping.jsx        # Delivery Information
    │   └── SizeGuidePage.jsx   # Comprehensive Fitting Charts
    │
    └── services/
        └── api.js              # Centralized Frontend API Client
```

---

<div align="center">
  <sub>Handcrafted with devotion for <b>The Shaan Collective</b>. All rights reserved.</sub>
</div>
