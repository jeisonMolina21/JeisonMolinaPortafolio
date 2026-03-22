import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../utils/api';

interface ExpItem {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string;
}

const Experience = () => {
  const { lang, t } = useLanguage();
  const [items, setItems] = useState<ExpItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('experience', lang)
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lang]);

  return (
    <section id="experience" className="section-padding overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-primary/20 mb-6">
              <Sparkles size={12} className="text-primary-bright animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-bright italic">Professional Journey</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-black leading-none tracking-tighter">
              Professional<br/><span className="wine-gradient italic">Chronicles</span>
            </h2>
            <p className="text-text-dim mt-8 max-w-xl text-lg font-medium leading-relaxed">
              Transformando desafíos técnicos en <span className="text-white font-bold">infraestructura resiliente</span>. 
              Una trayectoria enfocada en la automatización y arquitectura de software.
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
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent hidden md:block" />

            <div className="space-y-24 relative">
              {items.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_rgba(153,27,27,0.8)] z-10 top-2 hidden md:block" />

                  {/* Content Card */}
                  <div className="w-full md:w-[45%] pl-16 md:pl-0">
                    <div className="glass p-8 md:p-12 rounded-[2.5rem] group hover:border-primary/30 transition-all border-white/5 relative overflow-hidden">
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[80px] group-hover:bg-primary/10 transition-all" />
                      
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-bold text-primary-bright uppercase tracking-widest flex items-center gap-2">
                          <Calendar size={12} />
                          {item.period}
                        </div>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-display font-black text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform">{item.role}</h3>
                      <div className="flex items-center gap-2 text-text-muted mb-8 text-sm font-bold uppercase tracking-widest">
                        <Briefcase size={14} className="text-primary/60" />
                        {item.company}
                      </div>
                      
                      <p className="text-text-dim text-lg leading-relaxed mb-10 font-medium group-hover:text-text-main transition-colors line-clamp-4">
                        {item.description}
                      </p>
                      
                      {item.skills && (
                        <div className="flex flex-wrap gap-3">
                          {item.skills.split(',').map(s => (
                            <span key={s} className="px-5 py-2.5 glass bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-text-muted border-white/5 group-hover:text-white transition-all hover:bg-primary/20 hover:border-primary/40 group-hover:border-primary/20">
                              {s.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Spacer for Desktop Timeline */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
