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

    const defaultCategories: Category[] = [
        { 
            name: 'Programming', 
            description: 'Core Languages & logic',
            list: ['Python', 'JavaScript', 'SQL', 'PHP'],
            icon: <Terminal className="text-primary-bright" size={20} />
        },
        { 
            name: 'Backend', 
            description: 'Server-side Architecture',
            list: ['Node.js', 'Express', 'REST APIs', 'Django', 'API Integration'],
            icon: <Cpu className="text-primary-bright" size={20} />
        },
        { 
            name: 'Frontend', 
            description: 'UI/UX & Dynamic Interfaces',
            list: ['React', 'Next.js', 'Tailwind', 'Bootstrap'],
            icon: <Sparkles className="text-primary-bright" size={20} />
        },
        { 
            name: 'Data', 
            description: 'Processing & Automation',
            list: ['Pandas', 'Excel', 'ETL', 'Cleaning'],
            icon: <Database className="text-primary-bright" size={20} />
        },
        { 
            name: 'Tools', 
            description: 'DevOps & Development',
            list: ['Git', 'GitHub', 'Docker', 'Linux', 'VS Code'],
            icon: <Box className="text-primary-bright" size={20} />
        },
        { 
            name: 'Other', 
            description: 'Business & Management',
            list: ['Power BI', 'ServiceNow', 'Jira', 'M365', 'Documentation'],
            icon: <Cloud className="text-primary-bright" size={20} />
        }
    ];

    const categories = customCategories || defaultCategories;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section id="skills" className="section-padding relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-primary/20 mb-6">
                            <Zap size={12} className="text-primary-bright animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-bright italic">Tech Stack v5.0</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-display font-black leading-none tracking-tighter">
                            Mastering the<br/><span className="wine-gradient italic">Digital Forge</span>
                        </h2>
                        <p className="text-text-dim mt-8 max-w-xl text-lg font-medium leading-relaxed">
                            Arquitectura diseñada para la <span className="text-white font-bold">escalabilidad</span> y la 
                            <span className="text-white font-bold"> automatización</span> de procesos complejos.
                        </p>
                    </motion.div>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {categories.map((cat) => (
                        <motion.div 
                            key={cat.name} 
                            variants={itemVariants}
                            className="glass group p-10 md:p-14 rounded-[3.5rem] border-white/5 space-y-10 flex flex-col h-full hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[100px] -z-10 group-hover:bg-primary/10 transition-colors" />
                            
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </div>
                                <div className="space-y-1">
                                     <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">{cat.name}</h3>
                                     <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest leading-none">{cat.description}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-5">
                                {(Array.isArray(skills) ? skills : [])
                                  .filter(s => {
                                      const skillCat = s.category?.toLowerCase();
                                      const catName = cat.name.toLowerCase();
                                      return skillCat === catName || cat.list.some(l => s.name.toLowerCase().includes(l.toLowerCase()));
                                  })
                                  .map((skill, si) => {
                                    const info = getSkillIcon(skill.name);
                                    return (
                                        <motion.div 
                                            key={skill.id} 
                                            whileHover={{ y: -5 }}
                                            className="flex flex-col items-center gap-3 group/item"
                                        >
                                            <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center text-4xl group-hover/item:bg-primary/10 group-hover/item:border-primary/40 transition-all duration-300 border-white/5 shadow-2xl relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                <span className="relative z-10 filter drop-shadow-sm group-hover/item:scale-110 transition-transform">{info.icon}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-text-muted group-hover/item:text-white transition-colors uppercase tracking-[0.1em]">{skill.name}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="absolute bottom-[-10%] right-[-5%] text-primary opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                <Box size={240} strokeWidth={1} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
