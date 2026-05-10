/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const navItems = [
  { name: "Sobre mí", href: "#about" },
  { name: "Proyectos", href: "#projects" },
  { name: "Experiencia", href: "#experience" },
  { name: "Contacto", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);

    // Intersection observer for active section detection
    const sections = navItems.map(item => document.querySelector(item.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className="container-custom">
        <div className={`relative px-6 py-3 rounded-2xl flex items-center justify-between transition-all duration-500 ${isScrolled ? 'neo-glass shadow-lg' : 'bg-transparent'}`}>
          
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center gap-2.5 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-8 liquid-button rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Code2 size={16} />
            </div>
            <span className="text-lg font-display font-bold tracking-tighter text-white">
              JEISON<span className="text-primary">.DEV</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5 bg-white/[0.03] backdrop-blur-md px-2 py-1.5 rounded-xl border border-white/5">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`relative px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-lg ${
                  activeSection === item.href 
                    ? 'text-white bg-primary/15' 
                    : 'text-text-dim hover:text-white'
                }`}
              >
                {item.name}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#contact" 
              className="hidden md:flex px-5 py-2 liquid-button text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-xl active:scale-95 transition-transform"
            >
              Hablemos
            </a>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden w-10 h-10 flex items-center justify-center neo-glass rounded-xl" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "open" : "closed"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={20} className="text-primary" /> : <Menu size={20} className="text-white" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-[75%] bg-surface border-l border-white/5 p-10 flex flex-col gap-6 justify-center shadow-2xl"
            >
              {navItems.map((item, i) => (
                <motion.a 
                  key={item.name} 
                  href={item.href} 
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-display font-bold text-white hover:text-primary transition-colors flex items-center gap-3 group"
                >
                  <span className="text-primary/30 text-sm font-bold group-hover:text-primary/80">0{i+1}</span>
                  {item.name}
                </motion.a>
              ))}
              <motion.a 
                href="#contact" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 w-full py-4 liquid-button text-white font-bold text-center rounded-2xl text-lg"
              >
                Empezar Proyecto
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
