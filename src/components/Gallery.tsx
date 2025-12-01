import React, { useState, useEffect, useCallback } from 'react';
import SectionTitle from './SectionTitle';
import { weddingConfig } from '../config';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const Gallery: React.FC = () => {
  const { images, video } = weddingConfig;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => 
      prev === null ? null : (prev + 1) % images.gallery.length
    );
  }, [images.gallery.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => 
      prev === null ? null : (prev - 1 + images.gallery.length) % images.gallery.length
    );
  }, [images.gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <section className="py-24 bg-wedding-bg">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Sweet Moments" subtitle="Những khoảnh khắc đẹp nhất" />
        
        {/* Embedded Video Section */}
        {video && video.embedUrl && (
          <div className="mb-16 max-w-4xl mx-auto relative z-10">
            <div className="bg-white p-2 md:p-4 rounded-2xl shadow-lg border border-wedding-primary/20 transform transition-transform duration-500 hover:scale-[1.01]">
              <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-black shadow-inner">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={video.embedUrl} 
                  title="Pre-wedding Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            {video.description && (
              <p className="mt-6 text-center text-gray-500 font-serif italic text-lg max-w-2xl mx-auto leading-relaxed">
                "{video.description}"
              </p>
            )}
          </div>
        )}

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.gallery.map((photo, index) => (
            <div 
              key={index} 
              className="bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-zoom-in relative group"
              onClick={() => openLightbox(index)}
            >
              <div className="overflow-hidden rounded-md relative aspect-[3/4]">
                <img 
                  src={photo} 
                  alt={`Moment ${index}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = `https://placehold.co/600x800/FDFBF7/9F1239?text=Photo+${index+1}`;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="text-white drop-shadow-md" size={32} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[110]"
          >
            <X size={32} />
          </button>

          {/* Prev Button */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[110] hidden md:block"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Image Container */}
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images.gallery[lightboxIndex]} 
              alt="Gallery Fullscreen" 
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
            />
            {/* Counter */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/80 font-serif tracking-widest text-sm">
              {lightboxIndex + 1} / {images.gallery.length}
            </div>
          </div>

          {/* Next Button */}
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[110] hidden md:block"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;