'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdClose, MdShuffle, MdDownload } from 'react-icons/md';
import FloatingCandles from '@/components/FloatingCandles';

// Asset categories based on the available images
const categories = {
  background: [
    'Ace', 'Believe', 'Blue_Playing_Card', 'Blur', 'Browser', 'Candles', 
    'Crowd', 'Explosion', 'Eyes_Everywhere', 'Ghost_Of_Past_Light', 
    'Gost_Of_Past', 'Gov', 'Green_Playing_Card', 'High_Health', 
    'Low_Health', 'Matrix 2', 'Matrix_Light 2', 'Money', 'N_P_C_Crowd'
  ],
  torso: [
    null, 'Bikies_Bandana', 'Bikies_Vest', 'Gold_Chain', 'Gold_Medal', 
    'Golden_Chain', 'Green_Scarfe', 'Manager_Safety_Vest', 'Overall',
    'Safety_Vest', 'Silver_Chain', 'Silver_Medal', 'Stethoscope',
    'Tux_Vest', 'White_Scarfe'
  ],
  eyes: ['Normal', 'Angry_eyes', 'Left_eyes', 'Shut_Happy_Eyes'],
  mouth: [
    'Normal', 'Cigarette', 'Droll', 'Gold_grillz', 'Grillz', 
    'Rich_grillz', 'Smirk_teeth', 'Teeth', 'Tongue'
  ],
  hands: [
    'Basic', 'Awe', 'Basketball', 'Binoculars', 'Boxing', 'Buck_Hub',
    'Calling', 'Chart', 'Coke', 'Diamonds', 'Discord', 'Drone', 'Dual_Fish',
    'Dual_Golden_Money_Guns', 'Dual_Pistols', 'Dual_Red_Money_Guns',
    'Dual_Water_Guns', 'Fish_And_Fishing_Rod', 'Fishing_Rod', 'Hands_Up',
    'Holding_Mug', 'Huge_Candle', 'Infnity_Gauntlet', 'Juicebox', 'Keyboard',
    'Laser_Gun', 'M4_Carbine', 'Middle_Finger', 'Minecraft_Pickaxe', 'Phones',
    'Pointing_At_Mouth', 'Rub', 'Selfie', 'Small_Candle', 'Sniper', 'Tennis',
    'Up_Only', 'Vape', 'Video', 'What', 'You_get_it'
  ],
  head: [
    null, 'Ancient_Helmet', 'Army_Balaclava', 'Astronaut', 'Blue_Backwards_Cap',
    'Blue_Cap', 'Bonk', 'Brains', 'Camo_Cap', 'Chroome_Helmet', 'Clown_Hair',
    'Cowboy', 'Dark_Shienty', 'Duck', 'Frog_Hat', 'Gas_Mask', 'Giraffe',
    'Golden_Crown', 'Golden_Halo', 'Green_Backwards_Bucky_Cap', 'Hard_Hat',
    'Monogram_Balaclava', 'Mushroom_Head', 'Orange_Beanie', 'Paper_Bag',
    'Paper_Plane', 'Pirate', 'Propeller_Hat', 'Red_Backwards_Cap', 'Red_Beer_Cap',
    'Red_Cap', 'Red_Shienty', 'Royal_Crown', 'Sailor', 'Shampo', 'Silver_Crown',
    'Silver_Halo', 'Tactical_Helmet', 'Trench_Soldier', 'Trump_Hair', 'War_Helmet',
    'White_Bucky_Backwards_Cap', 'White_Shienty', 'Wizard_Hat'
  ],
};

type CategoryKey = keyof typeof categories;

const categoryLabels: Record<CategoryKey, string> = {
  background: 'Background',
  torso: 'Clothes',
  eyes: 'Style',
  mouth: 'Mouth',
  hands: 'Hands',
  head: 'Head Accessories',
};

