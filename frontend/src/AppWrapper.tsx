import React from 'react';
import { LanguageProvider } from './context/LanguageContext';

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
};

export default AppWrapper;
