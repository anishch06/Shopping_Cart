# Paradise Nursery

Paradise Nursery is an online houseplant shop built with React, Vite and Redux Toolkit.
Browse plants by category, add them to a cart, adjust quantities and see live totals.

## Features
- Landing page with company name, About Us section and a "Get Started" button
- 18 houseplants in 3 categories (Air Purifying, Low Light, Pet Friendly), each with thumbnail, name, description and price
- "Add to Cart" buttons that disable once a plant is in the cart
- Navbar on the Plants and Cart pages (Home, Plants, Cart) with a live item count
- Cart page with per-plant subtotal, overall total, +/- quantity buttons, delete, Checkout ("Coming Soon") and Continue Shopping

## Run locally
```bash
npm install
npm run dev
```

## Project structure
```
src/
  main.jsx        app entry, Redux Provider
  store.js        Redux store
  CartSlice.jsx   cart reducer (addItem, removeItem, updateQuantity)
  App.jsx         landing page + page switching
  AboutUs.jsx     company description
  ProductList.jsx plant listing with navbar
  CartItem.jsx    shopping cart page
  App.css         styles and landing background
```
