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
             <div className="border-y-[1px] md:border-y-[1.5px] border-white h-12 md:h-16 w-28 md:w-48 flex items-center justify-center">
                <span className="text-sm md:text-2xl font-medium tracking-widest">
                  {date.time || "11:30"}
                </span>
             </div>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-80">
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;