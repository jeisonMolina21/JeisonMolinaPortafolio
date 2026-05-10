import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import Navigation from './Navigation';
import Contact from './Contact';
import WhatsAppButton from './WhatsAppButton';

interface Props {
  isAdmin: boolean;
  onLogin: (token: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const ReactApp = ({ isAdmin, onLogin, onLogout, children }: Props) => {
  return (
    <LanguageProvider>
      <Navigation isAdmin={isAdmin} onLogin={onLogin} onLogout={onLogout} />
      {children}
      <WhatsAppButton />
    </LanguageProvider>
  );
};

export default ReactApp;
