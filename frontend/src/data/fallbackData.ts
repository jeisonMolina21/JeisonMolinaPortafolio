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
    linkedin: 'https://www.linkedin.com/in/jeison-molina12/',
    github: 'https://github.com/jeisonmolina',
    image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    cv_url: 'https://jeison-molina-portafolio.vercel.app/cv.pdf'
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
      role: 'Backend Developer / Automation Engineer',
      period: 'Jul 2024 – Actualidad',
      description: `• Diseñé e implementé 4 sistemas institucionales en producción utilizando Python, Django, React y MySQL.
• Automaticé el procesamiento de más de 1,000 correos institucionales en menos de 5 minutos.
• Eliminé más de 60 horas mensuales de trabajo operativo mediante automatización.
• Desarrollé APIs REST integradas con Microsoft 365 y Azure AD.
• Implementé pipelines ETL con Pandas procesando más de 50,000 registros biométricos diarios.`,
      skills: 'Python, Django, Node.js, React, MySQL, Pandas, ETL'
    },
    {
      id: 2,
      company: 'Freelance',
      role: 'Backend Developer & Automation Engineer',
      period: 'Abr 2024 – Jun 2025',
      description: `• Diseñé arquitectura multi-tenant para plataforma E-commerce SaaS utilizando Next.js 14, Node.js y SQL Server con integración de facturación electrónica DIAN.
• Constuí automatizaciones ETL y bots RPA en Python para migración, validación y consolidación de datos empresariales, reduciendo hasta un 60% los tiempos operativos.
• Implementé integraciones backend mediante APIs REST y procesamiento automatizado de información utilizando Pandas y SQL.
• Optimicé consultas críticas en SQL Server mediante índices y refactorización de queries, mejorando significativamente el rendimiento de extracción de datos.`,
      skills: 'Next.js, Node.js, Python, SQL Server, RPA, ETL, APIs REST'
    },
    {
      id: 3,
      company: 'Gi Group',
      role: 'Automation Engineer & Operations Support',
      period: 'Oct 2023 – Mar 2024',
      description: `• Diseñé procesos ETL automatizados utilizando Python y MySQL para consolidación y transformación de datos destinados a dashboards ejecutivos en Power BI.
• Optimicé flujos operativos y generación de reportes mediante consultas SQL avanzadas, reduciendo aproximadamente un 50% los tiempos de procesamiento.
• Desarrollé scripts de conciliación y validación de datos financieros con manejo automatizado de logs y control de errores.
• Implementé automatizaciones orientadas a reducir tareas repetitivas y mejorar la integridad de datos operacionales.`,
      skills: 'Python, MySQL, SQL, Power BI, ETL, Automatización'
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Proyecto Kairós',
      description: 'Automatización de control de accesos mediante lógica en Python para procesar archivos biométricos.',
      image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      github_url: 'https://github.com/jeisonmolina',
      demo_url: null,
      tech_stack: 'Python, Pandas, ZKTECO API'
    },
    {
      id: 2,
      title: 'Proyecto Hermes',
      description: 'Automatización de cuentas académicas Microsoft 365 mediante scripts en Python.',
      image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
      github_url: 'https://github.com/jeisonmolina',
      demo_url: null,
      tech_stack: 'Python, Microsoft Graph API'
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
