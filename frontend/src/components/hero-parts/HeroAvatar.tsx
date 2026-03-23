import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { IMAGE_BASE_URL } from '../../utils/api';

interface HeroAvatarProps {
  imageUrl?: string;
  fullName?: string;
}

const HeroAvatar: React.FC<HeroAvatarProps> = ({ imageUrl, fullName }) => {
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";

  const getProfileImage = () => {
    if (!imageUrl) return DEFAULT_IMAGE;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${IMAGE_BASE_URL}${imageUrl}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group w-full max-w-[320px] md:max-w-[480px]"
    >
      {/* Decorative Glows */}
      <div className="absolute inset-0 bg-primary/25 blur-[120px] rounded-full scale-75 animate-pulse-soft"></div>
      
      {/* Main Image Container */}
      <div className="relative w-full aspect-[4/5] glass rounded-[3rem] overflow-hidden border-white/10 shadow-2xl transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02]">
        <img 
          src={getProfileImage()} 
          alt={fullName} 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== DEFAULT_IMAGE) target.src = DEFAULT_IMAGE;
          }}
          className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-[1.5s]"
        />
        
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60"></div>
        
        {/* Technical Badge Overlay */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 left-6 right-6 p-6 glass rounded-[2rem] border-white/10 bg-black/40 backdrop-blur-3xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary-bright">
              <Cpu size={24} className="animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-bright mb-1 italic">
                Core Architecture
              </p>
              <p className="text-white font-bold text-sm leading-tight">
                Full-Stack Solutions & System Automation
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -right-6 w-24 h-24 glass rounded-3xl flex items-center justify-center border-white/5 -rotate-6 shadow-xl"
      >
        <span className="text-3xl">🚀</span>
      </motion.div>
    </motion.div>
  );
};

export default HeroAvatar;
