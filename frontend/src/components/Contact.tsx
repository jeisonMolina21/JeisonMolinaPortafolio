import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Linkedin, Github, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../hooks/useProfile';
import '../styles/components/Contact.css';

const Contact = () => {
  const { lang, t } = useLanguage();
  const { profile } = useProfile(lang);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending
    setTimeout(() => setStatus('success'), 2000);
  };

  const contactMethods = [
    { 
      icon: <Mail size={20} />, 
      title: 'Email', 
      value: profile?.email || 'jeison.molina@live.com', 
      href: `mailto:${profile?.email || 'jeison.molina@live.com'}` 
    },
    { 
      icon: <Linkedin size={20} />, 
      title: 'LinkedIn', 
      value: 'Jeison Molina', 
      href: profile?.linkedin || 'https://linkedin.com/in/jeison-molina12' 
    },
    { 
      icon: <MapPin size={20} />, 
      title: 'Ubicación', 
      value: profile?.location || 'Bogotá, Colombia', 
      href: '#' 
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container-custom relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="contact-info-column"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-primary/20 mb-6">
            <Sparkles size={12} className="text-primary-bright" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-bright italic">Contacto</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter">
            Hablemos del <span className="wine-gradient italic">Próximo Nivel</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-center">
          
          <div className="lg:col-span-4 space-y-4">
            {contactMethods.map((method, i) => (
              <motion.a
                key={i}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="contact-method-card"
              >
                <div className="contact-method-icon-box">{method.icon}</div>
                <div>
                  <h4 className="contact-method-title">{method.title}</h4>
                  <p className="contact-method-value">{method.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 w-full"
          >
            <div className="contact-form-card">
              <div className="contact-form-glow"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="contact-input-group">
                  <label className="contact-label">Tu Nombre</label>
                  <input type="text" className="contact-input" placeholder="Jeison Molina" required />
                </div>
                
                <div className="contact-input-group">
                  <label className="contact-label">Email Corporativo</label>
                  <input type="email" className="contact-input" placeholder="hola@empresa.com" required />
                </div>

                <div className="contact-input-group md:col-span-2">
                  <label className="contact-label">Tu Propuesta</label>
                  <textarea className="contact-input contact-textarea" placeholder="Descríbeme tu proyecto o desafío..." required />
                </div>

                <div className="md:col-span-2">
                  <button type="submit" disabled={status === 'sending'} className="contact-submit-btn">
                    {status === 'sending' ? 'Sincronizando...' : status === 'success' ? '¡Recibido!' : 'Ejectuar Transmisión'}
                    <Send size={18} className="contact-submit-icon" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
