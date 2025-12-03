import { NavLink, useNavigate } from "react-router-dom";
import {
  Link2,
  LayoutDashboard,
  Link as LinkIcon,
  Settings,
  LogOut,
} from "lucide-react";
import NavItem from "./navItem";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../service/authService";
import { Logout } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmModal from "../modal/ConfirmModal";

function Navbar() {
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (!refreshToken) throw new Error("No refresh token found");

      await logoutUser(refreshToken);
      dispatch(Logout());

      toast.success("Logout berhasil");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      toast.error("Gagal logout. Coba lagi.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <nav className="flex items-center gap-3 py-5 px-15 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-6">
        <Link2 size={30} className="text-blue-600" />
        <p className="font-semibold text-lg">Koda Shortlink</p>
      </div>

      {/* Menu Items */}
      <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
      <NavItem to="/link" icon={LinkIcon} label="Links" />
      <NavItem to="/profile" icon={Settings} label="Settings" />

      {/* Logout */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all ml-auto"
        onClick={() => setIsModalOpen(true)}
      >
        <LogOut className="w-5 h-5" />
        <span className="cursor-pointer font-medium">Logout</span>
      </button>
      <ConfirmModal
        isOpen={isModalOpen}
        title="Konfirmasi Logout"
        message="Apakah anda yakin ingin logout?"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        confirmText="Keluar"
        cancelText="Batal"
      />
    </nav>
  );
}
export default Navbar;
