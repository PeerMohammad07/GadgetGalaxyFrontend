import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/adminPages/LoginPages";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import ProtectAdminRoutes from "../pages/Protect/AdminProtect";


const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <AdminLogin />
          }
        />
        <Route
          path="/adminDashboard"
          element={
            <ProtectAdminRoutes>
              <AdminDashboard />
            </ProtectAdminRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default AdminRoutes;