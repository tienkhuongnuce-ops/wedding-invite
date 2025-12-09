
import React from 'react';
import SectionTitle from './SectionTitle';
import { MapPin } from 'lucide-react';
import { weddingConfig } from '../config';

const Timeline: React.FC = () => {
  const { timeline, date, groom, bride } = weddingConfig;

  // Type guard for timeline (array vs object)
  const events = Array.isArray(timeline) ? timeline : [];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle 
          title="Chương Trình Hôn Lễ" 
          subtitle={`${date.dayOfWeek}, ${date.fullDate}`} 
        />
        
        <div className="relative mt-12 mb-20">
          {/* Vertical Dotted Line - Red */}
          <div className="absolute left-[15px] md:left-1/2 transform md:-translate-x-px top-0 bottom-0 border-l-2 border-dashed border-wedding-primary/30"></div>

          {events.map((event: any, index: number) => (
            <div key={index} className={`flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-16 relative ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                
                {/* Content Box */}
                <div className="w-full md:w-5/12 pl-12 md:pl-0 md:pr-12 text-left md:text-right group">
                   {index % 2 !== 0 && <div className="hidden md:block">
                       <h3 className="font-serif text-2xl text-wedding-text group-hover:text-wedding-primary transition-colors">{event.title}</h3>
                       <p className="font-bold text-wedding-primary mt-1">{event.time}</p>
                       <p className="text-gray-500 text-sm mt-2">{event.location}</p>
                   </div>}
                   
                   {/* Mobile View (Always Left) */}
                   <div className="md:hidden">
                       <h3 className="font-serif text-xl text-wedding-text">{event.title}</h3>
                       <p className="font-bold text-wedding-primary mt-1">{event.time}</p>
                       <p className="text-gray-500 text-sm mt-2">{event.location}</p>
                   </div>

                   {/* Desktop Left View */}
                   {index % 2 === 0 && <div className="hidden md:block text-right">
                       <h3 className="font-serif text-2xl text-wedding-text group-hover:text-wedding-primary transition-colors">{event.title}</h3>
                       <p className="font-bold text-wedding-primary mt-1">{event.time}</p>
                       <p className="text-gray-500 text-sm mt-2">{event.location}</p>
                   </div>}
                </div>
                
                {/* Center Dot - Red */}
                <div className="absolute left-[6px] md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-white border-4 border-wedding-primary rounded-full z-10"></div>

                {/* Empty Space for alignment */}
                <div className="w-full md:w-5/12 hidden md:block"></div>
            </div>
          ))}
        </div>
        
        {/* Map Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href={groom.mapUrl} target="_blank" rel="noreferrer" className="block group h-full">
                  <div className="bg-white p-6 rounded-2xl border border-wedding-primary/20 group-hover:border-wedding-primary transition-all duration-300 shadow-sm group-hover:shadow-md text-center h-full">
                      <div className="w-12 h-12 bg-wedding-primary/10 text-wedding-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <MapPin size={20} />
                      </div>
                      <h4 className="font-serif text-xl mb-2">Nhà Trai</h4>
                      <p className="text-gray-500 text-sm mb-4">{groom.address}</p>
                      
                      {groom.mapEmbedUrl && (
                        <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-100 shadow-inner mb-4">
                           <iframe 
                             src={groom.mapEmbedUrl} 
                             width="100%" 
                             height="100%" 
                             style={{border:0}} 
                             allowFullScreen 
                             loading="lazy" 
                             referrerPolicy="no-referrer-when-downgrade"
                             title="Groom Map"
                           ></iframe>
                        </div>
                      )}
                      
                      <span className="text-wedding-primary text-xs font-bold uppercase inline-block border-b border-wedding-primary pb-1 group-hover:text-red-800">
                        Chỉ đường
                      </span>
                  </div>
              </a>

              <a href={bride.mapUrl} target="_blank" rel="noreferrer" className="block group h-full">
                  <div className="bg-white p-6 rounded-2xl border border-wedding-primary/20 group-hover:border-wedding-primary transition-all duration-300 shadow-sm group-hover:shadow-md text-center h-full">
                      <div className="w-12 h-12 bg-wedding-primary/10 text-wedding-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <MapPin size={20} />
                      </div>
                      <h4 className="font-serif text-xl mb-2">Nhà Gái</h4>
                      <p className="text-gray-500 text-sm mb-4">{bride.address}</p>
                      
                       {bride.mapEmbedUrl && (
                        <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-100 shadow-inner mb-4">
                           <iframe 
                             src={bride.mapEmbedUrl} 
                             width="100%" 
                             height="100%" 
                             style={{border:0}} 
                             allowFullScreen 
                             loading="lazy" 
                             referrerPolicy="no-referrer-when-downgrade"
                             title="Bride Map"
                           ></iframe>
                        </div>
                      )}

                      <span className="text-wedding-primary text-xs font-bold uppercase inline-block border-b border-wedding-primary pb-1 group-hover:text-red-800">
                        Chỉ đường
                      </span>
                  </div>
              </a>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
