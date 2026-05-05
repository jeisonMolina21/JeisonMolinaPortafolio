/** @jsxImportSource react */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Sparkles, MessageSquare, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending');
    try {
      // Real backend integration would go here
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactLinks = [
    { icon: <Mail size={20} />, label: 'Email', value: 'andreyyeisonmg@gmail.com', href: 'mailto:andreyyeisonmg@gmail.com' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', value: 'Jeison Molina', href: 'https://www.linkedin.com/in/jeison-molina12/' },
    { icon: <Github size={20} />, label: 'GitHub', value: 'jeisonMolina21', href: 'https://github.com/jeisonMolina21' }
  ];

  return (
    <section id="contact" className="section-padding bg-midnight relative overflow-hidden">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Info Column */}
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                  <MessageSquare size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Contacto Directo</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-text-main leading-tight">
                  Construyamos algo <span className="text-primary italic">extraordinario</span>
                </h2>
                <p className="text-lg text-text-dim max-w-md leading-relaxed">
                  ¿Tienes un desafío técnico o una idea innovadora? Estoy listo para aportar mi experiencia en arquitectura y desarrollo.
                </p>
              </div>

              <div className="space-y-4">
                {contactLinks.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 bg-bg-surface border border-white/5 rounded-2xl hover:border-primary/30 transition-all group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-0.5">{link.label}</p>
                      <p className="text-text-main font-semibold">{link.value}</p>
                    </div>
                    <ExternalLink size={14} className="ml-auto text-text-muted group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>

              <div className="pt-4">
                <a href="https://calendly.com/jeison-molina" target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
                  Agendar una reunión
                  <Sparkles size={18} />
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-[4rem] group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="relative glass p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl">
                <h3 className="text-2xl font-display font-bold text-text-main mb-8">Enviar un mensaje</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Nombre</label>
                    <input 
                      {...register('name')}
                      placeholder="Tu nombre completo"
                      className={`w-full px-6 py-4 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/5'} rounded-2xl focus:outline-none focus:border-primary text-text-main transition-all`}
                    />
                    {errors.name && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Email</label>
                    <input 
                      {...register('email')}
                      placeholder="hola@empresa.com"
                      className={`w-full px-6 py-4 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/5'} rounded-2xl focus:outline-none focus:border-primary text-text-main transition-all`}
                    />
                    {errors.email && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Mensaje</label>
                    <textarea 
                      {...register('message')}
                      rows={4} 
                      placeholder="Cuéntame sobre tu proyecto o consulta..."
                      className={`w-full px-6 py-4 bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/5'} rounded-2xl focus:outline-none focus:border-primary text-text-main transition-all resize-none`}
                    />
                    {errors.message && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase">{errors.message.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full py-5 bg-primary hover:bg-primary-bright text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Sparkles size={18} />
                        </motion.div>
                        Enviando...
                      </span>
                    ) : (
                      <>
                        Enviar Mensaje
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl"
                      >
                        <CheckCircle2 size={18} className="text-green-500" />
                        <p className="text-xs font-bold text-green-500 uppercase">Mensaje enviado con éxito</p>
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl"
                      >
                        <AlertCircle size={18} className="text-red-500" />
                        <p className="text-xs font-bold text-red-500 uppercase">Error al enviar el mensaje</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
