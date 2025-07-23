import React, { useState } from "react";
import { useCart } from "../components/CartLogic";
import { useNavigate } from "react-router-dom";
import "../css/ShippingInfoPage.css";
import "../css/BreadCrumb.css";
import OrderSummary from "../components/OrderSummary";

const ShippingPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    contact: "",
    firstName: "",
    lastName: "",
    address: "",
    shippingNote: "",
    city: "",
    postalCode: "",
    country: "Italy",
    saveInfo: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s\-]{7,15}$/; 
  const postalCodeRegex = /^[A-Za-z0-9\s\-]{3,10}$/; 

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  
  const validateForm = () => {
    const newErrors = {};

    
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact is required";
    } else if (
      !emailRegex.test(formData.contact.trim()) &&
      !phoneRegex.test(formData.contact.trim())
    ) {
      newErrors.contact = "Enter valid email or phone number";
    }

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!postalCodeRegex.test(formData.postalCode.trim())) {
      newErrors.postalCode = "Invalid postal code format";
    }

    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const handleGoToShipping = () => {
    if (validateForm()) {
      navigate("/shipping-method", { state: formData });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  

  return (
    <div className="shipping-page">
      <div className="shipping-container">
        
        <div className="breadcrumb">
          <span className="done">Cart</span>
          <span>›</span>
          <span className="active">Details</span>
          <span>›</span>
          <span>Shipping</span>
          <span>›</span>
          <span>Payment</span>
        </div>

        <div className="main-content">
          <div className="form-section">
            <div className="contact-section">
              <h2 className="section-title">Contact</h2>
              <input
                type="text"
                name="contact"
                className="form-input"
                placeholder="Email or mobile phone number"
                value={formData.contact}
                onChange={handleInputChange}
              />
              {errors.contact && <p className="error-text">{errors.contact}</p>}
            </div>

            
            <div className="shipping-address-section">
              <h2 className="section-title">Shipping Address</h2>

              
              <div className="name-row">
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  placeholder="Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <p className="error-text">{errors.firstName}</p>
                )}
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  placeholder="Second Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <p className="error-text">{errors.lastName}</p>
                )}
              </div>

              
              <div className="field-group">
                <input
                  type="text"
                  name="address"
                  className="form-input"
                  placeholder="Address and number"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {errors.address && (
                  <p className="error-text">{errors.address}</p>
                )}
              </div>

              
              <div className="field-group">
                <input
                  type="text"
                  name="shippingNote"
                  className="form-input"
                  placeholder="Shipping note (optional)"
                  value={formData.shippingNote}
                  onChange={handleInputChange}
                />
              </div>

              
              <div className="address-row">
                <input
                  type="text"
                  name="city"
                  className="form-input"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                {errors.city && <p className="error-text">{errors.city}</p>}
                <input
                  type="text"
                  name="postalCode"
                  className="form-input"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
                {errors.postalCode && (
                  <p className="error-text">{errors.postalCode}</p>
                )}
              </div>

              
              <div className="field-group">
                <select
                  name="country"
                  className="form-select"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="Italy">Italy</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                </select>
                {errors.country && (
                  <p className="error-text">{errors.country}</p>
                )}
              </div>

              
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                />
                <label htmlFor="saveInfo">
                  Save this information for a future fast checkout
                </label>
              </div>

              
              <div className="button-group">
                <button
                  type="button"
                  className="back-button"
                  onClick={handleBackToCart}
                >
                  Back to cart
                </button>
                <button
                  type="button"
                  className="continue-button"
                  onClick={handleGoToShipping}
                >
                  Go to shipping
                </button>
              </div>
            </div>
          </div>

          
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
