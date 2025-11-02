'use client';

import { useState, useEffect } from 'react';

const CA = '7hZmPPkBDYbFpvzQW54sX3DQHQjEVsVcCFRWsvCdbonk';
const CHAIN_ID = 'solana';

interface TokenData {
  priceUsd: string;
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  volume: {
    h24: number;
  };
  liquidity: {
    usd: number;
  };
  marketCap: number;
  fdv: number;
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
}

export default function BuckyLive() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${CA}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch token data');
        }

        const data = await response.json();
        
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setTokenData({
            priceUsd: pair.priceUsd,
            priceChange: {
              m5: pair.priceChange?.m5 || 0,
              h1: pair.priceChange?.h1 || 0,
              h6: pair.priceChange?.h6 || 0,
              h24: pair.priceChange?.h24 || 0,
            },
            volume: {
              h24: pair.volume?.h24 || 0,
            },
            liquidity: {
              usd: pair.liquidity?.usd || 0,
            },
            marketCap: pair.marketCap || 0,
            fdv: pair.fdv || 0,
            txns: {
              m5: pair.txns?.m5 || { buys: 0, sells: 0 },
              h1: pair.txns?.h1 || { buys: 0, sells: 0 },
              h6: pair.txns?.h6 || { buys: 0, sells: 0 },
              h24: pair.txns?.h24 || { buys: 0, sells: 0 },
            },
          });
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to load token data');
        setLoading(false);
      }
    };

    // Initial fetch
    fetchTokenData();

    // Set interval for 280 calls per minute (approximately every 214ms)
    const interval = setInterval(fetchTokenData, 214);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (num < 0.000001) {
      return `$${num.toExponential(2)}`;
    }
    return `$${num.toFixed(8)}`;
  };

  if (loading) {
    return (
      <section className="relative py-24 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-12 text-black">
            <span className="text-[#02fb4a]">$BUCKY</span> LIVE
          </h2>
          <div className="text-center text-gray-600">Loading live data...</div>
        </div>
      </section>
    );
  }

  if (error || !tokenData) {
    return (
      <section className="relative py-24 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-12 text-black">
            <span className="text-[#02fb4a]">$BUCKY</span> LIVE
          </h2>
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-center mb-12 text-black">
          <span className="text-[#02fb4a]">$BUCKY</span> LIVE
        </h2>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Price */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-[#02fb4a]">
            <div className="text-sm text-gray-600 font-semibold mb-2">PRICE</div>
            <div className="text-3xl font-black text-black mb-2">
              {formatPrice(tokenData.priceUsd)}
            </div>
            <div className={`text-sm font-bold ${tokenData.priceChange.h24 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {tokenData.priceChange.h24 >= 0 ? '▲' : '▼'} {Math.abs(tokenData.priceChange.h24).toFixed(2)}% (24h)
            </div>
          </div>

          {/* Market Cap */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-[#02fb4a]">
            <div className="text-sm text-gray-600 font-semibold mb-2">MARKET CAP</div>
            <div className="text-3xl font-black text-black">
              {formatNumber(tokenData.marketCap)}
            </div>
          </div>

          {/* 24h Volume */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-[#02fb4a]">
            <div className="text-sm text-gray-600 font-semibold mb-2">24H VOLUME</div>
            <div className="text-3xl font-black text-black">
              {formatNumber(tokenData.volume.h24)}
            </div>
          </div>

          {/* Liquidity */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-[#02fb4a]">
            <div className="text-sm text-gray-600 font-semibold mb-2">LIQUIDITY</div>
            <div className="text-3xl font-black text-black">
              {formatNumber(tokenData.liquidity.usd)}
            </div>
          </div>
        </div>

        {/* Price Changes */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-[#02fb4a] mb-8">
          <h3 className="text-2xl font-black mb-6 text-black">PRICE CHANGES</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 font-semibold mb-2">5M</div>
              <div className={`text-2xl font-black ${tokenData.priceChange.m5 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tokenData.priceChange.m5 >= 0 ? '+' : ''}{tokenData.priceChange.m5.toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 font-semibold mb-2">1H</div>
              <div className={`text-2xl font-black ${tokenData.priceChange.h1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tokenData.priceChange.h1 >= 0 ? '+' : ''}{tokenData.priceChange.h1.toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 font-semibold mb-2">6H</div>
              <div className={`text-2xl font-black ${tokenData.priceChange.h6 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tokenData.priceChange.h6 >= 0 ? '+' : ''}{tokenData.priceChange.h6.toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 font-semibold mb-2">24H</div>
              <div className={`text-2xl font-black ${tokenData.priceChange.h24 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tokenData.priceChange.h24 >= 0 ? '+' : ''}{tokenData.priceChange.h24.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-[#02fb4a]">
          <h3 className="text-2xl font-black mb-6 text-black">TRANSACTIONS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 font-semibold mb-2">5M</div>
              <div className="text-lg font-bold text-green-600">↑ {tokenData.txns.m5.buys}</div>
              <div className="text-lg font-bold text-red-600">↓ {tokenData.txns.m5.sells}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 font-semibold mb-2">1H</div>
              <div className="text-lg font-bold text-green-600">↑ {tokenData.txns.h1.buys}</div>
              <div className="text-lg font-bold text-red-600">↓ {tokenData.txns.h1.sells}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 font-semibold mb-2">6H</div>
              <div className="text-lg font-bold text-green-600">↑ {tokenData.txns.h6.buys}</div>
              <div className="text-lg font-bold text-red-600">↓ {tokenData.txns.h6.sells}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 font-semibold mb-2">24H</div>
              <div className="text-lg font-bold text-green-600">↑ {tokenData.txns.h24.buys}</div>
              <div className="text-lg font-bold text-red-600">↓ {tokenData.txns.h24.sells}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

