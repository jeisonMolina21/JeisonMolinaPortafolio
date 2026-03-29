import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';


import { usePortfolioData } from '../context/PortfolioContext';


const ProjectList = () => {
  const { data, loading } = usePortfolioData();
  const projects = data?.projects || [];

  if (loading) return (
    <section id="projects" className="projects-section">
      <div className="container-custom relative z-10">
        <div className="projects-grid">
          {[1,2,3].map(i => (
            <div key={i} className="project-card animate-pulse">
              <div className="card-media bg-white/5" />
              <div className="project-content space-y-4">
                <div className="h-3 bg-white/10 rounded-full w-1/3" />
                <div className="h-6 bg-white/10 rounded-full w-2/3" />
                <div className="h-4 bg-white/5 rounded-full w-full" />
                <div className="h-4 bg-white/5 rounded-full w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="projects-section">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-primary/20 mb-6">
            <Code size={12} className="text-primary-bright" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-bright italic">Portafolio</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter">
            Proyectos <span className="wine-gradient italic">Destacados</span>
          </h2>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project: any, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="project-card group"
            >
              <div className="project-image-container">
                <img 
                  src={project.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'} 
                  alt={project.title} 
                  className="project-image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="project-image-overlay" />
              </div>

              <div className="project-content">
                <div className="project-category">
                  {project.category || 'Software Architecture'}
                  <span className="w-8 h-px bg-primary/30" />
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags?.split(',').map((tag: string, i: number) => (
                    <span key={i} className="project-tag">
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="project-link-primary group">
                      <ExternalLink size={16} />
                      <span>Ver Demo</span>
                    </a>
                  )}
                  {project.repo_url && (
                    <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="project-link-secondary">
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
