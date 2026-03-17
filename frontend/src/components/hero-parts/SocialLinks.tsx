import React from 'react';
import { motion } from 'framer-motion';

interface SocialLink {
  icon: React.ReactNode;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex gap-4">
      {links.map((social, idx) => (
        <motion.a 
          key={idx} 
          href={social.url} 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-text-dim hover:text-white hover:border-primary/40 transition-all border-white/5 shadow-xl group"
        >
          <div className="w-5 h-5 flex items-center justify-center text-xl">
            {social.icon}
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
