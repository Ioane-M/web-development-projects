import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

import "../css/BreadCrumb.css";
import "../css/Success.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    shippingCost = 0,
    shippingMethod = "standard",
    shippingInfo,
  } = location.state || {};
  const { firstName, lastName } = shippingInfo || {};

  return (
    <div className="shipping-page">
      <div className="shipping-container">
        <div className="breadcrumb">
          <span className="done">Cart</span>
          <span>›</span>
          <span className="done">Details</span>
          <span>›</span>
          <span className="done">Shipping</span>
          <span>›</span>
          <span className="done">Payment</span>
        </div>

        <div className="main-content">
          <div className="form-section">
            <div className="section-title">
              <img src="/confirmed.svg" style={{ height: 50 }} alt="Success" />
              <h1>Payment Confirmed</h1>
              <h2>Order N {Math.floor(Math.random() * 9000 + 1000)}</h2>
              <p>
                {firstName && lastName
                  ? `Thank you, ${firstName} ${lastName}, for your purchase!`
                  : "Thank you for your purchase!"}
              </p>
            </div>

            <div className="button-group" style={{ marginTop: "40px" }}>
              <button className="back-button" onClick={() => navigate("/")}>
                Back to Shopping
              </button>
            </div>
          </div>

         
          <OrderSummary
            shippingCost={shippingCost}
            shippingMethod={shippingMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
