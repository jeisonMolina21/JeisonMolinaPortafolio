import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, isAdmin, onLogout }) => {
  const { t } = useLanguage();

  const menuItems = [
    { key: 'nav.about', href: '#hero' },
    { key: 'nav.projects', href: '#projects' },
    { key: 'nav.experience', href: '#experience' },
    { key: 'nav.education', href: '#education' },
    { key: 'nav.contact', href: '#contact' }
  ];

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm glass border-l border-white/10 p-8 flex flex-col"
      >
        <div className="flex justify-between items-center mb-12">
          <p className="text-xl font-display font-black tracking-tighter text-white">
            JEI<span className="wine-gradient italic">SON</span>
          </p>
          <button 
            onClick={onClose}
            className="w-10 h-10 glass rounded-full flex items-center justify-center text-white border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          {menuItems.map((item, index) => (
            <motion.a 
              key={item.key} 
              href={item.href} 
              onClick={onClose}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="text-3xl font-display font-black uppercase tracking-tight text-text-dim hover:text-white transition-colors flex items-center justify-between group"
            >
              {t(item.key)}
              <ArrowRight size={24} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
            </motion.a>
          ))}
          
          <div className="h-px bg-white/5 my-6" />

          {isAdmin ? (
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                onLogout();
                onClose();
              }} 
              className="w-full py-4 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all border border-red-500/20 flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              {t('admin.logout')}
            </motion.button>
          ) : (
            <motion.a 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              href="#contact" 
              onClick={onClose}
              className="w-full py-5 bg-white text-black text-center text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xl shadow-white/5"
            >
              {t('nav.hire')}
            </motion.a>
          )}
        </nav>

        <div className="mt-auto">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">
            © 2024 Jeison Molina
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
