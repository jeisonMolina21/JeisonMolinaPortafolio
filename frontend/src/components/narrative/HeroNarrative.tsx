/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import HeroAvatar from '../hero-parts/HeroAvatar';
import { ArrowRight, Shield, Zap } from 'lucide-react';

interface HeroNarrativeProps {
  profile: any;
  skills: any[];
}

const HeroNarrative = ({ profile, skills }: HeroNarrativeProps) => {
  return (
    <section className="relative min-h-screen w-full flex items-center bg-midnight overflow-hidden pt-16 pb-12 md:py-0">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.12)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(37,99,235,0.08)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      <div className="container-custom relative z-10 mt-12 lg:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-primary/20 border border-primary/40 rounded-xl backdrop-blur-2xl shadow-[0_0_20px_rgba(37,99,235,0.1)]"
              >
                <div className="relative">
                  <div className="w-2 h-2 bg-primary-bright rounded-full animate-ping absolute inset-0"></div>
                  <div className="w-2 h-2 bg-primary-bright rounded-full relative"></div>
                </div>
                <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] text-white">
                  {profile?.title || 'Senior Full-Stack Developer'}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-2 lg:space-y-4"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-text-main leading-[1] tracking-tight">
                  Sistemas que <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-bright to-primary italic">escalan.</span>
                </h1>
                <div className="h-1.5 w-16 bg-primary rounded-full"></div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base md:text-lg lg:text-xl text-text-dim max-w-lg font-light leading-relaxed"
              >
                Especialista en <span className="text-text-main font-semibold underline decoration-primary/30 decoration-2 underline-offset-4">automatización de alto impacto</span> y arquitecturas distribuidas.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a href="#projects" className="group relative px-8 py-4 bg-primary text-white font-black rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95">
                <span className="relative flex items-center gap-2 text-base">
                  Ver Proyectos
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              
              <a 
                href="#contact" 
                className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-text-main font-black rounded-2xl hover:bg-white/10 transition-all text-base active:scale-95"
              >
                Hablemos
              </a>
            </motion.div>

            {/* Micro Metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-8 pt-6 border-t border-white/5"
            >
              <div className="space-y-0.5">
                <p className="text-xl lg:text-2xl font-display font-black text-text-main tracking-tighter">1K+</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Cuentas/5m</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xl lg:text-2xl font-display font-black text-text-main tracking-tighter">50K+</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Docs/Día</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xl lg:text-2xl font-display font-black text-text-main tracking-tighter">60h</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Ahorro</p>
              </div>
            </motion.div>
          </div>

          {/* Avatar Section */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30 animate-pulse-slow"></div>
            <div className="relative scale-90 lg:scale-100 xl:scale-110 origin-center lg:origin-right">
              <HeroAvatar 
                imageUrl={profile?.image_url} 
                fullName={profile?.full_name} 
                cvUrl={profile?.cv_url} 
                skills={skills} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      <motion.div 
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-8 hidden 2xl:flex flex-col gap-3"
      >
        <div className="p-3 glass border-white/10 rounded-xl flex items-center gap-2">
          <Shield className="text-primary" size={16} />
          <span className="text-[9px] font-black uppercase tracking-widest">99.8% Integridad</span>
        </div>
        <div className="p-3 glass border-white/10 rounded-xl flex items-center gap-2">
          <Zap className="text-amber-400" size={16} />
          <span className="text-[9px] font-black uppercase tracking-widest">Optimización</span>
        </div>
      </motion.div>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-text-muted opacity-30"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default HeroNarrative;
