import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowRight, Sparkles, Zap, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import HeroBadge from './hero-parts/HeroBadge';
import HeroAvatar from './hero-parts/HeroAvatar';
import SocialLinks from './hero-parts/SocialLinks';
import { api } from '../utils/api';

interface Profile {
  full_name: string;
  title: string;
  bio: string;
  location: string;
  profile_picture?: string;
  github?: string;
  linkedin?: string;
}

interface Skill {
  id: number;
  name: string;
}

const Hero = () => {
  const { lang, t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    api.get('profile', lang)
      .then(data => setProfile(data && !data.error ? data : null))
      .catch(() => setProfile(null));

    api.get('skills')
      .then(data => setSkills(Array.isArray(data) ? data : []))
      .catch(() => setSkills([]));
  }, [lang]);

  if (!profile || !profile.full_name) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-bg-deep">
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary font-display font-black text-4xl italic tracking-tighter"
        >
          LOADING...
        </motion.div>
      </section>
    );
  }

  const socialLinks = [
    { 
      icon: <Github size={20} />, 
      url: profile.github || 'https://github.com/jeisonmolina' 
    },
    { 
      icon: <Linkedin size={20} />, 
      url: profile.linkedin || 'https://linkedin.com/in/jeison-molina12' 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  const metrics = [
    { 
      value: "12 Días", 
      label: "Ahorrados al mes", 
      icon: <Clock className="text-primary-bright" size={16} />,
      desc: "Optimización de procesos operativos"
    },
    { 
      value: "60%", 
      label: "Mejora en Reportes", 
      icon: <Sparkles className="text-primary-bright" size={16} />,
      desc: "Automatización de data analytics"
    },
    { 
      value: "<1 Hora", 
      label: "Gestión de Cuentas", 
      icon: <Zap className="text-primary-bright" size={16} />,
      desc: "Respuesta inmediata automatizada"
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg-deep pt-20">
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(153,27,27,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] animate-pulse-soft"></div>
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-wine-muted/5 rounded-full blur-[120px] animate-pulse-soft"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-10"
          >
            <motion.div variants={itemVariants}>
              <HeroBadge text={`${t('hero.available')} — High Performance Software`} />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-primary-bright font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-2">
                <span className="w-8 h-px bg-primary-bright"></span>
                {profile.title || 'Senior Software Developer & IT Automation Specialist'}
              </p>
              <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-display font-black leading-[0.8] tracking-tighter">
                {profile.full_name.split(' ')[0]}<br/>
                <span className="wine-gradient italic">{profile.full_name.split(' ').slice(1).join(' ')}</span>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white max-w-xl font-bold leading-tight tracking-tight">
              {profile.title || 'Senior Software Developer & IT Automation Specialist'}
            </motion.p>

            {/* Premium Metrics Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {metrics.map((metric, i) => (
                <div key={i} className="glass p-6 rounded-[2rem] group hover:border-primary/40 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                      {metric.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">{metric.label}</span>
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{metric.value}</div>
                  <p className="text-[10px] text-text-muted leading-tight">{metric.desc}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 items-center pt-4">
              <a 
                href="#projects" 
                className="group px-10 py-5 bg-primary text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-primary-bright hover:shadow-[0_0_50px_rgba(220,38,38,0.4)] transition-all flex items-center gap-3"
              >
                {t('hero.talk') || 'Ver Proyectos'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <SocialLinks links={socialLinks} />
            </motion.div>
          </motion.div>

          {/* Avatar Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="lg:col-span-5 relative hidden lg:flex justify-end"
          >
            <HeroAvatar imageUrl={profile.profile_picture} fullName={profile.full_name} />
            
            {/* Scroll Indicator */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-text-muted">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] [writing-mode:vertical-lr]">Scroll</span>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
