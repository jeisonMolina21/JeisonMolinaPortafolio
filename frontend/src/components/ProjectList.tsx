import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Sparkles, Box, ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../utils/api';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string;
  github_url: string;
}

const ProjectList = () => {
  const { lang, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.get('projects', lang)
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [lang]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="projects" className="section-padding overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-primary/20 mb-6">
              <Box size={12} className="text-primary-bright" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-bright italic">Project Repository</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-black leading-none tracking-tighter">
              Architectural<br/><span className="wine-gradient italic">Artifacts</span>
            </h2>
            <p className="text-text-dim mt-8 max-w-xl text-lg font-medium leading-relaxed">
              Sistemas diseñados con un enfoque en <span className="text-white font-bold">resultados medibles</span>, 
              automatización de procesos masivos y robustez técnica.
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-32">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
          >
             {projects.map((project, idx) => {
               const metric = project.description.match(/(\d+%|\d+ días|\d+ hours)/i)?.[0];
               
               return (
                 <motion.div 
                   key={project.id} 
                   variants={cardVariants}
                   className="group relative flex flex-col h-full"
                 >
                   <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/5 bg-midnight shadow-2xl transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(153,27,27,0.2)] group-hover:border-primary/20">
                       <img 
                         src={project.image_url?.startsWith('/') ? `${import.meta.env.PUBLIC_API_URL?.replace('/api','') || 'http://localhost:3000'}${project.image_url}` : (project.image_url || '')} 
                         alt={project.title} 
                         className="w-full h-full object-cover grayscale brightness-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.05]"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent opacity-80" />
                       
                       {/* Floating Tech Badges */}
                       <div className="absolute top-8 left-8 flex flex-wrap gap-2 max-w-[80%]">
                         {(project.tech_stack || '').split(',').map((tag, ti) => (
                           <motion.span 
                             key={tag} 
                             initial={{ opacity: 0, x: -10 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             transition={{ delay: 0.5 + ti * 0.1 }}
                             className="text-[9px] font-black uppercase tracking-widest glass bg-black/40 px-4 py-2 rounded-xl border border-white/10 text-white/90"
                           >
                             {tag.trim()}
                           </motion.span>
                         ))}
                       </div>

                       {/* Impact Badge */}
                       {metric && (
                         <div className="absolute bottom-8 left-8 glass px-6 py-4 rounded-[2rem] border-primary/30 shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-bright mb-1.5 flex items-center gap-2">
                              <Sparkles size={10} />
                              Impact Achievement
                            </p>
                            <p className="text-white font-black text-lg leading-none">Target: {metric}</p>
                         </div>
                       )}

                       {/* External Link */}
                       <div className="absolute bottom-8 right-8">
                          <div className="w-14 h-14 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary border-white/20">
                             <ArrowRight size={20} className="text-white group-hover:rotate-[-45deg] transition-transform" />
                          </div>
                       </div>
                   </div>
                   
                   <div className="pt-10 px-4 space-y-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start">
                          <div className="space-y-1">
                              <h3 className="text-4xl font-display font-black text-white tracking-tighter group-hover:text-primary-bright transition-colors">
                                  {project.title}
                              </h3>
                              <p className="text-primary-bright/60 text-[10px] font-black uppercase tracking-[0.3em]">Module Archive 0{idx + 1}</p>
                          </div>
                      </div>

                      <p className="text-text-dim text-lg leading-relaxed font-medium line-clamp-3 group-hover:text-text-main transition-colors">
                          {project.description}
                      </p>
                      
                      <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                          <a 
                            href={project.github_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-4 group/link"
                          >
                              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover/link:bg-primary transition-all duration-500 border-white/10 shadow-xl">
                                  <Github size={24} className="text-white" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-bright">GitHub</span>
                                <span className="text-[11px] font-bold text-text-muted group-hover/link:text-white transition-colors">Access Core Code</span>
                              </div>
                          </a>
                          
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-primary-bright transition-colors">
                              Explore <ExternalLink size={14} />
                          </div>
                      </div>
                   </div>
                 </motion.div>
               );
             })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectList;
