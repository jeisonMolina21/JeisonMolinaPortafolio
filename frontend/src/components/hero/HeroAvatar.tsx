import React from 'react';

interface HeroAvatarProps {
  imageUrl?: string;
  fullName?: string;
}

const HeroAvatar: React.FC<HeroAvatarProps> = ({ imageUrl, fullName }) => {
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";

  const getProfileImage = () => {
    if (!imageUrl) return DEFAULT_IMAGE;
    if (imageUrl.startsWith('http')) return imageUrl;
    const apiBase = import.meta.env.PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000';
    return `${apiBase}${imageUrl}`;
  };

  return (
    <div className="relative group w-full max-w-[320px] md:max-w-[450px]">
      <div className="absolute inset-0 bg-primary/20 blur-[100px] md:blur-[150px] rounded-full scale-75 animate-pulse"></div>
      <div className="relative w-full aspect-[4/5] glass rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]">
        <img 
          src={getProfileImage()} 
          alt={fullName} 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== DEFAULT_IMAGE) {
              target.src = DEFAULT_IMAGE;
            }
          }}
          className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.5s]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-midnight via-transparent to-transparent opacity-60"></div>
        
        {/* Technical Badge Overlay */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 p-4 md:p-6 glass rounded-2xl md:rounded-3xl border-white/10 bg-black/40 backdrop-blur-3xl group-hover:translate-y-[-10px] transition-transform duration-700">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary-bright mb-1 italic text-center md:text-left">
            Core Architecture
          </p>
          <p className="text-white font-bold text-xs md:text-sm text-center md:text-left">
            Full Cycle Automation Infrastructure
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroAvatar;
