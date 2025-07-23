import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartLogic";
import "../css/ProductDetailPage.css";
import dummyProducts from "../data/ToyProductsData";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, currency, exchangeRates } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  const product = dummyProducts.find((p) => p.id === parseInt(id));
  if (!product) return <p>Product not found.</p>;

  const convertedPrice = product.price * exchangeRates[currency];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    addToCart({ ...product, size: selectedSize });
  };

  return (
    <div className="product-detail-page">
      <div className="product-images">
        <div className="thumbnails">
          {[1, 2, 3].map((_, i) => (
            <img
              key={i}
              src={product.image}
              alt={`thumb-${i}`}
              className="thumb-img"
            />
          ))}
        </div>
        <div className="main-image">
          <img src={product.image} alt={product.title} />
        </div>
      </div>

      <div className="product-info">
        <h2>{product.title}</h2>

        <div className="size-select">
          <p>
            <strong>SIZE:</strong>
          </p>
          <div className="size-options">
            {["XS", "S", "M", "L"].map((size) => (
              <button
                key={size}
                className={`size-btn ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <h2>Price:</h2>
        <p className="price">
          {currency}
          {convertedPrice.toFixed(2)}
        </p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          ADD TO CART
        </button>

        <h3>{product.description}</h3>
      </div>
    </div>
  );
};

export default ProductDetailPage;
