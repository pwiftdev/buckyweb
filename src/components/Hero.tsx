'use client';

import { useState } from 'react';
import Image from 'next/image';

const CA = '7hZmPPkBDYbFpvzQW54sX3DQHQjEVsVcCFRWsvCdbonk';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-6xl mx-auto text-center z-10">
        {/* Bucky Character */}
        <div className="mb-8 animate-fadeInUp">
          <Image
            src="/buckyhero.png"
            alt="Bucky Character"
            width={400}
            height={400}
            className="mx-auto hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-8xl md:text-9xl font-black mb-4 animate-fadeInUp glow-effect" style={{ animationDelay: '0.2s' }}>
          <span className="text-black">BUCKY</span>
        </h1>

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <p className="text-3xl md:text-4xl font-bold text-black">ON</p>
          <span className="bg-[#02fb4a] text-black px-6 py-2 rounded-lg text-3xl md:text-4xl font-black shadow-xl transform rotate-[-3deg] inline-block">
            BONK
          </span>
        </div>

        {/* CA Address */}
        <div className="max-w-2xl mx-auto mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="bg-[#02fb4a] rounded-2xl p-4 flex items-center justify-between shadow-2xl hover:shadow-3xl transition-all group">
            <p className="font-mono text-sm md:text-base font-bold text-black break-all">
              {CA}
            </p>
            <button
              onClick={handleCopy}
              className="ml-4 p-2 hover:bg-black/10 rounded-lg transition-colors flex-shrink-0"
              aria-label="Copy contract address"
            >
              {copied ? (
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <a
            href="https://dexscreener.com/solana/c7eue5haoerju2dxnnlr7mf1zf6yw3lwepuxphfygly1"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-black text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl overflow-hidden group"
          >
            <span className="relative z-10">BUY NOW</span>
            <div className="absolute inset-0 bg-[#02fb4a] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              BUY NOW
            </span>
          </a>
          <a
            href="https://x.com/i/communities/1964436953887363376"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-white text-black border-4 border-[#02fb4a] px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl overflow-hidden group"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">JOIN COMMUNITY</span>
            <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              JOIN COMMUNITY
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

