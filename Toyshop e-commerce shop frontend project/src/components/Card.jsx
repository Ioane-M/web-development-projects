import React from "react";
import { useCart } from "./CartLogic";
import "../css/ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, currency, exchangeRates } = useCart();
  const navigate = useNavigate();

  const convertedPrice = product.price * exchangeRates[currency];

  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={product.image}
          alt={product.title}
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ cursor: "pointer" }}
        />
        <button className="cart-icon" onClick={() => addToCart(product)}>
          <img src="/cart-svg.svg" style={{ filter: "invert(100%)" }} />
        </button>
      </div>
      <div onClick={() => navigate(`/product/${product.id}`)}></div>
      <h3>{product.title}</h3>
      <p>
        {currency}
        {convertedPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
