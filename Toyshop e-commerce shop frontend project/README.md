# 🧸 ToyShop E-commerce React App

This is a fully functional e-commerce web application for a toy shop built using **React.js**. It includes features such as category navigation, product listing, detailed product view, cart management, currency switching, and a multi-step checkout process.

---

## 🚀 ## 🚀 Features

### 1. Navigation Bar
- Links to categories: **All**, **Figures**, and **Plush**
- Currency switcher (supports $, €, ¥) with real-time price updates across the entire app
- Cart icon dynamically displays the number of items and opens a cart overlay
- Active category is clearly highlighted for improved navigation

### 2. Product Listing Page
- Dynamically displays products based on selected category
- Each product card includes an image, name, and dynamically updated price
- On hover, a green **"Add to Cart"** button appears
- Clicking on a product navigates to the detailed product view

### 3. Product Detail Page
- Large image preview with interactive thumbnail selection
- Required size selection before adding item to cart
- "Add to Cart" action updates cart overlay and application state using React Context

### 4. Cart Overlay & Cart Page
- Cart overlay displays selected items with quantity adjustment controls (+/–)
- **"View Bag"** navigates to a full cart page with detailed layout
- Accurate price calculations including quantity, selected currency, and totals

### 5. Shipping Info Page
- User form includes: Full Name, Email, Phone, Address, Zip Code, and Country
- **All fields are validated using Regular Expressions (Regex)** for format and completeness
- Real-time validation feedback improves user experience

### 6. Shipping Method Page
- Presents selectable shipping options such as **Standard** and **Express**
- Selection is required and stored in global state
- Seamless navigation to the next checkout step

### 7. Checkout Payment Page
- Includes form for credit/debit card details: Card Number, Expiry Date, CVV
- **Regex-based validation** ensures secure and correct input format
- On submission, simulates successful transaction and redirects to confirmation

### 8. Payment Confirmation Page
- Displays a **thank you** message upon successful checkout
- Shows a summary of all purchased items, quantities, and prices
- Includes a button to return to the homepage and reset cart state

### 9. Currency Switcher
- Real-time global currency update throughout the application
- Prices reflect selected currency on all pages including product listings, detail view, cart, and checkout



## 📸 Screenshots

> _Add screenshots of key pages here once uploaded._

---

## 🛠️ Installation & Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Ioane-M/web-development-projects/Toyshop-e-commerce-shop-frontend-project.git
   cd Toyshop-e-commerce-shop-frontend-project

Install dependencies:
npm install
Run the app:
npm start

Open http://localhost:3000 to view it in the browser.

🧪 Scripts
npm start: Run development server

npm run build: Build production version

npm test: Run tests (if configured)

npm run eject: Eject configuration (not recommended)

📚 Technologies Used
React.js (Create React App)

React Router

Context API for state management

CSS Modules / SCSS (optional depending on your setup)

📦 Folder Structure 
src/
│
├── components/
├── pages/
├── context/
├── assets/
├── App.js
└── index.js

👤 Author
Ioane Meparishvili

📧 meparishvili.ioane.work@gmail.com
🔗 LinkedIn
