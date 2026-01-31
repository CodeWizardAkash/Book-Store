import React, { useState, useEffect } from "react";

function Navbar() {
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="w-full shadow-md fixed top-0 left-0 right-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold">BookStore</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 font-medium">
            <li className="hover:text-primary cursor-pointer">
              <a href="/">Home</a>
            </li>
            <li className="hover:text-primary cursor-pointer">
              <a href="/course">Course</a>
            </li>
            <li className="hover:text-primary cursor-pointer">Contact</li>
            <li className="hover:text-primary cursor-pointer">About</li>
          </ul>

          <input
            type="text"
            placeholder="Search book"
            className="input input-bordered input-sm"
          />

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button className="btn btn-primary btn-sm">Login</button>
        </div>

        {/* Mobile Button */}
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
            <li><a href="/">Home</a></li>
            <li><a href="/course">Course</a></li>
            <li><a href="">Contact</a></li>
            <li><a href="">About</a></li>
          </ul>

          <div className="mt-4 flex gap-3">
            <button onClick={toggleTheme} className="btn btn-outline btn-sm">
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <button className="btn btn-primary btn-sm">Login</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
