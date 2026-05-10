/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Database, Terminal, ShieldCheck, Zap } from 'lucide-react';

const categoryIcons: { [key: string]: any } = {
  "Frontend": <Globe size={18} />,
  "Backend": <Database size={18} />,
  "RPA / Automation": <Zap size={18} />,
  "DevOps / Tools": <Terminal size={18} />,
  "Default": <Cpu size={18} />
};

const Skills = ({ skills }: { skills: any[] }) => {
  // Group skills by category
  const groupedSkills = skills.reduce((acc: any, skill) => {
    const cat = skill.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(groupedSkills);

  return (
    <section id="skills" className="section-padding bg-slate-950 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold tracking-tighter"
          >
            Stack <span className="text-gradient-primary italic">Tecnológico</span>
          </motion.h2>
          <p className="text-text-dim text-sm max-w-lg mx-auto leading-relaxed">
            Dominio de herramientas modernas para la construcción de sistemas robustos y eficientes.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 neo-glass rounded-2xl border-white/5 group hover:border-primary/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  {categoryIcons[cat] || categoryIcons["Default"]}
                </div>
                <h3 className="text-base font-display font-bold text-white uppercase tracking-wider">{cat}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {groupedSkills[cat].map((skill: any, si: number) => (
                  <motion.span 
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (i * 0.1) + (si * 0.05) }}
                    className="px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg text-xs font-bold text-text-dim hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all cursor-default"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
