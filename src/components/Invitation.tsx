import React from 'react';
import { weddingConfig } from '../config';

const Invitation: React.FC = () => {
  const { groom, bride } = weddingConfig;

  return (
    <section id="invitation" className="py-24 px-4 relative overflow-hidden bg-wedding-cream">
      {/* Removed blobs for cleaner look */}
      
      <div className="max-w-4xl mx-auto text-center bg-wedding-cream p-10 md:p-16 rounded-[2rem] shadow-xl border border-wedding-gold relative">
        {/* Double border effect */}
        <div className="absolute inset-3 border border-wedding-gold/30 rounded-[1.5rem] pointer-events-none"></div>

        {/* Simple Traditional Header (—— 囍 ——) */}
        <div className="flex items-center justify-center gap-6 mb-10">
            <span className="h-[2px] w-16 md:w-24 bg-wedding-gold/60"></span>
            <span className="text-5xl md:text-6xl font-serif text-wedding-red font-bold tracking-widest drop-shadow-sm select-none">囍</span>
            <span className="h-[2px] w-16 md:w-24 bg-wedding-gold/60"></span>
        </div>

        <h2 className="text-3xl md:text-4xl font-names text-wedding-red mb-3 drop-shadow-sm">Trân trọng kính mời</h2>
        <div className="flex items-center justify-center gap-4 text-wedding-gold mb-8">
            <span className="font-serif italic text-lg opacity-80">Save the Date</span>
        </div>

        <p className="font-serif text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto italic leading-relaxed">
          "Yêu nhau mấy núi cũng trèo, mấy sông cũng lội, mấy đèo cũng qua."
          <br />
          <span className="text-base font-sans not-italic text-gray-500 mt-4 block">
            Chúng mình rất mong chờ sự hiện diện của bạn trong ngày vui này.
          </span>
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 relative mt-12">
            {/* Center Divider Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-wedding-gold/30 to-transparent"></div>

          {/* Groom's Side */}
          <div className="text-center relative z-10 p-6 transition-all duration-500">
             <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-wedding-gold p-1 shadow-md">
                 <img src={weddingConfig.images.gallery[0]} alt="Groom" className="w-full h-full object-cover rounded-full" />
             </div>
            <h3 className="text-4xl font-names text-wedding-red mb-2 scale-110 drop-shadow-sm">{groom.firstName}</h3>
            <p className="text-xs uppercase tracking-widest text-wedding-gold mb-4 font-bold">Chú Rể</p>
            <div className="font-serif text-gray-800 space-y-1">
              {groom.father && <p className="font-semibold">Ông: {groom.father}</p>}
              {groom.mother && <p className="font-semibold">Bà: {groom.mother}</p>}
            </div>
            <p className="text-gray-500 text-sm italic mt-3 max-w-xs mx-auto">{groom.address}</p>
          </div>

          {/* Bride's Side */}
          <div className="text-center relative z-10 p-6 transition-all duration-500">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-wedding-gold p-1 shadow-md">
                 <img src={weddingConfig.images.gallery[1]} alt="Bride" className="w-full h-full object-cover rounded-full" />
             </div>
            <h3 className="text-4xl font-names text-wedding-red mb-2 scale-110 drop-shadow-sm">{bride.firstName}</h3>
            <p className="text-xs uppercase tracking-widest text-wedding-gold mb-4 font-bold">Cô Dâu</p>
            <div className="font-serif text-gray-800 space-y-1">
              {bride.father && <p className="font-semibold">Ông: {bride.father}</p>}
              {bride.mother && <p className="font-semibold">Bà: {bride.mother}</p>}
            </div>
            <p className="text-gray-500 text-sm italic mt-3 max-w-xs mx-auto">{bride.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invitation;