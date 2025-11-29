import React from 'react';
import { weddingConfig } from '../config';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { groom, bride } = weddingConfig;
  return (
    <footer className="bg-wedding-cream text-wedding-text py-12 text-center border-t border-wedding-gold/20">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        <Heart size={24} className="text-wedding-gold mb-6 fill-wedding-gold/20" />
        <div className="font-names text-5xl mb-4 text-wedding-gold drop-shadow-sm">{groom.firstName} & {bride.firstName}</div>
        <p className="font-sans text-xs uppercase tracking-[0.2em] opacity-50 mb-8">Thank you for celebrating with us</p>
        <p className="text-[10px] text-gray-400">© 2025 Wedding Invitation.</p>
      </div>
    </footer>
  );
};

export default Footer;