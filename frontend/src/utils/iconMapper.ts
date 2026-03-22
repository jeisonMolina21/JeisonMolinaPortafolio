import React from 'react';

const iconMap: Record<string, { icon: string; color: string; label: string }> = {
  // Programming
  'python': { icon: '🐍', color: 'text-blue-400', label: 'Python' },
  'javascript': { icon: '🟨', color: 'text-yellow-400', label: 'JavaScript' },
  'typescript': { icon: '🔷', color: 'text-blue-600', label: 'TypeScript' },
  'sql': { icon: '📊', color: 'text-slate-400', label: 'SQL' },
  'php': { icon: '🐘', color: 'text-purple-400', label: 'PHP' },

  // Backend
  'node': { icon: '🟢', color: 'text-green-500', label: 'Node.js' },
  'express': { icon: '🚂', color: 'text-white', label: 'Express' },
  'fastapi': { icon: '⚡', color: 'text-emerald-400', label: 'FastAPI' },
  'django': { icon: '🎸', color: 'text-green-800', label: 'Django' },
  'rest api': { icon: '🔌', color: 'text-blue-300', label: 'REST APIs' },
  'api': { icon: '🔌', color: 'text-blue-300', label: 'API' },

  // Frontend
  'react': { icon: '⚛️', color: 'text-cyan-400', label: 'React' },
  'next': { icon: '▲', color: 'text-white', label: 'Next.js' },
  'tailwind': { icon: '🌊', color: 'text-cyan-400', label: 'Tailwind' },
  'bootstrap': { icon: '💜', color: 'text-purple-600', label: 'Bootstrap' },
  'html': { icon: '🧡', color: 'text-orange-500', label: 'HTML5' },
  'css': { icon: '💙', color: 'text-blue-500', label: 'CSS3' },

  // Databases
  'mysql': { icon: '🐬', color: 'text-blue-500', label: 'MySQL' },
  'postgresql': { icon: '🐘', color: 'text-blue-400', label: 'PostgreSQL' },
  'postgres': { icon: '🐘', color: 'text-blue-400', label: 'PostgreSQL' },

  // Data & Automation
  'pandas': { icon: '🐼', color: 'text-white', label: 'Pandas' },
  'excel': { icon: '📈', color: 'text-green-600', label: 'Excel' },
  'automation': { icon: '🤖', color: 'text-primary-bright', label: 'Automation' },
  'etl': { icon: '🔄', color: 'text-blue-400', label: 'ETL' },
  'cleaning': { icon: '🧹', color: 'text-blue-300', label: 'Data Cleaning' },
  'power bi': { icon: '📊', color: 'text-yellow-500', label: 'Power BI' },
  'n8n': { icon: '🐙', color: 'text-orange-400', label: 'n8n' },

  // Infrastructure & Tools
  'docker': { icon: '🐳', color: 'text-blue-400', label: 'Docker' },
  'git': { icon: '🐙', color: 'text-orange-600', label: 'Git' },
  'github': { icon: '🐱', color: 'text-white', label: 'GitHub' },
  'linux': { icon: '🐧', color: 'text-white', label: 'Linux' },
  'vs code': { icon: '💻', color: 'text-blue-500', label: 'VS Code' },
  'vscode': { icon: '💻', color: 'text-blue-500', label: 'VS Code' },
  'azure': { icon: '☁️', color: 'text-blue-500', label: 'Azure' },
  'aws': { icon: '☁️', color: 'text-orange-400', label: 'AWS' },

  // Other / Business
  'microsoft': { icon: '🪟', color: 'text-blue-400', label: 'Microsoft' },
  'o365': { icon: '📦', color: 'text-orange-500', label: 'Office 365' },
  'servicenow': { icon: '🛠️', color: 'text-green-500', label: 'ServiceNow' },
  'jira': { icon: '🔷', color: 'text-blue-500', label: 'Jira' },
  'documentation': { icon: '📝', color: 'text-slate-400', label: 'Docs' },
  'active directory': { icon: '📁', color: 'text-blue-600', label: 'AD' },
  'powershell': { icon: '🐚', color: 'text-blue-400', label: 'PS' },
};

export const getSkillIcon = (name: string) => {
  const n = name.toLowerCase().trim();
  for (const [key, value] of Object.entries(iconMap)) {
    if (n.includes(key.toLowerCase())) return value;
  }
  return { icon: '🛠️', color: 'text-white', label: name };
};
