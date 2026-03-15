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
    fetch(`http://localhost:3000/api/profile?lang=${lang}`)
      .then(res => res.json())
      .then(setProfile);

    fetch('http://localhost:3000/api/skills')
      .then(res => res.json())
      .then(setSkills);
  }, [lang]);

  if (!profile) return null;

  const title = profile.title;
  const bio = profile.bio;
  const firstName = profile.full_name.split(' ')[0];
  const lastName = profile.full_name.split(' ').slice(1).join(' ');

  return (
        <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-20">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                <div className="lg:col-span-7 space-y-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border-primary/20">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{t('hero.available')}</span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-display font-black leading-tight tracking-tighter">
                            {profile?.full_name}
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-display font-bold wine-gradient">
                            {profile?.title}
                        </h2>
                    </div>

                    <p className="text-lg md:text-xl text-text-dim leading-relaxed max-w-2xl font-light">
                        {profile?.bio}
                    </p>

                    <div className="flex flex-wrap gap-6 items-center pt-4">
                        <a href="#contact" className="px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-bright hover:shadow-[0_0_40px_rgba(153,27,27,0.3)] transition-all transform hover:-translate-y-1 active:scale-95">
                            {t('hero.talk')}
                        </a>
                        <div className="flex gap-4">
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
                                <a key={idx} href={social.url} target="_blank" className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-text-dim hover:text-primary-bright hover:bg-white/5 transition-all transform hover:-translate-y-1 border-white/5 shadow-lg">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 hidden lg:block">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative glass p-4 rounded-[3rem] overflow-hidden border-white/5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                            <img 
                                src={profile?.image_url ? (profile.image_url.startsWith('/') ? `http://localhost:3000${profile.image_url}` : profile.image_url) : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"} 
                                alt={profile?.full_name} 
                                className="w-full h-auto rounded-[2.5rem] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
