import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({ to, icon: Icon, label }) {
  return (
    <>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `
        flex items-center gap-2 px-4 py-2 rounded-lg transition-all
        ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }
        `
        }
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </NavLink>
    </>
  );
}

export default NavItem;
