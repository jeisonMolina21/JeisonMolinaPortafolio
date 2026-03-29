import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Clock, Sparkles, Zap } from 'lucide-react';
import { IMAGE_BASE_URL } from '../../utils/api';
import { getSkillIcon } from '../../utils/iconMapper';

interface HeroAvatarProps {
  imageUrl?: string;
  fullName?: string;
  cvUrl?: string;
  skills?: any[];
}

const HeroAvatar: React.FC<HeroAvatarProps> = ({ imageUrl, fullName, cvUrl, skills }) => {
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

      {/* Floating Elements - CV Download */}
      <motion.a 
        href={cvUrl || '#'} 
        download="Jeison_Molina_CV.pdf"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -right-6 w-24 h-24 glass rounded-3xl flex items-center justify-center border-white/5 -rotate-6 shadow-xl hover:scale-110 hover:rotate-0 transition-all group/cv z-20 cursor-pointer"
        title="Descargar CV"
      >
        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover/cv:opacity-100 transition-opacity"></div>
        <span className="text-3xl relative z-10">🚀</span>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-[8px] text-white rounded opacity-0 group-hover/cv:opacity-100 whitespace-nowrap">DOWNLOAD CV</div>
      </motion.a>

      {/* Side-aligned Technology Stack */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 pointer-events-none">
        {skills?.slice(0, 6).map((skill, i) => {
          const info = getSkillIcon(skill.name);
          return (
            <motion.div
              key={skill.id || i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + (i * 0.1) }}
              className="glass p-2.5 rounded-xl border-white/5 bg-black/60 backdrop-blur-xl flex items-center justify-center pointer-events-auto hover:bg-primary/20 hover:border-primary/40 transition-all cursor-help group/skill shadow-2xl"
            >
              <span className="text-primary-bright group-hover/skill:scale-125 transition-transform">
                {info.icon}
              </span>
              <div className="absolute right-full mr-4 px-2 py-1 bg-primary text-black font-black text-[7px] uppercase rounded opacity-0 group-hover/skill:opacity-100 transition-all translate-x-2 group-hover/skill:translate-x-0 whitespace-nowrap">
                {skill.name}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Stat Banners (Left Side) */}
      <div className="absolute -left-24 top-1/4 flex flex-col gap-6 z-10">
        {[
          { label: "Tiempo Ahorrado", value: "12 Días", icon: <Clock size={12} />, color: "text-emerald-400" },
          { label: "Mejora Reportes", value: "60%", icon: <Sparkles size={12} />, color: "text-amber-400" },
          { label: "Gestión Cuentas", value: "Auto", icon: <Zap size={12} />, color: "text-blue-400" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + (i * 0.1) }}
            className="glass px-4 py-3 rounded-2xl border-white/10 bg-black/60 backdrop-blur-2xl flex items-center gap-3 shadow-2xl min-w-[140px] hover:-translate-y-1 transition-transform"
          >
            <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[7px] font-black uppercase tracking-widest text-text-muted">{stat.label}</span>
              <span className="text-sm font-black text-white">{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroAvatar;
