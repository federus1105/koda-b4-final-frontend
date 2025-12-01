import React from "react";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../route/Routes";
import Navbar from "../components/navbar/Navbar";

function MainLayouts() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </>
  );
}

export default MainLayouts;
