import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import { useLanguage } from '../context/LanguageContext';

const Navigation = ({ onLogin, onLogout, isAdmin }: { onLogin: (t: string) => void, onLogout: () => void, isAdmin: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'py-3' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative px-8 py-5 rounded-[2.5rem] flex items-center justify-between transition-all duration-700 ${isScrolled ? 'bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl' : 'bg-transparent border border-transparent'}`}>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => !isAdmin && setIsLoginModalOpen(true)}
              className="group flex items-center gap-3 focus:outline-none"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-white transform rotate-3 transition-transform group-hover:rotate-0">
                JM
              </div>
              <p className="text-xl font-display font-black tracking-tighter text-white">
                JEI<span className="wine-gradient italic">SON</span>
              </p>
            </button>
          </div>

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

          <div className="flex items-center gap-5">
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="w-12 h-12 glass rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:border-primary/40 transition-all flex items-center justify-center"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            {isAdmin ? (
               <button onClick={onLogout} className="px-6 py-3 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-red-500/20 hover:bg-red-500 hover:text-white">
                  {t('admin.logout')}
               </button>
            ) : (
                <a href="#contact" className="group relative px-8 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-[1.25rem] transition-all hover:bg-primary hover:text-white hover:shadow-[0_0_30px_rgba(153,27,27,0.4)] overflow-hidden">
                    <span className="relative z-10">{t('nav.hire')}</span>
                </a>
            )}
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
