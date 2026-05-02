import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, ArrowRight } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioContext';
import '../styles/components/ProjectList.css';

const ProjectList = () => {
  const { data, loading } = usePortfolioData();
  const projects = data?.projects || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  if (loading) return (
    <section id="projects" className="projects-section">
      <div className="container-custom">
        <div className="projects-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="project-card animate-pulse">
              <div className="card-media" />
              <div className="project-content space-y-4">
                <div className="h-3 bg-white/10 rounded-full w-1/4" />
                <div className="h-8 bg-white/10 rounded-full w-3/4" />
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
      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/3 blur-[100px] rounded-full -z-10" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-6">
            <Code size={14} className="text-primary-bright" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-bright">Trabajos Realizados</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter leading-none">
            Ingeniería de <br />
            <span className="wine-gradient italic">Software</span>
          </h2>
        </motion.div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project: any) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="project-card group"
            >
              <div className="project-image-container">
                <img 
                  src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80'} 
                  alt={project.title} 
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-image-overlay" />
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="w-10 h-10 rounded-full bg-midnight/80 backdrop-blur-md flex items-center justify-center border border-white/10">
                      <ArrowRight size={18} className="text-white -rotate-45" />
                   </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-category">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {project.category || 'Full Stack Development'}
                </div>
                
                <h3 className="project-title group-hover:text-primary-bright transition-colors duration-300">
                  {project.title}
                </h3>
                
                {/* C-A-R Formula Display */}
                <div className="space-y-4 mb-6">
                  {project.challenge && (
                    <div className="flex gap-3">
                      <span className="text-[10px] font-black text-primary uppercase mt-1">C</span>
                      <p className="text-sm text-white/70 leading-relaxed italic">
                        <strong className="text-white/90 not-italic">Problema:</strong> {project.challenge}
                      </p>
                    </div>
                  )}
                  {project.action && (
                    <div className="flex gap-3">
                      <span className="text-[10px] font-black text-primary-bright uppercase mt-1">A</span>
                      <p className="text-sm text-white/70 leading-relaxed italic">
                        <strong className="text-white/90 not-italic">Solución:</strong> {project.action}
                      </p>
                    </div>
                  )}
                  {project.result && (
                    <div className="flex gap-3">
                      <span className="text-[10px] font-black text-green-400 uppercase mt-1">R</span>
                      <p className="text-sm text-green-400/90 leading-relaxed font-bold">
                        {project.result}
                      </p>
                    </div>
                  )}
                </div>

                <div className="project-tags">
                  {(project.tech_stack || project.tags)?.split(',').map((tag: string, i: number) => (
                    <span key={i} className="project-tag">
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {(project.demo_url || project.live_url) && (
                    <a href={project.demo_url || project.live_url} target="_blank" rel="noopener noreferrer" className="project-link-primary">
                      <ExternalLink size={16} />
                      <span>Live Preview</span>
                    </a>
                  )}
                  {(project.github_url || project.repo_url) && (
                    <a href={project.github_url || project.repo_url} target="_blank" rel="noopener noreferrer" className="project-link-secondary">
                      <Github size={20} />
                    </a>
                  )}
                  <a href={`/proyectos/${project.title.toLowerCase().split(':')[0].trim().replace(/\s+/g, '-')}`} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white ml-auto transition-colors">
                    Case Study
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <a href="https://github.com/jeisonMolina21" target="_blank" className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-all duration-300 group">
            <span className="text-sm font-medium tracking-widest uppercase">Explorar más en GitHub</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectList;

