import { LayoutDashboard, Link, Link2, LogOut, Settings } from "lucide-react";
import React from "react";

function Navbar() {
  return (
    <>
      <nav className="flex py-5 gap-1 items-center px-15">
        <div className="flex gap-2">
          <Link2 size={30} color="blue" />
          <p>Koda Shortlink</p>
        </div>
        <div className="cursor-pointer bg-blue-100 flex gap-2 px-4 py-2 rounded-lg">
          <LayoutDashboard color="blue" />
          <p className="text-blue-600">Dashboard</p>
        </div>
        <div className="cursor-pointer flex gap-2 px-4 py-2 rounded-lg">
          <Link color="gray" />
          <p className="text-gray-600">Links</p>
        </div>
        <div className="cursor-pointer flex gap-2 px-4 py-2 rounded-lg">
          <Settings color="gray" />
          <p className="text-gray-600">Settings</p>
        </div>
        <div className="cursor-pointer flex gap-2 px-4 py-2 rounded-lg">
          <LogOut color="gray" />
          <p className="text-gray-600">Logout</p>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
