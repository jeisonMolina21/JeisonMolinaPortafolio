import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getSkillIcon } from '../utils/iconMapper';

interface Profile {
  full_name: string;
  title: string;
  bio: string;
  linkedin: string;
  image_url?: string;
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
    const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';
    fetch(`${API_URL}/profile?lang=${lang}`)
      .then(res => res.json())
      .then(setProfile);

    fetch(`${API_URL}/skills`)
      .then(res => res.json())
      .then(setSkills);
  }, [lang]);

  if (!profile || !profile.full_name) return null;

  const title = profile.title;
  const bio = profile.bio;
  const firstName = profile.full_name.split(' ')[0];
  const lastName = profile.full_name.split(' ').slice(1).join(' ');

  return (
        <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center px-6 overflow-hidden">
            {/* Background Digital Architecture Decor */}
            <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none -z-10">
                <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse-slow"></div>
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                <div className="lg:col-span-7 space-y-10 animate-fade-in">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full border-white/5 shadow-2xl">
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                            {t('hero.available')} — High Performance Computing
                        </span>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                             <p className="text-primary-bright font-black uppercase tracking-[0.3em] text-[11px] mb-2">Architecting Efficiency</p>
                             <h1 className="text-7xl md:text-9xl font-display font-black leading-[0.85] tracking-tighter">
                                {firstName}<span className="wine-gradient block">{lastName}</span>
                            </h1>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-white/90 max-w-xl leading-tight">
                            Solving <span className="wine-gradient italic">Complex Workflows</span> Through Intelligent Automation.
                        </h2>
                    </div>

                    <p className="text-lg md:text-xl text-text-dim leading-[1.8] max-w-2xl font-light">
                        {profile?.bio.split(' ').map((word, i) => {
                            const highlights = ['automatización', 'Python', 'Backend', 'APIs', 'eficiencia', 'escalables', 'Automation'];
                            const isHigh = highlights.some(h => word.toLowerCase().includes(h.toLowerCase()));
                            return (
                                <span key={i} className={isHigh ? 'text-white font-bold underline decoration-primary/50 underline-offset-4' : ''}>
                                    {word}{' '}
                                </span>
                            );
                        })}
                    </p>

                    <div className="flex flex-wrap gap-8 items-center pt-6">
                        <a href="#projects" className="group relative px-12 py-6 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(153,27,27,0.4)]">
                            <span className="relative z-10">{t('hero.talk')}</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </a>
                        
                        <div className="flex gap-5">
                            {[
                                { 
                                  icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>, 
                                  url: 'https://github.com/jeisonmolina' 
                                },
                                { 
                                  icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, 
                                  url: profile?.linkedin || '#' 
                                },
                            ].map((social, idx) => (
                                <a key={idx} href={social.url} target="_blank" className="w-16 h-16 glass rounded-[1.25rem] flex items-center justify-center text-text-dim hover:text-white hover:bg-white/5 transition-all transform hover:-translate-y-1.5 border-white/5 shadow-xl group">
                                    <div className="transition-transform group-hover:scale-110">
                                        {social.icon}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
 
                <div className="lg:col-span-5 hidden lg:flex justify-center relative">
                    <div className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full scale-75 animate-pulse"></div>
                    <div className="relative group">
                        <div className="relative w-[450px] aspect-[4/5] glass rounded-[4rem] overflow-hidden border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]">
                            <img 
                                src={profile?.image_url ? (profile.image_url.startsWith('/') ? `${import.meta.env.PUBLIC_API_URL?.replace('/api','') || 'http://localhost:3000'}${profile.image_url}` : profile.image_url) : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"} 
                                alt={profile?.full_name} 
                                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.5s]"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-midnight via-transparent to-transparent opacity-60"></div>
                            
                            {/* Technical Badge Overlay */}
                            <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-3xl border-white/10 bg-black/40 backdrop-blur-3xl group-hover:translate-y-[-10px] transition-transform duration-700">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-bright mb-1 italic">Core Architecture</p>
                                <p className="text-white font-bold text-sm">Full Cycle Automation Infrastructure</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
