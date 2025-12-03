import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import LandingLayouts from "../layouts/LandingLayouts";
import Landing from "../pages/landing/Landing";
import Profile from "../pages/profile/Profile";
import MainLayouts from "../layouts/MainLayouts";
import Dashboard from "../pages/dashboard/Dashboard";
import Link from "../pages/link/Link";
import { PrivateRoute } from "../utils/PrivateRoute";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="auth">
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>

            <Route element={<LandingLayouts />}>
              <Route path="/" element={<Landing />} />
            </Route>

            <Route element={<MainLayouts />}>
              <Route
                path="/profile"
                element={
                  <PrivateRoute redirectTo={"/auth/login"}>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute redirectTo={"/auth/login"}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/link"
                element={
                  <PrivateRoute redirectTo={"/auth/login"}>
                    <Link />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        transition={Slide}
        theme="colored"
      />
    </>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default Router;
