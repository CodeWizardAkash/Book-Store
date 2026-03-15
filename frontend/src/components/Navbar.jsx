import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import NavLogo from "../../public/navLogo.png";
import ProfileMenu from "../profile/user/ProfileMenu";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [theme, setTheme] = useState("light");
  const [openLogin, setOpenLogin] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logOut } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user"));

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Update theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Open login modal when redirected
  useEffect(() => {
    if (location.state?.showLogin) {
      setOpenLogin(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleLogout = () => {
    logOut();
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="w-full shadow-md fixed top-0 left-0 right-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold flex gap-1 items-center">
            <img className="w-10" src={NavLogo} alt="logo" />
            <Link to="/" className="text-orange-400">
              Book<span className="text-emerald-600">Store</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6 font-medium">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/books">Books</Link>
              </li>
              <li>
                <Link to="/courses">Course</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Auth Section */}
            {!isAuthenticated ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setOpenLogin(true)}
              >
                Login
              </button>
            ) : (
              <div className="relative">
                {/* Avatar */}
                <img
                  src={user?.avatar || "/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer border"
                  onClick={() => setProfileMenu(!profileMenu)}
                />

                <ProfileMenu
                  open={profileMenu}
                  setOpen={setProfileMenu}
                  user={user}
                  handleLogout={handleLogout}
                />
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden px-4 pb-4">
            

            <ul className="flex flex-col gap-4 font-medium">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/books">Books</Link>
              </li>
              <li>
                <Link to="/courses">Course</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>

            <div className="mt-4 flex gap-3">
              <button onClick={toggleTheme} className="btn btn-outline btn-sm">
                {theme === "light" ? "Dark" : "Light"}
              </button>

              {!isAuthenticated ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setOpenLogin(true)}
                >
                  Login
                </button>
              ) : (
                <button
                  className="btn btn-outline btn-sm text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <Login open={openLogin} setOpen={setOpenLogin} />
    </>
  );
}

export default Navbar;
