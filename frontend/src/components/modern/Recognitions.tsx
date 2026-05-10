/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck, Trophy } from 'lucide-react';
import { getFullImageUrl } from '../../utils/api';

const Recognitions = ({ recognitions }: { recognitions: any[] }) => {
  if (!recognitions || recognitions.length === 0) return null;

  return (
    <section id="recognitions" className="section-padding bg-slate-950 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 neo-glass rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-primary"
          >
            <Trophy size={12} />
            Logros & Certificaciones
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold tracking-tighter"
          >
            Reconocimientos <span className="text-gradient-primary italic">Profesionales</span>
          </motion.h2>
          <p className="text-text-dim text-sm max-w-lg mx-auto">
            Certificaciones y felicitaciones que validan mi compromiso con la excelencia técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recognitions.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 neo-glass rounded-2xl border-white/5 hover:border-primary/20 transition-all flex flex-col gap-5"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/5">
                {rec.image_url ? (
                  <img src={getFullImageUrl(rec.image_url)} alt={rec.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10 italic">
                    <Award size={48} strokeWidth={1} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 p-2 neo-glass rounded-lg text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <ShieldCheck size={16} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-base md:text-lg font-display font-bold text-white group-hover:text-primary transition-colors leading-tight">
                    {rec.name}
                  </h3>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-text-dim text-xs font-bold uppercase tracking-wider">
                    <Award size={14} className="text-primary/50" />
                    {rec.entity}
                  </div>
                  {rec.date && (
                    <div className="flex items-center gap-2 text-text-muted text-[10px] font-bold uppercase tracking-widest">
                      <Calendar size={12} className="text-primary/30" />
                      {rec.date}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recognitions;
