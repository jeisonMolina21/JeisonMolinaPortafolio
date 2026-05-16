export const fallbackData = {
  profile: {
    full_name: 'Jeison Molina',
    title_es: 'Desarrollador de Software | Automatización con Python | Desarrollo Backend',
    title_en: 'Software Developer | Python Automation | Backend Development',
    title: 'Desarrollador de Software | Automatización con Python | Desarrollo Backend',
    bio_es: 'Desarrollador de software con experiencia en automatización de procesos, desarrollo backend y procesamiento de datos, especializado en soluciones basadas en Python, integración de APIs y gestión de bases de datos.',
    bio_en: 'Software developer with experience in process automation, backend development, and data processing, specialized in Python-based solutions, API integration, and database management.',
    bio: 'Desarrollador de software con experiencia en automatización de procesos, desarrollo backend y procesamiento de datos, especializado en soluciones basadas en Python, integración de APIs y gestión de bases de datos.',
    location: 'Bogotá, Colombia',
    whatsapp: '+573505498014',
    email: 'andreyyeisonmg@gmail.com',
    linkedin: 'https://linkedin.com/in/jeisonmolina',
    github: 'https://github.com/jeisonmolina',
    image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    cv_url: '/cv.pdf'
  },
  skills: [
    { id: 1, name: 'Python', category: 'Programming' },
    { id: 2, name: 'JavaScript', category: 'Programming' },
    { id: 3, name: 'SQL', category: 'Data' },
    { id: 4, name: 'Node.js', category: 'Backend' },
    { id: 5, name: 'React', category: 'Frontend' },
    { id: 6, name: 'MySQL', category: 'Data' },
    { id: 7, name: 'Pandas', category: 'Data' },
    { id: 8, name: 'Docker', category: 'Tools' },
    { id: 9, name: 'Git', category: 'Tools' }
  ],
  experience: [
    {
      id: 1,
      company: 'Fundación Universitaria Horizonte',
      role: 'Asistente de Tecnología / Desarrollador de Software',
      period: 'Julio 2025 – Marzo 2026',
      description: 'Automatización de procesos académicos y administrativos. Liderazgo en proyectos Kairós y Hermes.',
      skills: 'Python, React, Node.js, MySQL'
    },
    {
      id: 2,
      company: 'Freelance',
      role: 'Junior Python Developer / Automation Specialist',
      period: 'Abril 2024 – Mayo 2025',
      description: 'Soluciones de automatización de datos (Excel -> MySQL).',
      skills: 'Python, Pandas, MySQL'
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Sincronización Hermes',
      description: 'Ecosistema de automatización híbrido (n8n + Python) que sincroniza en tiempo real datos de usuarios entre la plataforma educativa Q10 y Microsoft 365, gestionando accesos vía Azure AD.',
      image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
      github_url: 'https://github.com/jeisonmolina/hermes',
      demo_url: 'https://github.com/jeisonmolina/hermes#architecture',
      github_label: 'Source Code',
      demo_label: 'Architecture Diagram',
      tech_stack: 'n8n, Python, MS Graph API, OAuth 2.0'
    },
    {
      id: 2,
      title: 'Abogtic Inventory',
      description: 'Sistema integral de gestión de activos fijos y mantenimiento preventivo para entidades jurídicas.',
      image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      github_url: 'https://github.com/jeisonmolina/abogtic',
      demo_url: null,
      tech_stack: 'Node.js, React, MySQL, Sequelize'
    },
    {
      id: 3,
      title: 'Task Flow Automator',
      description: 'Orquestador de tareas asíncronas en segundo plano diseñado para el procesamiento masivo de datos (ETL) y generación automática de reportes ejecutivos.',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      github_url: 'https://github.com/jeisonmolina/task-flow',
      demo_url: 'https://github.com/jeisonmolina/task-flow#api-docs',
      github_label: 'Source Code',
      demo_label: 'API Documentation',
      tech_stack: 'Python, Redis, Docker, PostgreSQL'
    }
  ],
  education: [
    {
      id: 1,
      institution: 'Corporación Unificada Nacional – CUN',
      degree: 'Ingeniería de Sistemas',
      period: 'En curso',
      description: 'Formación avanzada en arquitectura de software.'
    }
  ]
};
