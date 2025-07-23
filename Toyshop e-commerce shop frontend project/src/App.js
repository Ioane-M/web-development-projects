import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPages";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShippingInfoPage from "./pages/ShippingInfoPage";
import ShippingMethodPage from "./pages/ShippingMethodPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import { CartProvider } from "./components/CartLogic";

const AppContent = () => {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/shipping",
    "/shipping-method",
    "/payment",
    "/success",
  ];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/Figures" element={<ProductPage category="Figures" />} />
        <Route path="/Plush" element={<ProductPage category="Plush" />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/shipping" element={<ShippingInfoPage />} />
        <Route path="/shipping-method" element={<ShippingMethodPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
