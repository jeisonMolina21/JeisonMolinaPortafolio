import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default AppWrapper;
