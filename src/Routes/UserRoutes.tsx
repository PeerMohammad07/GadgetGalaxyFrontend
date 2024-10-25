import { Routes, Route } from "react-router-dom";
import Login from "../pages/userPages/Login";
import Register from "../pages/userPages/Register";
import Home from "../pages/userPages/Home";


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
            <Home/>
          }
        />
      </Routes>
    </>
  );
};

export default UserRoutes;