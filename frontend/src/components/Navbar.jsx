"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Platform", href: "#home" },
    { name: "Neuro-Oncology", href: "#brain-tumor" },
    { name: "Hematology", href: "#blood-report" },
    { name: "Research", href: "#project-report" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 h-[70px] flex items-center ${
        isScrolled
          ? "bg-black/70 backdrop-blur-lg border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <nav className="flex items-center justify-between w-full" aria-label="Main Navigation">
          
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xl font-semibold text-white tracking-tight flex items-center gap-2"
            >
              <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              NeuroX
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex items-center justify-end gap-4">
            <Link
              href="#contact"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Contact Sales
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-zinc-200 transition-all"
            >
              Request Demo
            </Link>
          </div>

          <div className="flex lg:hidden items-center ml-auto">
            <button
              type="button"
              className="p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`lg:hidden absolute top-[70px] left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-white/5 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="pt-4 flex flex-col gap-3">
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2.5 text-sm font-medium text-zinc-300 border border-white/10 rounded-md hover:bg-white/5 transition-colors"
            >
              Contact Sales
            </Link>
            <Link
              href="#demo"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2.5 text-sm font-medium text-black bg-white rounded-md hover:bg-zinc-200 transition-colors"
            >
              Request Demo
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}