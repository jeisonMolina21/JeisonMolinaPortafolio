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
    <div className="flex items-center justify-center p-20 text-white/50 font-mono">
      <div className="animate-pulse">Loading profile data...</div>
    </div>
  );

  const error = data?.error;
  if (error || !profileData) return (
    <div className="flex flex-col items-center justify-center p-20 text-red-400 bg-red-500/5 rounded-2xl border border-red-500/20 mx-4">
      <Database size={32} className="mb-4 opacity-50" />
      <p className="font-mono text-sm text-center">
        {error || 'Profile data unavailable.'}
        <br/>
        <span className="text-[10px] opacity-50 uppercase tracking-widest mt-2 block">Check backend connectivity</span>
      </p>
    </div>
  );
  const categories = [
    { name: 'Programming', icon: <Terminal size={20} />, color: 'from-blue-500/20 to-cyan-500/10' },
    { name: 'Backend', icon: <Cpu size={20} />, color: 'from-emerald-500/20 to-teal-500/10' },
    { name: 'Frontend', icon: <Sparkles size={20} />, color: 'from-purple-500/20 to-pink-500/10' },
    { name: 'Data', icon: <Database size={20} />, color: 'from-amber-500/20 to-orange-500/10' },
    { name: 'Tools', icon: <Box size={20} />, color: 'from-slate-500/20 to-slate-400/10' },
    { name: 'Other', icon: <Cloud size={20} />, color: 'from-red-500/20 to-rose-500/10' }
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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge-outline">
              <User size={12} className="badge-text" />
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="about-focus-card"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Zap className="text-primary-bright" size={24} />
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-1">Enfoque Principal</h4>
              <p className="text-text-muted text-sm font-medium">Automatización, Escalabilidad y Procesamiento de Datos.</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Specialized Skills */}
        <div className="about-skills-column">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white font-black uppercase tracking-[0.4em] text-[11px] mb-8 flex items-center gap-3"
          >
            <span className="w-10 h-px bg-primary/30"></span>
            Stack Tecnológico 2026
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {categories.map((cat, idx) => {
              const catSkills = groupedSkills[cat.name] || [];
              if (catSkills.length === 0) return null;

              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`about-skill-category-card bg-gradient-to-br ${cat.color}`}
                >
                  <div className="about-category-header">
                    <div className="about-category-icon-box">{cat.icon}</div>
                    <h4 className="about-category-title">{cat.name}</h4>
                  </div>
                  
                  <div className="about-skills-flex">
                    {catSkills.map((skill: any) => {
                      const info = getSkillIcon(skill.name);
                      return (
                        <div key={skill.id} className="about-skill-token group">
                          <span className="about-skill-icon">{info.icon}</span>
                          <span className="about-skill-name">{skill.name}</span>
                        </div>
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
