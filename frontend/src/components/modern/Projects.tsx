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

const ProjectCard = ({ project, onClick }: { project: any, onClick: (e: React.MouseEvent) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -8,
      y: (x - 0.5) * 8,
    });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-[320px] neo-glass rounded-2xl overflow-hidden cursor-pointer hover:border-primary/20 transition-all duration-300"
      style={{
        "--x": `${mousePos.x}px`,
        "--y": `${mousePos.y}px`,
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      } as any}
    >
      {/* Radial Glow */}
      <div className="absolute inset-0 radial-glow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Image */}
      <div className="absolute inset-0">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale brightness-40 group-hover:grayscale-0 group-hover:brightness-60 group-hover:scale-105 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
      </div>

      {/* Project Number */}
      <div className="absolute top-5 left-5 text-6xl font-display font-bold text-white/[0.06] group-hover:text-primary/10 transition-colors">
        {project.num}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
        <div className="space-y-2.5 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            {project.stack.slice(0, 4).map((s: string) => (
              <span key={s} className="px-2 py-0.5 neo-glass rounded text-[8px] font-bold uppercase tracking-wider text-primary-bright">
                {s}
              </span>
            ))}
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-white">{project.title}</h3>
          <p className="text-text-dim text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            {project.description}
          </p>
          <div className="flex items-center gap-1.5 text-primary-bright font-bold text-[9px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-400 pt-1">
            Ver detalles <ArrowRight size={12} />
          </div>
        </div>
      </div>
      
      {/* Corner Icon */}
      <div className="absolute top-5 right-5 w-8 h-8 neo-glass rounded-lg flex items-center justify-center text-white/50 scale-0 group-hover:scale-100 transition-transform">
        <Layers size={14} />
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="section-padding bg-slate-950 relative">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-display font-bold tracking-tighter"
          >
            Casos de <span className="text-gradient-primary italic">Éxito</span>
          </motion.h2>
          <p className="text-text-dim text-sm">Soluciones transformadoras implementadas en entornos de producción real.</p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} onClick={() => setSelectedProject(p)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl neo-glass rounded-3xl overflow-hidden z-20 shadow-2xl max-h-[85vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 neo-glass rounded-xl flex items-center justify-center text-white z-30 hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-48 lg:h-auto">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent lg:bg-gradient-to-r" />
                </div>
                
                <div className="p-8 space-y-6 overflow-y-auto max-h-[60vh]">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">{selectedProject.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.stack.map((s: string) => (
                        <span key={s} className="px-2.5 py-1 neo-glass rounded-lg text-[9px] font-bold uppercase tracking-wider text-primary-bright">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-primary-bright">
                        <Target size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white">El Reto</span>
                      </div>
                      <p className="text-text-dim text-sm leading-relaxed">{selectedProject.problem}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-primary-bright">
                        <Lightbulb size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white">La Solución</span>
                      </div>
                      <p className="text-text-dim text-sm leading-relaxed">{selectedProject.solution}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary-bright">
                      <Award size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white">Resultados</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProject.results.map((r: string, ri: number) => (
                        <motion.div
                          key={ri}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + (ri * 0.1), type: "spring" }}
                          className="p-3 neo-glass rounded-xl border-primary/15 text-center"
                        >
                          <CheckCircle2 size={16} className="text-primary-bright mx-auto mb-1.5" />
                          <p className="text-[10px] font-bold text-white leading-tight">{r}</p>
                        </motion.div>
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
