/** @jsxImportSource react */
import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Director de TI",
    org: "U. Horizonte",
    initials: "DT",
    text: "Jeison transformó nuestra gestión de activos. La automatización de carnets fue un antes y un después para la eficiencia institucional.",
    stars: 5
  },
  {
    name: "Cofundador",
    org: "Startup Tech",
    initials: "CF",
    text: "Capacidad excepcional para traducir problemas complejos en sistemas digitales intuitivos y rápidos.",
    stars: 5
  },
  {
    name: "Coordinador IT",
    org: "EduCloud",
    initials: "CI",
    text: "El script de creación masiva nos ahorró semanas de trabajo. Un desarrollador orientado 100% a resultados medibles.",
    stars: 5
  }
];

const logos = [
  "U. Horizonte", "TechSystems", "Bogotá IT", "EduCloud", "Digital Solutions", "Global Tech", "Innovate SW"
];

const AnimatedPercentage = () => {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    const controls = animate(0, 98, {
      duration: 2.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, []);

  return <span>{value}%</span>;
};

const SocialProof = () => {
  return (
    <section className="section-padding bg-slate-950 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-display font-bold tracking-tighter"
          >
            Confianza e <span className="text-gradient-primary italic">Impacto</span>
          </motion.h2>
          <p className="text-text-dim text-sm">Colaboraciones de alto nivel que impulsan la eficiencia tecnológica.</p>
        </div>

        {/* Logo Ticker */}
        <div className="relative mb-10">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10" />
          
          <div className="overflow-hidden py-5 border-y border-white/5">
            <motion.div 
              animate={{ x: [0, -800] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex gap-14 items-center whitespace-nowrap"
            >
              {[...logos, ...logos, ...logos].map((l, i) => (
                <span 
                  key={i}
                  className="text-2xl font-display font-bold tracking-tighter text-white/15 hover:text-primary/60 transition-colors cursor-default"
                >
                  {l}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="relative p-6 neo-glass rounded-2xl group overflow-hidden"
            >
              <Quote className="absolute top-5 right-5 text-primary/8 group-hover:text-primary/15 transition-colors" size={48} />
              
              <div className="relative z-10 space-y-4">
                <div className="flex gap-0.5">
                  {[...Array(t.stars)].map((_, si) => (
                    <Star key={si} size={12} className="fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-white/90 text-sm italic leading-relaxed">
                  "{t.text}"
                </p>
                
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  {/* Avatar with initials */}
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-[10px] font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">{t.name}</span>
                    <span className="text-primary text-[9px] font-bold uppercase tracking-[0.2em]">
                      {t.org}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 md:p-10 neo-glass rounded-3xl border-primary/15 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 space-y-2">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter"
            >
              <AnimatedPercentage />
            </motion.div>
            <p className="text-primary-bright text-sm md:text-base uppercase tracking-[0.25em] font-bold">
              Satisfacción en Automatización
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
