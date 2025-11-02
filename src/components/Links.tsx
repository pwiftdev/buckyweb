'use client';

import Image from 'next/image';

const links = [
  {
    name: 'DexTools',
    url: 'https://www.dextools.io/app/en/solana/pair-explorer/C7EUe5HAoerJU2dxnnLr7Mf1zF6YW3LWepUxphfYGLy1?t=1757198714737',
    logo: '/dextools.avif',
  },
  {
    name: 'DexScreener',
    url: 'https://dexscreener.com/solana/c7eue5haoerju2dxnnlr7mf1zf6yw3lwepuxphfygly1',
    logo: '/dexscreener.avif',
  },
  {
    name: 'CoinGecko',
    url: 'https://www.coingecko.com/en/coins/bucky-2',
    logo: '/coin-gecko.avif',
  },
];

export default function Links() {
  return (
    <section className="relative py-24 px-6 z-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-black text-center mb-12 text-black">
          FIND <span className="text-[#02fb4a]">BUCKY</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-white rounded-2xl p-8 shadow-xl border-4 border-transparent hover:border-[#02fb4a] transition-all hover:scale-105 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#02fb4a] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl"></div>
              <div className="relative z-10 w-full h-24 group-hover:scale-110 transition-transform">
                <Image
                  src={link.logo}
                  alt={link.name}
                  fill
                  className="object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

