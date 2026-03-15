import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getSkillIcon } from '../utils/iconMapper';

interface Skill { id: number; name: string; }

const Skills = () => {
    const { t } = useLanguage();
    const [skills, setSkills] = React.useState<Skill[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:3000/api/skills')
            .then(res => res.json())
            .then(setSkills);
    }, []);

    const categories = [
        { name: 'Core', list: ['Python', 'JavaScript', 'SQL', 'PHP'] },
        { name: 'Backend & Automation', list: ['Node.js', 'Django', 'Python Automation', 'REST API Integration', 'Pandas', 'Excel Automation'] },
        { name: 'Frontend', list: ['React', 'HTML5', 'CSS3', 'Bootstrap'] },
        { name: 'Tools & DevOps', list: ['Git', 'Docker', 'Linux', 'ServiceNow', 'Jira', 'n8n'] }
    ];

    return (
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto reveal-up">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                   <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">Mastering the <br/><span className="wine-gradient italic">Digital Forge</span></h2>
                   <p className="text-text-dim mt-4 max-w-md">Una recopilación de las herramientas y lenguajes que utilizo para dar vida a soluciones escalables y automatizadas.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((cat) => (
                    <div key={cat.name} className="glass p-8 rounded-[2rem] border-white/5 space-y-8 flex flex-col h-full">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary-bright border-b border-primary/10 pb-4">{cat.name}</h3>
                        <div className="flex flex-wrap gap-4 flex-grow">
                            {skills.filter(s => cat.list.some(l => s.name.toLowerCase().includes(l.toLowerCase()))).map(skill => {
                                const info = getSkillIcon(skill.name);
                                return (
                                    <div key={skill.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                                        <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-primary/10 transition-all border-white/5">
                                            {info.icon}
                                        </div>
                                        <span className="text-[10px] font-bold text-text-dim group-hover:text-white transition-colors uppercase tracking-tight">{skill.name}</span>
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
