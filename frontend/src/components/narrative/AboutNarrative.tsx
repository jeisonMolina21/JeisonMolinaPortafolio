/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle2, Terminal, Code2, Rocket, BrainCircuit, Zap, Shield } from 'lucide-react';


interface AboutNarrativeProps {
  profile: any;
  groupedSkills: any;
}

const AboutNarrative = ({ profile, groupedSkills }: AboutNarrativeProps) => {
  const valueProps = [
    { text: "Optimización de procesos críticos", icon: <Zap size={18} /> },
    { text: "Arquitecturas escalables y seguras", icon: <Shield size={18} /> },
    { text: "Automatización RPA de alto impacto", icon: <BrainCircuit size={18} /> },
    { text: "Liderazgo técnico y consultoría", icon: <Rocket size={18} /> }
  ];

  return (
    <section id="about" className="min-h-screen py-32 flex items-center bg-midnight relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center">
          
          {/* Bio Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-12"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                <User size={14} className="text-primary-bright" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-bright">Trayectoria Profesional</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black text-text-main leading-tight tracking-tight">
                Transformo problemas complejos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-bright italic">ventajas competitivas</span>
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-text-dim leading-relaxed font-light">
                  {profile?.bio || "Desarrollador Full Stack apasionado por crear soluciones que no solo funcionen, sino que escalen. Mi enfoque se centra en la eficiencia operativa y la excelencia técnica."}
                </p>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl italic text-text-muted border-l-4 border-l-primary">
                  "Diseño e implemento sistemas institucionales en producción que eliminan la carga operativa manual y garantizan la integridad de los datos."
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {valueProps.map((prop, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
                >
                  <div className="text-primary group-hover:scale-110 transition-transform">{prop.icon}</div>
                  <span className="text-sm font-semibold text-text-dim group-hover:text-text-main transition-colors">{prop.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent blur-2xl rounded-[4rem] opacity-30"></div>
              
              <div className="relative glass p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Code2 size={120} />
                </div>
                
                <h3 className="text-2xl font-bold text-text-main mb-12 flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary-bright">
                    <Terminal size={20} />
                  </div>
                  Stack Tecnológico Especializado
                </h3>

                <div className="grid grid-cols-1 gap-10">
                  {Object.entries(groupedSkills || {}).map(([category, catSkills]: [string, any], i) => (
                    <div key={category} className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">{category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {catSkills.map((skill: any) => (
                          <span key={skill.name} className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-text-dim hover:text-primary-bright hover:border-primary-bright/50 hover:bg-primary/10 transition-all cursor-default shadow-lg">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-10 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-bright border-2 border-midnight flex items-center justify-center text-xs font-black text-white shadow-xl">
                          {i === 4 ? '+' : ''}{i}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-text-muted font-medium italic">Evolución técnica constante y despliegue de sistemas críticos.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutNarrative;

