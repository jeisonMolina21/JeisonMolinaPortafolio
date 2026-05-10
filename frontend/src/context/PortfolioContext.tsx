import React, { createContext, useContext, type ReactNode } from 'react';
import { useSummaryData } from '../hooks/useSummaryData';
import { useLanguage } from './LanguageContext';

interface PortfolioContextType {
  data: any;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioDataProvider: React.FC<{ children: ReactNode; initialData?: any }> = ({ children, initialData }) => {
  const { lang } = useLanguage();
  const { data: fetchedData, loading, error } = useSummaryData(lang);
  
  const data = fetchedData || initialData;
  const isInitialLoading = loading && !initialData;

  return (
    <PortfolioContext.Provider value={{ data, loading: isInitialLoading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    // Fallback for SSR
    return {
      data: null,
      loading: false,
      error: null
    };
  }
  return context;
};
