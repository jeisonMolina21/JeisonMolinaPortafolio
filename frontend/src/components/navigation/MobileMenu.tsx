import React from 'react';
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
    <div 
      className={`fixed inset-0 z-[100] transition-all duration-500 lg:hidden ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div 
        className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-midnight-dark border-l border-white/10 p-10 flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
          onClick={onClose}
          className="self-end mb-12 w-12 h-12 glass rounded-full flex items-center justify-center text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col gap-8">
          {menuItems.map((item) => (
            <a 
              key={item.key} 
              href={item.href} 
              onClick={onClose}
              className="text-2xl font-display font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              {t(item.key)}
            </a>
          ))}
          
          <div className="h-px bg-white/10 my-4" />

          {isAdmin ? (
            <button 
              onClick={() => {
                onLogout();
                onClose();
              }} 
              className="w-full py-4 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-red-500/20"
            >
              {t('admin.logout')}
            </button>
          ) : (
            <a 
              href="#contact" 
              onClick={onClose}
              className="w-full py-4 bg-white text-black text-center text-[10px] font-black uppercase tracking-widest rounded-xl"
            >
              {t('nav.hire')}
            </a>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
