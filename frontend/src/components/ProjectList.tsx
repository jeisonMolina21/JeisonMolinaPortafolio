import React, { useEffect, useState } from 'react';
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
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    api.get('projects', lang)
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [lang]);

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="reveal-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border-primary/20 mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary-bright italic">Project Repository</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] tracking-tighter">
            Architectural<br/><span className="wine-gradient italic">Artifacts</span>
          </h2>
          <p className="text-text-dim mt-6 max-w-lg text-lg font-light leading-relaxed">
            Sistemas diseñados con un enfoque en <span className="text-white font-bold">resultados medibles</span>, 
            automatización de procesos masivos y robustez técnica.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20 pb-40">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {projects.map((project, idx) => {
             // Extract metrics if they exist in description (simple regex for numbers + keywords)
             const metric = project.description.match(/(\d+%|\d+ días|\d+ hours)/i)?.[0];
             
             return (
               <div 
                 key={project.id} 
                 className="group relative flex flex-col h-full reveal-up"
               >
                 <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border-white/5 bg-midnight shadow-2xl transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] group-hover:border-primary/20">
                     <img 
                       src={project.image_url?.startsWith('/') ? `${import.meta.env.PUBLIC_API_URL?.replace('/api','') || 'http://localhost:3000'}${project.image_url}` : (project.image_url || '')} 
                       alt={project.title} 
                       className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                     
                     {/* Tech Stack Floating Badges */}
                     <div className="absolute top-8 left-8 flex flex-wrap gap-2 max-w-[80%]">
                       {(project.tech_stack || '').split(',').map(tag => (
                         <span key={tag} className="text-[8px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/5 text-white/80 shadow-lg">
                           {tag.trim()}
                         </span>
                       ))}
                     </div>

                    {/* Metric Highlight (The WOW part) */}
                    {metric && (
                      <div className="absolute bottom-8 left-8 glass px-5 py-3 rounded-2xl border-primary/20 shadow-2xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                         <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-bright mb-1 italic">Impact Achievement</p>
                         <p className="text-white font-bold text-sm">Target Reached: {metric}</p>
                      </div>
                    )}
                 </div>
                 
                 <div className="pt-10 px-4 space-y-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-start">
                        <h3 className="text-3xl font-display font-black text-white/90 group-hover:text-white transition-colors tracking-tight">
                            {project.title}
                        </h3>
                        <span className="text-text-muted font-display italic text-2xl font-black opacity-10 group-hover:opacity-20 transition-opacity">0{idx + 1}</span>
                    </div>

                    <p className="text-text-dim text-lg leading-relaxed font-light line-clamp-3 group-hover:text-text-muted transition-colors">
                        {project.description}
                    </p>
                    
                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/link">
                            <div className="w-14 h-14 glass rounded-[1.25rem] flex items-center justify-center group-hover/link:bg-primary transition-all duration-500 border-white/5">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim group-hover/link:text-white transition-colors">Access Repository</span>
                        </a>
                        
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-20 group-hover:opacity-100 group-hover:border-primary/40 transition-all duration-700">
                             <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </div>
                    </div>
                 </div>
               </div>
             );
           })}
        </div>
      )}
    </section>
  );
};

export default ProjectList;
