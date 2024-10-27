import { Routes, Route } from "react-router-dom";
import Login from "../pages/userPages/Login";
import Register from "../pages/userPages/Register";
import Home from "../pages/userPages/Home";
import ShoppingCart from "../components/CartPage";
import CheckoutPage from "../pages/userPages/CheckoutPage";
import ProtectUserRoutes from "../pages/Protect/UserProtect";
import Shop from "../pages/userPages/ShopPage";


const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/register"
          element={
            <Register />
          }
        />
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectUserRoutes>
              <ShoppingCart />
            </ProtectUserRoutes>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectUserRoutes>
              <CheckoutPage />
            </ProtectUserRoutes>
          }
        />
        <Route
          path="/shop"
          element={
              <Shop />
          }
        />
      </Routes>
    </>
  );
};

export default UserRoutes;