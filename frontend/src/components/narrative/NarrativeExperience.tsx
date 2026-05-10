/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroNarrative from './HeroNarrative';
import AboutNarrative from './AboutNarrative';
import { Github, ExternalLink, Cpu, ChevronLeft, ChevronRight, Target, Activity, Award } from 'lucide-react';



interface NarrativeExperienceProps {
  projects: any[];
  profile: any;
  groupedSkills: any;
  skills: any[];
}

const NarrativeExperience = ({ projects, profile, groupedSkills, skills }: NarrativeExperienceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 8000); // 8 seconds for more reading time
    return () => clearInterval(timer);
  }, [projects.length]);

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const currentProject = projects[currentIndex];

  return (
    <div className="relative bg-midnight overflow-hidden">
      <HeroNarrative profile={profile} skills={skills} />

      {/* Narrative Section 2: About Me */}
      <AboutNarrative profile={profile} groupedSkills={groupedSkills} />

      {/* Projects Horizontal Experience */}
      <section id="projects" className="relative min-h-screen flex flex-col justify-center py-32 bg-bg-deep">
        {/* Background Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05)_0%,transparent_70%)]"></div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
                <Target size={12} className="text-primary-bright" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-bright">Casos de Éxito</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-text-main tracking-tight">
                Sistemas <span className="text-primary italic">Reales.</span><br />
                Impacto <span className="text-primary-bright italic">Medible.</span>
              </h2>
            </div>
            <div className="flex gap-4">
              <button onClick={prevProject} className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/50 text-text-dim hover:text-primary-bright transition-all backdrop-blur-xl group">
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button onClick={nextProject} className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/50 text-text-dim hover:text-primary-bright transition-all backdrop-blur-xl group">
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative min-h-[80vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -20 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start"
              >
                {/* Visual Content Column */}
                <div className="lg:col-span-6 space-y-8">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-[3rem] opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
                      <img 
                        src={currentProject?.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80'} 
                        alt={currentProject?.title}
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent"></div>
                      
                      {/* Project Counter Overlay */}
                      <div className="absolute top-8 left-8 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl">
                        <span className="text-xs font-black text-primary-bright tracking-widest uppercase">
                          Project {currentIndex + 1} / {projects.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Horizontal */}
                  <div className="flex flex-wrap gap-3">
                    {currentProject?.tech_stack?.split(',').map((tech: string) => (
                      <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-text-muted uppercase tracking-widest hover:border-primary/40 hover:text-primary-bright transition-all">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Text & Data Column */}
                <div className="lg:col-span-6 space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-text-main leading-tight tracking-tight">
                      {currentProject?.title}
                    </h3>
                    <p className="text-lg text-text-dim leading-relaxed font-light">
                      {currentProject?.description}
                    </p>
                  </div>

                  {/* Impact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 hover:bg-primary/5 hover:border-primary/20 transition-all group">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary-bright">
                        <Activity size={20} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">El Desafío</p>
                        <p className="text-sm text-text-dim group-hover:text-text-main transition-colors leading-relaxed">
                          {currentProject?.challenge}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl space-y-4 group">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary-bright">
                        <Award size={20} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Impacto Logrado</p>
                        <p className="text-sm text-text-dim group-hover:text-text-main transition-colors leading-relaxed">
                          {currentProject?.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-8 pt-4">
                    {currentProject?.github_url && (
                      <a href={currentProject.github_url} target="_blank" className="flex items-center gap-3 text-sm font-bold text-text-main hover:text-primary-bright transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Github size={18} />
                        </div>
                        Ver Código
                      </a>
                    )}
                    <a href="#contact" className="flex items-center gap-3 text-sm font-bold text-text-main hover:text-primary-bright transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary-bright group-hover:text-white transition-colors">
                        <ExternalLink size={18} />
                      </div>
                      Solicitar Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Timeline Indicator */}
        <div className="container-custom mt-20">
          <div className="flex gap-4">
            {projects.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 flex-grow rounded-full transition-all duration-700 overflow-hidden relative ${i === currentIndex ? 'bg-primary' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {i === currentIndex && (
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 8, ease: 'linear' }}
                    className="absolute inset-0 bg-primary-bright"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Final Scene / CTA */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-midnight relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-custom text-center space-y-16"
        >
          <div className="space-y-6">
             <span className="text-xs font-black uppercase tracking-[0.5em] text-primary-bright italic">Capítulo Final</span>
             <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black text-text-main tracking-tighter leading-none">
              ¿Escribimos el <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-bright to-primary italic">próximo capítulo?</span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
            <a href="#contact" className="relative px-16 py-8 bg-primary text-white font-black text-xl rounded-[2.5rem] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              Hablemos Ahora
            </a>
            <p className="text-text-muted font-medium italic text-lg">
              Disponible para proyectos <br /> de alto impacto.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default NarrativeExperience;

