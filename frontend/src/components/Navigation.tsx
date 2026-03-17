import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, LogOut, Code, User, ArrowRight } from 'lucide-react';
import LoginModal from './LoginModal';
import MobileMenu from './navigation-parts/MobileMenu';
import { useLanguage } from '../context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navigation = ({ onLogin, onLogout, isAdmin }: { onLogin: (t: string) => void, onLogout: () => void, isAdmin: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSuccess = (token: string) => {
    onLogin(token);
    setIsLoginModalOpen(false);
  };

  const navItems = [
    { key: 'nav.about', href: '#hero' },
    { key: 'nav.projects', href: '#projects' },
    { key: 'nav.experience', href: '#experience' },
    { key: 'nav.education', href: '#education' },
    { key: 'nav.contact', href: '#contact' }
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled ? "py-4" : "py-8"
    )}>
      <div className="container-custom">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "relative px-6 py-3 rounded-full flex items-center justify-between transition-all duration-500",
            isScrolled ? "glass shadow-2xl" : "bg-transparent border border-transparent"
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => !isAdmin && setIsLoginModalOpen(true)}
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-white transform rotate-6 transition-all group-hover:rotate-0 group-hover:scale-110 shadow-lg shadow-primary/20">
                <Code size={20} />
              </div>
              <p className="text-xl font-display font-black tracking-tighter text-white">
                JEI<span className="wine-gradient italic">SON</span>
              </p>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            {navItems.map((item) => (
              <a 
                key={item.key} 
                href={item.href} 
                className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-text-dim hover:text-white hover:bg-white/5 rounded-full transition-all relative group"
              >
                {t(item.key)}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all group-hover:w-1/2"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="w-10 h-10 glass rounded-full text-[10px] font-bold text-white hover:border-primary/40 transition-all flex items-center justify-center group"
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe size={16} className="group-hover:rotate-12 transition-transform" />
            </button>

            {/* Desktop Actions */}
            <div className="hidden md:block">
              {isAdmin ? (
                <button 
                  onClick={onLogout} 
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all border border-red-500/20 hover:bg-red-500 hover:text-white"
                >
                  <LogOut size={14} />
                  {t('admin.logout')}
                </button>
              ) : (
                <a 
                  href="#contact" 
                  className="group relative px-6 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full transition-all hover:bg-primary hover:text-white hover:shadow-[0_0_30px_rgba(153,27,27,0.4)] overflow-hidden flex items-center gap-2"
                >
                  <span className="relative z-10">{t('nav.hire')}</span>
                  <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 glass rounded-full flex items-center justify-center text-white border border-white/10"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)} 
            isAdmin={isAdmin}
            onLogout={onLogout}
          />
        )}
      </AnimatePresence>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </nav>
  );
};

export default Navigation;
