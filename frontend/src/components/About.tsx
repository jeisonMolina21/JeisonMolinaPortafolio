import React from 'react';
import { motion } from 'framer-motion';
import { User, Zap, Terminal, Cpu, Sparkles, Database, Box, Cloud } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getSkillIcon } from '../utils/iconMapper';
import { usePortfolioData } from '../context/PortfolioContext';


const About = () => {
  const { t } = useLanguage();
  const { data, loading } = usePortfolioData();
  const profileData = data?.profile;
  const skills = data?.skills || [];

  if (loading) return (
    <div className="flex items-center justify-center p-24 text-white/50 font-mono">
      <motion.div 
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading profile data...
      </motion.div>
    </div>
  );

  const error = data?.error;
  if (error || !profileData) return (
    <div className="flex flex-col items-center justify-center p-24 text-red-400 bg-red-500/5 rounded-[2.5rem] border border-red-500/20 mx-4 backdrop-blur-xl">
      <Database size={40} className="mb-6 opacity-50" />
      <p className="font-mono text-sm text-center max-w-md leading-relaxed">
        {error || 'Profile data unavailable.'}
        <br/>
        <span className="text-[10px] opacity-50 uppercase tracking-[0.3em] mt-4 block">Verify backend connectivity</span>
      </p>
    </div>
  );

  const categories = [
    { name: 'Programming', icon: <Terminal size={20} /> },
    { name: 'Backend', icon: <Cpu size={20} /> },
    { name: 'Frontend', icon: <Sparkles size={20} /> },
    { name: 'Data', icon: <Database size={20} /> },
    { name: 'Tools', icon: <Box size={20} /> },
    { name: 'Other', icon: <Cloud size={20} /> }
  ];

  const groupedSkills = (Array.isArray(skills) ? skills : []).reduce((acc: any, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="about" className="about-section">
      <div className="about-content-grid">
        
        {/* Left: Bio & Personal Info */}
        <div className="about-bio-column">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="badge-outline">
              <User size={14} className="text-primary-bright" />
              <span className="badge-text">Sobre Mí</span>
            </div>
            <h2 className="about-title">
              Arquitecto de <br/><span className="wine-gradient italic">Soluciones</span>
            </h2>
            <div className="about-bio-text">
              {profileData?.bio && profileData.bio.split('\n\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="about-focus-card group"
          >
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors duration-500">
              <Zap className="text-primary-bright" size={32} />
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-2 opacity-60">Enfoque Principal</h4>
              <p className="text-white/80 text-lg font-bold leading-tight italic">Automatización, Escalabilidad y Procesamiento de Datos.</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Specialized Skills */}
        <div className="about-skills-column">
          <motion.h3 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white/40 font-black uppercase tracking-[0.5em] text-[10px] mb-12 flex items-center gap-4"
          >
            <span className="w-12 h-px bg-primary/30"></span>
            Tech Stack 2026
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {categories.map((cat, idx) => {
              const catSkills = groupedSkills[cat.name] || [];
              if (catSkills.length === 0) return null;

              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="about-skill-category-card"
                >
                  <div className="about-category-header">
                    <div className="about-category-icon-box">{cat.icon}</div>
                    <h4 className="about-category-title">{cat.name}</h4>
                  </div>
                  
                  <div className="about-skills-flex">
                    {catSkills.map((skill: any) => {
                      const info = getSkillIcon(skill.name);
                      return (
                        <motion.div 
                          key={skill.id} 
                          className="about-skill-token group"
                          whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
                        >
                          <span className="about-skill-icon">{info.icon}</span>
                          <span className="about-skill-name">{skill.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;

