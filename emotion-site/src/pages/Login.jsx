// src/pages/Login.jsx
import React, { useState } from "react";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔥 Firebase auth will go here
      // await signInWithEmailAndPassword(auth, email, password);

      console.log("Logging in:", email, password);

      // TEMP success simulation
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // 🔥 Firebase Google auth will go here
      // await signInWithPopup(auth, googleProvider);

      console.log("Google login");
      navigate("/");
    } catch (err) {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl shadow-blue-500/30">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
            <LogIn className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Login to continue</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/50 transition-all hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-sm text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-all hover:scale-105"
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-400 hover:underline cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
