import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import "../css/ShippingMethodPage.css";
import "../css/ShippingInfoPage.css";
import "../css/BreadCrumb.css";
import { useCart } from "../components/CartLogic";

const ShippingMethodPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currency, exchangeRates } = useCart();
  const deliveryFeeUSD = 4.99;

  const getConvertedFee = () => {
    if (!exchangeRates || !exchangeRates[currency]) {
      return deliveryFeeUSD;
    }
    return deliveryFeeUSD;
  };

  const shippingInfo = location.state || {};

  const { firstName, lastName, address, city, postalCode, country } =
    shippingInfo;

  const [selectedMethod, setSelectedMethod] = useState("free");

  const shippingCost = selectedMethod === "express" ? getConvertedFee() : 0;

  const handleContinue = () => {
    navigate("/payment", {
      state: {
        shippingMethod: selectedMethod,
        shippingCost,
        shippingInfo,
      },
    });
  };

  const handleBack = () => {
    navigate("/shipping");
  };

  const formattedAddress = `${address}, ${city}, ${postalCode}, ${country}`;

  const displayConvertedFee = (() => {
    if (!exchangeRates || !exchangeRates[currency]) {
      return deliveryFeeUSD.toFixed(2);
    }
    return (deliveryFeeUSD * exchangeRates[currency]).toFixed(2);
  })();



  return (
    <div className="shipping-page">
      <div className="shipping-container">
        <div className="breadcrumb">
          <span className="done">Cart</span>
          <span>›</span>
          <span className="done">Details</span>
          <span>›</span>
          <span className="active">Shipping</span>
          <span>›</span>
          <span>Payment</span>
        </div>

        <div className="main-content">
          <div className="form-section">
            <div
              className="shipping-info-display"
              style={{ marginBottom: "30px" }}
            >
              <div className="contact-info">
                <h3>Contact Name</h3>
                <p>
                  {firstName && lastName
                    ? `${firstName} ${lastName}`
                    : "No contact info available"}
                </p>
              </div>
              <hr className="divider" />
              <div className="contact-info">
                <h3>Ship To</h3>
                <p>
                  {formattedAddress.trim() !== ", , ,"
                    ? formattedAddress
                    : "No address provided"}
                </p>
              </div>
            </div>

            <h2 className="section-title">Shipping Method</h2>

            <div className="shipping-method-options">
              <label
                style={{
                  display: "block",
                  marginBottom: "12px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  value="free"
                  checked={selectedMethod === "free"}
                  onChange={() => setSelectedMethod("free")}
                  style={{ marginRight: "10px" }}
                />
                Free Delivery
              </label>

              <label style={{ display: "block", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="shippingMethod"
                  value="express"
                  checked={selectedMethod === "express"}
                  onChange={() => setSelectedMethod("express")}
                  style={{ marginRight: "10px" }}
                />
                Express Delivery (+{displayConvertedFee} {currency})
              </label>
            </div>

            <div className="button-group" style={{ marginTop: "40px" }}>
              <button className="back-button" onClick={handleBack}>
                Back to shipping info
              </button>
              <button className="continue-button" onClick={handleContinue}>
                Continue to Payment
              </button>
            </div>
          </div>

          <OrderSummary
            shippingCost={shippingCost}
            shippingMethod={selectedMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingMethodPage;
