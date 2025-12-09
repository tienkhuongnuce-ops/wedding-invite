
import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../config';

// Traditional Corner Pattern SVG
const CornerDecoration = ({ className }: { className: string }) => (
  <svg viewBox="0 0 100 100" className={`w-24 h-24 md:w-40 md:h-40 absolute text-wedding-primary/40 pointer-events-none z-20 ${className}`} fill="currentColor">
    <path d="M0,0 L40,0 C60,0 70,10 70,30 L70,35 C70,45 60,45 50,45 L40,45 L40,55 C40,65 30,65 30,55 L30,45 L10,45 L10,10 Z" />
    <path d="M5,5 L5,40 C5,60 15,70 35,70 L40,70 L40,65 L35,65 C25,65 25,55 25,45 L25,40 L65,40 L65,5 Z" />
    <circle cx="20" cy="20" r="3" />
  </svg>
);

const Hero: React.FC = () => {
  const { groom, bride, date, images } = weddingConfig;
  const displayDayOfWeek = date.dayOfWeek.split('(')[0].trim().toUpperCase();

  // --- COUNTDOWN LOGIC ---
  const calculateTimeLeft = () => {
    const timeParts = (date.time || "00:00").split(':');
    let hours = parseInt(timeParts[0]) || 0;
    const minutes = parseInt(timeParts[1]) || 0;

    const targetDate = new Date(
        parseInt(date.year),
        parseInt(date.month) - 1, 
        parseInt(date.day),
        hours,
        minutes
    ).getTime();

    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-wedding-bg">
      {/* 1. Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={images.hero} 
          alt="Wedding Background" 
          className="w-full h-full object-cover animate-float"
          style={{ animationDuration: '20s' }}
          onError={(e) => {
             const target = e.target as HTMLImageElement;
             target.style.display = 'none'; // Hide if broken
          }}
        />
        {/* Strong overlay to ensure text readability and blend with theme */}
        <div className="absolute inset-0 bg-wedding-bg/85 backdrop-blur-[2px]"></div>
      </div>

      {/* 2. Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
         <CornerDecoration className="top-0 left-0" />
         <CornerDecoration className="top-0 right-0 transform scale-x-[-1]" />
         <CornerDecoration className="bottom-0 left-0 transform scale-y-[-1]" />
         <CornerDecoration className="bottom-0 right-0 transform rotate-180" />
         
         {/* Central Watermark Pattern */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.05] text-wedding-primary pointer-events-none">
            <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full animate-spin-slow">
               <path d="M100,0 L110,20 L130,20 L120,40 L130,60 L110,60 L100,80 L90,60 L70,60 L80,40 L70,20 L90,20 Z" transform="rotate(0 100 100)" />
               <path d="M100,0 L110,20 L130,20 L120,40 L130,60 L110,60 L100,80 L90,60 L70,60 L80,40 L70,20 L90,20 Z" transform="rotate(45 100 100)" />
               <path d="M100,0 L110,20 L130,20 L120,40 L130,60 L110,60 L100,80 L90,60 L70,60 L80,40 L70,20 L90,20 Z" transform="rotate(90 100 100)" />
               <path d="M100,0 L110,20 L130,20 L120,40 L130,60 L110,60 L100,80 L90,60 L70,60 L80,40 L70,20 L90,20 Z" transform="rotate(135 100 100)" />
               <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
               <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 4" />
            </svg>
         </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="relative z-20 w-[90%] max-w-[90%] h-[90%] md:h-[85%] border-2 border-wedding-primary/30 flex flex-col items-center justify-center p-4 md:p-8 rounded-[2rem] shadow-xl bg-white/30 backdrop-blur-sm">
        {/* Inner Border */}
        <div className="absolute inset-2 border border-wedding-primary/10 rounded-[1.5rem] pointer-events-none"></div>

        <div className="mb-8 font-sans uppercase tracking-[0.3em] text-xs md:text-sm text-wedding-bg bg-wedding-primary py-2 px-8 rounded-full shadow-lg">
          Trân Trọng Báo Tin
        </div>
        
        <div className="flex flex-col items-center justify-center gap-6 mb-8 w-full">
           {/* Groom Name */}
          <h1 className="font-names text-5xl md:text-7xl lg:text-9xl text-wedding-primary animate-float drop-shadow-sm" style={{ animationDuration: '4s' }}>
            {groom.firstName}
          </h1>
          
          {/* Symbol */}
          <div className="bg-wedding-primary w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 border-wedding-bg shadow-lg z-10">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-wedding-bg">
                <path d="M9.5 8C11.9853 8 14 10.0147 14 12.5C14 14.9853 11.9853 17 9.5 17C7.01472 17 5 14.9853 5 12.5C5 10.0147 7.01472 8 9.5 8Z" />
                <path d="M14.5 8C16.9853 8 19 10.0147 19 12.5C19 14.9853 16.9853 17 14.5 17C12.0147 17 10 14.9853 10 12.5C10 10.0147 12.0147 8 14.5 8Z" />
             </svg>
          </div>
          
          {/* Bride Name */}
          <h1 className="font-names text-5xl md:text-7xl lg:text-9xl text-wedding-primary animate-float drop-shadow-sm" style={{ animationDuration: '5s' }}>
            {bride.firstName}
          </h1>
        </div>

        {/* Date Section */}
        <div className="flex items-center justify-center w-full max-w-4xl mx-auto mt-4 text-wedding-primary font-sans">
          
          <div className="flex-1 flex justify-end px-2 md:px-6">
            <div className="border-y-[1px] md:border-y-[1.5px] border-wedding-primary h-12 md:h-16 w-24 md:w-40 flex items-center justify-center bg-white/50 backdrop-blur-md">
              <span className="text-xs md:text-xl font-bold tracking-widest whitespace-nowrap">
                {displayDayOfWeek}
              </span>
            </div>
          </div>

          <div className="flex flex-col w-min mx-2 md:mx-6 text-wedding-primary">
            <div className="flex justify-between w-full text-[10px] md:text-lg font-bold uppercase tracking-widest mb-1 opacity-80 whitespace-nowrap">
              <span>Tháng</span>
              <span>{date.month}</span>
            </div>
            <span className="text-[4rem] md:text-[8rem] font-serif font-bold leading-[0.8] tracking-tighter text-center whitespace-nowrap drop-shadow-sm">
              {date.day}
            </span>
            <div className="flex justify-between w-full text-[10px] md:text-lg font-bold mt-1 opacity-80">
              {date.year.split('').map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-start px-2 md:px-6">
             <div className="border-y-[1px] md:border-y-[1.5px] border-wedding-primary h-12 md:h-16 w-24 md:w-40 flex items-center justify-center bg-white/50 backdrop-blur-md">
                <span className="text-xs md:text-xl font-bold tracking-widest">
                  {date.time || "11:30"}
                </span>
             </div>
          </div>
        </div>

        {/* --- COUNTDOWN TIMER --- */}
        <div className="mt-10 flex justify-center gap-4 md:gap-10 text-wedding-primary">
           <div className="flex flex-col items-center">
              <span className="text-2xl md:text-4xl font-serif font-bold">{timeLeft.days}</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-70 mt-1">Ngày</span>
           </div>
           <div className="h-8 w-px bg-wedding-primary/30 mt-2"></div>
           <div className="flex flex-col items-center">
              <span className="text-2xl md:text-4xl font-serif font-bold">{timeLeft.hours}</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-70 mt-1">Giờ</span>
           </div>
           <div className="h-8 w-px bg-wedding-primary/30 mt-2"></div>
           <div className="flex flex-col items-center">
              <span className="text-2xl md:text-4xl font-serif font-bold">{timeLeft.minutes}</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-70 mt-1">Phút</span>
           </div>
           <div className="h-8 w-px bg-wedding-primary/30 mt-2"></div>
           <div className="flex flex-col items-center">
              <span className="text-2xl md:text-4xl font-serif font-bold">{timeLeft.seconds}</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-70 mt-1">Giây</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
