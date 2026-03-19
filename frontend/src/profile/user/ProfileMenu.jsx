import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingCart, FaSignOutAlt, FaCrown } from "react-icons/fa";
import Wishlist from "./Wishlist";

function ProfileMenu({ open, setOpen, user, handleLogout }) {

  const menuRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border 
      animate-fadeIn overflow-hidden"
    >

      <div className="px-4 py-3 border-b">
        <p className="font-semibold">{user?.name}</p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <Link
        to={`/${user.role}`}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaUser /> Profile
      </Link>

      <Link
        to={`/${user.role}/cart`}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaShoppingCart /> Cart
      </Link>

      <Link
        to={`/${user.role}/wishlist`}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaHeart /> Wishlist
      </Link>

      {user?.role === "admin" && (
        <Link
          to="/admin"
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-yellow-600"
        >
          <FaCrown /> Admin Panel
        </Link>
      )}

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 hover:bg-red-100 text-red-500 w-full text-left"
      >
        <FaSignOutAlt /> Logout
      </button>

    </div>
  );
}

export default ProfileMenu;