/** @jsxImportSource react */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Copy, Check, MessageSquare, ArrowUpRight, ArrowRight } from 'lucide-react';

const Contact = ({ profile }: { profile: any }) => {
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const email = profile?.email || "andreyyeisonmg@gmail.com";
  const linkedin = profile?.linkedin_url || "https://linkedin.com/in/jeison-molina";
  const github = profile?.github_url || "https://github.com/jeisonMolina21";
  const phone = "+573505498014";
  const whatsappMsg = encodeURIComponent("Hola Jeison, vi tu portafolio y me gustaría que trabajemos juntos.");
  const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${whatsappMsg}`;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Left: Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tighter leading-tight"
              >
                ¿Hablamos de <br />
                <span className="text-gradient-primary italic">tu Proyecto?</span>
              </motion.h2>
              <p className="text-text-dim text-sm max-w-md leading-relaxed">
                Disponible para integrarme en equipos de alto rendimiento o liderar proyectos de automatización.
              </p>
            </div>

            <div className="space-y-4">
              {/* Copy Email */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                onClick={copyEmail}
                className="group flex items-center gap-4 p-5 neo-glass rounded-2xl hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-400">
                  {copied ? <Check size={20} /> : <Mail size={20} />}
                </div>
                <div className="relative z-10 min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted">Email Directo</p>
                  <p className="text-white font-bold text-sm md:text-base truncate">{email}</p>
                </div>
                <div className="ml-auto relative z-10 opacity-30 group-hover:opacity-100 transition-opacity">
                  <Copy size={16} className="text-white" />
                </div>
              </motion.div>

              {/* Social Grid */}
              <div className="grid grid-cols-2 gap-4">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="group p-5 neo-glass rounded-2xl hover:border-primary/20 transition-all flex flex-col gap-2.5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start relative z-10">
                    <Linkedin size={24} className="text-primary" />
                    <ArrowUpRight size={14} className="text-text-muted group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-white font-bold text-sm relative z-10">LinkedIn</span>
                </a>
                
                <a href={github} target="_blank" rel="noopener noreferrer" className="group p-5 neo-glass rounded-2xl hover:border-white/10 transition-all flex flex-col gap-2.5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start relative z-10">
                    <Github size={24} className="text-white" />
                    <ArrowUpRight size={14} className="text-text-muted group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-white font-bold text-sm relative z-10">GitHub</span>
                </a>
              </div>

              {/* WhatsApp CTA */}
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full p-4 liquid-button rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-sm shadow-xl shadow-primary/15 group"
              >
                <MessageSquare size={20} />
                WhatsApp Directo
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={18} />
                </motion.div>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 neo-glass rounded-3xl overflow-hidden group"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/8 blur-[80px] rounded-full group-hover:bg-primary/12 transition-colors" />
            
            <form className="relative z-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted ml-4">Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="Ej. Juan Pérez" 
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 bg-white/[0.04] border rounded-2xl focus:outline-none transition-all text-white text-sm font-medium placeholder:text-white/15 ${
                    focusedField === 'name' ? 'border-primary/40 bg-white/[0.06] shadow-[0_0_20px_rgba(14,165,233,0.1)]' : 'border-white/5'
                  }`}
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted ml-4">Email</label>
                <input 
                  type="email" 
                  placeholder="juan@empresa.com" 
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 bg-white/[0.04] border rounded-2xl focus:outline-none transition-all text-white text-sm font-medium placeholder:text-white/15 ${
                    focusedField === 'email' ? 'border-primary/40 bg-white/[0.06] shadow-[0_0_20px_rgba(14,165,233,0.1)]' : 'border-white/5'
                  }`}
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted ml-4">Tu Proyecto</label>
                <textarea 
                  rows={3} 
                  placeholder="Cuéntame sobre el sistema que necesitas..." 
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 bg-white/[0.04] border rounded-2xl focus:outline-none transition-all text-white text-sm font-medium placeholder:text-white/15 resize-none ${
                    focusedField === 'message' ? 'border-primary/40 bg-white/[0.06] shadow-[0_0_20px_rgba(14,165,233,0.1)]' : 'border-white/5'
                  }`}
                ></textarea>
              </div>

              <button className="w-full py-4 bg-white text-slate-950 font-bold text-sm rounded-2xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all">
                Enviar Propuesta
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
