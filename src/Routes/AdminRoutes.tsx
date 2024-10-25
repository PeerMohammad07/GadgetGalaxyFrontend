import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/adminPages/LoginPages";
import AdminDashboard from "../pages/adminPages/AdminDashboard";


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
          <AdminDashboard/>
        }
        />
      </Routes>
    </>
  );
};

export default AdminRoutes;