/** @jsxImportSource react */
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MapPin, Briefcase, TrendingUp } from 'lucide-react';

const ExperienceItem = ({ exp, index }: { exp: any, index: number }) => {
  const bullets = typeof exp.description === 'string' 
    ? exp.description.split('\n').filter((l: string) => l.trim()) 
    : [];

  return (
    <div className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 last:mb-0 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
      {/* Dot */}
      <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-6 z-20">
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(14,165,233,0.6)]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="w-full md:w-[47%] group"
      >
        <div className="relative p-6 neo-glass rounded-2xl hover:border-primary/20 transition-all duration-400 overflow-hidden beam-border">
          {/* Achievement badge */}
          {exp.achievement && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 neo-glass rounded-full border-emerald/20 text-emerald text-[8px] font-bold uppercase tracking-wider">
              <TrendingUp size={10} />
              {exp.achievement}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-2.5 py-1 bg-primary/10 text-primary-bright text-[9px] font-bold uppercase tracking-[0.15em] rounded-full">
              {exp.period}
            </span>
            {exp.location && (
              <div className="flex items-center gap-1 text-text-muted text-[9px] font-bold uppercase tracking-wider">
                <MapPin size={10} />
                {exp.location}
              </div>
            )}
          </div>

          <h3 className="text-xl font-display font-bold text-white mb-1">{exp.role}</h3>
          <p className="text-primary text-xs font-bold mb-4 flex items-center gap-1.5">
            <Briefcase size={12} />
            {exp.company}
          </p>
          
          <ul className="space-y-2.5">
            {bullets.map((b: string, bi: number) => (
              <li key={bi} className="text-xs text-text-dim flex gap-3 leading-relaxed group-hover:text-slate-300 transition-colors">
                <div className="w-1 h-1 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                <div dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="hidden md:block w-[47%]" />
    </div>
  );
};

const Experience = ({ experience }: { experience: any[] }) => {
  if (!experience || experience.length === 0) return null;
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} className="section-padding bg-slate-950 relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold tracking-tighter"
          >
            Trayectoria <span className="text-gradient-primary italic">Profesional</span>
          </motion.h2>
          <p className="text-text-dim text-sm">Evolución técnica con enfoque en la excelencia operativa.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-[3px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/5 overflow-hidden">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-transparent"
            />
          </div>

          <div className="relative z-10 pl-8 md:pl-0">
            {experience.map((exp, i) => (
              <ExperienceItem key={exp.id || i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
