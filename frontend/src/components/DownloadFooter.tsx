/** @jsxImportSource react */
import React from 'react';
import { generateATSPDF } from '../utils/pdfGenerator';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  data: any;
}

const DownloadFooter = ({ data }: Props) => {
  const { lang } = useLanguage();

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!data) return;
    generateATSPDF(data, lang);
  };

  return (
    <a 
      href="#" 
      onClick={handleDownload}
      className="footer-nav-link font-black text-primary hover:text-primary-bright transition-colors"
    >
      {lang === 'es' ? 'Descargar CV ATS' : 'Download ATS CV'}
    </a>
  );
};

export default DownloadFooter;
