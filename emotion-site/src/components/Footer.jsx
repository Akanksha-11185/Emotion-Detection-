// src/components/Footer.jsx
import React from "react";
import { Heart, Mail, Github, Twitter, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const footerLinks = {
    Product: [
      { name: "Anonymous Chat", path: "/anonymous" },
      { name: "Text Detection", path: "/text-detection" },
      { name: "Screenshot Analysis", path: "/screenshot-detection" },
      { name: "Pricing", path: "/pricing" },
    ],
    Company: [
      { name: "About Us", path: "#about" },
      { name: "How it Works", path: "#how-it-works" },
      { name: "Contact", path: "#contact" },
      { name: "Blog", path: "/blog" },
    ],
    Legal: [
      { name: "Privacy Policy", path: "#privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Data Protection", path: "/data-protection" },
    ],
  };

  const handleLinkClick = (path) => {
    if (path.startsWith("#")) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Emotion Support
                </h3>
                <p className="text-xs text-slate-500">AI-Powered Analysis</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4 max-w-sm">
              Advanced AI technology for emotion detection and mental health
              support. 100% anonymous, secure, and confidential.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Your privacy is our priority</span>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Emotion Support. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="mailto:support@emotionsupport.com"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-600">
              This service is not a replacement for professional medical advice,
              diagnosis, or treatment. If you're experiencing a mental health
              emergency, please contact your local emergency services.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
