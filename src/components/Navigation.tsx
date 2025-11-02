'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white border-b-4 border-[#02fb4a] shadow-2xl' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative group"
            onClick={closeMobileMenu}
          >
            <div className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-[#02fb4a] group-hover:text-black transition-colors duration-300">$</span>
              <span className="text-black group-hover:text-[#02fb4a] transition-colors duration-300">BUCKY</span>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-1 bg-[#02fb4a] group-hover:w-full transition-all duration-300"></div>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-4 items-center">
            <a
              href="#about"
              className="relative px-4 py-2 text-black font-black text-sm uppercase tracking-wide group overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-black transition-colors">ABOUT</span>
              <div className="absolute inset-0 bg-[#02fb4a] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            
            <Link
              href="/pfp-generator"
              className="relative px-4 py-2 text-black font-black text-sm uppercase tracking-wide group overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-black transition-colors">PFP GEN</span>
              <div className="absolute inset-0 bg-[#02fb4a] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            
            <a
              href="#chart"
              className="relative px-4 py-2 text-black font-black text-sm uppercase tracking-wide group overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-black transition-colors">CHART</span>
              <div className="absolute inset-0 bg-[#02fb4a] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>

            {/* X/Twitter Button */}
            <a
              href="https://x.com/BuckyBonkFun"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-black text-[#02fb4a] px-6 py-2 font-black text-sm uppercase tracking-wide border-4 border-black hover:border-[#02fb4a] transition-all hover:scale-105 hover:rotate-1 shadow-lg group overflow-hidden"
            >
              <span className="relative z-10">FOLLOW 𝕏</span>
              <div className="absolute inset-0 bg-[#02fb4a] transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="absolute inset-0 flex items-center justify-center text-black font-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                FOLLOW 𝕏
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative bg-black text-[#02fb4a] p-3 rounded-xl border-4 border-black hover:border-[#02fb4a] transition-all overflow-hidden group"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-[#02fb4a] transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            {mobileMenuOpen ? (
              <HiX className="text-2xl relative z-10 group-hover:text-black transition-colors" />
            ) : (
              <HiMenu className="text-2xl relative z-10 group-hover:text-black transition-colors" />
            )}
          </button>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className={`h-1 bg-gradient-to-r from-[#02fb4a] via-black to-[#02fb4a] ${scrolled ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b-4 border-[#02fb4a] shadow-2xl transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-6 py-4 space-y-3">
          <a
            href="#about"
            onClick={closeMobileMenu}
            className="block relative px-4 py-3 text-black font-black text-sm uppercase tracking-wide group overflow-hidden rounded-xl"
          >
            <span className="relative z-10 group-hover:text-black transition-colors">ABOUT</span>
            <div className="absolute inset-0 bg-[#02fb4a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </a>
          
          <Link
            href="/pfp-generator"
            onClick={closeMobileMenu}
            className="block relative px-4 py-3 text-black font-black text-sm uppercase tracking-wide group overflow-hidden rounded-xl"
          >
            <span className="relative z-10 group-hover:text-black transition-colors">PFP GENERATOR</span>
            <div className="absolute inset-0 bg-[#02fb4a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </Link>
          
          <a
            href="#chart"
            onClick={closeMobileMenu}
            className="block relative px-4 py-3 text-black font-black text-sm uppercase tracking-wide group overflow-hidden rounded-xl"
          >
            <span className="relative z-10 group-hover:text-black transition-colors">CHART</span>
            <div className="absolute inset-0 bg-[#02fb4a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </a>

          <a
            href="https://x.com/BuckyBonkFun"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="block relative bg-black text-[#02fb4a] px-6 py-3 font-black text-sm uppercase tracking-wide text-center border-4 border-black hover:border-[#02fb4a] transition-all shadow-lg group overflow-hidden rounded-xl"
          >
            <span className="relative z-10">FOLLOW 𝕏</span>
            <div className="absolute inset-0 bg-[#02fb4a] transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="absolute inset-0 flex items-center justify-center text-black font-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              FOLLOW 𝕏
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

