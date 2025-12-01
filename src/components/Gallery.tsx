
import React, { useState, useEffect, useCallback } from 'react';
import SectionTitle from './SectionTitle';
import { weddingConfig } from '../config';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const Gallery: React.FC = () => {
  const { images, video } = weddingConfig;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // --- SMART VIDEO URL HELPER ---
  // Converts standard YouTube links (watch?v=...) to Embed links automatically
  const getEmbedUrl = (url: string) => {
    try {
      if (!url) return '';
      // If it's already an embed link, return it
      if (url.includes('/embed/')) return url;
      
      // Handle standard URL: youtube.com/watch?v=ID
      if (url.includes('v=')) {
        const videoId = url.split('v=')[1].split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      
      // Handle short URL: youtu.be/ID
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      
      return url;
    } catch (e) {
      console.error("Error parsing YouTube URL:", e);
      return url;
    }
  };

  const videoUrl = video?.embedUrl ? getEmbedUrl(video.embedUrl) : '';

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
        {video && videoUrl && (
          <div className="mb-16 max-w-4xl mx-auto relative z-10">
            <div className="bg-white p-2 md:p-4 rounded-2xl shadow-lg border border-wedding-primary/20 transform transition-transform duration-500 hover:scale-[1.01]">
              {/* Video Container - 16:9 Aspect Ratio */}
              <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-black shadow-inner">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={videoUrl} 
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

        {/* Masonry Photo Grid (Pinterest Style) */}
        {/* columns-1 sm:columns-2 md:columns-3 creates the waterfall effect */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {images.gallery.map((photo, index) => (
            <div 
              key={index} 
              className="break-inside-avoid bg-white p-3 rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-zoom-in relative group border border-gray-100"
              onClick={() => openLightbox(index)}
            >
              <div className="overflow-hidden rounded-sm relative">
                <img 
                  src={photo} 
                  alt={`Moment ${index}`} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = `https://placehold.co/600x800/FDFBF7/9F1239?text=Photo+${index+1}`;
                  }}
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-wedding-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full text-wedding-primary shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn size={24} />
                  </div>
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
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/20 hover:bg-white/10 transition-colors z-[110]"
          >
            <X size={28} />
          </button>

          {/* Prev Button */}
          <button 
            onClick={prevImage}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/90 p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all z-[110]"
            aria-label="Previous Image"
          >
            <ChevronLeft size={24} className="md:w-10 md:h-10" />
          </button>

          {/* Image Container */}
          <div className="relative max-w-[90vw] max-h-[85vh] md:max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
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
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/90 p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all z-[110]"
            aria-label="Next Image"
          >
            <ChevronRight size={24} className="md:w-10 md:h-10" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
