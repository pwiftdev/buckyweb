'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Loader() {
  const [currentWord, setCurrentWord] = useState(0);
  const [showHero, setShowHero] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loader is visible
    document.body.classList.add('loading');

    // Word 1: "THIS" at 0s
    // Word 2: "IS" at 0.5s
    // Word 3: "BUCKY" at 1s
    // Hero image: at 1.5s
    // Fade out: at 2s

    const word1Timer = setTimeout(() => setCurrentWord(1), 0);
    const word2Timer = setTimeout(() => setCurrentWord(2), 500);
    const word3Timer = setTimeout(() => setCurrentWord(3), 1000);
    const heroTimer = setTimeout(() => setShowHero(true), 1500);
    
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.classList.remove('loading');
    }, 2200);

    return () => {
      clearTimeout(word1Timer);
      clearTimeout(word2Timer);
      clearTimeout(word3Timer);
      clearTimeout(heroTimer);
      clearTimeout(fadeTimer);
      document.body.classList.remove('loading');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-300 ${
        !isVisible ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ overflow: 'hidden' }}
    >
      {/* Background Candles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[
          { left: 10, top: 15, size: 50, animation: 'animate-float', image: 1 },
          { left: 85, top: 20, size: 55, animation: 'animate-float-delayed', image: 2 },
          { left: 70, top: 60, size: 52, animation: 'animate-float-slow', image: 3 },
          { left: 15, top: 70, size: 48, animation: 'animate-float-delayed', image: 4 },
          { left: 50, top: 10, size: 50, animation: 'animate-float', image: 5 },
          { left: 30, top: 45, size: 53, animation: 'animate-float-slow', image: 6 },
          { left: 90, top: 80, size: 51, animation: 'animate-float', image: 7 },
          { left: 5, top: 35, size: 49, animation: 'animate-float-delayed', image: 8 },
          { left: 60, top: 75, size: 52, animation: 'animate-float-slow', image: 9 },
          { left: 25, top: 25, size: 50, animation: 'animate-float', image: 10 },
        ].map((candle, index) => (
          <div
            key={index}
            className={`absolute ${candle.animation}`}
            style={{
              left: `${candle.left}%`,
              top: `${candle.top}%`,
              width: `${candle.size}px`,
              height: `${candle.size}px`,
            }}
          >
            <Image
              src={`/candles/candle-${candle.image.toString().padStart(2, '0')}.png`}
              alt=""
              width={candle.size}
              height={candle.size}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {!showHero ? (
          <div className="text-center">
            <h1 className="text-7xl md:text-9xl font-black leading-tight">
              {currentWord === 1 && (
                <div className="animate-fadeInUp">
                  <span className="text-black">THIS</span>
                </div>
              )}
              {currentWord === 2 && (
                <div className="animate-fadeInUp">
                  <span className="text-black">IS</span>
                </div>
              )}
              {currentWord === 3 && (
                <div className="animate-fadeInUp">
                  <span className="text-[#02fb4a] glow-effect">BUCKY</span>
                </div>
              )}
            </h1>
          </div>
        ) : (
          <div className="animate-fadeInScale">
            <Image
              src="/buckyhero.avif"
              alt="Bucky"
              width={400}
              height={400}
              priority
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

