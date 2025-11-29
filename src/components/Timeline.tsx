import React from 'react';
import SectionTitle from './SectionTitle';
import { MapPin } from 'lucide-react';
import { weddingConfig } from '../config';

const Timeline: React.FC = () => {
  const { timeline, date, groom, bride } = weddingConfig;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle 
          title="Wedding Events" 
          subtitle={`${date.dayOfWeek}, ${date.fullDate}`} 
        />
        
        <div className="relative mt-12 mb-20">
          {/* Vertical Dotted Line - Gold */}
          <div className="absolute left-[15px] md:left-1/2 transform md:-translate-x-px top-0 bottom-0 border-l-2 border-dashed border-wedding-gold/40"></div>

          {timeline.map((event, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-16 relative ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              
              {/* Content Box */}
              <div className="w-full md:w-5/12 pl-12 md:pl-0 md:pr-12 text-left md:text-right group">
                 {index % 2 !== 0 && <div className="hidden md:block">
                     <h3 className="font-serif text-2xl text-wedding-text group-hover:text-wedding-red transition-colors">{event.title}</h3>
                     <p className="font-bold text-wedding-gold mt-1">{event.time}</p>
                     <p className="text-gray-500 text-sm mt-2">{event.location}</p>
                 </div>}
                 
                 {/* Mobile View (Always Left) */}
                 <div className="md:hidden">
                     <h3 className="font-serif text-xl text-wedding-text">{event.title}</h3>
                     <p className="font-bold text-wedding-gold mt-1">{event.time}</p>
                     <p className="text-gray-500 text-sm mt-2">{event.location}</p>
                 </div>

                 {/* Desktop Left View */}
                 {index % 2 === 0 && <div className="hidden md:block text-right">
                     <h3 className="font-serif text-2xl text-wedding-text group-hover:text-wedding-red transition-colors">{event.title}</h3>
                     <p className="font-bold text-wedding-gold mt-1">{event.time}</p>
                     <p className="text-gray-500 text-sm mt-2">{event.location}</p>
                 </div>}
              </div>
              
              {/* Center Dot - Gold */}
              <div className="absolute left-[6px] md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-wedding-cream border-4 border-wedding-gold rounded-full z-10"></div>

              {/* Empty Space for alignment */}
              <div className="w-full md:w-5/12 hidden md:block"></div>
            </div>
          ))}
        </div>
        
        {/* Map Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a href={groom.mapUrl} target="_blank" rel="noreferrer" className="block group">
                <div className="bg-wedding-cream p-8 rounded-2xl border border-wedding-gold/20 group-hover:border-wedding-gold transition-all duration-300 shadow-sm group-hover:shadow-md text-center">
                    <div className="w-12 h-12 bg-wedding-red/10 text-wedding-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <MapPin size={20} />
                    </div>
                    <h4 className="font-serif text-xl mb-2">Nhà Trai</h4>
                    <p className="text-gray-500 text-sm">{groom.address}</p>
                    <span className="text-wedding-red text-xs font-bold uppercase mt-4 inline-block border-b border-wedding-red">Xem bản đồ</span>
                </div>
            </a>

            <a href={bride.mapUrl} target="_blank" rel="noreferrer" className="block group">
                <div className="bg-wedding-cream p-8 rounded-2xl border border-wedding-gold/20 group-hover:border-wedding-gold transition-all duration-300 shadow-sm group-hover:shadow-md text-center">
                    <div className="w-12 h-12 bg-wedding-red/10 text-wedding-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <MapPin size={20} />
                    </div>
                    <h4 className="font-serif text-xl mb-2">Nhà Gái</h4>
                    <p className="text-gray-500 text-sm">{bride.address}</p>
                    <span className="text-wedding-red text-xs font-bold uppercase mt-4 inline-block border-b border-wedding-red">Xem bản đồ</span>
                </div>
            </a>
        </div>
      </div>
    </section>
  );
};

export default Timeline;