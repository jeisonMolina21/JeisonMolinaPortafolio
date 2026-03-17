import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface HeroBadgeProps {
  text: string;
}

const HeroBadge: React.FC<HeroBadgeProps> = ({ text }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full border-white/5 shadow-2xl"
    >
      <span className="flex h-2.5 w-2.5 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-main/80">
        {text}
      </span>
    </motion.div>
  );
};

export default HeroBadge;
