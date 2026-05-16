/** @jsxImportSource react */
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MapPin, Briefcase, TrendingUp } from 'lucide-react';

import { fallbackData } from '../../data/fallbackData';

const ExperienceItem = ({ exp, index }: { exp: any, index: number }) => {
  return (
    <div className={`relative grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 last:mb-0`}>
      {/* Period - Cinematic Editorial Style */}
      <div className="md:col-span-3">
         <div className="sticky top-24">
            <span className="text-primary font-mono text-xs font-bold uppercase tracking-[0.3em] block mb-2">
               {exp.period}
            </span>
            <div className="h-[1px] w-12 bg-primary/30" />
            <div className="mt-4 flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
               <MapPin size={10} />
               {exp.location || 'Colombia'}
            </div>
         </div>
      </div>

      {/* Content - Technical Luxury Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:col-span-9 relative"
      >
        <div className="p-10 bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all duration-700 group">
          {/* Achievement badge */}
          <div className="absolute top-0 right-0 p-6">
             <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-mono text-primary/60 font-bold uppercase tracking-widest">Achievement</span>
                <span className="text-xl font-display font-black text-text-main">{exp.achievement || 'High Impact'}</span>
             </div>
          </div>

          <p className="text-primary text-xs font-bold mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
            <Briefcase size={12} />
            {exp.company}
          </p>

          <h3 className="text-4xl md:text-5xl font-display font-black text-text-main uppercase leading-none tracking-tighter mb-8 group-hover:text-primary transition-colors">
             {exp.role}
          </h3>
          
          <ul className="space-y-6">
            {exp.description ? (
               <li className="flex gap-6 group/item">
                  <span className="text-primary font-mono text-xs mt-1 opacity-40">01</span>
                  <p className="text-lg text-text-dim leading-relaxed font-light group-hover/item:text-white transition-colors">
                     {exp.description}
                  </p>
               </li>
            ) : exp.bullets?.map((b: string, bi: number) => (
              <li key={bi} className="flex gap-6 group/item">
                <span className="text-primary font-mono text-xs mt-1 opacity-40">0{bi+1}</span>
                <div 
                   className="text-lg text-text-dim leading-relaxed font-light group-hover/item:text-white transition-colors"
                   dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} 
                />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = ({ experiences: propExperiences }: { experiences?: any[] }) => {
  const experiencesList = propExperiences || fallbackData.experience;

  return (
    <section id="experience" className="py-24 bg-midnight relative">
      <div className="container-custom">
        {/* Header - Editorial Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <div className="lg:col-span-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[12vw] lg:text-[7vw] font-display font-black leading-[0.8] tracking-tighter uppercase text-text-main"
            >
              TRAYECTORIA <br />
              <span className="text-primary italic">PROFESIONAL</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="text-text-dim text-sm font-sans font-light uppercase tracking-widest leading-relaxed border-l border-primary/30 pl-6">
              Evolución técnica con un enfoque implacable <br />
              en la excelencia operativa y la <br />
              automatización de alto impacto.
            </p>
          </div>
        </div>

        <div className="relative">
          {experiencesList.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
