import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

import "../css/BreadCrumb.css";
import "../css/Payment.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { shippingInfo, shippingMethod, shippingCost } = location.state || {};
  const { firstName, lastName, address, city, postalCode, country } =
    shippingInfo || {};

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    holderName: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

// we use a regex pattern to validate card numbers
// and the Luhn algorithm to check if the card number is valid. so to go to next page you sould put valid card number
  const cardPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  };

  
  const validateCardNumber = (number) => {
    const cleanNumber = number.replace(/\s/g, "");

    
    const isValidPattern = Object.values(cardPatterns).some((pattern) =>
      pattern.test(cleanNumber)
    );

    if (!isValidPattern) return false;

    
    return luhnCheck(cleanNumber);
  };

  const luhnCheck = (number) => {
    let sum = 0;
    let isEven = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const validateHolderName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const validateExpiry = (expiry) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiry)) return false;

    const [month, year] = expiry.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expYear = parseInt(year);
    const expMonth = parseInt(month);

    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth)
    ) {
      return false;
    }

    return true;
  };

  const validateCVV = (cvv, cardNumber) => {
    const cleanCardNumber = cardNumber.replace(/\s/g, "");

    
    if (cardPatterns.amex.test(cleanCardNumber)) {
      return /^[0-9]{4}$/.test(cvv);
    } else {
      return /^[0-9]{3}$/.test(cvv);
    }
  };

  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, "");

    for (const [type, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(cleanNumber)) {
        return type;
      }
    }
    return null;
  };

  const formatCardNumber = (value) => {
    const cleanValue = value.replace(/\s/g, "");
    const cardType = getCardType(cleanValue);

    
    if (cardType === "amex") {
      return cleanValue.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
    } else {
      return cleanValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
  };

  const formatExpiry = (value) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length >= 2) {
      return cleanValue.substring(0, 2) + "/" + cleanValue.substring(2, 4);
    }
    return cleanValue;
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "cardNumber":
        if (!value.trim()) {
          newErrors.cardNumber = "Card number is required";
        } else if (!validateCardNumber(value)) {
          newErrors.cardNumber = "Invalid card number";
        } else {
          delete newErrors.cardNumber;
        }
        break;

      case "holderName":
        if (!value.trim()) {
          newErrors.holderName = "Cardholder name is required";
        } else if (!validateHolderName(value)) {
          newErrors.holderName = "Invalid cardholder name";
        } else {
          delete newErrors.holderName;
        }
        break;

      case "expiry":
        if (!value.trim()) {
          newErrors.expiry = "Expiry date is required";
        } else if (!validateExpiry(value)) {
          newErrors.expiry = "Invalid or expired date";
        } else {
          delete newErrors.expiry;
        }
        break;

      case "cvv":
        if (!value.trim()) {
          newErrors.cvv = "CVV is required";
        } else if (!validateCVV(value, paymentInfo.cardNumber)) {
          newErrors.cvv = "Invalid CVV";
        } else {
          delete newErrors.cvv;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    
    switch (name) {
      case "cardNumber":
        formattedValue = formatCardNumber(value);
        // Limit length based on card type
        const cardType = getCardType(value);
        const maxLength = cardType === "amex" ? 17 : 19; // Including spaces
        if (formattedValue.length > maxLength) return;
        break;

      case "holderName":
        // Only allow letters and spaces
        formattedValue = value.replace(/[^a-zA-Z\s]/g, "");
        if (formattedValue.length > 50) return;
        break;

      case "expiry":
        formattedValue = formatExpiry(value);
        if (formattedValue.length > 5) return;
        break;

      case "cvv":
        // Only allow numbers
        formattedValue = value.replace(/\D/g, "");
        const currentCardType = getCardType(paymentInfo.cardNumber);
        const maxCvvLength = currentCardType === "amex" ? 4 : 3;
        if (formattedValue.length > maxCvvLength) return;
        break;

      default:
        break;
    }

    setPaymentInfo((prev) => ({ ...prev, [name]: formattedValue }));

    
    validateField(name, formattedValue);
  };

  const handleSubmit = () => {
    
    const fieldsToValidate = ["cardNumber", "holderName", "expiry", "cvv"];
    fieldsToValidate.forEach((field) => {
      validateField(field, paymentInfo[field]);
    });

    
    const hasErrors =
      Object.keys(errors).length > 0 ||
      !paymentInfo.cardNumber ||
      !paymentInfo.holderName ||
      !paymentInfo.expiry ||
      !paymentInfo.cvv;

    if (hasErrors) {
      console.log("Please fix validation errors before submitting");
      return;
    }

    console.log("Payment submitted", paymentInfo);
    navigate("/success", {
      state: { shippingCost, shippingMethod, shippingInfo },
    });
  };

  const formattedAddress = `${address}, ${city}, ${postalCode}, ${country}`;

  return (
    <div className="shipping-page">
      <div className="shipping-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="done">Cart</span>
          <span>›</span>
          <span className="done">Details</span>
          <span>›</span>
          <span className="done">Shipping</span>
          <span>›</span>
          <span className="active">Payment</span>
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
              <hr className="divider" />
              <div className="contact-info">
                <h3>Delivery Method</h3>
                <p>
                  {shippingMethod === "express"
                    ? `Express Delivery (+${shippingCost.toFixed(2)})`
                    : "Free Delivery"}
                </p>
              </div>
            </div>

            <h2 className="section-title">Payment Method</h2>

            <div className="payment-method-box">
              <div className="payment-header">
                <div className="card-image-and-header">
                  <img
                    src="/credit-card.png"
                    style={{ height: 24 }}
                    alt="Credit Card"
                  />
                  Credit Card
                  {getCardType(paymentInfo.cardNumber) && (
                    <span
                      style={{
                        marginLeft: "10px",
                        textTransform: "capitalize",
                      }}
                    >
                      ({getCardType(paymentInfo.cardNumber)})
                    </span>
                  )}
                </div>
              </div>
              <div className="card-form">
                <div>
                  <input
                    type="text"
                    name="cardNumber"
                    className={`form-input ${errors.cardNumber ? "error" : ""}`}
                    placeholder="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={handleChange}
                  />
                  {errors.cardNumber && (
                    <div className="error-message">{errors.cardNumber}</div>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="holderName"
                    className={`form-input ${errors.holderName ? "error" : ""}`}
                    placeholder="Cardholder Name"
                    value={paymentInfo.holderName}
                    onChange={handleChange}
                  />
                  {errors.holderName && (
                    <div className="error-message">{errors.holderName}</div>
                  )}
                </div>

                <div className="row">
                  <div>
                    <input
                      type="text"
                      name="expiry"
                      className={`form-input ${errors.expiry ? "error" : ""}`}
                      placeholder="MM/YY"
                      value={paymentInfo.expiry}
                      onChange={handleChange}
                    />
                    {errors.expiry && (
                      <div className="error-message">{errors.expiry}</div>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="cvv"
                      className={`form-input ${errors.cvv ? "error" : ""}`}
                      placeholder="CVV"
                      value={paymentInfo.cvv}
                      onChange={handleChange}
                    />
                    {errors.cvv && (
                      <div className="error-message">{errors.cvv}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="button-group" style={{ marginTop: "40px" }}>
              <button
                className="back-button"
                onClick={() => navigate("/shipping-method")}
              >
                Back
              </button>
              <button className="continue-button" onClick={handleSubmit}>
                Complete Payment
              </button>
            </div>
          </div>

          {/* Right Side */}
          <OrderSummary
            shippingCost={shippingCost}
            shippingMethod={shippingMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
