import React from 'react';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Wishes from './components/Wishes';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 selection:bg-wedding-red selection:text-white">
      <Hero />
      <Invitation />
      <Timeline />
      <Gallery />
      <Wishes />
      <RSVP />
      <Footer />
      
      {/* Sticky RSVP Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-wedding-gold/30 md:hidden z-50 flex justify-center">
        <a 
          href="#rsvp" 
          className="bg-wedding-red text-white px-8 py-2 rounded-full font-bold shadow-lg hover:bg-red-800 transition-colors w-full text-center"
        >
          Xác Nhận Tham Dự
        </a>
      </div>
    </div>
  );
};

export default App;