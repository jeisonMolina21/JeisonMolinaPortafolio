/** @jsxImportSource react */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ArrowLeft, ArrowRight, Layers, Zap } from 'lucide-react';
import { fallbackData } from '../../data/fallbackData';

const Projects = ({ projects: propProjects }: { projects?: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const projectsList = (propProjects || fallbackData.projects).map((p, i) => ({
    ...p,
    num: `0${i + 1}`,
    image: p.image_url || p.image, 
    stack: p.tech_stack ? (typeof p.tech_stack === 'string' ? p.tech_stack.split(',').map((s: string) => s.trim()) : p.tech_stack) : (p.stack || []),
    problem: p.problem || p.description,
    solution: p.solution || "Arquitectura implementada bajo estándares de alta disponibilidad.",
    results: p.results || ["Optimización de procesos", "Mejora en la experiencia de usuario"]
  }));

  const next = () => setActiveIndex((prev) => (prev + 1) % projectsList.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + projectsList.length) % projectsList.length);

  return (
    <section id="projects" className="py-24 bg-midnight relative overflow-hidden">
      {/* Background Glow - Dynamic color based on active project if desired */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Header - Editorial Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end">
          <div className="lg:col-span-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[12vw] lg:text-[7vw] font-display font-black leading-[0.8] tracking-tighter uppercase text-text-main"
            >
              CASOS <br />
              <span className="text-primary italic">DESTACADOS</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4 lg:text-right flex items-center justify-end gap-6">
            <button onClick={prev} className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-all">
               <ArrowLeft size={24} />
            </button>
            <button onClick={next} className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-all">
               <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Streaming Carousel */}
        <div className="relative h-[600px] flex items-center justify-center">
          <div className="flex items-center gap-8 px-4 md:px-0">
            {projectsList.map((project, index) => {
              const isActive = index === activeIndex;
              const isPrev = index === (activeIndex - 1 + projectsList.length) % projectsList.length;
              const isNext = index === (activeIndex + 1) % projectsList.length;
              
              if (!isActive && !isPrev && !isNext) return null;

              return (
                <motion.div
                  key={project.id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1.1 : 0.9,
                    x: isActive ? 0 : (isPrev ? -100 : 100),
                    zIndex: isActive ? 20 : 10
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => isActive ? setSelectedProject(project) : setActiveIndex(index)}
                  className={`relative w-[300px] md:w-[600px] aspect-[16/10] cursor-pointer group`}
                >
                  {/* Active Glow */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute -inset-4 bg-primary/20 blur-3xl rounded-3xl -z-10"
                    />
                  )}

                  {/* Card Content */}
                  <div className="w-full h-full overflow-hidden border border-white/10 bg-black relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={`w-full h-full object-cover transition-all duration-1000 ${isActive ? 'grayscale-0' : 'grayscale'}`} 
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    {/* Metadata */}
                    <div className="absolute bottom-0 left-0 w-full p-8 space-y-2">
                       <span className="text-primary font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
                          {project.num} / {project.stack[0]}
                       </span>
                       <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                          {project.title}
                       </h3>
                    </div>

                    {/* Technical Info (Technical Luxury) */}
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-8 left-8 flex gap-3"
                      >
                         {project.stack.slice(0, 3).map((s: string) => (
                            <span key={s} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/80 uppercase">
                               {s}
                            </span>
                         ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination */}
        <div className="flex justify-center gap-2 mt-12">
           {projectsList.map((_, i) => (
              <button 
                 key={i} 
                 onClick={() => setActiveIndex(i)}
                 className={`h-1 transition-all duration-500 ${i === activeIndex ? 'w-12 bg-primary' : 'w-4 bg-white/10'}`}
              />
           ))}
        </div>
      </div>

      {/* Modal - Editorial Detail (same as before but styled for Lazarev vibe) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative w-full h-full lg:h-[80vh] lg:max-w-6xl bg-black border border-white/10 overflow-hidden z-20"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 text-text-main z-50 hover:text-primary transition-colors"
              >
                <X size={32} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                <div className="lg:col-span-7 relative h-[40vh] lg:h-full overflow-hidden">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-secondary/30 mix-blend-multiply" />
                </div>
                
                <div className="lg:col-span-5 p-12 lg:p-16 space-y-12 bg-black overflow-y-auto">
                  <div className="space-y-4">
                    <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-widest">Problem</span>
                    <p className="text-xl text-text-dim leading-relaxed font-light italic">"{selectedProject.problem}"</p>
                  </div>

                  <div className="space-y-4">
                    <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-widest">Solution</span>
                    <p className="text-lg text-text-main font-sans leading-relaxed font-light">{selectedProject.solution}</p>
                  </div>

                  <div className="space-y-6">
                    <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-widest">Outcomes</span>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedProject.results.map((r: string, ri: number) => (
                        <div key={ri} className="flex items-center gap-4 border-b border-white/5 pb-4">
                          <span className="text-primary font-mono text-lg">0{ri+1}</span>
                          <span className="text-text-main font-bold uppercase tracking-tighter text-md">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 flex gap-4">
                    <a href={selectedProject.github_url || "#"} className="flex-1 py-4 border border-primary/20 text-center text-text-main text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                       {selectedProject.github_label || "Source Code"}
                    </a>
                    {selectedProject.demo_url && (
                       <a href={selectedProject.demo_url} className="flex-1 py-4 bg-primary text-center text-white text-[10px] font-bold uppercase tracking-widest hover:bg-text-main hover:text-midnight transition-all">
                          {selectedProject.demo_label || "Live Demo"}
                       </a>
                    )}
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
