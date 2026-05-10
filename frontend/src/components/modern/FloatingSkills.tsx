/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Globe, Layers, Server, Terminal, Zap } from 'lucide-react';

const skills = [
  { icon: <Code2 size={20} />, color: "text-blue-400", x: -120, y: -100, delay: 0 },
  { icon: <Database size={20} />, color: "text-indigo-400", x: 120, y: -80, delay: 0.2 },
  { icon: <Server size={20} />, color: "text-cyan-400", x: -140, y: 50, delay: 0.4 },
  { icon: <Terminal size={20} />, color: "text-emerald-400", x: 140, y: 80, delay: 0.6 },
  { icon: <Layers size={20} />, color: "text-purple-400", x: 0, y: -160, delay: 0.8 },
  { icon: <Globe size={20} />, color: "text-sky-400", x: 0, y: 160, delay: 1 },
];

const FloatingSkills = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {skills.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: s.x,
            y: s.y,
            transition: { delay: s.delay + 1, duration: 0.8, type: "spring" }
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4 + i, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className={`p-3 glass-morphic rounded-xl ${s.color} shadow-lg`}
          >
            {s.icon}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingSkills;
