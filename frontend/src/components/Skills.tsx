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
        { name: 'Programming', icon: <Terminal size={24} />, description: 'Core logic & development' },
        { name: 'Backend', icon: <Cpu size={24} />, description: 'Server-side engineering' },
        { name: 'Frontend', icon: <Sparkles size={24} />, description: 'Interactive experiences' },
        { name: 'Data', icon: <Database size={24} />, description: 'Processing & analysis' },
        { name: 'Tools', icon: <Box size={24} />, description: 'DevOps & environment' },
        { name: 'Other', icon: <Cloud size={24} />, description: 'Business & integration' }
    ];

    const groupedSkills = (Array.isArray(skills) ? skills : []).reduce((acc: any, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    return (
        <section id="skills" className="skills-section">
            <div className="skills-ambient-glow skills-glow-1" />
            <div className="skills-ambient-glow skills-glow-2" />

            <div className="skills-container">
                <div className="skills-header">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="badge-outline">
                            <Zap size={14} className="text-primary-bright" />
                            <span className="badge-text">Engine v7.0 — Optimized</span>
                        </div>
                        <h2 className="skills-title">
                            Nivel <span className="wine-gradient italic">Técnico</span><br/>Especializado
                        </h2>
                        <p className="skills-description">
                            Ecosistema de herramientas optimizado para la <span className="text-white font-black">alta disponibilidad</span>, 
                            la <span className="text-white font-black italic">automatización avanzada</span> y arquitecturas de datos de alto rendimiento.
                        </p>
                    </motion.div>
                </div>

                <div className="skills-grid">
                    {defaultCategories.map((cat, idx) => {
                        const catSkills = groupedSkills[cat.name] || [];
                        if (catSkills.length === 0) return null;

                        return (
                            <motion.div 
                                key={cat.name} 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="skill-category-card group"
                            >
                                <div className="skill-category-glow" />
                                
                                <div className="skill-category-header">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="skill-icon-container">
                                                {cat.icon}
                                            </div>
                                            <h3 className="skill-category-name">{cat.name}</h3>
                                        </div>
                                        <p className="skill-category-desc">{cat.description}</p>
                                    </div>
                                    <span className="skill-category-number">0{idx + 1}</span>
                                </div>

                                <div className="skills-token-grid">
                                    {catSkills.map((skill: any) => {
                                        const info = getSkillIcon(skill.name);
                                        return (
                                            <motion.div 
                                                key={skill.id} 
                                                whileHover={{ y: -8, scale: 1.02 }}
                                                className="skill-token group/token"
                                            >
                                                <div className="skill-token-icon">
                                                    {info.icon}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="skill-token-name">{skill.name}</span>
                                                    <span className="skill-token-label">{info.label.split(' ')[0]}</span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className="skill-card-bg-icon">
                                    <Zap size={240} strokeWidth={0.3} />
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
