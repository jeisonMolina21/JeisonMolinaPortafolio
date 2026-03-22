import React, { useState, useEffect } from 'react';
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

const HomePage = () => {
  useReveal();
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-bg-deep text-white selection:bg-primary-bright selection:text-white">
        <div className="bg-red-600 text-white text-[10px] font-bold text-center py-1 uppercase tracking-widest fixed top-0 w-full z-[9999]">
          Redesign Active - Version 5.2 (Integrated About)
        </div>
        <Navigation onLogin={(t) => setToken(t)} onLogout={handleLogout} isAdmin={!!token} />
        <main className="space-y-12 pb-24 relative z-0">
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
