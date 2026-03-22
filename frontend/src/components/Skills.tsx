import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Database, Cloud, Cpu, Box, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getSkillIcon } from '../utils/iconMapper';
import { api } from '../utils/api';

interface Skill { id: number; name: string; category?: string; }
interface Category {
    name: string;
    description: string;
    list: string[];
    icon: React.ReactNode;
}

interface SkillsProps {
    categories?: Category[];
}

const Skills = ({ categories: customCategories }: SkillsProps) => {
    const { t } = useLanguage();
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        api.get('skills')
            .then(data => setSkills(Array.isArray(data) ? data : []))
            .catch(() => setSkills([]));
    }, []);

    const defaultCategories = [
        { name: 'Programming', icon: <Terminal className="text-primary-bright" size={24} />, description: 'Core logic & development' },
        { name: 'Backend', icon: <Cpu className="text-primary-bright" size={24} />, description: 'Server-side engineering' },
        { name: 'Frontend', icon: <Sparkles className="text-primary-bright" size={24} />, description: 'Interactive experiences' },
        { name: 'Data', icon: <Database className="text-primary-bright" size={24} />, description: 'Processing & analysis' },
        { name: 'Tools', icon: <Box className="text-primary-bright" size={24} />, description: 'DevOps & environment' },
        { name: 'Other', icon: <Cloud className="text-primary-bright" size={24} />, description: 'Business & integration' }
    ];

    const groupedSkills = (Array.isArray(skills) ? skills : []).reduce((acc: any, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    return (
        <section id="skills" className="section-padding relative overflow-hidden">
            {/* Ambient background effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-40" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-wine-dark/20 blur-[100px] rounded-full pointer-events-none opacity-30" />

            <div className="container-custom relative z-10">
                <div className="max-w-3xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full border-primary/30 mb-8">
                            <Zap size={14} className="text-primary-bright animate-pulse" />
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-bright">Expertise Engine v6.1</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-8">
                            Nivel <span className="wine-gradient italic">Técnico</span><br/>Especializado
                        </h2>
                        <p className="text-text-dim text-xl font-medium leading-relaxed max-w-2xl">
                            Ecosistema de herramientas optimizado para la <span className="text-white font-bold">alta disponibilidad</span>, 
                            la <span className="text-white font-bold">automatización avanzada</span> y arquitecturas de datos de alto rendimiento.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {defaultCategories.map((cat, idx) => {
                        const catSkills = groupedSkills[cat.name] || [];
                        if (catSkills.length === 0) return null;

                        return (
                            <motion.div 
                                key={cat.name} 
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="glass group p-12 rounded-[4rem] border-white/5 flex flex-col h-full hover:border-primary/30 transition-all duration-700 relative overflow-hidden"
                            >
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                
                                <div className="flex items-start justify-between mb-12">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 shadow-xl">
                                                {cat.icon}
                                            </div>
                                            <h3 className="text-3xl font-display font-black text-white tracking-tight">{cat.name}</h3>
                                        </div>
                                        <p className="text-text-muted text-[11px] font-black uppercase tracking-[0.3em] ml-1">{cat.description}</p>
                                    </div>
                                    <span className="text-primary-bright/20 font-display font-black text-6xl leading-none">0{idx + 1}</span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                    {catSkills.map((skill: any, si: number) => {
                                        const info = getSkillIcon(skill.name);
                                        return (
                                            <motion.div 
                                                key={skill.id} 
                                                whileHover={{ y: -5, scale: 1.05 }}
                                                className="flex items-center gap-4 p-4 glass bg-white/[0.02] rounded-3xl border-transparent hover:border-primary/20 hover:bg-white/[0.05] transition-all duration-300"
                                            >
                                                <div className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                                                    {info.icon}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-white leading-none mb-1">{skill.name}</span>
                                                    <span className="text-[8px] font-bold text-text-muted uppercase tracking-[0.2em]">{info.label.split(' ')[0]}</span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Modern graphic background */}
                                <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none text-white">
                                    <Zap size={200} strokeWidth={0.5} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
