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
        <section id="education" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div className="reveal-up">
                   <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border-primary/20 mb-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary-bright italic">Knowledge Base</span>
                   </div>
                   <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] tracking-tighter">
                        Academic<br/><span className="wine-gradient italic">Foundation</span>
                   </h2>
                   <p className="text-text-dim mt-6 max-w-lg text-lg font-light leading-relaxed">
                        Construyendo sistemas sobre una sólida base de <span className="text-white font-bold">ingeniería de software</span> y 
                        análisis algorítmico avanzado.
                   </p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20 pb-40">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {items.map((edu) => (
                        <div key={edu.id} className="glass p-12 rounded-[3.5rem] border-white/5 relative group hover:border-primary/20 transition-all duration-700 overflow-hidden reveal-up">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[120px] -z-10 group-hover:bg-primary/20 transition-all"></div>
                            
                            <div className="flex items-start justify-between mb-10">
                                <div className="w-20 h-20 glass rounded-[1.5rem] flex items-center justify-center text-primary-bright group-hover:bg-primary group-hover:text-white transition-all text-3xl shadow-xl border-white/5">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-bright italic">{edu.period}</span>
                            </div>

                            <h3 className="text-3xl font-display font-black text-white/95 mb-2 group-hover:text-white transition-colors tracking-tight">{edu.degree}</h3>
                            <p className="text-white/30 font-display font-black uppercase tracking-[0.1em] mb-8 text-xs">{edu.institution}</p>
                            <p className="text-text-dim text-lg leading-relaxed font-light hover:text-text-muted transition-colors">{edu.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Education;
