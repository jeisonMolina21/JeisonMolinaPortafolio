/** @jsxImportSource react */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Simulate sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const contactLinks = [
    { icon: <Mail size={20} />, label: 'Email', value: 'andreyyeisonmg@gmail.com', href: 'mailto:andreyyeisonmg@gmail.com' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', value: 'Jeison Molina', href: 'https://linkedin.com/in/jeisonmolina' },
    { icon: <Github size={20} />, label: 'GitHub', value: 'jeisonMolina21', href: 'https://github.com/jeisonMolina21' }
  ];

  return (
    <section id="contact" className="section-padding bg-bg-deep dark:bg-black/20 transition-colors duration-500">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Info Column */}
            <div className="space-y-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg mb-6">
                  <MessageSquare size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Contacto Directo</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-text-main leading-tight tracking-tighter">
                  ¿Tienes un proyecto en <span className="text-primary italic">mente?</span>
                </h2>
                <p className="mt-6 text-lg text-text-dim max-w-md leading-relaxed">
                  Estoy disponible para discutir nuevas arquitecturas de software, estrategias de automatización o asociaciones técnicas.
                </p>
              </div>

              <div className="space-y-6">
                {contactLinks.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 bg-white dark:bg-white/5 rounded-3xl border border-primary/5 hover:border-primary/30 transition-all group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{link.label}</p>
                      <p className="text-text-main font-bold">{link.value}</p>
                    </div>
                    <ExternalLink size={14} className="ml-auto text-text-muted group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>

              <div className="pt-6">
                <a href="https://calendly.com/jeison-molina" target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                  Solicitar cotización
                  <Sparkles size={18} />
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="glass p-8 md:p-12 rounded-[3rem] border border-primary/10 shadow-2xl relative">
              <h3 class="text-2xl font-black text-text-main mb-8">Enviar mensaje</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Nombre</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className="w-full px-6 py-4 bg-bg-deep dark:bg-black/20 border border-primary/10 rounded-2xl focus:outline-none focus:border-primary text-text-main transition-all"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange}
                    placeholder="hola@empresa.com"
                    className="w-full px-6 py-4 bg-bg-deep dark:bg-black/20 border border-primary/10 rounded-2xl focus:outline-none focus:border-primary text-text-main transition-all"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Mensaje</label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    value={form.message} 
                    onChange={handleChange}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className="w-full px-6 py-4 bg-bg-deep dark:bg-black/20 border border-primary/10 rounded-2xl focus:outline-none focus:border-primary text-text-main transition-all resize-none"
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-primary hover:bg-primary-bright text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/20"
                >
                  {status === 'sending' ? 'Enviando...' : status === 'success' ? '¡Mensaje enviado!' : 'Enviar mensaje'}
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {status === 'success' && (
                  <p className="text-center text-xs font-bold text-primary animate-pulse">
                    Gracias, te responderé en menos de 24 horas.
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
