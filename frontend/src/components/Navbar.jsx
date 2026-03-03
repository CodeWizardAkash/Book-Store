import React, { useState, useEffect, useContext } from "react";
import { Link} from "react-router-dom";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [openLogin, setOpenLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

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


useEffect(() => {
  if (location.state?.showLogin) {
    setOpenLogin(true);

    // 🔥 IMPORTANT: Clear state after using it
    navigate(location.pathname, { replace: true });
  }
}, [location, navigate]);

  return (
    <>
      <nav className="w-full shadow-md fixed top-0 left-0 right-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          <div className="text-2xl font-bold">
            <Link to="/">BookStore</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6 font-medium">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/books">Books</Link></li>
              <li><Link to="/courses">Course</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>

            <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {!isAuthenticated ? (
              <button
                className="btn btn-primary btn-sm cursor-pointer"
                onClick={() => setOpenLogin(true)}
              >
                Login
              </button>
            ) : (
              <button
                className="btn btn-outline btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-4 pb-4">
            <ul className="flex flex-col gap-4 font-medium">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Course</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/about">About</Link></li>
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
                  className="btn btn-outline btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <Login
        open={openLogin}
        setOpen={setOpenLogin}
      />
    </>
  );
}

export default Navbar;