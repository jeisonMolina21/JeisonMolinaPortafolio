import React from 'react';

interface HeroBadgeProps {
  text: string;
}

const HeroBadge: React.FC<HeroBadgeProps> = ({ text }) => {
  return (
    <div className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full border-white/5 shadow-2xl">
      <span className="flex h-3 w-3 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
        {text}
      </span>
    </div>
  );
};

export default HeroBadge;
