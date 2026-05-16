/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code2, Cpu, BrainCircuit, TrendingUp } from 'lucide-react';

const specialties = [
  {
    title: "Automatización e Integración",
    stat: "60h+",
    statLabel: "ahorro operativo/mes",
    description: "Orquestación de flujos de trabajo autónomos con n8n & RPA para conectar CRM, ERP y APIs.",
    icon: <Zap size={22} />,
  },
  {
    title: "Backend Architecture",
    stat: "5K+",
    statLabel: "usuarios activos",
    description: "Diseño de sistemas robustos, microservicios y APIs escalables con Node.js, Python y MySQL.",
    icon: <Code2 size={22} />,
  },
  {
    title: "Data Pipelines & ETL",
    stat: "50K+",
    statLabel: "registros/día",
    description: "Scripts en Python y Pandas para procesamiento, limpieza y migración masiva de datos biométricos.",
    icon: <TrendingUp size={22} />,
  },
  {
    title: "Infraestructura & Logs",
    stat: "100%",
    statLabel: "trazabilidad",
    description: "Gestión absoluta de activos fijos con contenedores y automatización de reportes de auditoría.",
    icon: <Cpu size={22} />,
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-midnight relative overflow-hidden">
      {/* Decorative Texture */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 skew-x-12 transform origin-top-right -z-10" />

      <div className="container-custom">
        {/* Header - Editorial Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[12vw] lg:text-[7vw] font-display font-black leading-[0.8] tracking-tighter uppercase text-text-main"
            >
              IMPACTO <br />
              <span className="text-primary italic">MEDIBLE</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="text-text-dim text-sm font-sans font-light uppercase tracking-widest leading-relaxed border-l border-primary/30 pl-6">
              Estudiante de Ingeniería de Sistemas & SENA. <br />
              Mi fuerte es el backend y los datos, con <br />
              habilidades complementarias en React/Next.js <br />
              para soluciones integrales (T-Shaped).
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
              className="group relative p-10 bg-surface hover:bg-primary/5 transition-all duration-700"
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
                <div className="text-4xl font-display font-black text-text-main group-hover:text-primary transition-colors tracking-tighter">
                   {s.stat}
                </div>
                <div className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em]">
                   {s.statLabel}
                </div>
              </div>
              
              <h3 className="text-lg font-display font-black text-text-main uppercase tracking-tight mb-4">{s.title}</h3>
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
