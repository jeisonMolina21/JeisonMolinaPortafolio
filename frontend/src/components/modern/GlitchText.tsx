/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  "ESCALAN SIN LÍMITES.",
  "GENERAN IMPACTO REAL.",
  "DOMINAN EL MERCADO.",
  "TRANSFORMAN NEGOCIOS."
];

const GlitchText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
          transition={{ duration: 0.5 }}
          className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-bright to-secondary italic"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default GlitchText;
