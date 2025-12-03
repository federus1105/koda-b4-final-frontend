import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../route/Routes";
import Navbar from "../components/navbar/Navbar";

function MainLayouts() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <ScrollToTop />
      <Navbar />
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

export default MainLayouts;
