// components/Footer.jsx
"use client";

import { FaHeart, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoShield } from "react-icons/io5";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-emerald-100/80 py-16 relative overflow-hidden border-t border-emerald-900/50">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-600"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="bg-emerald-900/60 border border-emerald-700/50 p-2.5 rounded-xl text-emerald-400 group-hover:bg-emerald-800/80 group-hover:scale-105 transition-all duration-300 shadow-sm">
                <IoShield size={28} />
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent tracking-tight">
                SecureExam
              </span>
            </Link>
            <p className="text-emerald-100/60 text-sm leading-relaxed max-w-sm">
              Empowering institutions with a secure, fair, and automated online
              examination platform. Built for the modern educational ecosystem.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="text-emerald-200/50 hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300"
              >
                {/* <FaTwitter size={20} /> */}
                <FaSquareXTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-emerald-200/50 hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="#"
                className="text-emerald-200/50 hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">
              Product
            </h3>
            <ul className="space-y-4 text-sm text-emerald-100/70">
              <li>
                <Link
                  href="/features"
                  className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Request Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">
              Company
            </h3>
            <ul className="space-y-4 text-sm text-emerald-100/70">
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">
              Legal
            </h3>
            <ul className="space-y-4 text-sm text-emerald-100/70">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-emerald-800/50 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-emerald-200/50 text-sm">
            © {currentYear} SecureExam. All rights reserved.
          </div>
          <div className="text-emerald-200/50 text-sm flex items-center gap-1.5">
            Made with <FaHeart className="text-red-500/90 animate-pulse" /> for
            education
          </div>
        </div>
      </div>
    </footer>
  );
}
