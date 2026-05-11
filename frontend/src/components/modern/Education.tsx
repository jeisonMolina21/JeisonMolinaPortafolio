/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, Globe } from 'lucide-react';

const Education = ({ education }: { education: any[] }) => {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="section-padding bg-slate-950 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold tracking-tighter"
          >
            Formación <span className="text-gradient-primary italic">Académica</span>
          </motion.h2>
          <p className="text-text-dim text-sm">Cimentando el conocimiento técnico con bases sólidas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group p-7 neo-glass rounded-[2rem] border-white/5 hover:border-primary/20 transition-all relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-all" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <GraduationCap size={24} />
                  </div>
                  <span className="px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-full text-[10px] font-bold text-primary-bright uppercase tracking-widest">
                    {item.period}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
                    {item.degree}
                  </h3>
                  <p className="text-text-dim text-sm font-bold flex items-center gap-1.5">
                    <Award size={14} className="text-primary/60" />
                    {item.institution}
                  </p>
                </div>

                {item.description && (
                  <p className="text-text-muted text-xs leading-relaxed italic border-l-2 border-white/10 pl-4 py-1">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}

          {/* Languages Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 group p-7 neo-glass rounded-[2rem] border-white/5 hover:border-primary/20 transition-all relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 blur-3xl rounded-full group-hover:bg-secondary/10 transition-all" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-1">Idiomas</h3>
                  <p className="text-text-dim text-sm">Competencia lingüística global</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 neo-glass rounded-xl border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Español</p>
                  <p className="text-sm font-bold text-white">Nativo</p>
                </div>
                <div className="px-4 py-2 neo-glass rounded-xl border-primary/20 bg-primary/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Inglés</p>
                  <p className="text-sm font-bold text-white">B1 — Colombo Americano <span className="text-[10px] font-normal text-primary-bright">(En formación)</span></p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
