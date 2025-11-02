'use client';

import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-4 border-[#02fb4a] overflow-visible">
          {/* Bucky peeking from top left */}
          <div className="absolute top-0 -left-12 w-48 h-48 z-20 -translate-y-full">
            <Image
              src="/buckyhero.avif"
              alt="Bucky"
              fill
              className="object-contain object-bottom"
            />
          </div>
          
          <h2 className="text-5xl font-black text-center mb-12 text-black">
            THE <span className="text-[#02fb4a]">LEGEND</span>
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed text-gray-800">
            <p>
              Bucky appeared on 4chan and was briefly popularized in 2019 (see:{' '}
              <a 
                href="https://knowyourmeme.com/memes/bucky" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#02fb4a] font-bold hover:underline"
              >
                knowyourmeme
              </a>
              ). His origins are somewhat uncertain, with some 4chan contributors speculating that he may have been created by Discord users before making his way to the boards. Bucky is depicted as a bright green-skinned character, exuding an unmistakable &quot;don&apos;t care&quot; energy – his flat expression and minimalistic design lending themselves perfectly to deadpan humor, absurdist edits, and surreal memes.
            </p>
            
            <p>
              Bucky was tokenized and deployed onto Solana through Bonk.Fun, with the community leading new memes and carrying his legacy forward with relentless brainrot, cursed art, and chaos on-chain.
            </p>
          </div>

          {/* Stats or Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-[#02fb4a]/10 rounded-2xl">
              <div className="text-4xl font-black text-[#02fb4a] mb-2">2019</div>
              <div className="text-sm font-semibold text-gray-700">BORN ON 4CHAN</div>
            </div>
            <div className="text-center p-6 bg-[#02fb4a]/10 rounded-2xl">
              <div className="text-4xl font-black text-[#02fb4a] mb-2">SOLANA</div>
              <div className="text-sm font-semibold text-gray-700">DEPLOYED ON CHAIN</div>
            </div>
            <div className="text-center p-6 bg-[#02fb4a]/10 rounded-2xl">
              <div className="text-4xl font-black text-[#02fb4a] mb-2">100%</div>
              <div className="text-sm font-semibold text-gray-700">COMMUNITY DRIVEN</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

