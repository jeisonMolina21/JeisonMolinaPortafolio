import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

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
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';
    fetch(`${API_URL}/projects?lang=${lang}`)
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [lang]);

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto reveal-up">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Featured <span className="wine-gradient italic">Artifacts</span></h2>
          <p className="text-text-dim mt-4 max-w-md">Una selección de sistemas automatizados y arquitecturas de software diseñadas para la escalabilidad.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20 pb-40">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {projects.map((project, idx) => (
             <div 
               key={project.id} 
               className={`group glass rounded-[2.5rem] overflow-hidden flex flex-col h-full border-white/5 hover:border-primary/20 transition-all duration-500`}
             >
               <div className="h-[300px] overflow-hidden relative">
                 <img 
                   src={project.image_url?.startsWith('/') ? `${import.meta.env.PUBLIC_API_URL?.replace('/api','') || 'http://localhost:3000'}${project.image_url}` : project.image_url} 
                   alt={project.title} 
                   className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/90 via-bg-surface/20 to-transparent"></div>
                 <div className="absolute bottom-6 left-8 flex flex-wrap gap-3">
                   {project.tech_stack.split(',').slice(0, 3).map(tag => (
                     <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white">
                       {tag.trim()}
                     </span>
                   ))}
                 </div>
               </div>
               
               <div className="p-10 flex flex-col flex-grow">
                 <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">
                   {project.title}
                 </h3>
                 <p className="text-text-dim text-sm mb-8 leading-relaxed font-light line-clamp-3">
                   {project.description}
                 </p>
                 
                 <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                   <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-all">
                     View Source — 01
                   </a>
                   <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                   </div>
                 </div>
               </div>
             </div>
           ))}
        </div>
      )}
    </section>
  );
};

export default ProjectList;
