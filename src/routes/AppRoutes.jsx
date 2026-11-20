import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Store from "../pages/Store";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import Navbar from "../components/Navbar";

function ShopLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route index element={<Store />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </main>
      <footer className="footer">
        <span className="brand-mark small">TB</span>
        <span>© 2024 TexnoBozor. Barcha huquqlar himoyalangan.</span>
        <span className="footer-note">Sifatli texnika — oson xarid</span>
      </footer>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ShopLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
