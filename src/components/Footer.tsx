'use client';

import { FaXTwitter } from 'react-icons/fa6';
import { HiUserGroup } from 'react-icons/hi2';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 z-10 bg-white overflow-hidden">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#02fb4a] via-black to-[#02fb4a]"></div>
      
      {/* Diagonal background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #02fb4a 0, #02fb4a 2px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Logo Section */}
          <div className="text-center md:text-left">
            <h3 className="text-5xl font-black mb-2 tracking-tight">
              <span className="text-[#02fb4a]">$</span>
              <span className="text-black">BUCKY</span>
            </h3>
            <p className="text-lg font-bold text-[#02fb4a] uppercase tracking-wider">
              The legend lives on-chain
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://x.com/BuckyBonkFun"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-black text-white p-4 rounded-xl transition-all hover:scale-110 hover:rotate-3 shadow-lg overflow-hidden"
              aria-label="Follow on X"
            >
              <div className="absolute inset-0 bg-[#02fb4a] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <FaXTwitter className="text-2xl relative z-10 group-hover:scale-110 transition-transform group-hover:text-black" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#02fb4a] text-black px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                Follow X
              </div>
            </a>
            <a
              href="https://x.com/i/communities/1964436953887363376"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-black text-white p-4 rounded-xl transition-all hover:scale-110 hover:rotate-3 shadow-lg overflow-hidden"
              aria-label="Join Community"
            >
              <div className="absolute inset-0 bg-[#02fb4a] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <HiUserGroup className="text-2xl relative z-10 group-hover:scale-110 transition-transform group-hover:text-black" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#02fb4a] text-black px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                Community
              </div>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 pb-8 border-b-2 border-gray-200">
          <a href="#about" className="relative text-sm font-bold text-gray-600 uppercase tracking-wide group overflow-hidden px-3 py-1">
            <span className="relative z-10 group-hover:text-black transition-colors">About</span>
            <div className="absolute inset-0 bg-[#02fb4a] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <a href="/pfp-generator" className="relative text-sm font-bold text-gray-600 uppercase tracking-wide group overflow-hidden px-3 py-1">
            <span className="relative z-10 group-hover:text-black transition-colors">PFP Generator</span>
            <div className="absolute inset-0 bg-[#02fb4a] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <a href="#chart" className="relative text-sm font-bold text-gray-600 uppercase tracking-wide group overflow-hidden px-3 py-1">
            <span className="relative z-10 group-hover:text-black transition-colors">Chart</span>
            <div className="absolute inset-0 bg-[#02fb4a] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <a href="https://dexscreener.com/solana/c7eue5haoerju2dxnnlr7mf1zf6yw3lwepuxphfygly1" target="_blank" rel="noopener noreferrer" className="relative text-sm font-bold text-gray-600 uppercase tracking-wide group overflow-hidden px-3 py-1">
            <span className="relative z-10 group-hover:text-black transition-colors">DexScreener</span>
            <div className="absolute inset-0 bg-[#02fb4a] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <a href="https://www.coingecko.com/en/coins/bucky-2" target="_blank" rel="noopener noreferrer" className="relative text-sm font-bold text-gray-600 uppercase tracking-wide group overflow-hidden px-3 py-1">
            <span className="relative z-10 group-hover:text-black transition-colors">CoinGecko</span>
            <div className="absolute inset-0 bg-[#02fb4a] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
        </div>
        
        {/* Bottom Info */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2 font-semibold">
            © 2025 <span className="text-[#02fb4a] font-black">$BUCKY</span>. All rights reserved. | Community-driven meme token on Solana
          </p>
          <p className="text-sm text-gray-600">
            built by{' '}
            <a 
              href="https://x.com/bakardii01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#02fb4a] font-bold hover:underline transition-all hover:text-[#01d63f]"
            >
              bakardi.sol
            </a>
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#02fb4a]"></div>
    </footer>
  );
}

