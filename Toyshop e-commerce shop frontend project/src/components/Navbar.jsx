import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartLogic";
import "../css/Navbar.css";
 
const Navbar = () => {
  const [showCartOverlay, setShowCartOverlay] = useState(false);
  const {
    currency,
    setCurrency,
    cartItems,
    cartItemCount,
    addToCart,
    decreaseQty,
    exchangeRates,
    setCartItems, 
  } = useCart();
 
  const navigate = useNavigate();
 
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };
 
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
 
  const handleSizeChange = (item, newSize) => {
    if (item.size === newSize) return;
    const existing = cartItems.find(
      (ci) => ci.id === item.id && ci.size === newSize
    );
    const filtered = cartItems.filter(
      (ci) => !(ci.id === item.id && ci.size === item.size)
    );
    const updated = existing
      ? filtered.map((ci) =>
          ci.id === item.id && ci.size === newSize
            ? { ...ci, quantity: ci.quantity + item.quantity }
            : ci
        )
      : [...filtered, { ...item, size: newSize }];
    setCartItems(updated);
 
   
  };
 
  return (
    <nav className="navbar">
      <div className="nav-left">
        {["All", "Plush", "Figures"].map((category) => (
          <NavLink
            key={category}
            to={category === "All" ? "/" : `/${category}`}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {category}
          </NavLink>
        ))}
      </div>
      <div className="nav-center">
        <NavLink to="/">
          <img src="/a-logo.svg" alt="Logo" style={{ height: "40px" }} />
        </NavLink>
      </div>
 
      
      <div className="nav-right">
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="$">$ USD</option>
          <option value="€">€ EUR</option>
          <option value="₾">₾ GEL</option>
        </select>
 
        <div
          className="cart-container"
          onClick={() => setShowCartOverlay(!showCartOverlay)}
        >
          🛒
          {cartItemCount > 0 && (
            <span className="cart-count">{cartItemCount}</span>
          )}
        </div>
      </div>
 
      
      {showCartOverlay && (
        <div
          className="cart-backdrop"
          onClick={() => setShowCartOverlay(false)}
        >
          <div className="cart-overlay" onClick={(e) => e.stopPropagation()}>
            <p className="cart-title">
              <strong>My Bag</strong>, {cartItemCount} items
            </p>
 
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    <p className="item-name">{item.title}</p>
                    <p className="item-price">
                      {currency}
                      {(item.price * exchangeRates[currency]).toFixed(2)}
                    </p>
                    <div className="size-options">
                      {["XS", "S", "M", "L"].map((size) => (
                        <button
                          key={size}
                          className={`size-btn ${
                            item.size === size ? "selected" : ""
                          }`}
                          onClick={() => handleSizeChange(item, size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <div className="item-qty">
                      <button
                        className="qty-btn"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => decreaseQty(item.id, item.size)}
                      >
                        −
                      </button>
                    </div>
                  </div>
                  <img
                    className="item-image"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              ))
            )}

            <div className="cart-total">
              <span>Total</span>
              <span>
                {currency}
                {(total * exchangeRates[currency]).toFixed(2)}
              </span>
            </div>
 
            <div className="cart-buttons">
              <button
                className="view-bag"
                onClick={() => {
                  navigate("/cart");
                  setShowCartOverlay(false);
                }}
              >
                VIEW BAG
              </button>
              <button
                className="checkout"
                onClick={() => navigate("/shipping")}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
 
export default Navbar;