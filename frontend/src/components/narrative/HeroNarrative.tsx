/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';

const HeroNarrative = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-midnight overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-bright/10 blur-[100px] rounded-full"
        />
      </div>

      <div className="container-custom relative z-10 text-center space-y-12 pt-32">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xs font-bold uppercase tracking-[0.4em] text-primary"
          >
            Jeison Molina — Software Architect
          </motion.span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-text-main leading-[1.1] tracking-tighter">
            Construyo experiencias que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-bright italic">se sienten</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-lg md:text-xl text-text-dim max-w-2xl mx-auto font-light leading-relaxed px-4"
        >
          No solo código, sino soluciones que transforman la forma en que interactuamos con la tecnología.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="pt-12"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted animate-pulse">Scroll para iniciar la historia</span>
            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent"></div>
          </div>
        </motion.div>
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </section>
  );
};

export default HeroNarrative;
