import React from 'react';

const iconMap: Record<string, { icon: string; color: string; label: string }> = {
  'python': { icon: '🐍', color: 'text-blue-400', label: 'Python Core' },
  'react': { icon: '⚛️', color: 'text-cyan-400', label: 'React UI' },
  'mysql': { icon: '🐬', color: 'text-blue-500', label: 'MySQL' },
  'node.js': { icon: '🟢', color: 'text-green-500', label: 'Node.js' },
  'node': { icon: '🟢', color: 'text-green-500', label: 'Node.js' },
  'fastapi': { icon: '⚡', color: 'text-emerald-400', label: 'FastAPI' },
  'typescript': { icon: '🔷', color: 'text-blue-600', label: 'TypeScript' },
  'docker': { icon: '🐳', color: 'text-blue-400', label: 'Docker' },
  'javascript': { icon: '🟨', color: 'text-yellow-400', label: 'JavaScript' },
  'sql': { icon: '📊', color: 'text-slate-400', label: 'SQL' },
  'pandas': { icon: '🐼', color: 'text-white', label: 'Pandas' },
  'aws': { icon: '☁️', color: 'text-orange-400', label: 'AWS' },
  'git': { icon: '🐙', color: 'text-orange-600', label: 'Git' },
  'tailwind': { icon: '🌊', color: 'text-cyan-400', label: 'Tailwind' },
};

export const getSkillIcon = (name: string) => {
  const cleanName = name.toLowerCase().trim();
  return iconMap[cleanName] || { icon: '🛠️', color: 'text-white', label: name };
};
