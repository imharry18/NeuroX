"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle sticky navbar visual changes on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Brain Tumor Detection", href: "#brain-tumor" },
    { name: "Blood Report Analysis", href: "#blood-report" },
    { name: "Project Report", href: "#project-report" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 h-[70px] ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md shadow-lg shadow-black/40 border-b border-slate-800"
          : "bg-slate-950 border-b border-slate-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <nav className="flex items-center justify-between h-full w-full" aria-label="Main Navigation">
          
          {/* Left Side: Logo Area */}
          <div className="flex-shrink-0 w-48">
            <Link 
              href="/" 
              className="text-2xl font-extrabold text-white tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm"
              aria-label="NeuroX Home"
            >
              Neuro<span className="text-cyan-500">X</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm px-1 py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: About Us Button (Desktop) */}
          <div className="hidden lg:flex items-center justify-end w-48">
            <Link
              href="#about"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white transition-all duration-300 bg-transparent border border-cyan-500 rounded-full hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              About Us
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center ml-auto">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">{isOpen ? "Close main menu" : "Open main menu"}</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-menu"
        className={`lg:hidden absolute top-[70px] left-0 w-full bg-slate-950 border-t border-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 shadow-xl" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-md text-base font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <Link
              href="#about"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full px-6 py-3 text-base font-semibold text-cyan-400 transition-all duration-300 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/10"
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}