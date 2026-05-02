import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowRight, Sparkles, Zap, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import HeroBadge from './hero-parts/HeroBadge';
import HeroAvatar from './hero-parts/HeroAvatar';
import SocialLinks from './hero-parts/SocialLinks';


import { usePortfolioData } from '../context/PortfolioContext';


const Hero = () => {
  const { t } = useLanguage();
  const { data, loading, error } = usePortfolioData();
  const profileData = data?.profile;

  if (error) {
    return (
      <section className="error-container">
        <div className="error-card">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="error-icon-box"
          >
            <AlertCircle size={40} />
          </motion.div>
          <h2 className="error-title">Sincronización Fallida</h2>
          <p className="error-message">{error}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()} 
            className="btn-secondary"
          >
            Reintentar Conexión
          </motion.button>
        </div>
      </section>
    );
  }

  const socialLinks = profileData ? [
    { icon: <Github size={20} />, url: profileData.github || 'https://github.com' },
    { icon: <Linkedin size={20} />, url: profileData.linkedin || 'https://linkedin.com' }
  ] : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.4,
        ease: "easeOut"
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  if (loading || !profileData || !profileData.full_name) {
    return (
      <section className="loader-container">
        <div className="flex flex-col items-center gap-12">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              borderColor: ["#991b1b", "#dc2626", "#991b1b"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="loader-spinner"
          />
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
              <span className="w-12 h-px bg-primary-bright"></span>
              {profileData?.title}
            </p>
            <h1 className="hero-title">
              {firstName}<br/>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="wine-gradient italic"
              >
                {lastName}
              </motion.span>
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-description max-w-2xl">
            {profileData?.bio || profileData?.title}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-10 items-center pt-8">
            <motion.a 
              href="#projects" 
              className="btn-primary group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.talk') || 'Ver Proyectos'}
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </motion.a>
            <SocialLinks links={socialLinks} />
          </motion.div>
        </motion.div>

        {/* Avatar Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="lg:col-span-5 relative hidden lg:flex justify-end"
        >
          <HeroAvatar 
            imageUrl={profileData?.image_url} 
            fullName={profileData?.full_name} 
            cvUrl={profileData?.cv_url}
            skills={data?.skills}
          />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 text-white/30"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr]">Explorar</span>
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-16 bg-gradient-to-b from-primary to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


export default Hero;
