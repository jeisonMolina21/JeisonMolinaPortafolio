/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle2, Terminal } from 'lucide-react';

interface AboutNarrativeProps {
  profile: any;
  groupedSkills: any;
}

const AboutNarrative = ({ profile, groupedSkills }: AboutNarrativeProps) => {
  const valueProps = [
    "Optimización de procesos críticos",
    "Arquitecturas escalables y seguras",
    "Automatización RPA de alto impacto",
    "Liderazgo técnico y consultoría"
  ];

  return (
    <section className="min-h-screen py-24 flex items-center bg-midnight relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Bio Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                <User size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Sobre Mí</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main leading-tight">
                Transformo problemas complejos en <span className="text-primary italic">ventajas competitivas</span>
              </h2>
              <p className="text-lg text-text-dim leading-relaxed">
                {profile?.bio || "Desarrollador Full Stack apasionado por crear soluciones que no solo funcionen, sino que escalen. Mi enfoque se centra en la eficiencia operativa y la excelencia técnica."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {valueProps.map((prop, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-bg-surface border border-white/5 rounded-2xl group hover:border-primary/20 transition-colors"
                >
                  <CheckCircle2 size={18} className="text-primary shrink-0" />
                  <span className="text-sm font-medium text-text-dim group-hover:text-text-main transition-colors">{prop}</span>
                </motion.div>
              ))}
            </div>

            {/* Metric Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-[2rem] relative overflow-hidden group"
            >
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <p className="text-5xl font-display font-bold text-primary mb-2">40h → 5m</p>
                <p className="text-sm font-bold text-text-muted uppercase tracking-widest">Caso de éxito: Automatización de Reportes</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl relative">
              <h3 className="text-xl font-bold text-text-main mb-8 flex items-center gap-3">
                <Terminal size={20} className="text-primary" />
                Stack Especializado
              </h3>

              <div className="space-y-8">
                {Object.entries(groupedSkills || {}).map(([category, catSkills]: [string, any], i) => (
                  <div key={category} className="space-y-4">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-[0.2em]">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {catSkills.map((skill: any) => (
                        <span key={skill.name} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-medium text-text-dim hover:text-primary hover:border-primary/30 transition-all cursor-default">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutNarrative;
