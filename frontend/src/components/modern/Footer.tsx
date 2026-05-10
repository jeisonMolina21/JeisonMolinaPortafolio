/** @jsxImportSource react */
import React from 'react';
import { Code2 } from 'lucide-react';

const footerLinks = [
  { name: 'Sobre mí', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Experiencia', href: '#experience' },
  { name: 'Contacto', href: '#contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 relative">
      {/* Gradient Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container-custom py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Branding */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 liquid-button rounded-lg flex items-center justify-center text-white">
              <Code2 size={14} />
            </div>
            <div>
              <span className="text-lg font-display font-bold tracking-tighter text-white">
                JEISON<span className="text-primary">.DEV</span>
              </span>
              <p className="text-text-muted text-[9px] font-bold uppercase tracking-[0.15em]">
                Arquitectura & Automatización
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex gap-8">
            {footerLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted hover:text-white transition-colors liquid-underline"
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.15em]">
            © {currentYear} Jeison Molina · Bogotá
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
