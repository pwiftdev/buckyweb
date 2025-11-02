'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function FloatingCandles() {
  const [candles, setCandles] = useState<{ id: number; left: number; top: number; size: number; animation: string; image: number }[]>([]);

  useEffect(() => {
    const candlePositions = [
      // Top section
      { left: 12, top: 12, size: 55, animation: 'animate-float', image: 1 },
      { left: 45, top: 8, size: 50, animation: 'animate-float-delayed', image: 2 },
      { left: 78, top: 15, size: 52, animation: 'animate-float-slow', image: 3 },
      
      // Upper-middle section
      { left: 8, top: 30, size: 48, animation: 'animate-float-slow', image: 4 },
      { left: 35, top: 32, size: 54, animation: 'animate-float', image: 5 },
      { left: 65, top: 28, size: 50, animation: 'animate-float-delayed', image: 6 },
      { left: 90, top: 33, size: 52, animation: 'animate-float-slow', image: 7 },
      
      // Middle section
      { left: 20, top: 50, size: 51, animation: 'animate-float-delayed', image: 8 },
      { left: 55, top: 48, size: 53, animation: 'animate-float-slow', image: 9 },
      { left: 85, top: 52, size: 49, animation: 'animate-float', image: 10 },
      
      // Lower-middle section
      { left: 10, top: 68, size: 50, animation: 'animate-float', image: 1 },
      { left: 40, top: 70, size: 52, animation: 'animate-float-delayed', image: 2 },
      { left: 70, top: 67, size: 51, animation: 'animate-float-slow', image: 3 },
      { left: 92, top: 72, size: 48, animation: 'animate-float', image: 4 },
      
      // Bottom section
      { left: 25, top: 85, size: 53, animation: 'animate-float-slow', image: 5 },
      { left: 60, top: 88, size: 50, animation: 'animate-float', image: 6 },
    ];

    setCandles(candlePositions.map((pos, index) => ({ ...pos, id: index })));
  }, []);

  return (
    <div className="candle-container">
      {candles.map((candle) => (
        <div
          key={candle.id}
          className={`candle ${candle.animation}`}
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
  );
}

