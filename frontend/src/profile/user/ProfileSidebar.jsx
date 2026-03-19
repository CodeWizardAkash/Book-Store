import React from "react";
import { Link } from "react-router-dom";

function ProfileSidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="w-64 bg-white shadow-lg p-6">
      <div>
        {console.log(user)}

        <img
          src={user?.avater || "/default-avatar.png"}
          alt=""
          className="w-20 h-20 rounded-full border-4 border-emerald-500"
        />
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
      {/* Menu */}
      <ul className="flex flex-col gap-4 font-medium">
        <Link to="/" className="hover:text-emerald-500">
          🏠︎ Home
        </Link>

        <Link to={`/${user.role}`} className="hover:text-emerald-500">
          👤 Profile
        </Link>

        <Link to={`/${user.role}/my-books`}className="hover:text-emerald-500">
          📚 My Books
        </Link>

        <Link to={`/${user.role}/wishlist`} className="hover:text-emerald-500">
          ❤️ Wishlist
        </Link>

        <Link to={`/${user.role}/cart`} className="hover:text-emerald-500">
          🛒 Cart
        </Link>

        <Link to={`/${user.role}/setting`} className="hover:text-emerald-500">
          ⚙ Settings
        </Link>
        {/* <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 hover:bg-red-100 text-red-500 w-full text-left"
        >
          <FaSignOutAlt /> Logout
        </button> */}
      </ul>
    </div>
  );
}
export default ProfileSidebar;
