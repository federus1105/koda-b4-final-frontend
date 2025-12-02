import React, { useState } from "react";
import { ScrollToTop } from "../route/Routes";
import { Outlet } from "react-router-dom";
import NavbarLanding from "../components/navbar/NavbarLanding";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";

function LandingLayouts() {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <ScrollToTop />
      {isLoggedIn ? <Navbar /> : <NavbarLanding />}
      {loading && (
        <div className="loader-overlay">
          <div className="flex flex-col items-center">
            <div className="loader"></div>
            <span className="loader-text">Loading...</span>
          </div>
        </div>
      )}
      <Outlet context={{ setLoading }} />
    </>
  );
}

export default LandingLayouts;
