/** @jsxImportSource react */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import { ArrowRight, Download, Rocket, Users, Clock, Zap } from 'lucide-react';
import GlitchText from './GlitchText';
import HeroBackground from './HeroBackground';
import { getFullImageUrl } from '../../utils/api';

/* ── Animated Counter ── */
const AnimatedCounter = ({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) => {
  const num = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, num, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [num]);

  return (
    <motion.div 
      whileHover={{ y: -3 }}
      className="group p-4 neo-glass rounded-2xl transition-all hover:border-primary/20 cursor-default"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <div>
          <div className="text-xl font-display font-bold text-white">
            {display}{suffix}
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-text-muted">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = ({ profile }: { profile: any }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const metrics = [
    { label: "Proyectos", value: "20+", icon: <Rocket size={16} /> },
    { label: "Usuarios", value: "1000+", icon: <Users size={16} /> },
    { label: "Hrs Ahorradas", value: "60+", icon: <Clock size={16} /> },
    { label: "Sistemas", value: "5+", icon: <Zap size={16} /> },
  ];

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex items-center bg-slate-950 pt-20 pb-8">
      <HeroBackground />
      
      <motion.div style={{ y, opacity }} className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-5">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 neo-glass rounded-full border-primary/15"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.12em] text-white/70 uppercase">
                {profile?.title || 'Disponible para proyectos'}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tighter">
                SISTEMAS QUE <br />
                <GlitchText />
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base md:text-lg text-text-dim max-w-xl leading-relaxed"
            >
              Arquitecto de <span className="text-white font-semibold">soluciones escalables</span> y automatización de procesos críticos en entornos de producción real.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="liquid-button group px-7 py-3.5 text-white font-bold rounded-2xl active:scale-95 transition-all">
              <span className="relative flex items-center gap-2 text-sm">
                Ver Proyectos
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a href={profile?.cv_url || "/cv.pdf"} className="group px-7 py-3.5 neo-glass text-white font-bold rounded-2xl hover:bg-white/5 transition-all active:scale-95">
              <span className="flex items-center gap-2 text-sm">
                Descargar CV
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </span>
            </a>
          </motion.div>

          {/* Metrics */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4"
          >
            {metrics.map((m, i) => (
              <AnimatedCounter key={i} {...m} />
            ))}
          </motion.div>
        </div>

        {/* Right Column: Photo */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative z-10 w-full max-w-[300px] aspect-square">
            {/* Animated Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-5 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, var(--color-primary), transparent, var(--color-secondary), transparent)',
                opacity: 0.15,
              }}
            />
            
            {/* Glow Background */}
            <div className="absolute inset-0 bg-primary/15 animate-liquid blur-3xl opacity-30" />
            
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full neo-glass rounded-[2.5rem] overflow-hidden border-primary/10 group"
            >
              <img 
                src={getFullImageUrl(profile?.image_url)} 
                alt="Jeison Molina"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="absolute -top-3 -right-3 p-2.5 neo-glass rounded-xl animate-float-gentle shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald/20 rounded-full flex items-center justify-center text-emerald">
                  <Zap size={12} fill="currentColor" />
                </div>
                <span className="text-[10px] font-bold text-white">99+ Perf</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
