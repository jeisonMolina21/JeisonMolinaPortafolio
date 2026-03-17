import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../utils/api';

interface EduItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
}

const Education = () => {
    const { lang, t } = useLanguage();
    const [items, setItems] = useState<EduItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get('education', lang)
            .then(data => {
                setItems(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [lang]);

    return (
        <section id="education" className="section-padding relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-primary/20 mb-6">
                            <BookOpen size={12} className="text-primary-bright" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-bright italic">Knowledge Base</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-display font-black leading-none tracking-tighter text-white">
                            Academic<br/><span className="wine-gradient italic">Foundation</span>
                        </h2>
                        <p className="text-text-dim mt-8 max-w-xl text-lg font-medium leading-relaxed">
                            Construyendo soluciones sobre una sólida base de <span className="text-white font-bold">ingeniería de software</span> y 
                            desarrollo tecnológico avanzado.
                        </p>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-32">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full"
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {items.map((edu, idx) => (
                            <motion.div 
                                key={edu.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="glass p-10 md:p-14 rounded-[3rem] border-white/5 relative group hover:border-primary/40 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[100px] -z-10 group-hover:bg-primary/20 transition-all" />
                                
                                <div className="flex items-start justify-between mb-10">
                                    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-primary-bright group-hover:bg-primary group-hover:text-white transition-all shadow-xl border-white/10">
                                        <GraduationCap size={32} />
                                    </div>
                                    <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted italic border border-white/5 group-hover:border-primary/20 group-hover:text-primary-bright transition-all">
                                        {edu.period}
                                    </span>
                                </div>
    
                                <h3 className="text-3xl font-display font-black text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform">{edu.degree}</h3>
                                <p className="text-primary/60 font-display font-bold uppercase tracking-[0.1em] mb-8 text-[11px]">{edu.institution}</p>
                                <p className="text-text-dim text-lg leading-relaxed font-medium group-hover:text-text-main transition-colors">{edu.description}</p>
                                
                                <div className="absolute bottom-6 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Award size={80} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Education;
