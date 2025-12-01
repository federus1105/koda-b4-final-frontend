import React from "react";
import { ScrollToTop } from "../route/Routes";
import { Outlet } from "react-router-dom";
import NavbarLanding from "../components/navbar/NavbarLanding";

function LandingLayouts() {
  return (
    <>
      <ScrollToTop />
      <NavbarLanding />
      <Outlet />
    </>
  );
}

export default LandingLayouts;
