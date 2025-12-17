import React, { useState, useEffect } from "react";
import { Heart, Menu, X, LogIn, Sun, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- THEME (DARK / LIGHT) ---------------- */
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* ---------------- AUTH ---------------- */
  const { user } = useAuth(); // ✅ single source of truth

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- NAV LINKS ---------------- */
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Anonymous Chat", path: "/anonymous" },
    { name: "How it works", path: "/how-it-works" },
    { name: "About", path: "/about" },
    { name: "Contact us", path: "/contact" },
    { name: "Privacy", path: "/privacy" },
  ];

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const getInitial = (email) => (email ? email[0].toUpperCase() : "A");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur border-b border-slate-200 dark:bg-slate-900/90 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* ---------------- LOGO ---------------- */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Emotion Support
              </h1>
              <p className="text-xs text-slate-500">AI-Powered Analysis</p>
            </div>
          </div>

          {/* ---------------- DESKTOP NAV ---------------- */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-all ${
                  location.pathname === link.path
                    ? "text-blue-400 bg-slate-100 dark:bg-slate-800/40"
                    : "text-slate-700 dark:text-slate-300 hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* ---------------- RIGHT SIDE ---------------- */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth */}
            {user ? (
              <div className="relative group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold cursor-pointer">
                  {getInitial(user.email)}
                </div>

                <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition">
                  <p className="px-4 py-2 text-sm text-slate-300 truncate">
                    {user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          {/* ---------------- MOBILE BUTTON ---------------- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900/98 backdrop-blur-xl border-t border-slate-800">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg ${
                  location.pathname === link.path
                    ? "text-blue-400 bg-slate-100 dark:bg-slate-800"
                    : "text-slate-700 dark:text-slate-300 hover:text-blue-400 hover:bg-slate-100 dark:bg-slate-800/50"
                }`}
              >
                {link.name}
              </button>
            ))}

            {!user && (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
