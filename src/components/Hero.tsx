import React from 'react';
import { weddingConfig } from '../config';

const Hero: React.FC = () => {
  const { groom, bride, date, images } = weddingConfig;

  // Extract Vietnamese day of week (e.g., "Chủ Nhật" from "Chủ Nhật (Sunday)")
  const displayDayOfWeek = date.dayOfWeek.split('(')[0].trim().toUpperCase();

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image with Dark Overlay for White Text */}
      <div className="absolute inset-0 z-0">
        <img 
          src={images.hero} 
          alt="Wedding Background" 
          className="w-full h-full object-cover scale-105 animate-float" // Slight movement
          style={{ animationDuration: '20s' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            // Fallback to a solid dark color if image is missing so text is still readable
            target.style.display = 'none';
          }}
        />
        {/* Fallback pattern if image fails */}
        <div className="absolute inset-0 bg-wedding-red/20 pattern-grid-lg opacity-20"></div>

        {/* Dark Overlay to make White Text Pop */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 w-full max-w-6xl">
        <div className="mb-6 font-sans uppercase tracking-[0.3em] text-xs md:text-sm text-gray-900 bg-white/90 backdrop-blur-md py-2 px-8 rounded-full inline-block shadow-lg">
          We Are Getting Married
        </div>
        
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
           {/* Floating Names - Antique Gold */}
          <h1 className="font-names text-6xl md:text-8xl lg:text-9xl text-wedding-gold animate-float drop-shadow-2xl" style={{ animationDuration: '4s' }}>
            {groom.firstName}
          </h1>
          {/* Double Happiness Symbol - White or Gold? Prompt implied Gold for names/accents. Let's make symbol Gold too. */}
          <span className="font-serif text-5xl md:text-6xl text-wedding-gold my-2 drop-shadow-lg select-none">囍</span>
          <h1 className="font-names text-6xl md:text-8xl lg:text-9xl text-wedding-gold animate-float drop-shadow-2xl" style={{ animationDuration: '5s' }}>
            {bride.firstName}
          </h1>
        </div>

        {/* Perfectly Aligned Date Section - Text White, Borders Gold */}
        <div className="flex items-center justify-center w-full max-w-4xl mx-auto mt-6 text-white font-sans drop-shadow-lg">
          
          {/* Left: Day of Week */}
          <div className="flex-1 flex justify-end px-2 md:px-6">
            <div className="border-y-[1px] md:border-y-[1.5px] border-wedding-gold h-12 md:h-16 w-28 md:w-48 flex items-center justify-center">
              <span className="text-sm md:text-2xl font-medium tracking-widest whitespace-nowrap">
                {displayDayOfWeek}
              </span>
            </div>
          </div>

          {/* Center: Big Date Stack */}
          <div className="flex flex-col w-min mx-4 md:mx-6 text-white drop-shadow-lg">
            {/* Month Row - Justified to width of number */}
            <div className="flex justify-between w-full text-xs md:text-xl font-light uppercase tracking-widest mb-1 md:mb-2 opacity-90 whitespace-nowrap">
              <span>Tháng</span>
              <span>{date.month}</span>
            </div>
            
            {/* Day Number - Defines the width */}
            <span className="text-[5rem] md:text-[9rem] font-bold leading-[0.8] tracking-tighter text-center whitespace-nowrap">
              {date.day}
            </span>

            {/* Year Row - Justified to width of number */}
            <div className="flex justify-between w-full text-xs md:text-xl font-light mt-2 opacity-90">
              {date.year.split('').map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </div>
          </div>

          {/* Right: Time */}
          <div className="flex-1 flex justify-start px-2 md:px-6">
             <div className="border-y-[1px] md:border-y-[1.5px] border-wedding-gold h-12 md:h-16 w-28 md:w-48 flex items-center justify-center">
                <span className="text-sm md:text-2xl font-medium tracking-widest">
                  {date.time || "11:30"}
                </span>
             </div>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-80">
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-wedding-gold to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;