import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import ProjectList from './ProjectList';
import Contact from './Contact';
import WhatsAppButton from './WhatsAppButton';
import { useReveal } from '../hooks/useReveal';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  useReveal();
  const { isAdmin, login, logout } = useAuth();

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-bg-deep text-white selection:bg-primary-bright selection:text-white">
        {/* Version Banner */}
        <div className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black text-center py-1.5 uppercase tracking-widest fixed top-0 w-full z-[100] border-b border-white/10 shadow-lg">
          Molina Jam Protocol - Version 5.3 (Final Architectural Stable)
        </div>
        
        <Navigation onLogin={login} onLogout={logout} isAdmin={isAdmin} />
        
        <main className="space-y-0 relative z-0">
          <Hero />
          <About />
          <Experience />
          <Education />
          <ProjectList />
          <Contact />
        </main>
        
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default HomePage;
