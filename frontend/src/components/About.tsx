import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Zap, Terminal, Cpu, Sparkles, Database, Box, Cloud } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getSkillIcon } from '../utils/iconMapper';
import { api } from '../utils/api';

interface Skill { id: number; name: string; category?: string; }

const About = () => {
    const { lang, t } = useLanguage();
    const [profile, setProfile] = useState<any>(null);
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        api.get('profile', lang)
            .then(data => setProfile(data && !data.error ? data : null))
            .catch(() => setProfile(null));

        api.get('skills')
            .then(data => setSkills(Array.isArray(data) ? data : []))
            .catch(() => setSkills([]));
    }, [lang]);

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

    if (!profile) return null;

    return (
        <section id="about" className="section-padding relative overflow-hidden bg-bg-deep/50">
            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    
                    {/* Left: Bio & Personal Info */}
                    <div className="lg:col-span-5 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-primary/20 mb-6">
                                <User size={12} className="text-primary-bright" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-bright italic">Sobre Mí</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-display font-black leading-none tracking-tighter mb-8">
                                Arquitecto de <br/><span className="wine-gradient italic">Soluciones</span>
                            </h2>
                            <div className="space-y-6 text-text-dim text-lg leading-relaxed font-medium">
                                {profile.bio ? (
                                    profile.bio.split('\n\n').map((para: string, i: number) => (
                                        <p key={i}>{para}</p>
                                    ))
                                ) : (
                                    <p>Cargando biografía profesional...</p>
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="p-8 glass rounded-[3rem] border-white/5 bg-gradient-to-br from-white/5 to-transparent flex items-center gap-6"
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
                    <div className="lg:col-span-7 space-y-10">
                        <motion.h3 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-white font-black uppercase tracking-[0.4em] text-[11px] mb-8 flex items-center gap-3"
                        >
                            <span className="w-10 h-px bg-primary/30"></span>
                            Stack Tecnológico 2026
                        </motion.h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        className={`glass p-8 rounded-[2.5rem] bg-gradient-to-br ${cat.color} border-white/5 hover:border-primary/30 transition-all duration-500`}
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-2 bg-white/5 rounded-xl text-white">
                                                {cat.icon}
                                            </div>
                                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/90">{cat.name}</h4>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-3">
                                            {catSkills.map((skill: any) => {
                                                const info = getSkillIcon(skill.name);
                                                return (
                                                    <div 
                                                        key={skill.id}
                                                        className="flex items-center gap-2 px-3 py-1.5 glass bg-white/5 rounded-full border-white/5 hover:bg-white/10 transition-colors group/token"
                                                    >
                                                        <span className="text-lg group-hover/token:scale-110 transition-transform">{info.icon}</span>
                                                        <span className="text-[9px] font-bold text-text-muted transition-colors group-hover/token:text-white uppercase tracking-wider">{skill.name}</span>
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
            </div>
        </section>
    );
};

export default About;
