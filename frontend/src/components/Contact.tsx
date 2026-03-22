import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Send, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../utils/api';

const Contact = () => {
    const { t } = useLanguage();
    const [status, setStatus] = useState<null | 'success' | 'error'>(null);
    const [contactInfo, setContactInfo] = useState<any>(null);

    useEffect(() => {
        api.get('profile')
            .then(data => setContactInfo(data && !data.error ? data : null))
            .catch(() => setContactInfo(null));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const response = await api.post('messages', data);
            if (response && !response.error) setStatus('success');
            else setStatus('error');
        } catch (error) {
            setStatus('error');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Background Decorative Elem */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="container-custom relative z-10">
                <div className="glass p-10 md:p-20 rounded-[4rem] border-white/5 relative overflow-hidden bg-black/20 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.3)]">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="lg:col-span-5 space-y-12"
                        >
                            <motion.div variants={itemVariants}>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-primary/20 mb-6">
                                     <MessageSquare size={12} className="text-primary-bright" />
                                     <span className="text-[10px] font-bold uppercase tracking-widest text-primary-bright italic">Communications Hub</span>
                                </div>
                                <h2 className="text-6xl md:text-8xl font-display font-black leading-[0.85] tracking-tighter mb-8">
                                    Let's Build <br/>
                                    <span className="wine-gradient italic">The Future</span>
                                </h2>
                                <p className="text-text-dim text-xl leading-relaxed font-medium max-w-md">
                                    Disponible para colaborar en arquitecturas de <span className="text-white font-bold">automatización</span>, 
                                    desarrollo <span className="text-white font-bold">backend</span> y optimización de datos.
                                </p>
                            </motion.div>
                            
                            <div className="space-y-8">
                                {[
                                    { 
                                        icon: <Mail className="text-primary-bright group-hover:text-white transition-colors" />, 
                                        label: 'Direct Line', 
                                        value: contactInfo?.email || 'andreyyeisonmg@gmail.com',
                                        href: `mailto:${contactInfo?.email || 'andreyyeisonmg@gmail.com'}`
                                    },
                                    { 
                                        icon: <MapPin className="text-primary-bright group-hover:text-white transition-colors" />, 
                                        label: 'HQ Location', 
                                        value: contactInfo?.location || 'Bogotá, Colombia' 
                                    },
                                    { 
                                        icon: <Linkedin className="text-primary-bright group-hover:text-white transition-colors" />, 
                                        label: 'Professional Network', 
                                        value: 'LinkedIn Protocol', 
                                        href: contactInfo?.linkedin || 'https://linkedin.com/in/jeisonmolina' 
                                    }
                                ].map((item, i) => (
                                    <motion.div 
                                        key={item.label} 
                                        variants={itemVariants}
                                        className="flex items-center gap-6 group"
                                    >
                                        <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-xl border-white/5">
                                            {item.icon}
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-black text-primary-bright/40 uppercase tracking-[0.3em]">{item.label}</p>
                                            {item.href ? (
                                                <a href={item.href} target="_blank" className="text-lg font-display font-black text-white hover:text-primary-bright transition-colors tracking-tight">{item.value}</a>
                                            ) : (
                                                <p className="text-lg font-display font-black text-white tracking-tight">{item.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7"
                        >
                            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[3.5rem] border-white/5 space-y-8 relative bg-black/40 backdrop-blur-3xl shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                         <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-2">Identification</label>
                                         <input name="name" placeholder="Full Name" required className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white outline-none focus:border-primary focus:bg-white/[0.08] transition-all w-full text-sm font-bold placeholder:text-text-muted/30" />
                                    </div>
                                    <div className="space-y-3">
                                         <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-2">Territory</label>
                                         <input name="city" placeholder="Your City" className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white outline-none focus:border-primary focus:bg-white/[0.08] transition-all w-full text-sm font-bold placeholder:text-text-muted/30" />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                         <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-2">Digital Link</label>
                                         <input name="whatsapp" placeholder="WhatsApp / Telegram" required className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white outline-none focus:border-primary focus:bg-white/[0.08] transition-all w-full text-sm font-bold placeholder:text-text-muted/30" />
                                    </div>
                                    <div className="space-y-3">
                                         <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-2">Alternative Link</label>
                                         <input name="phone" placeholder="Phone Number" className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white outline-none focus:border-primary focus:bg-white/[0.08] transition-all w-full text-sm font-bold placeholder:text-text-muted/30" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-2">Operational Vision</label>
                                    <textarea name="message" placeholder="Describe your technical challenge or mission vision..." rows={5} required className="bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-white outline-none focus:border-primary focus:bg-white/[0.08] transition-all w-full resize-none text-sm font-bold placeholder:text-text-muted/30"></textarea>
                                </div>
                                
                                <button type="submit" className="group relative w-full py-8 bg-primary hover:bg-primary-bright text-white font-black uppercase tracking-[0.4em] rounded-3xl overflow-hidden transition-all hover:shadow-[0_0_80px_rgba(220,38,38,0.4)] active:scale-[0.98]">
                                    <span className="relative z-10 text-[11px] flex items-center justify-center gap-3">
                                        {t('contact.send')}
                                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </button>
                                
                                {status === 'success' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-6 glass rounded-2xl border-emerald-500/30 text-emerald-400 font-bold text-center text-[10px] tracking-widest uppercase bg-emerald-500/5"
                                    >
                                        System: Message Transmitted Successfully
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-6 glass rounded-2xl border-red-500/30 text-red-500 font-bold text-center text-[10px] tracking-widest uppercase bg-red-500/5"
                                    >
                                        System: Transmission Failed — Retry Initiated
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
