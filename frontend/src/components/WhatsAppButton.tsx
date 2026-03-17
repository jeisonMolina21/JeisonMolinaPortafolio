import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Zap } from 'lucide-react';
import { api } from '../utils/api';

const WhatsAppButton = () => {
    const [whatsapp, setWhatsapp] = useState<string | null>(null);

    useEffect(() => {
        api.get('profile')
            .then(data => setWhatsapp(data && !data.error ? data.whatsapp : null))
            .catch(() => setWhatsapp(null));
    }, []);

    if (!whatsapp) return null;

    const message = encodeURIComponent("Hola Jeison, vi tu portafolio y me gustaría synergizar en un proyecto.");
    const url = `https://wa.me/${whatsapp.replace(/\+/g, '')}?text=${message}`;

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-10 right-10 z-[100]"
        >
            <a 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
            >
                {/* Dynamic Glow */}
                <div className="absolute inset-[-10px] bg-emerald-500/20 rounded-[2rem] blur-2xl group-hover:bg-emerald-500/40 transition-all duration-700 animate-pulse" />
                
                <div className="relative glass w-16 h-16 rounded-2xl flex items-center justify-center border-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-500 shadow-2xl overflow-hidden bg-emerald-950/20 backdrop-blur-3xl">
                    <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <MessageCircle 
                        size={32} 
                        className="relative z-10 text-emerald-400 group-hover:text-white group-hover:scale-110 transition-all duration-500" 
                    />
                </div>

                {/* Tooltip Link */}
                <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 px-5 py-3 glass rounded-2xl border-emerald-500/20 opacity-0 group-hover:opacity-100 transition-all translate-x-6 group-hover:translate-x-0 whitespace-nowrap shadow-2xl pointer-events-none">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 leading-none mb-1">Secure Channel</span>
                            <span className="text-[11px] font-bold text-white leading-none tracking-tight">synergize via WhatsApp</span>
                        </div>
                        <Zap size={10} className="text-emerald-400 animate-pulse" />
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

export default WhatsAppButton;
