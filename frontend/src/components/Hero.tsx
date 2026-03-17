import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import HeroBadge from './hero-parts/HeroBadge';
import HeroAvatar from './hero-parts/HeroAvatar';
import SocialLinks from './hero-parts/SocialLinks';
import { api } from '../utils/api';

interface Profile {
  full_name: string;
  role: string;
  summary: string;
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
      <section id="hero" className="relative min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary font-display font-black text-4xl italic">Loading Architecture...</div>
      </section>
    );
  }

  const socialLinks = [
    { 
      icon: <span className="text-xl">🐙</span>, 
      url: profile.github || 'https://github.com/jeisonmolina' 
    },
    { 
      icon: <span className="text-xl">💼</span>, 
      url: profile.linkedin || 'https://linkedin.com/in/jeison-molina12' 
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-32 lg:pt-0 overflow-hidden bg-bg-deep">
      {/* Premium Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none" 
        style={{ backgroundImage: "url('/assets/hero_bg.png')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/50 to-bg-deep pointer-events-none"></div>

      {/* Decorative Orbs */}
      <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-wine-muted/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-10 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <HeroBadge text={`${t('hero.available')} — Junior High Performance`} />
          </div>
          
          <div className="space-y-4">
            <p className="text-primary-bright font-black uppercase tracking-[0.4em] text-[11px]">
              {profile.role || 'Junior Software Developer & IT Automation Specialist'}
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.8] tracking-tighter">
              {profile.full_name.split(' ')[0]}<br/>
              <span className="wine-gradient italic">{profile.full_name.split(' ').slice(1).join(' ')}</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-text-dim max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
            Transformando tareas manuales en <span className="text-white font-bold italic">soluciones escalables</span>. 
            Especialista en automatización con Python enfocado en impacto real y eficiencia.
          </p>

          {/* Quantifiable Impacts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0">
            <div className="glass p-5 rounded-[2rem] border-white/5 hover:border-primary/30 transition-all group">
              <span className="block text-3xl font-black text-primary-bright group-hover:scale-110 transition-transform">12 Días</span>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-1">Ahorrados al mes</p>
            </div>
            <div className="glass p-5 rounded-[2rem] border-white/5 hover:border-primary/30 transition-all group">
              <span className="block text-3xl font-black text-primary-bright group-hover:scale-110 transition-transform">60%</span>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-1">Mejora en Reportes</p>
            </div>
            <div className="glass p-5 rounded-[2rem] border-white/5 hover:border-primary/30 transition-all group">
              <span className="block text-3xl font-black text-primary-bright group-hover:scale-110 transition-transform">&lt;1 Hora</span>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-1">Gestión de Cuentas</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start pt-4">
            <a 
              href="#projects" 
              className="px-10 py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary-bright hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] transition-all"
            >
              {t('hero.talk') || 'Ver Proyectos'}
            </a>
            <SocialLinks links={socialLinks} />
          </div>
        </div>

        <div className="relative hidden lg:flex justify-center">
          <div className="relative z-10 w-[450px]">
             <HeroAvatar imageUrl={profile.profile_picture} fullName={profile.full_name} />
          </div>
          {/* Floating Skills in Hero */}
          <div className="absolute top-0 right-0 flex flex-col gap-3">
             {skills.slice(0, 5).map(skill => (
               <div key={skill.id} className="glass px-4 py-2 rounded-full text-[10px] font-bold text-white/50 animate-pulse-slow">
                 {skill.name}
               </div>
             ))}
          </div>
        </div>

      </div>

      {/* Floating Bottom Skills Bar */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden pointer-events-none opacity-40">
        <div className="flex gap-8 animate-shine whitespace-nowrap px-6">
          {skills.concat(skills).map((skill, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">
              {skill.name} •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
