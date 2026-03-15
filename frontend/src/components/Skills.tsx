import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getSkillIcon } from '../utils/iconMapper';

interface Skill { id: number; name: string; }

const Skills = () => {
    const { t } = useLanguage();
    const [skills, setSkills] = React.useState<Skill[]>([]);

    React.useEffect(() => {
        const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';
        fetch(`${API_URL}/skills`)
            .then(res => res.json())
            .then(setSkills);
    }, []);

    const categories = [
        { 
            name: 'Automation Engineering', 
            description: 'Workflows & Process Optimization',
            list: ['Python Automation', 'n8n', 'Excel Automation', 'ServiceNow', 'Jira'] 
        },
        { 
            name: 'Software Architecture', 
            description: 'Scalable Backend Systems',
            list: ['Node.js', 'REST API Integration', 'JavaScript', 'SQL', 'PHP'] 
        },
        { 
            name: 'Data Intelligence', 
            description: 'Data Processing & Analytics',
            list: ['Pandas', 'Python', 'Power BI', 'MySQL', 'PostgreSQL'] 
        },
        { 
            name: 'DevOps & Tooling', 
            description: 'Infrastructure & Lifecycle',
            list: ['Docker', 'Git', 'Linux', 'VS Code'] 
        }
    ];

    return (
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto reveal-up">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border-primary/20 mb-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary-bright">Tech Stack v4.0</span>
                   </div>
                   <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] tracking-tighter">
                        Mastering the<br/><span className="wine-gradient italic">Digital Forge</span>
                   </h2>
                   <p className="text-text-dim mt-6 max-w-lg text-lg font-light leading-relaxed">
                        Una arquitectura de herramientas diseñada para la <span className="text-white font-bold">escalabilidad</span>, 
                        la <span className="text-white font-bold">automatización</span> de procesos complejos y la 
                        <span className="text-white font-bold"> integridad de datos</span>.
                   </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((cat) => (
                    <div key={cat.name} className="glass group p-10 rounded-[3rem] border-white/5 space-y-8 flex flex-col h-full hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors"></div>
                        
                        <div className="space-y-2">
                             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-bright">{cat.name}</h3>
                             <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">{cat.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-5 flex-grow">
                            {skills.filter(s => cat.list.some(l => s.name.toLowerCase().includes(l.toLowerCase()))).map(skill => {
                                const info = getSkillIcon(skill.name);
                                return (
                                    <div key={skill.id} className="flex flex-col items-center gap-3 group/item cursor-pointer">
                                        <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-3xl group-hover/item:scale-110 group-hover/item:bg-primary/10 group-hover/item:border-primary/30 transition-all duration-500 border-white/5 shadow-lg">
                                            {info.icon}
                                        </div>
                                        <span className="text-[10px] font-bold text-text-dim group-hover/item:text-white transition-colors uppercase tracking-tight">{skill.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
