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
    { label: "Data Pipeline", value: "50K+ /Día", icon: <Rocket size={14} /> },
    { label: "Ahorro Operativo", value: "60h+ /Mes", icon: <Clock size={14} /> },
    { label: "Core Stack", value: "Py/Node", icon: <Zap size={14} /> },
    { label: "Mentalidad", value: "T-Shaped", icon: <Users size={14} /> },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-midnight overflow-hidden py-24 md:py-0">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,4,4,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="container-custom relative z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Left: Editorial Content */}
          <div className="lg:col-span-7 relative z-20">
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
                <h1 className="text-[12vw] lg:text-[10vw] font-display font-black leading-[0.85] text-text-main tracking-[-0.04em] uppercase">
                  BACKEND & <br />
                  <span className="text-primary italic">AUTOMATION</span>
                </h1>
                <p className="text-primary font-mono text-xs md:text-sm font-bold uppercase tracking-[0.4em] mt-4">
                   Ingeniería de Sistemas // SENA // Optimizando el Core del Negocio
                </p>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100px' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-1 bg-primary mt-4 hidden lg:block" 
                />
              </div>

              {/* Description with high-end feel */}
              <p className="max-w-lg text-lg md:text-xl text-text-dim font-sans font-light leading-relaxed">
                Ingeniero de software especializado en <span className="text-text-main font-medium italic">Backend y Automatización</span>. Diseño arquitecturas eficientes y flujos de datos invisibles que eliminan el trabajo operativo y transforman la complejidad en rendimiento escalable.
              </p>

              {/* High-Contrast CTAs */}
              <div className="flex flex-wrap gap-6 pt-4">
                <a href="#projects" className="group relative overflow-hidden bg-primary px-10 py-4 rounded-none transition-all hover:bg-text-main hover:text-midnight">
                  <span className="relative z-10 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white">
                    Portafolio
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </a>
                
                <a href={profile?.cv_url || "/cv.pdf"} className="group flex items-center gap-4 text-text-main hover:text-primary transition-colors">
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
          <div className="lg:col-span-5 relative mt-16 lg:mt-0 flex justify-center">
            <motion.div 
              style={{ scale }}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[500px]"
            >
              {/* Geometric Accents - More expansive */}
              <div className="absolute -top-12 -right-12 w-48 h-48 border-t-2 border-r-2 border-primary/20 z-0" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 border-b-2 border-l-2 border-primary/20 z-0" />
              
              {/* Image Container - Larger & Editorial Aspect */}
              <div className="relative z-10 w-full aspect-[4/5] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-midnight">
                <img 
                  src={profile?.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"} 
                  alt="Jeison Molina"
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 transform hover:scale-105"
                />
                {/* Vinotinto Overlay - Subtle */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Tech Data - Improved Position & Design */}
              <div className="absolute -bottom-10 -right-10 lg:-right-16 z-20">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-midnight/40 backdrop-blur-3xl border border-white/10 p-8 space-y-6 shadow-2xl min-w-[200px]"
                >
                  {metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em]">{m.label}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-display font-bold text-text-main">{m.value.split(' ')[0]}</span>
                        <span className="text-sm font-display text-primary uppercase">{m.value.split(' ')[1]}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
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
