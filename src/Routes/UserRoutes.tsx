import { Routes, Route } from "react-router-dom";
import Login from "../pages/userPages/Login";
import Register from "../pages/userPages/Register";
import Home from "../pages/userPages/Home";
import ShoppingCart from "../components/CartPage";
import CheckoutPage from "../pages/userPages/CheckoutPage";
import ProtectUserRoutes from "../pages/Protect/UserProtect";
import Common from "../components/Common";
import OrdersList from "../pages/userPages/OrdersPage";
import Wishlist from "../pages/userPages/Whishlist";
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
            <Common>
              <Home />
            </Common>
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
              <Common>
                <CheckoutPage />
              </Common>
            </ProtectUserRoutes>
          }
        />
        <Route
          path="/shopping"
          element={
            <Common>
              <Shop/>
            </Common>
          }
        />
        <Route
          path="/orders"
          element={
            <Common>
              <OrdersList />
            </Common>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Common>
              <Wishlist />
            </Common>
          }
        />
      </Routes>
    </>
  );
};

export default UserRoutes;