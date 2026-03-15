import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import { useLanguage } from '../context/LanguageContext';

const Navigation = ({ onLogin, onLogout, isAdmin }: { onLogin: (t: string) => void, onLogout: () => void, isAdmin: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 20));
    return () => window.removeEventListener('scroll', () => {});
  }, []);

  const handleLoginSuccess = (token: string) => {
    onLogin(token);
    setIsLoginModalOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass px-8 py-5 rounded-[2rem] flex items-center justify-between border-white/5 transition-all ${isScrolled ? 'bg-bg-surface/90 shadow-2xl' : ''}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => !isAdmin && setIsLoginModalOpen(true)}
              className="text-2xl font-display font-black tracking-tighter text-white hover:text-primary transition-colors cursor-pointer focus:outline-none"
            >
              JEI<span className="text-primary italic">SON</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-10">
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
                className="text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-primary-bright transition-all"
              >
                {t(item.key)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="px-3 py-1.5 glass rounded-lg text-[10px] font-black uppercase tracking-widest text-white hover:border-primary/50 transition-all focus:outline-none"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            {isAdmin && (
               <button onClick={onLogout} className="px-6 py-2.5 bg-white/5 hover:bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-red-500/20">
                  {t('admin.logout')}
               </button>
            )}
            <a href="#contact" className="hidden sm:block px-8 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary-bright hover:shadow-[0_0_20px_rgba(153,27,27,0.3)] transition-all">
                {t('nav.hire')}
            </a>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </nav>
  );
};

export default Navigation;
