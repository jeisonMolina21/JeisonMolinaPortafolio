import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowRight, Sparkles, Zap, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../hooks/useProfile';
import HeroBadge from './hero-parts/HeroBadge';
import HeroAvatar from './hero-parts/HeroAvatar';
import SocialLinks from './hero-parts/SocialLinks';


const Hero = () => {
  const { lang, t } = useLanguage();
  const { profile: profileData, loading, error } = useProfile(lang);

  if (error) {
    return (
      <section className="error-container">
        <div className="error-card">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="error-icon-box"
          >
            <AlertCircle size={40} />
          </motion.div>
          <h2 className="error-title">Sincronización Fallida</h2>
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-secondary">
            Reintentar Conexión
          </button>
        </div>
      </section>
    );
  }

  const socialLinks = profileData ? [
    { icon: <Github size={20} />, url: profileData.github || 'https://github.com' },
    { icon: <Linkedin size={20} />, url: profileData.linkedin || 'https://linkedin.com' }
  ] : [];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  if (loading || !profileData || !profileData.full_name) {
    return (
      <section className="loader-container">
        <div className="flex flex-col items-center gap-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="loader-spinner"
          />
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="loader-text"
          >
            Arquitectura en Proceso...
          </motion.div>
        </div>
      </section>
    );
  }

  const fullName = profileData?.full_name || 'Jeison Molina';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background-cinematic">
        <div className="hero-glow-top"></div>
        <div className="hero-glow-bottom"></div>
      </div>

      <div className="hero-content-grid">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-text-content"
        >
          <motion.div variants={itemVariants}>
            <HeroBadge text={`${t('hero.available') || 'Disponible'} — High Performance Software`} />
          </motion.div>
          
          <motion.div variants={itemVariants} className="hero-title-container">
            <p className="hero-tagline">
              <span className="w-8 h-px bg-primary-bright"></span>
              {profileData?.title}
            </p>
            <h1 className="hero-title">
              {firstName}<br/>
              <span className="wine-gradient italic">{lastName}</span>
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-description">
            {profileData?.bio?.split('\n\n')[0] || profileData?.title}
          </motion.p>

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
            <a href="#projects" className="btn-primary">
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
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="lg:col-span-5 relative hidden lg:flex justify-end"
        >
          <HeroAvatar imageUrl={profileData?.image_url} fullName={profileData?.full_name} />
          
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
    </section>
  );
};

export default Hero;
