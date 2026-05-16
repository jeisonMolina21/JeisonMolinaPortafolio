/** @jsxImportSource react */
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, CheckCircle2, Target, Lightbulb, X, Layers, Zap, Award, ArrowRight } from 'lucide-react';

const projects = [
  {
    num: "01",
    title: "Carnet Virtual Institucional",
    stack: ["MySQL", "Node.js", "React", "Docker"],
    description: "Digitalización total de la identificación para la Fundación Universitaria Horizonte.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    problem: "Procesos manuales de carnetización lentos y costosos.",
    solution: "Arquitectura escalable para generación instantánea de carnets digitales con QR.",
    results: ["Reducción del 90% en tiempos", "5,000+ estudiantes activos", "Auditoría en tiempo real"]
  },
  {
    num: "02",
    title: "Gestión de Inventario IT",
    stack: ["Astro", "React", "PostgreSQL", "Linux"],
    description: "Control exhaustivo de hardware y periféricos institucionales.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    problem: "Pérdida de trazabilidad en equipos asignados.",
    solution: "Sistema con generación automática de hojas de vida y revisión técnica.",
    results: ["Control del 100% de activos", "Auditorías instantáneas", "Reportes PDF automáticos"]
  },
  {
    num: "03",
    title: "RPA: Creación de Correos",
    stack: ["Python", "Microsoft API", "JSON", "Bash"],
    description: "Script de alto rendimiento para creación masiva de cuentas institucionales.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    problem: "60+ horas semestrales perdidas en creación manual.",
    solution: "Script en Python que automatiza la creación y notificación.",
    results: ["1,000+ cuentas en 5 min", "60h+ liberadas/semestre", "Integridad del 100%"]
  }
];

const ProjectCard = ({ project, index, onClick }: { project: any, index: number, onClick: (e: React.MouseEvent) => void }) => {
  const isLarge = index === 0;
  
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`group relative overflow-hidden cursor-pointer border border-white/5 bg-black ${
        isLarge ? 'lg:col-span-2 lg:row-span-2 h-[500px]' : 'h-[320px]'
      }`}
    >
      {/* Background Image with Cinematic Filter */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale contrast-125 brightness-50 group-hover:scale-105 group-hover:brightness-75 transition-all duration-1000 ease-out" 
        />
        <div className="absolute inset-0 bg-secondary/30 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Editorial Content */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-primary font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
              {project.num} / Case Study
            </span>
            <div className="h-px w-8 bg-primary/30" />
          </div>
          
          <h3 className={`font-display font-black leading-none text-white uppercase tracking-tighter ${
            isLarge ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'
          }`}>
            {project.title.split(' ')[0]} <br />
            <span className="text-primary italic">{project.title.split(' ').slice(1).join(' ')}</span>
          </h3>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.slice(0, 3).map((s: string) => (
              <span key={s} className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">
                [{s}]
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="text-white" size={24} />
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-24 bg-black relative">
      {/* Texture Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.02] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[12vw] lg:text-[8vw] font-display font-black leading-[0.8] tracking-tighter uppercase text-white"
            >
              CASOS <br />
              <span className="text-primary">DE ÉXITO</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-text-dim text-sm font-sans font-light uppercase tracking-widest leading-relaxed">
              Soluciones transformadoras <br />
              implementadas en entornos de producción real.
            </p>
          </div>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {projects.map((p, i) => (
            <ProjectCard key={i} index={i} project={p} onClick={() => setSelectedProject(p)} />
          ))}
        </div>
      </div>

      {/* Modal - Editorial Detail */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative w-full h-full lg:h-[90vh] lg:max-w-6xl bg-black border border-white/10 overflow-y-auto z-20"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 text-white z-50 hover:text-primary transition-colors"
              >
                <X size={32} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                {/* Visual Side */}
                <div className="lg:col-span-7 relative h-[40vh] lg:h-full">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover grayscale brightness-50" />
                  <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply" />
                  <div className="absolute bottom-12 left-12">
                     <h3 className="text-6xl md:text-8xl font-display font-black text-white uppercase leading-none tracking-tighter">
                        {selectedProject.title}
                     </h3>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="lg:col-span-5 p-12 lg:p-20 space-y-12 bg-black">
                  <div className="space-y-4">
                    <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest">El Desafío</span>
                    <p className="text-xl text-text-dim leading-relaxed font-light italic">"{selectedProject.problem}"</p>
                  </div>

                  <div className="space-y-4">
                    <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest">La Solución</span>
                    <p className="text-lg text-white font-sans leading-relaxed">{selectedProject.solution}</p>
                  </div>

                  <div className="space-y-6">
                    <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest">Resultados</span>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedProject.results.map((r: string, ri: number) => (
                        <div key={ri} className="flex items-center gap-4 border-b border-white/5 pb-4">
                          <span className="text-primary font-mono text-xl">0{ri+1}</span>
                          <span className="text-white font-bold uppercase tracking-tighter text-lg">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                     <div className="flex flex-wrap gap-3">
                        {selectedProject.stack.map((s: string) => (
                           <span key={s} className="px-3 py-1 border border-white/10 text-[10px] font-mono text-white/60 uppercase">
                              {s}
                           </span>
                        ))}
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
