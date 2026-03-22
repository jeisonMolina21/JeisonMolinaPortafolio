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
  'helpdesk': { icon: '🎧', color: 'text-blue-300', label: 'Helpdesk' },
  'o365': { icon: '📦', color: 'text-orange-500', label: 'Office 365' },
  'microsoft 365': { icon: '📦', color: 'text-orange-500', label: 'Microsoft 365' },
  'office 365': { icon: '📦', color: 'text-orange-500', label: 'Office 365' },
  'infrastructure': { icon: '🏗️', color: 'text-slate-500', label: 'Infrastructure' },
  'linux': { icon: '🐧', color: 'text-white', label: 'Linux' },
  'php': { icon: '🐘', color: 'text-purple-400', label: 'PHP' },
  'excel': { icon: '📈', color: 'text-green-600', label: 'Excel' },
  'n8n': { icon: '🐙', color: 'text-orange-400', label: 'n8n' },
  'servicenow': { icon: '🛠️', color: 'text-green-500', label: 'ServiceNow' },
  'jira': { icon: '🔷', color: 'text-blue-500', label: 'Jira' },
  'powershell': { icon: '🐚', color: 'text-blue-400', label: 'PowerShell' },
  'networking': { icon: '🌐', color: 'text-blue-400', label: 'Networking' },
  'azure': { icon: '☁️', color: 'text-blue-500', label: 'Azure Cloud' },
  'microsoft': { icon: '🪟', color: 'text-blue-400', label: 'Microsoft' },
  'active directory': { icon: '📁', color: 'text-blue-600', label: 'Active Directory' },
};

export const getSkillIcon = (name: string) => {
  const n = name.toLowerCase().trim();
  for (const [key, value] of Object.entries(iconMap)) {
    if (n.includes(key.toLowerCase())) return value;
  }
  return { icon: '🛠️', color: 'text-white', label: name };
};
