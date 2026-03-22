import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useEducation } from '../hooks/useEducation';
import '../styles/components/Timeline.css';

const Education = () => {
  const { lang, t } = useLanguage();
  const { items, loading } = useEducation(lang);

  if (loading || items.length === 0) return null;

  return (
    <section id="education" className="education-section">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-primary/20 mb-6">
            <GraduationCap size={12} className="text-primary-bright" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-bright italic">Formación</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter">
            Educación & <span className="wine-gradient italic">Certificaciones</span>
          </h2>
        </motion.div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {items.map((edu, index) => (
            <div key={edu.id} className={`timeline-item ${index % 2 !== 0 ? 'timeline-item-reverse' : ''}`}>
              <div className="timeline-dot"></div>
              
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="timeline-card"
              >
                <div className="timeline-card-glow"></div>
                
                <div className="timeline-date-badge">
                  <Calendar size={12} />
                  {edu.period}
                </div>

                <h3 className="timeline-title">{edu.degree}</h3>
                
                <div className="timeline-subtitle">
                  <GraduationCap size={14} className="text-primary" />
                  <span>{edu.institution}</span>
                </div>

                {edu.description && (
                  <div className="flex gap-3 text-text-dim text-lg leading-relaxed mb-6 font-medium">
                    <BookOpen size={20} className="shrink-0 mt-1 text-primary/40" />
                    <p>{edu.description}</p>
                  </div>
                )}
              </motion.div>

              <div className="hidden md:block w-full md:w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
