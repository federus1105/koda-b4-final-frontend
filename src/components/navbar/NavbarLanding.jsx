import React from "react";
import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

function NavbarLanding() {
  return (
    <>
      <nav className="flex justify-between px-15 py-5 border-b border-gray-400">
        <div className="flex items-center gap-2 cursor-pointer">
          <Link2 color="blue" />
          <p >Koda Shortlink</p>
        </div>
        <div className="flex gap-5 items-center">
          <Link to={"/auth/register"}>
            <button className="cursor-pointer">Sign In</button>
          </Link>
          <button className="cursor-pointer bg-blue-600 text-white rounded-lg px-4 py-2">
            Get Started
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavbarLanding;
