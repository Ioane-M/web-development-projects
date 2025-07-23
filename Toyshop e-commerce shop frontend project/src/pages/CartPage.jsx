import React from "react";
import { useCart } from "../components/CartLogic";
import { useNavigate } from "react-router-dom";
import "../css/CartPage.css";

const CartPage = () => {
  const {
    cartItems,
    addToCart,
    decreaseQty,
    cartItemCount,
    currency,
    exchangeRates,
    setCartItems,
  } = useCart();

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSizeChange = (item, newSize) => {
    if (item.size === newSize) return;

    const existingSameSize = cartItems.find(
      (ci) => ci.id === item.id && ci.size === newSize
    );

    
    const filtered = cartItems.filter(
      (ci) => !(ci.id === item.id && ci.size === item.size)
    );

    
    const updated = existingSameSize
      ? filtered.map((ci) =>
          ci.id === existingSameSize.id && ci.size === newSize
            ? { ...ci, quantity: ci.quantity + item.quantity }
            : ci
        )
      : [...filtered, { ...item, size: newSize }];

    setCartItems(updated);
  };

  return (
    <div className="cart-page">
      <h1>CART</h1>

      {cartItems.map((item) => (
        <div key={`${item.id}-${item.size}`} className="cart-row">
          <div className="info">
            <h1>{item.title}</h1>
            <p>
              {currency}
              {(item.price * exchangeRates[currency]).toFixed(2)}
            </p>

            <div className="size-select">
              <p>
                <strong>SIZE:</strong>
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
            </div>

            <div className="qty-controls">
              <button onClick={() => addToCart(item)}>+</button>
              <span>{item.quantity}</span>
              <button onClick={() => decreaseQty(item.id, item.size)}>-</button>
            </div>
          </div>
          <img src={item.image} alt={item.title} />
        </div>
      ))}

      <div className="summary">
        <h3>
          Total: {currency}
          {(total * exchangeRates[currency]).toFixed(2)}
        </h3>
        <button className="checkout" onClick={() => navigate("/shipping")}>
          CHECK OUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
