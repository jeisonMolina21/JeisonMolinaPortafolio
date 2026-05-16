/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';

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
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Initial theme check
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') document.documentElement.classList.add('light');

    const handleScroll = () => setIsScrolled(window.scrollY > 30);
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

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'py-2' : 'py-6'}`}>
      <div className="container-custom">
        <div className={`relative px-8 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'bg-black/90 dark:bg-black/90 light:bg-white/90 border-b border-white/5 backdrop-blur-xl' : 'bg-transparent'}`}>
          
          {/* Logo - Editorial Style */}
          <motion.a 
            href="/" 
            className="flex items-center gap-1 group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-2xl font-display font-black tracking-tighter text-text-main">
              JEISON<span className="text-primary">.</span>
            </span>
          </motion.a>

          {/* Desktop Nav - Minimalist */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`relative text-[11px] font-bold uppercase tracking-[0.3em] transition-all ${
                  activeSection === item.href 
                    ? 'text-primary' 
                    : 'text-text-main/60 hover:text-text-main'
                }`}
              >
                {item.name}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-main hover:bg-white/10 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a 
              href="#contact" 
              className="hidden md:block text-[11px] font-black uppercase tracking-[0.3em] text-text-main border border-white/20 px-6 py-2.5 hover:bg-primary hover:text-white transition-all"
            >
              Contacto
            </a>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden text-text-main" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Immersive */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center"
          >
            <button className="absolute top-8 right-8 text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            
            <div className="flex flex-col gap-8 text-center">
              {navItems.map((item, i) => (
                <motion.a 
                  key={item.name} 
                  href={item.href} 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-5xl font-display font-black text-white uppercase tracking-tighter hover:text-primary transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
