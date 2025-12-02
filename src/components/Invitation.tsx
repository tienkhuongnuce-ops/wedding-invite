
import React, { useEffect, useState } from 'react';
import { weddingConfig } from '../config';
import ScrollAnimation from './ScrollAnimation';

const CornerPattern: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-16 h-16 md:w-24 md:h-24 absolute pointer-events-none text-wedding-primary/20 ${className}`} fill="currentColor">
    <path d="M10,10 L30,10 C40,10 45,15 45,25 L45,30 C45,35 40,35 35,35 L30,35 L30,40 C30,45 25,45 25,35 L25,30 L10,30 L10,10 Z M90,10 L70,10 C60,10 55,15 55,25 L55,30 C55,35 60,35 65,35 L70,35 L70,40 C70,45 75,45 75,35 L75,30 L90,30 L90,10 Z" />
    <path d="M0,0 L40,0 L40,5 L5,5 L5,40 L0,40 L0,0 Z" />
    <path d="M20,20 Q30,20 30,30" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Invitation: React.FC = () => {
  const { groom, bride, images } = weddingConfig;
  const [guestName, setGuestName] = useState<string>("");

  useEffect(() => {
    // Logic to extract guest name from URL (e.g., domain.com/?g=Nguyen+Van+A)
    const params = new URLSearchParams(window.location.search);
    const name = params.get('g') || params.get('guest');
    if (name) {
      setGuestName(decodeURIComponent(name));
    }
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "https://placehold.co/400x400/e2e8f0/9F1239?text=No+Photo";
  };

  return (
    <section id="invitation" className="py-24 px-4 relative overflow-hidden bg-wedding-bg">
      <div className="max-w-4xl mx-auto text-center bg-white p-10 md:p-16 rounded-[2rem] shadow-xl border-2 border-wedding-primary/10 relative overflow-hidden">
        
        {/* Traditional Corner Patterns */}
        <CornerPattern className="top-0 left-0" />
        <CornerPattern className="top-0 right-0 transform scale-x-[-1]" />
        <CornerPattern className="bottom-0 left-0 transform scale-y-[-1]" />
        <CornerPattern className="bottom-0 right-0 transform rotate-180" />

        {/* Inner Border */}
        <div className="absolute inset-4 border border-wedding-primary/20 rounded-[1.5rem] pointer-events-none z-10"></div>

        <div className="relative z-20">
            {/* Traditional Header (—— 囍 ——) */}
            <ScrollAnimation variant="fade-up">
              <div className="flex items-center justify-center gap-6 mb-10">
                  <span className="h-[1px] w-16 md:w-24 bg-wedding-primary/60"></span>
                  <span className="text-5xl md:text-6xl font-serif text-wedding-primary font-bold tracking-widest drop-shadow-sm select-none bg-white px-4 border-2 border-wedding-primary rounded-full w-20 h-20 flex items-center justify-center">囍</span>
                  <span className="h-[1px] w-16 md:w-24 bg-wedding-primary/60"></span>
              </div>

              <h2 className="text-3xl md:text-4xl font-names text-wedding-primary mb-6 drop-shadow-sm">Trân trọng kính mời</h2>
              
              {/* Dynamic Guest Name Section */}
              <div className="flex flex-col items-center justify-center gap-2 text-wedding-primary mb-10 min-h-[4rem]">
                  {guestName ? (
                    <>
                      <span className="font-serif italic text-lg opacity-80">Đến dự hôn lễ của chúng mình</span>
                      <span className="font-serif text-2xl md:text-4xl font-bold border-b-2 border-wedding-primary/20 pb-2 px-8 mt-2 text-wedding-primary">
                        {guestName}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-serif italic text-lg opacity-80">Đến dự hôn lễ của chúng mình</span>
                      <span className="font-serif text-xl md:text-3xl font-bold mt-2">
                        Quý khách và Gia đình
                      </span>
                    </>
                  )}
              </div>

              <p className="font-serif text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto italic leading-relaxed">
              "Yêu nhau mấy núi cũng trèo, mấy sông cũng lội, mấy đèo cũng qua."
              <br />
              <span className="text-base font-sans not-italic text-gray-500 mt-4 block">
                  Sự hiện diện của bạn là niềm vinh hạnh lớn nhất của chúng mình.
              </span>
              </p>
            </ScrollAnimation>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 relative mt-12 mb-16">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-wedding-primary/10"></div>

            {/* Groom's Side */}
            <div className="flex-1 w-full">
              <ScrollAnimation variant="fade-left">
                <div className="text-center relative z-10 p-6 flex flex-col items-center">
                    {/* LABEL ON TOP */}
                    <p className="text-sm uppercase tracking-widest text-wedding-primary mb-4 font-bold border-b border-wedding-primary/30 pb-1">CHÚ RỂ</p>
                    
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-wedding-primary p-1">
                        <img 
                        src={images.groom} 
                        alt="Groom" 
                        className="w-full h-full object-cover rounded-full" 
                        onError={handleImageError}
                        />
                    </div>
                    <h3 className="text-4xl font-names text-wedding-primary mb-4">{groom.firstName}</h3>
                    
                    <div className="font-serif text-gray-800 space-y-1 text-sm md:text-base">
                    {groom.father && <p className="font-semibold">Ông: {groom.father}</p>}
                    {groom.mother && <p className="font-semibold">Bà: {groom.mother}</p>}
                    </div>
                    <p className="text-gray-500 text-xs italic mt-3 max-w-xs mx-auto">{groom.address}</p>
                </div>
              </ScrollAnimation>
            </div>

            {/* Bride's Side */}
            <div className="flex-1 w-full">
              <ScrollAnimation variant="fade-right" delay={200}>
                <div className="text-center relative z-10 p-6 flex flex-col items-center">
                    {/* LABEL ON TOP */}
                    <p className="text-sm uppercase tracking-widest text-wedding-primary mb-4 font-bold border-b border-wedding-primary/30 pb-1">CÔ DÂU</p>

                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-wedding-primary p-1">
                        <img 
                        src={images.bride} 
                        alt="Bride" 
                        className="w-full h-full object-cover rounded-full" 
                        onError={handleImageError}
                        />
                    </div>
                    <h3 className="text-4xl font-names text-wedding-primary mb-4">{bride.firstName}</h3>
                    
                    <div className="font-serif text-gray-800 space-y-1 text-sm md:text-base">
                    {bride.father && <p className="font-semibold">Ông: {bride.father}</p>}
                    {bride.mother && <p className="font-semibold">Bà: {bride.mother}</p>}
                    </div>
                    <p className="text-gray-500 text-xs italic mt-3 max-w-xs mx-auto">{bride.address}</p>
                </div>
              </ScrollAnimation>
            </div>
            </div>

            {/* Wedding Procession Decoration (Rước Dâu) */}
            {images.decoration && (
            <ScrollAnimation variant="zoom-in" delay={400}>
              <div className="w-full flex justify-center mt-8 opacity-90">
                  <img 
                  src={images.decoration} 
                  alt="Traditional Wedding Decoration" 
                  className="max-w-full h-auto md:max-h-32 object-contain mix-blend-multiply"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                  />
              </div>
            </ScrollAnimation>
            )}
        </div>
      </div>
    </section>
  );
};

export default Invitation;
