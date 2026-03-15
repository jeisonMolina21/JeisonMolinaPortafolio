import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.education': 'Estudios',
    'nav.contact': 'Contacto',
    'nav.hire': 'Contratar',
    'hero.available': 'Disponible para nuevos retos',
    'hero.explore': 'Explorar Trabajo',
    'hero.talk': 'Hablemos',
    'contact.title': 'Vamos a',
    'contact.highlight': 'Sinergizar',
    'contact.subtitle': 'Siempre estoy abierto a discutir nuevas arquitecturas de software, estrategias de automatización o asociaciones técnicas.',
    'contact.send': 'Enviar Mensaje',
    'contact.success': '¡Mensaje enviado con éxito!',
    'admin.dashboard': 'Panel de',
    'admin.control': 'Sala de Control • Acceso Seguro',
    'admin.logout': 'Cerrar Sesión',
  },
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About me',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.hire': 'Hire Me',
    'hero.available': 'Available for New Challenges',
    'hero.explore': 'Explore Work',
    'hero.talk': 'Let\'s Talk',
    'contact.title': 'Let\'s',
    'contact.highlight': 'Synergize',
    'contact.subtitle': 'I\'m always open to discussing new software architectures, automation strategies, or technical partnerships.',
    'contact.send': 'Send Message',
    'contact.success': 'Message Sent Successfully!',
    'admin.dashboard': 'Admin',
    'admin.control': 'Control Room • Secure Access',
    'admin.logout': 'Sign Out',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) setLangState(savedLang);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
