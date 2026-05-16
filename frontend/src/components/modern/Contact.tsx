/** @jsxImportSource react */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Copy, Check, MessageSquare, ArrowUpRight, ArrowRight } from 'lucide-react';

const Contact = ({ profile }: { profile: any }) => {
  const [copied, setCopied] = useState(false);
  const email = profile?.email || "andreyyeisonmg@gmail.com";
  const linkedin = profile?.linkedin_url || "https://linkedin.com/in/jeison-molina";
  const github = profile?.github_url || "https://github.com/jeisonMolina21";
  const phone = "+573505498014";
  const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=Hola%20Jeison,%20vi%20tu%20portafolio...`;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-midnight relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.02] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Editorial Header */}
          <div className="lg:col-span-7 space-y-12">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[12vw] lg:text-[7vw] font-display font-black leading-[0.8] tracking-tighter uppercase text-text-main"
            >
              HABLEMOS <br />
              <span className="text-primary italic">DEL FUTURO</span>
            </motion.h2>

            <p className="text-text-dim text-lg font-light max-w-md leading-relaxed border-l border-primary/30 pl-8">
              Disponible para arquitecturas de alto impacto, <br />
              automatización inteligente y soluciones <br />
              escalables de software.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
               <div className="space-y-4">
                  <span className="text-primary font-mono text-xs font-bold uppercase tracking-[0.3em]">Email Directo</span>
                  <button 
                     onClick={copyEmail}
                     className="text-2xl font-display font-black text-text-main hover:text-primary transition-colors flex items-center gap-3 group"
                  >
                     {email.split('@')[0]}
                     <ArrowUpRight className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
                  </button>
                  {copied && <span className="text-primary font-mono text-[10px] animate-pulse uppercase tracking-widest">Copiado al portapapeles</span>}
               </div>

               <div className="space-y-4">
                  <span className="text-primary font-mono text-xs font-bold uppercase tracking-[0.3em]">Social</span>
                  <div className="flex gap-6">
                     <a href={linkedin} className="text-text-main/40 hover:text-primary transition-colors"><Linkedin size={24} /></a>
                     <a href={github} className="text-text-main/40 hover:text-primary transition-colors"><Github size={24} /></a>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Technical Form */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/5 p-12 space-y-8"
            >
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2 border-b border-white/10 pb-4 focus-within:border-primary transition-colors">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary/40">Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Escribe tu nombre..." 
                    className="w-full bg-transparent focus:outline-none text-text-main text-xl font-bold placeholder:text-text-dim/20"
                  />
                </div>
                
                <div className="space-y-2 border-b border-white/10 pb-4 focus-within:border-primary transition-colors">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary/40">Email</label>
                  <input 
                    type="email" 
                    placeholder="tu@empresa.com" 
                    className="w-full bg-transparent focus:outline-none text-text-main text-xl font-bold placeholder:text-text-dim/20"
                  />
                </div>
                
                <div className="space-y-2 border-b border-white/10 pb-4 focus-within:border-primary transition-colors">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary/40">Proyecto</label>
                  <textarea 
                    rows={2} 
                    placeholder="Describe brevemente el reto..." 
                    className="w-full bg-transparent focus:outline-none text-text-main text-lg font-light placeholder:text-text-dim/20 resize-none"
                  ></textarea>
                </div>

                <button className="w-full py-6 bg-primary text-white font-black text-xs uppercase tracking-[0.4em] hover:bg-text-main hover:text-midnight transition-all duration-500">
                  Enviar Propuesta
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
