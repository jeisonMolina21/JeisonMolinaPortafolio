/** @jsxImportSource react */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import { ArrowRight, Download, Rocket, Users, Clock, Zap } from 'lucide-react';
import GlitchText from './GlitchText';
import HeroBackground from './HeroBackground';

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

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const metrics = [
    { label: "Proyectos", value: "20+", icon: <Rocket size={14} /> },
    { label: "Usuarios", value: "1000+", icon: <Users size={14} /> },
    { label: "Horas Ahorradas", value: "60+", icon: <Clock size={14} /> },
    { label: "Sistemas", value: "5+", icon: <Zap size={14} /> },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-black overflow-hidden py-24 md:py-0">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,4,4,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="container-custom relative z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          
          {/* Left: Editorial Content */}
          <div className="lg:col-span-8 relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Technical Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-primary/20 bg-primary/5 rounded-full backdrop-blur-md">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">
                  {profile?.title || 'Automation Architect'}
                </span>
              </div>

              {/* Massive Editorial Heading */}
              <div className="relative">
                <h1 className="text-[12vw] lg:text-[10vw] font-display font-black leading-[0.85] text-white tracking-[-0.04em] uppercase">
                  SISTEMAS <br />
                  <span className="text-primary italic">INVISIBLES</span>
                </h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100px' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-1 bg-primary mt-4 hidden lg:block" 
                />
              </div>

              {/* Description with high-end feel */}
              <p className="max-w-lg text-lg md:text-xl text-text-dim font-sans font-light leading-relaxed">
                Diseñando el <span className="text-white font-medium italic">futuro de la eficiencia</span> a través de arquitectura de software de alto impacto y automatización inteligente.
              </p>

              {/* High-Contrast CTAs */}
              <div className="flex flex-wrap gap-6 pt-4">
                <a href="#projects" className="group relative overflow-hidden bg-primary px-10 py-4 rounded-none transition-all hover:bg-white hover:text-black">
                  <span className="relative z-10 flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                    Portafolio
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </a>
                
                <a href={profile?.cv_url || "/cv.pdf"} className="group flex items-center gap-4 text-white hover:text-primary transition-colors">
                  <span className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-1 group-hover:border-primary">
                    Curriculum
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5">
                    <Download size={16} />
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Cinematic Visual */}
          <div className="lg:col-span-4 relative mt-12 lg:mt-0">
            <motion.div 
              style={{ scale }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] lg:aspect-square"
            >
              {/* Geometric Accents */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-primary/30 z-0" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-2 border-l-2 border-primary/30 z-0" />
              
              {/* Image Container */}
              <div className="relative z-10 w-full h-full overflow-hidden border border-white/5 shadow-2xl">
                <img 
                  src={profile?.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"} 
                  alt="Jeison Molina"
                  className="w-full h-full object-cover grayscale brightness-75 contrast-125 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                />
                {/* Vinotinto Overlay */}
                <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Floating Tech Data (Technical Luxury) */}
              <div className="absolute bottom-6 -left-12 z-20 hidden xl:block">
                <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-5 space-y-4">
                  {metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-[0.2em]">{m.label}</span>
                      <span className="text-2xl font-display font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Vertical Navigation Hint */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-10 opacity-30 hidden lg:flex">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] rotate-90 origin-center whitespace-nowrap">Explore</span>
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