export default function PFPGenerator() {
  const [selectedAssets, setSelectedAssets] = useState({
    background: 'Blur',
    eyes: 'Normal',
    mouth: 'Normal',
    torso: null as string | null,
    hands: 'Basic',
    head: null as string | null,
  });

  const [activeCategory, setActiveCategory] = useState<CategoryKey>('background');

  const totalAssets = Object.values(categories).reduce((acc, cat) => acc + cat.length, 0);
  const totalCombinations = Object.values(categories).reduce((acc, cat) => acc * cat.length, 1);

  const handleAssetSelect = (category: CategoryKey, asset: string | null) => {
    setSelectedAssets(prev => ({
      ...prev,
      [category]: asset
    }));
  };

  const handleRandomize = () => {
    const random = {
      background: categories.background[Math.floor(Math.random() * categories.background.length)],
      eyes: categories.eyes[Math.floor(Math.random() * categories.eyes.length)],
      mouth: categories.mouth[Math.floor(Math.random() * categories.mouth.length)],
      torso: Math.random() > 0.5 ? categories.torso[Math.floor(Math.random() * categories.torso.length)] : null,
      hands: categories.hands[Math.floor(Math.random() * categories.hands.length)],
      head: Math.random() > 0.3 ? categories.head[Math.floor(Math.random() * categories.head.length)] : null,
    };
    setSelectedAssets(random);
  };

  const handleDownload = async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size (800x800 for high quality)
      canvas.width = 800;
      canvas.height = 800;

      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      // Layer order: background -> base -> torso -> eyes -> mouth -> hands -> head
      const layers = [
        selectedAssets.background ? `/BUCKYPFPASSETS/Background/${selectedAssets.background}.png` : null,
        '/BUCKYPFPASSETS/Base/Base_BUCKY.png',
        selectedAssets.torso ? `/BUCKYPFPASSETS/Torso/${selectedAssets.torso}.png` : null,
        selectedAssets.eyes ? `/BUCKYPFPASSETS/Eyes/${selectedAssets.eyes}.png` : null,
        selectedAssets.mouth ? `/BUCKYPFPASSETS/Mouth/${selectedAssets.mouth}.png` : null,
        selectedAssets.hands ? `/BUCKYPFPASSETS/Hands/${selectedAssets.hands}.png` : null,
        selectedAssets.head ? `/BUCKYPFPASSETS/Head/${selectedAssets.head}.png` : null,
      ].filter(Boolean) as string[];

      // Load and draw all layers
      for (const layerSrc of layers) {
        const img = await loadImage(layerSrc);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `bucky-pfp-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Error downloading PFP:', error);
      alert('Failed to download. Please try again or take a screenshot.');
    }
  };

  return (
    <main className="relative min-h-screen bg-white">
      <FloatingCandles />
      
      <div className="relative z-10 p-8 pt-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-5xl font-black mb-2 text-black">
                CREATE YOUR <span className="text-[#02fb4a]">BUCKY</span>
              </h1>
              <p className="text-gray-600 text-lg">Mix and match to create your unique PFP</p>
            </div>
            <Link href="/">
              <button className="relative p-3 bg-black text-white rounded-xl transition-all hover:scale-105 overflow-hidden group">
                <MdClose className="text-3xl relative z-10 group-hover:text-black transition-colors" />
                <div className="absolute inset-0 bg-[#02fb4a] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Preview */}
            <div>
              {/* Preview Area */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-4 border-[#02fb4a] mb-6 shadow-2xl">
                <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-200">
                  {/* Layer 1: Background */}
                  {selectedAssets.background && (
                    <Image
                      src={`/BUCKYPFPASSETS/Background/${selectedAssets.background}.png`}
                      alt="Background"
                      fill
                      className="object-cover"
                      style={{ zIndex: 1 }}
                    />
                  )}
                  
                  {/* Layer 2: Base Bucky */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
                    <Image
                      src="/BUCKYPFPASSETS/Base/Base_BUCKY.png"
                      alt="Base Bucky"
                      width={400}
                      height={400}
                      className="relative"
                    />
                  </div>
                  
                  {/* Layer 3: Torso/Clothes */}
                  {selectedAssets.torso && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
                      <Image
                        src={`/BUCKYPFPASSETS/Torso/${selectedAssets.torso}.png`}
                        alt="Torso"
                        width={400}
                        height={400}
                        className="relative"
                      />
                    </div>
                  )}
                  
                  {/* Layer 4: Eyes */}
                  {selectedAssets.eyes && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 4 }}>
                      <Image
                        src={`/BUCKYPFPASSETS/Eyes/${selectedAssets.eyes}.png`}
                        alt="Eyes"
                        width={400}
                        height={400}
                        className="relative"
                      />
                    </div>
                  )}
                  
                  {/* Layer 5: Mouth */}
                  {selectedAssets.mouth && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 5 }}>
                      <Image
                        src={`/BUCKYPFPASSETS/Mouth/${selectedAssets.mouth}.png`}
                        alt="Mouth"
                        width={400}
                        height={400}
                        className="relative"
                      />
                    </div>
                  )}
                  
                  {/* Layer 6: Hands */}
                  {selectedAssets.hands && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 6 }}>
                      <Image
                        src={`/BUCKYPFPASSETS/Hands/${selectedAssets.hands}.png`}
                        alt="Hands"
                        width={400}
                        height={400}
                        className="relative"
                      />
                    </div>
                  )}
                  
                  {/* Layer 7: Head Accessories */}
                  {selectedAssets.head && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 7 }}>
                      <Image
                        src={`/BUCKYPFPASSETS/Head/${selectedAssets.head}.png`}
                        alt="Head"
                        width={400}
                        height={400}
                        className="relative"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleRandomize}
                  className="relative flex-1 bg-[#02fb4a] text-black font-black py-4 rounded-xl transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-lg overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <MdShuffle className="text-2xl" />
                    RANDOMIZE
                  </span>
                  <div className="absolute inset-0 bg-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-white font-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 gap-2">
                    <MdShuffle className="text-2xl" />
                    RANDOMIZE
                  </span>
                </button>
                <button
                  onClick={handleDownload}
                  className="relative bg-black text-white font-black py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-lg border-4 border-black hover:border-[#02fb4a] overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <MdDownload className="text-2xl" />
                    DOWNLOAD
                  </span>
                  <div className="absolute inset-0 bg-[#02fb4a] transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-black font-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 gap-2">
                    <MdDownload className="text-2xl" />
                    DOWNLOAD
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-4 border-[#02fb4a] shadow-xl">
                  <div className="text-4xl font-black text-[#02fb4a] mb-1">
                    {totalCombinations.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide font-bold">Combinations</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-4 border-[#02fb4a] shadow-xl">
                  <div className="text-4xl font-black text-[#02fb4a] mb-1">{totalAssets}</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide font-bold">Total Assets</div>
                </div>
              </div>
            </div>

            {/* Right Side - Customization */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-4 border-[#02fb4a] shadow-2xl">
              {/* Category Tabs */}
              <div className="mb-6">
                <div className="flex gap-0 overflow-x-auto scrollbar-hide">
                  {(Object.keys(categories) as CategoryKey[]).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`relative px-6 py-3 font-bold text-sm uppercase whitespace-nowrap transition-all ${
                        activeCategory === category
                          ? 'text-black'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {categoryLabels[category]}
                    </button>
                  ))}
                </div>
                {/* Active indicator bar */}
                <div className="relative h-1 bg-gray-200 rounded-full mt-2">
                  <div 
                    className="absolute h-full bg-[#02fb4a] rounded-full transition-all duration-300"
                    style={{
                      width: `${100 / Object.keys(categories).length}%`,
                      left: `${(Object.keys(categories).indexOf(activeCategory) * 100) / Object.keys(categories).length}%`
                    }}
                  />
                </div>
              </div>

              {/* Category Title */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black text-black">Select {categoryLabels[activeCategory]}</h3>
                <span className="text-sm text-gray-600 font-bold">
                  {categories[activeCategory].length} options
                </span>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {categories[activeCategory].map((asset, index) => (
                  <button
                    key={index}
                    onClick={() => handleAssetSelect(activeCategory, asset)}
                    className={`relative aspect-square rounded-2xl overflow-hidden transition-all hover:scale-105 ${
                      selectedAssets[activeCategory] === asset
                        ? 'ring-4 ring-[#02fb4a] shadow-lg'
                        : 'ring-2 ring-gray-300 hover:ring-gray-400 hover:shadow-md'
                    }`}
                  >
                    {asset === null ? (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-bold text-sm">None</span>
                      </div>
                    ) : activeCategory === 'background' ? (
                      <Image
                        src={`/BUCKYPFPASSETS/Background/${asset}.png`}
                        alt={asset}
                        fill
                        className="object-cover"
                      />
                    ) : activeCategory === 'torso' ? (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Image
                          src={`/BUCKYPFPASSETS/Torso/${asset}.png`}
                          alt={asset}
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </div>
                    ) : activeCategory === 'eyes' ? (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Image
                          src={`/BUCKYPFPASSETS/Eyes/${asset}.png`}
                          alt={asset}
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </div>
                    ) : activeCategory === 'mouth' ? (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Image
                          src={`/BUCKYPFPASSETS/Mouth/${asset}.png`}
                          alt={asset}
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </div>
                    ) : activeCategory === 'hands' ? (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Image
                          src={`/BUCKYPFPASSETS/Hands/${asset}.png`}
                          alt={asset}
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Image
                          src={`/BUCKYPFPASSETS/Head/${asset}.png`}
                          alt={asset}
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </div>
                    )}
                    
                    {/* Checkmark for selected */}
                    {selectedAssets[activeCategory] === asset && (
                      <div className="absolute top-2 right-2 bg-[#02fb4a] rounded-full p-1">
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #02fb4a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #01d63f;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
