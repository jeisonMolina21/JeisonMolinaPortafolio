import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import Navigation from './Navigation';
import Hero from './Hero';
import Experience from './Experience';
import Education from './Education';
import ProjectList from './ProjectList';
import Contact from './Contact';
import AdminSection from './AdminSection';
import AdminDashboard from './AdminDashboard';
import WhatsAppButton from './WhatsAppButton';
import Skills from './Skills';
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
      <div className="min-h-screen bg-midnight text-white">
        <Navigation onLogin={(t) => setToken(t)} onLogout={handleLogout} isAdmin={!!token} />
        <main className="space-y-12 pb-24 relative z-0">
          <Hero />
          <Skills />
          {token && (
            <section id="admin-dashboard" className="bg-midnight-dark/50 border-y border-white/5">
              <AdminDashboard token={token} onLogout={handleLogout} />
            </section>
          )}
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
