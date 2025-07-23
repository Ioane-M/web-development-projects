import React, { useState } from "react";
import ProductCard from "../components/Card";
import "../css/ProductPage.css";
import dummyProducts from "../data/ToyProductsData";

const ProductPage = ({ category }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const filteredProducts = category
    ? dummyProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
    : dummyProducts;

  return (
    <div className="product-page">
      <h2>{category ? `${category}` : "All Products"}</h2>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
