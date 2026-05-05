/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import HeroNarrative from './HeroNarrative';
import AboutNarrative from './AboutNarrative';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

interface NarrativeExperienceProps {
  projects: any[];
  profile: any;
  groupedSkills: any;
}

const NarrativeExperience = ({ projects, profile, groupedSkills }: NarrativeExperienceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, [projects.length]);

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div className="relative bg-midnight overflow-hidden">
      <HeroNarrative />

      {/* Narrative Section 2: About Me */}
      <AboutNarrative profile={profile} groupedSkills={groupedSkills} />

      {/* Projects Horizontal Experience */}
      <section className="relative h-screen flex flex-col justify-center py-20">
        <div className="container-custom relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">Portafolio</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-text-main">Casos de Éxito</h2>
            </div>
            <div className="flex gap-4">
              <button onClick={prevProject} className="p-4 rounded-full border border-white/5 hover:border-primary/50 text-text-dim hover:text-primary transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextProject} className="p-4 rounded-full border border-white/5 hover:border-primary/50 text-text-dim hover:text-primary transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="relative h-[60vh] md:h-[70vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Visual Content */}
                <div className="lg:col-span-7 relative group">
                  <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-[3rem] opacity-50"></div>
                  <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                    <img 
                      src={projects[currentIndex]?.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80'} 
                      alt={projects[currentIndex]?.title}
                      className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-60"></div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                    <span className="text-sm font-bold text-primary">0{currentIndex + 1} / 0{projects.length}</span>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-text-main leading-tight">
                      {projects[currentIndex]?.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-text-dim text-lg leading-relaxed">
                      {projects[currentIndex]?.challenge || projects[currentIndex]?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {projects[currentIndex]?.technologies?.split(',').map((tech: string) => (
                        <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-text-muted uppercase tracking-widest">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-6 pt-4">
                    {projects[currentIndex]?.github_url && (
                      <a href={projects[currentIndex].github_url} target="_blank" className="flex items-center gap-2 text-sm font-bold text-text-main hover:text-primary transition-colors group">
                        GitHub <Github size={18} />
                      </a>
                    )}
                    {projects[currentIndex]?.demo_url && (
                      <a href={projects[currentIndex].demo_url} target="_blank" className="flex items-center gap-2 text-sm font-bold text-text-main hover:text-primary transition-colors group">
                        Live Demo <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="container-custom mt-12 flex gap-2">
          {projects.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-grow rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-primary w-12' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </section>

      {/* Final Scene / CTA */}
      <section className="h-screen flex flex-col items-center justify-center bg-midnight relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="container-custom text-center space-y-12"
        >
          <h2 className="text-5xl md:text-8xl font-display font-bold text-text-main tracking-tighter">
            ¿Listo para empezar el <br />
            <span className="text-primary italic">próximo capítulo?</span>
          </h2>
          <a href="#contact" className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-white font-bold rounded-2xl hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all duration-500 hover:-translate-y-2">
            Contáctame ahora
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default NarrativeExperience;
