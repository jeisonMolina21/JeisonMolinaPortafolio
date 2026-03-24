import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, LogOut, Code, ArrowRight } from 'lucide-react';
import LoginModal from './LoginModal';
import MobileMenu from './navigation-parts/MobileMenu';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils/cn';


interface NavigationProps {
  onLogin: (token: string) => void;
  onLogout: () => void;
  isAdmin: boolean;
}

const Navigation = ({ onLogin, onLogout, isAdmin }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <nav className={cn("nav-root", isScrolled ? "py-4" : "py-8")}>
      <div className="container-custom">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn("nav-container-wrapper", isScrolled ? "nav-scrolled" : "nav-top")}
        >
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => !isAdmin && setIsLoginModalOpen(true)}
              className="nav-logo-btn group"
            >
              <div className="nav-logo-icon-box">
                <Code size={20} />
              </div>
              <p className="nav-logo-text">
                JEI<span className="wine-gradient italic">SON</span>
              </p>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-items-desktop">
            {navItems.map((item) => (
              <a key={item.key} href={item.href} className="nav-link group">
                {t(item.key)}
                <span className="nav-link-underline"></span>
              </a>
            ))}
          </div>

          <div className="nav-actions">
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="nav-lang-btn"
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe size={16} className="group-hover:rotate-12 transition-transform" />
            </button>

            {/* Desktop Actions */}
            <div className="hidden md:block">
              {isAdmin ? (
                <button onClick={onLogout} className="nav-btn-logout">
                  <LogOut size={14} />
                  {t('admin.logout')}
                </button>
              ) : (
                <a href="#contact" className="nav-btn-hire">
                  <span>{t('nav.hire')}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nav-mobile-toggle"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
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
