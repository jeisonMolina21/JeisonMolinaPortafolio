import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

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
  const [items, setItems] = React.useState<ExpItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';
    fetch(`${API_URL}/experience?lang=${lang}`)
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lang]);

  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="reveal-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border-primary/20 mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary-bright italic">Career Infrastructure</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] tracking-tighter">
            Professional<br/><span className="wine-gradient italic">Chronicles</span>
          </h2>
          <p className="text-text-dim mt-6 max-w-lg text-lg font-light leading-relaxed">
            Una trayectoria enfocada en la <span className="text-white font-bold">excelencia operativa</span> y el 
            desarrollo de sistemas que resuelven problemas de negocio reales.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 pb-40">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-16 relative before:absolute before:left-4 md:before:left-[50%] before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-primary/80 before:via-white/5 before:to-transparent">
          {items.map((item, idx) => (
            <div key={item.id} className={`relative flex flex-col md:flex-row gap-12 items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} reveal-up`}>
              
              {/* Connector Point */}
              <div className="absolute left-4 md:left-[50%] -translate-x-[50%] w-8 h-8 glass rounded-full flex items-center justify-center border-primary z-10 bg-bg-deep ring-8 ring-bg-deep/50 shadow-[0_0_30px_rgba(153,27,27,0.4)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-bright animate-pulse"></div>
              </div>

              <div className="w-full md:w-1/2 pl-16 md:pl-0">
                <div className={`glass p-12 rounded-[3.5rem] border-white/5 hover:border-primary/20 transition-all duration-700 group relative ${idx % 2 === 0 ? 'md:text-left md:pr-16 md:pl-12' : 'md:text-right md:pl-16 md:pr-12'}`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[100px] -z-10 group-hover:bg-primary/20 transition-all"></div>
                  
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-bright mb-4 block italic">{item.period}</span>
                  <h3 className="text-3xl font-display font-black text-white/95 mb-1 group-hover:text-white transition-colors tracking-tight">{item.role}</h3>
                  <p className="text-white/30 font-display font-black uppercase tracking-[0.1em] mb-6 text-xs">{item.company}</p>
                  
                  <p className="text-text-dim text-lg leading-relaxed mb-10 font-light hover:text-text-muted transition-colors">
                    {item.description}
                  </p>
                  
                  {item.skills && (
                    <div className={`flex flex-wrap gap-3 ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                      {(item.skills || '').split(',').map(s => (
                        <span key={s} className="px-4 py-2 glass bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-text-dim group-hover:text-white transition-all border-white/5 hover:bg-primary/20 hover:border-primary/30">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden md:block w-1/2"></div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Experience;
