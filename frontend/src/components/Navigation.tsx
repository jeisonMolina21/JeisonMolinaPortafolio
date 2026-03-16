import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import MobileMenu from './navigation/MobileMenu';
import { useLanguage } from '../context/LanguageContext';

const Navigation = ({ onLogin, onLogout, isAdmin }: { onLogin: (t: string) => void, onLogout: () => void, isAdmin: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSuccess = (token: string) => {
    onLogin(token);
    setIsLoginModalOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'py-3' : 'py-5 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`relative px-4 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-[2.5rem] flex items-center justify-between transition-all duration-700 ${isScrolled || isMobileMenuOpen ? 'bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl' : 'bg-transparent border border-transparent'}`}>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => !isAdmin && setIsLoginModalOpen(true)}
              className="group flex items-center gap-3 focus:outline-none"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center font-black text-white transform rotate-3 transition-transform group-hover:rotate-0 text-sm md:text-base">
                JM
              </div>
              <p className="text-lg md:text-xl font-display font-black tracking-tighter text-white">
                JEI<span className="wine-gradient italic">SON</span>
              </p>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 px-8 py-3 glass rounded-full border-white/5">
            {[
              { key: 'nav.about', href: '#hero' },
              { key: 'nav.projects', href: '#projects' },
              { key: 'nav.experience', href: '#experience' },
              { key: 'nav.education', href: '#education' },
              { key: 'nav.contact', href: '#contact' }
            ].map((item) => (
              <a 
                key={item.key} 
                href={item.href} 
                className="text-[9px] font-black uppercase tracking-[0.2em] text-text-dim hover:text-white transition-all relative group"
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="w-10 h-10 md:w-12 md:h-12 glass rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white hover:border-primary/40 transition-all flex items-center justify-center"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Desktop Actions - Hide on mobile, show from md upwards */}
            <div className="hidden md:block">
              {isAdmin ? (
                <button onClick={onLogout} className="px-6 py-3 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-red-500/20 hover:bg-red-500 hover:text-white">
                    {t('admin.logout')}
                </button>
              ) : (
                  <a href="#contact" className="group relative px-8 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-[1.25rem] transition-all hover:bg-primary hover:text-white hover:shadow-[0_0_30px_rgba(153,27,27,0.4)] overflow-hidden inline-block">
                      <span className="relative z-10">{t('nav.hire')}</span>
                  </a>
              )}
            </div>

            {/* Mobile Menu Toggle - Visible on lg- screens */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 glass rounded-lg flex items-center justify-center text-white border border-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        isAdmin={isAdmin}
        onLogout={onLogout}
      />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </nav>
  );
};

export default Navigation;
