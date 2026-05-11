/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code2, Cpu, BrainCircuit, TrendingUp, Database } from 'lucide-react';

const specialties = [
  {
    title: "Backend & APIs",
    stat: "99.8%",
    statLabel: "integridad",
    description: "Desarrollo de arquitecturas robustas con Python, Django y Node.js para procesamiento masivo.",
    icon: <Database size={22} />,
    gradient: "from-indigo-500 to-purple-500",
    featured: true
  },
  {
    title: "Automatización",
    stat: "1000",
    statLabel: "correos / 5min",
    description: "Flujos automatizados con Microsoft Graph API para eliminación de tareas manuales repetitivas.",
    icon: <Zap size={22} />,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Data Workflows",
    stat: "50K+",
    statLabel: "registros/día",
    description: "Pipelines ETL optimizados con Pandas para ingesta y normalización de datos críticos.",
    icon: <Cpu size={22} />,
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "Integraciones",
    stat: "60h+",
    statLabel: "tiempo liberado",
    description: "Conexión de ecosistemas empresariales mediante APIs REST y flujos en n8n.",
    icon: <BrainCircuit size={22} />,
    gradient: "from-amber-500 to-orange-500"
  }
];

const About = () => {
  return (
    <section id="about" className="section-padding bg-slate-950 relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 neo-glass rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-primary"
          >
            <TrendingUp size={12} />
            Impacto medible
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold tracking-tighter"
          >
            Especialidad en <span className="text-gradient-primary italic">Resultados</span>
          </motion.h2>
          <p className="text-text-dim text-sm max-w-lg mx-auto leading-relaxed">
            No solo escribo código, diseño soluciones que generan impacto medible en la eficiencia operativa.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {specialties.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className={`group relative p-5 neo-glass rounded-2xl overflow-hidden cursor-default beam-border ${
                s.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${s.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>

              {/* Stat */}
              <div className="mb-3">
                <span className="text-2xl font-display font-bold text-white">{s.stat}</span>
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider ml-1.5">{s.statLabel}</span>
              </div>
              
              <h3 className="text-sm font-display font-bold text-white mb-1.5 group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-text-muted text-xs leading-relaxed group-hover:text-text-dim transition-colors">
                {s.description}
              </p>
              
              {/* Background glow on hover */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
