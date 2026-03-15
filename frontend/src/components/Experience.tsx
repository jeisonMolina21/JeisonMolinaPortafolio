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
    fetch(`http://localhost:3000/api/experience?lang=${lang}`)
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lang]);

  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto reveal-up">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">Professional <br/><span className="wine-gradient italic">Chronicles</span></h2>
          <p className="text-text-dim mt-4 max-w-md">Una crónica detallada de mi trayectoria técnica y evolución en el desarrollo de software arquitectónico.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 pb-40">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-12 relative before:absolute before:left-4 md:before:left-[50%] before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-primary/50 before:via-white/5 before:to-transparent">
          {items.map((item, idx) => (
            <div key={item.id} className={`relative flex flex-col md:flex-row gap-12 items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Connector Point */}
              <div className="absolute left-4 md:left-[50%] -translate-x-[50%] w-6 h-6 glass rounded-full flex items-center justify-center border-primary z-10 bg-bg-deep ring-4 ring-bg-deep">
                  <div className="w-2 h-2 rounded-full bg-primary-bright shadow-[0_0_15px_var(--primary-bright)]"></div>
              </div>

              <div className="w-full md:w-1/2 pl-12 md:pl-0">
                <div className={`glass p-10 rounded-[2rem] border-white/5 hover:border-primary/20 transition-all duration-500 group relative ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-bright mb-4 block">{item.period}</span>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.role}</h3>
                  <p className="text-white/40 font-bold mb-6 italic text-sm">{item.company}</p>
                  <p className="text-text-dim text-sm leading-relaxed mb-8 font-light">{item.description}</p>
                  
                  {item.skills && (
                    <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                      {item.skills.split(',').map(s => (
                        <span key={s} className="px-3 py-1.5 glass bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-wider text-text-muted group-hover:text-white transition-colors border-white/5">
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
