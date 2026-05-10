/** @jsxImportSource react */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Layers, Cpu } from 'lucide-react';

interface ProjectSceneProps {
  project: any;
  index: number;
}

const ProjectScene = ({ project, index }: ProjectSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-midnight">
        {/* Dynamic Background */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]) }}
          className="absolute inset-0 z-0"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-bright/10"></div>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-20"></div>
        </motion.div>

        <motion.div 
          style={{ opacity, scale, y }}
          className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
        >
          {/* Left: Visual Content */}
          <div className="relative group order-2 lg:order-1">
             <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-[3rem] group-hover:bg-primary/20 transition-all duration-700"></div>
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl"
             >
                <img 
                  src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80'} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60"></div>
             </motion.div>

             {/* Floating Info */}
             <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute -bottom-6 -left-6 p-6 glass rounded-2xl border-white/10 shadow-xl hidden md:block"
             >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                      <Cpu size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Tech Stack</p>
                      <p className="text-xs font-bold text-text-main">{project.technologies?.split(',').slice(0, 3).join(' • ')}</p>
                   </div>
                </div>
             </motion.div>
          </div>

          {/* Right: Narrative Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
               <motion.span 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="text-xs font-bold uppercase tracking-[0.4em] text-primary"
               >
                 Proyecto 0{index + 1}
               </motion.span>
               <h3 className="text-5xl md:text-7xl font-display font-bold text-text-main leading-none">
                 {project.title}
               </h3>
            </div>

            <div className="space-y-6">
               <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-text-muted">El Problema</p>
                  <p className="text-lg text-text-dim leading-relaxed italic">
                    "{project.challenge || "Desafío técnico complejo resuelto con arquitectura escalable."}"
                  </p>
               </div>
               
               <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-text-muted">La Solución</p>
                  <p className="text-lg text-text-main leading-relaxed">
                    {project.action || project.description}
                  </p>
               </div>
            </div>

            <div className="flex gap-6 pt-4">
               {project.github_url && (
                  <a href={project.github_url} target="_blank" className="flex items-center gap-2 text-sm font-bold text-text-main hover:text-primary transition-colors group">
                    Código <Github size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
               )}
               {project.demo_url && (
                  <a href={project.demo_url} target="_blank" className="flex items-center gap-2 text-sm font-bold text-text-main hover:text-primary transition-colors group">
                    Live Demo <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
               )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectScene;
