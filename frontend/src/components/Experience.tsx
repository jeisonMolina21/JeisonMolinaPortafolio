import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioContext';
import type { ExperienceItem } from '../types';


const Experience = () => {
  const { t } = useLanguage();
  const { data, loading } = usePortfolioData();
  const items: ExperienceItem[] = data?.experience || [];

  if (loading) return (
    <section id="experience" className="experience-section">
      <div className="container-custom relative z-10">
        <div className="space-y-8 pt-12">
          {[1,2].map(i => (
            <div key={i} className="glass rounded-[2.5rem] p-12 animate-pulse">
              <div className="h-3 bg-white/10 rounded-full w-1/4 mb-6" />
              <div className="h-8 bg-white/10 rounded-full w-2/3 mb-4" />
              <div className="h-4 bg-white/5 rounded-full w-full mb-2" />
              <div className="h-4 bg-white/5 rounded-full w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (items.length === 0) return null;

  return (
    <section id="experience" className="experience-section">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-primary/20 mb-6">
            <Briefcase size={12} className="text-primary-bright" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-bright italic">Trayectoria</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter">
            Experiencia <span className="wine-gradient italic">Profesional</span>
          </h2>
        </motion.div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {items.map((exp, index) => (
            <div key={exp.id} className={`timeline-item ${index % 2 !== 0 ? 'timeline-item-reverse' : ''}`}>
              <div className="timeline-dot"></div>
              
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="timeline-card group"
              >
                <div className="timeline-card-glow"></div>
                
                <div className="timeline-date-badge">
                  <Calendar size={12} />
                  {exp.period}
                </div>

                <h3 className="timeline-title">{exp.role}</h3>
                
                <div className="timeline-subtitle">
                  <Briefcase size={14} className="text-primary" />
                  <span>{exp.company}</span>
                  {exp.location && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <MapPin size={14} className="text-text-muted" />
                      <span>{exp.location}</span>
                    </>
                  )}
                </div>

                <p className="timeline-description">{exp.description}</p>

                <div className="timeline-skills-flex">
                  {exp.skills?.split(',').map((skill, i) => (
                    <span key={i} className="timeline-skill-token">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="hidden md:block w-full md:w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
