import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface EduItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
}

const Education = () => {
    const { lang } = useLanguage();
    const [items, setItems] = React.useState<EduItem[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';
        fetch(`${API_URL}/education?lang=${lang}`)
            .then(res => res.json())
            .then(data => {
                setItems(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [lang]);

    return (
        <section id="education" className="py-24 px-6 max-w-7xl mx-auto reveal-up">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                   <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">Academic <br/><span className="wine-gradient italic">Foundation</span></h2>
                   <p className="text-text-dim mt-4 max-w-md">Mi trayectoria académica, centrada en la ingeniería de sistemas y el análisis de software avanzado.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20 pb-40">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {items.map((edu) => (
                        <div key={edu.id} className="glass p-12 rounded-[2.5rem] border-white/5 relative group hover:border-primary/20 transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] -z-10 group-hover:bg-primary/20 transition-all"></div>
                            
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-primary-bright group-hover:bg-primary group-hover:text-white transition-all text-2xl shadow-lg">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-bright">{edu.period}</span>
                            </div>

                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">{edu.degree}</h3>
                            <p className="text-text-muted font-bold text-sm mb-6">{edu.institution}</p>
                            <p className="text-text-dim text-sm leading-relaxed font-light">{edu.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Education;
