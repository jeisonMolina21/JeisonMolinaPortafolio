import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();
    const [status, setStatus] = React.useState<null | 'success' | 'error'>(null);
    const [contactInfo, setContactInfo] = React.useState<any>(null);

    React.useEffect(() => {
        const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';
        fetch(`${API_URL}/profile`)
            .then(res => res.json())
            .then(data => setContactInfo(data && !data.error ? data : null))
            .catch(() => setContactInfo(null));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';
            const response = await fetch(`${API_URL}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) setStatus('success');
            else setStatus('error');
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="glass p-12 md:p-24 rounded-[4rem] border-white/5 relative overflow-hidden bg-black/20 backdrop-blur-3xl">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] -z-10 animate-pulse-slow"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                    <div className="lg:col-span-5 reveal-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border-primary/20 mb-6">
                             <span className="text-[9px] font-black uppercase tracking-widest text-primary-bright italic">Communications Hub</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-10">
                            Let's Build <br/>
                            <span className="wine-gradient italic">The Future</span>
                        </h2>
                        <p className="text-text-dim text-xl mb-16 leading-relaxed font-light max-w-md">
                            Disponible para colaborar en arquitecturas de <span className="text-white font-bold">automatización</span>, 
                            desarrollo <span className="text-white font-bold">backend</span> y optimización de flujos de datos.
                        </p>
                        
                        <div className="space-y-10">
                            {[
                                { 
                                    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, 
                                    label: 'Direct Line', 
                                    value: contactInfo?.email || 'andreyyeisonmg@gmail.com',
                                    href: `mailto:${contactInfo?.email || 'andreyyeisonmg@gmail.com'}`
                                },
                                { 
                                    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, 
                                    label: 'HQ Location', 
                                    value: contactInfo?.location || 'Bogotá, Colombia' 
                                },
                                { 
                                    icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, 
                                    label: 'Professional Network', 
                                    value: 'LinkedIn Protocol', 
                                    href: contactInfo?.linkedin || 'https://linkedin.com/in/jeisonmolina' 
                                }
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-8 group">
                                    <div className="w-16 h-16 glass rounded-[1.25rem] flex items-center justify-center text-primary-bright group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl border-white/5">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{item.label}</p>
                                        {item.href ? (
                                            <a href={item.href} target="_blank" className="text-xl font-display font-bold text-white/90 hover:text-white transition-colors">{item.value}</a>
                                        ) : (
                                            <p className="text-xl font-display font-bold text-white/90">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 reveal-up">
                        <form onSubmit={handleSubmit} className="glass p-12 rounded-[3.5rem] border-white/5 space-y-8 relative bg-black/40 backdrop-blur-2xl shadow-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                     <label className="text-[9px] font-black uppercase tracking-widest text-white/30 pl-4">Identification</label>
                                     <input name="name" placeholder="Name" required className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white outline-none focus:border-primary focus:bg-white/[0.07] transition-all w-full text-sm font-medium" />
                                </div>
                                <div className="space-y-2">
                                     <label className="text-[9px] font-black uppercase tracking-widest text-white/30 pl-4">Territory</label>
                                     <input name="city" placeholder="City" className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white outline-none focus:border-primary focus:bg-white/[0.07] transition-all w-full text-sm font-medium" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                     <label className="text-[9px] font-black uppercase tracking-widest text-white/30 pl-4">Digital Link</label>
                                     <input name="whatsapp" placeholder="WhatsApp / Telegram" required className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white outline-none focus:border-primary focus:bg-white/[0.07] transition-all w-full text-sm font-medium" />
                                </div>
                                <div className="space-y-2">
                                     <label className="text-[9px] font-black uppercase tracking-widest text-white/30 pl-4">Alternative Link</label>
                                     <input name="phone" placeholder="Phone" className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white outline-none focus:border-primary focus:bg-white/[0.07] transition-all w-full text-sm font-medium" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/30 pl-4">Operational Vision</label>
                                <textarea name="message" placeholder="Describe your technical challenge or project vision..." rows={5} required className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white outline-none focus:border-primary focus:bg-white/[0.07] transition-all w-full resize-none text-sm font-medium font-light"></textarea>
                            </div>
                            
                            <button type="submit" className="group relative w-full py-7 bg-primary text-white font-black uppercase tracking-[0.3em] rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(153,27,27,0.4)] active:scale-[0.98]">
                                <span className="relative z-10 text-[11px]">{t('contact.send')}</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>
                            
                            {status === 'success' && <div className="mt-8 p-6 glass rounded-2xl border-emerald-500/20 text-emerald-400 font-bold text-center text-xs animate-fade-in tracking-widest uppercase bg-emerald-500/5">System: Message Transmitted Successfully</div>}
                            {status === 'error' && <div className="mt-8 p-6 glass rounded-2xl border-red-500/20 text-red-500 font-bold text-center text-xs animate-fade-in tracking-widest uppercase bg-red-500/5">System: Transmission Failed — Retry Initiated</div>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
