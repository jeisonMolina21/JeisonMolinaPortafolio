import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getSkillIcon } from '../utils/iconMapper';
import { api } from '../utils/api';

interface Skill { id: number; name: string; category?: string; }
interface Category {
    name: string;
    description: string;
    list: string[];
}

interface SkillsProps {
    categories?: Category[];
}

const Skills = ({ categories: customCategories }: SkillsProps) => {
    const { t } = useLanguage();
    const [skills, setSkills] = React.useState<Skill[]>([]);

    React.useEffect(() => {
        api.get('skills')
            .then(data => setSkills(Array.isArray(data) ? data : []))
            .catch(() => setSkills([]));
    }, []);

    const defaultCategories: Category[] = [
        { 
            name: 'Python Engine & Automation', 
            description: 'Workflows & Process Optimization',
            list: ['Python Automation', 'n8n', 'Excel Automation', 'ServiceNow', 'Jira', 'PowerShell'] 
        },
        { 
            name: 'Enterprise Architecture', 
            description: 'Scalable Backend Systems',
            list: ['Node.js', 'Django', 'Laravel', 'PHP', 'SQL', 'REST API'] 
        },
        { 
            name: 'Data Intelligence', 
            description: 'Data Processing & Analytics',
            list: ['Pandas', 'Python', 'Power BI', 'MySQL', 'PostgreSQL', 'Excel'] 
        },
        { 
            name: 'Infrastructure & Cloud', 
            description: 'Lifecycle & Support',
            list: ['Docker', 'Git', 'Linux', 'AWS', 'O365', 'Microsoft 365', 'Active Directory'] 
        }
    ];

    const categories = customCategories || defaultCategories;

    return (
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto reveal-up">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border-primary/20 mb-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary-bright">Tech Stack v5.0</span>
                   </div>
                   <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] tracking-tighter">
                        Mastering the<br/><span className="wine-gradient italic">Digital Forge</span>
                   </h2>
                   <p className="text-text-dim mt-6 max-w-lg text-lg font-light leading-relaxed">
                        Arquitectura diseñada para la <span className="text-white font-bold">escalabilidad</span> y la 
                        <span className="text-white font-bold"> automatización</span> de procesos complejos.
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
                            {(Array.isArray(skills) ? skills : [])
                              .filter(s => {
                                  const skillCat = s.category?.toLowerCase();
                                  const catName = cat.name.toLowerCase();
                                  return skillCat === catName || cat.list.some(l => s.name.toLowerCase().includes(l.toLowerCase()));
                              })
                              .map(skill => {
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
