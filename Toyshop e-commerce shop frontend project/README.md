# 🧸 ToyShop E-commerce React App

This is a  functional e-commerce only front-end web application for a toy shop built using **React.js**. It includes features such as category navigation, product listing, detailed product view, cart management, currency switching, and a multi-step checkout process.

---

 ##  Features

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
<img width="1897" height="864" alt="Screenshot 2025-07-23 171616" src="https://github.com/user-attachments/assets/b912df1b-0334-40d4-ad50-5a97575a09da" />
<img width="1911" height="789" alt="Screenshot 2025-07-23 171629" src="https://github.com/user-attachments/assets/2d3dde25-6094-4db6-b757-79bb7f633837" />
<img width="1915" height="867" alt="Screenshot 2025-07-23 171713" src="https://github.com/user-attachments/assets/c71f6744-63ba-42cd-b1e8-c995686d481e" />
<img width="1915" height="857" alt="Screenshot 2025-07-23 171739" src="https://github.com/user-attachments/assets/9ea320da-0940-47d2-8755-6bf89a353cb1" />
<img width="1896" height="859" alt="Screenshot 2025-07-23 171923" src="https://github.com/user-attachments/assets/0feba818-fc6d-4a4a-aa06-ecedb56f3431" />
<img width="1901" height="867" alt="Screenshot 2025-07-23 171909" src="https://github.com/user-attachments/assets/48bd94b5-bfdc-4eb3-a5df-43f69c7a7f1a" />
<img width="1896" height="686" alt="Screenshot 2025-07-23 171953" src="https://github.com/user-attachments/assets/df684c26-ef3d-42b9-b02c-c59200c49609" />
<img width="1912" height="859" alt="Screenshot 2025-07-23 171645" src="https://github.com/user-attachments/assets/0eff61fb-feb8-4d7b-a42a-3f56f6917ee2" />




---

## 🛠️ Installation & Setup

Clone the repo:
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


👤 Author
Ioane Meparishvili

📧 meparishvili.ioane.work@gmail.com
🔗 LinkedIn
