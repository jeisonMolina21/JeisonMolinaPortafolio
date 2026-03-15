import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();
    const [status, setStatus] = React.useState<null | 'success' | 'error'>(null);
    const [contactInfo, setContactInfo] = React.useState<any>(null);

    React.useEffect(() => {
        fetch('http://localhost:3000/api/profile')
            .then(res => res.json())
            .then(setContactInfo);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:3000/api/messages', {
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
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto reveal-up">
            <div className="glass p-12 md:p-24 rounded-[3.5rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 animate-pulse"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                    <div className="lg:col-span-5">
                       <h2 className="text-4xl md:text-7xl font-display font-bold leading-[1.1] mb-8">
                           {t('contact.title')} <br/>
                           <span className="wine-gradient italic">{t('contact.highlight')}</span>
                       </h2>
                       <p className="text-text-dim text-lg mb-12 leading-relaxed font-light">
                           {t('contact.subtitle')}
                       </p>
                       
                       <div className="space-y-8">
                           {[
                               { icon: '📧', label: 'Inquiries', value: contactInfo?.email || 'andreyyeisonmg@gmail.com' },
                               { icon: '📍', label: 'Office', value: contactInfo?.location || 'Bogotá, Colombia' },
                               { icon: '💼', label: 'Professional', value: 'LinkedIn Profile', href: contactInfo?.linkedin || 'https://linkedin.com/in/jeisonmolina' }
                           ].map((item) => (
                               <div key={item.label} className="flex items-center gap-6 group cursor-pointer">
                                   <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-xl group-hover:bg-primary group-hover:scale-110 transition-all shadow-xl">
                                       {item.icon}
                                   </div>
                                   <div>
                                       <p className="text-[10px] font-black text-primary-bright uppercase tracking-widest mb-1">{item.label}</p>
                                       {item.href ? (
                                           <a href={item.href} target="_blank" className="text-lg font-bold text-white hover:text-primary transition-colors">{item.value}</a>
                                       ) : (
                                           <p className="text-lg font-bold text-white">{item.value}</p>
                                       )}
                                   </div>
                               </div>
                           ))}
                       </div>
                    </div>

                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="glass p-10 rounded-[2.5rem] border-white/5 space-y-6 relative">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input name="name" placeholder="Full Name" required className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:border-primary transition-all w-full" />
                                <input name="city" placeholder="Your City" className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:border-primary transition-all w-full" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input name="whatsapp" placeholder="WhatsApp" required className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:border-primary transition-all w-full" />
                                <input name="phone" placeholder="Other Phone" className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:border-primary transition-all w-full" />
                            </div>
                            <textarea name="message" placeholder="Describe your technical challenge or vision..." rows={5} required className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:border-primary transition-all w-full resize-none"></textarea>
                            
                            <button type="submit" className="w-full py-6 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary-bright hover:shadow-[0_0_50px_rgba(153,27,27,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 text-xs">
                                {t('contact.send')}
                            </button>
                            
                            {status === 'success' && <div className="mt-6 p-4 glass rounded-xl border-emerald-500/20 text-emerald-400 font-bold text-center text-sm animate-fade-in">✓ {t('contact.success')}</div>}
                            {status === 'error' && <div className="mt-6 p-4 glass rounded-xl border-red-500/20 text-red-400 font-bold text-center text-sm animate-fade-in">⚠ An error occurred. Please try again.</div>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
