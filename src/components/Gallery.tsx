
import React, { useState, useEffect, useCallback } from 'react';
import SectionTitle from './SectionTitle';
import { weddingConfig } from '../config';
import { X, ChevronLeft, ChevronRight, ZoomIn, Play, Pause } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

const Gallery: React.FC = () => {
  const { images, video } = weddingConfig;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to detect youtube link type
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('embed')) return url;
    if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'youtube.com/embed/');
    return url;
  };
  
  const videoEmbedUrl = video?.embedUrl ? getEmbedUrl(video.embedUrl) : '';

  // Open Lightbox
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsPlaying(false);
    document.body.style.overflow = 'hidden';
  };

  // Close Lightbox
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setIsPlaying(false);
    document.body.style.overflow = 'auto';
  }, []);

  // Next Image
  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => 
        prev === images.gallery.length - 1 ? 0 : (prev as number) + 1
      );
    }
  }, [lightboxIndex, images.gallery.length]);

  // Previous Image
  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => 
        prev === 0 ? images.gallery.length - 1 : (prev as number) - 1
      );
    }
  }, [lightboxIndex, images.gallery.length]);

  // Auto Play Logic
  useEffect(() => {
    let interval: any;
    if (isPlaying && lightboxIndex !== null) {
      interval = setInterval(() => {
        setLightboxIndex((prev) => 
          prev === images.gallery.length - 1 ? 0 : (prev as number) + 1
        );
      }, 3000); 
    }
    return () => clearInterval(interval);
  }, [isPlaying, lightboxIndex, images.gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <section className="py-24 bg-wedding-bg">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Album Hình Cưới" subtitle="Lưu giữ khoảnh khắc" />
        
        {/* Embedded Video Section */}
        {video && videoEmbedUrl && (
          <ScrollAnimation variant="fade-up">
            <div className="mb-16 max-w-4xl mx-auto relative z-10">
              <div className="bg-white p-2 md:p-4 rounded-2xl shadow-lg border border-wedding-primary/20 transform transition-transform duration-500 hover:scale-[1.01]">
                <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-black shadow-inner">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={videoEmbedUrl} 
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
          </ScrollAnimation>
        )}

        {/* Photo Grid - Masonry-ish via CSS columns */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {images.gallery.map((photo, index) => (
            <ScrollAnimation key={index} variant="fade-up" delay={index * 50}>
              <div 
                className="break-inside-avoid bg-white p-3 rounded-sm shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-zoom-in relative group"
                onClick={() => openLightbox(index)}
              >
                <div className="overflow-hidden relative">
                  <img 
                    src={photo} 
                    alt={`Moment ${index}`} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 filter sepia-[.2] group-hover:sepia-0"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; 
                      target.src = `https://placehold.co/600x800/FDFBF7/9F1239?text=Photo+${index+1}`;
                    }}
                  />
                  
                  {/* Overlay with Icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn className="text-white drop-shadow-md" size={32} />
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 z-[110] flex gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
              className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <button 
              onClick={closeLightbox}
              className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={32} />
            </button>
          </div>

          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[110]"
          >
            <ChevronLeft size={48} />
          </button>

          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images.gallery[lightboxIndex]} 
              alt="Gallery Fullscreen" 
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
            />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/80 font-serif tracking-widest text-sm flex gap-4 items-center">
              <span>{lightboxIndex + 1} / {images.gallery.length}</span>
              {isPlaying && <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
            </div>
          </div>

          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[110]"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
