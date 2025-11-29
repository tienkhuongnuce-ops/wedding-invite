import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-16 relative">
      <div className="flex items-center justify-center gap-3 mb-3 text-wedding-red">
        <span className="h-px w-16 bg-wedding-red/50"></span>
        <span className="font-serif text-2xl font-bold tracking-widest select-none">囍</span>
        <span className="h-px w-16 bg-wedding-red/50"></span>
      </div>
      <h2 className="text-4xl md:text-5xl font-names text-wedding-text mb-4 drop-shadow-sm">{title}</h2>
      {subtitle && <p className="text-wedding-gold font-sans tracking-wide text-sm uppercase font-semibold">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;