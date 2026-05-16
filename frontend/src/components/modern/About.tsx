/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code2, Cpu, BrainCircuit, TrendingUp } from 'lucide-react';

const specialties = [
  {
    title: "Automatización RPA",
    stat: "60h+",
    statLabel: "ahorro/semestre",
    description: "Creación de 1,000 cuentas en 5 min. Liberación de trabajo manual repetitivo.",
    icon: <Zap size={22} />,
    gradient: "from-cyan-500 to-blue-500",
    featured: true
  },
  {
    title: "Full Stack Dev",
    stat: "5K+",
    statLabel: "usuarios",
    description: "Sistemas robustos con MySQL, Node.js y React. Escalabilidad y rendimiento.",
    icon: <Code2 size={22} />,
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "Activos IT",
    stat: "100%",
    statLabel: "trazabilidad",
    description: "Control total de inventario con generación automática de reportes.",
    icon: <Cpu size={22} />,
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "Python Scripts",
    stat: "1K+",
    statLabel: "cuentas/5min",
    description: "Scripts especializados para eliminar tareas repetitivas y optimizar procesos.",
    icon: <BrainCircuit size={22} />,
    gradient: "from-amber-500 to-orange-500"
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative Texture */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 skew-x-12 transform origin-top-right -z-10" />

      <div className="container-custom">
        {/* Header - Editorial Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[12vw] lg:text-[7vw] font-display font-black leading-[0.8] tracking-tighter uppercase text-white"
            >
              IMPACTO <br />
              <span className="text-primary italic">MEDIBLE</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="text-text-dim text-sm font-sans font-light uppercase tracking-widest leading-relaxed border-l border-primary/30 pl-6">
              No solo escribo código, diseño arquitecturas <br />
              que transforman la eficiencia operativa <br />
              en resultados tangibles.
            </p>
          </div>
        </div>

        {/* Technical Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {specialties.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-10 bg-black hover:bg-primary/5 transition-all duration-700"
            >
              {/* Technical Detail */}
              <div className="absolute top-6 right-6">
                 <span className="text-[10px] font-mono text-primary/40 font-bold uppercase tracking-[0.2em]">0{i+1} // spec</span>
              </div>

              {/* Icon - Minimalist */}
              <div className="text-primary mb-12 transform group-hover:scale-110 transition-transform duration-500">
                {s.icon}
              </div>

              {/* Metric - Technical Luxury Style */}
              <div className="space-y-1 mb-8">
                <div className="text-4xl font-display font-black text-white group-hover:text-primary transition-colors tracking-tighter">
                   {s.stat}
                </div>
                <div className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em]">
                   {s.statLabel}
                </div>
              </div>
              
              <h3 className="text-lg font-display font-black text-white uppercase tracking-tight mb-4">{s.title}</h3>
              <p className="text-text-dim text-sm font-light leading-relaxed">
                {s.description}
              </p>
              
              {/* Highlight bar */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
