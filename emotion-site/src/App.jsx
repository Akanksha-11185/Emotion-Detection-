// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AnonymousPage from "./pages/AnonymousPage";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";

import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Privacy from "./pages/Privacy";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import TextDetectionPage from "./pages/TextDetectionPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  // routes where footer should be hidden
  const hideFooterRoutes = [
    "/privacy",
    "/about",
    "/how-it-works",
    "/contact",
    "/login",
    "/text-detection",
    "/signup",
  ];
  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar user={user} />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anonymous" element={<AnonymousPage />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/text-detection"
          element={<TextDetectionPage user={user} />}
        />

        <Route
          path="/screenshot-detection"
          element={<ComingSoon title="Screenshot Analysis" />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/detect"
          element={
            <ProtectedRoute>
              <TextDetectionPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ✅ Footer hidden only on selected pages */}
      {!hideFooter && <Footer />}
    </div>
  );
}

function ComingSoon({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-28">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-xl shadow-blue-500/40">
          <span className="text-4xl">🚧</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">{title}</h1>
        <p className="text-slate-400 mb-8 text-lg">
          This feature is coming soon!
        </p>
      </div>
    </div>
  );
}
