'use client';

import Image from 'next/image';

export default function Chart() {
  return (
    <section id="chart" className="relative py-24 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-center mb-12 text-black">
          LIVE <span className="text-[#02fb4a]">CHART</span>
        </h2>
        
        <div className="relative">
          {/* Bucky peeking from top right */}
          <div className="absolute top-0 -right-12 w-48 h-48 z-20 -translate-y-full">
            <Image
              src="/buckyhero.avif"
              alt="Bucky"
              fill
              className="object-contain object-bottom"
            />
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#02fb4a]">
            <div className="relative w-full h-[600px]">
              <iframe
                src="https://dexscreener.com/solana/c7eue5haoerju2dxnnlr7mf1zf6yw3lwepuxphfygly1?embed=1&theme=light&trades=0&info=0"
                className="w-full h-full"
                title="DexScreener Chart"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

