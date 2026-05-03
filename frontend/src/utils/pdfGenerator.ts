import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateATSPDF = (data: any, lang: 'es' | 'en') => {
  const doc = new jsPDF();
  // Colors
  const wineRed = '#991b1b';
  const textColor = '#000000';
  const fontSize = 10;
  const margin = 20;
  const pageWidth = 210;
  const contentWidth = pageWidth - (margin * 2);

  let y = 20;

  // Header - Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(wineRed);
  doc.text('JEISON MOLINA', 105, y, { align: 'center' });
  y += 8;

  // Header - Title
  doc.setFontSize(12);
  doc.setTextColor(textColor);
  doc.text('Full Stack Developer | Backend & Data Engineering Specialist', 105, y, { align: 'center' });
  y += 6;

  // Header - Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Bogotá, Colombia | andreyyeisonmg@gmail.com | +57 350 549 8014', 105, y, { align: 'center' });
  y += 5;

  // Clickable Links
  const portfolioUrl = 'https://jeison-molina-portafolio.vercel.app';
  const linkedinUrl = 'https://linkedin.com/in/jeisonmolina';
  const githubUrl = 'https://github.com/jeisonMolina21';

  doc.setTextColor('#0000EE');
  const linksText = `Portafolio: ${portfolioUrl} | LinkedIn: linkedin.com/in/jeisonmolina`;
  doc.text(linksText, 105, y, { align: 'center' });
  y += 10;

  // Section Title Helper
  const sectionTitle = (title: string) => {
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(wineRed);
    doc.text(title.toUpperCase(), margin, y);
    doc.setDrawColor(153, 27, 27); // Wine Red
    doc.setLineWidth(0.3);
    doc.line(margin, y + 1.5, 190, y + 1.5);
    y += 8;
  };

  // Helper for bullet points
  const addBullet = (text: string, currentY: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(textColor);
    const lines = doc.splitTextToSize(text, contentWidth - 8);
    doc.text('•', margin + 2, currentY);
    doc.text(lines, margin + 6, currentY);
    return currentY + (lines.length * 4.5) + 1;
  };

  // Summary
  sectionTitle(lang === 'es' ? 'Perfil Profesional' : 'Professional Profile');
  const summary = lang === 'es' 
    ? 'Desarrollador Full Stack con enfoque en arquitectura Backend y automatización de procesos. Experto en integrar ecosistemas empresariales mediante APIs REST (OAuth2/JWT) y optimizar flujos de datos. Especializado en reducir la carga operativa mediante scripts en Python y arquitectura escalable en Node.js.'
    : 'Full Stack Developer focused on Backend architecture and process automation. Expert in integrating enterprise ecosystems via REST APIs (OAuth2/JWT) and optimizing data flows. Specialized in reducing operational workload through Python scripts and scalable Node.js architecture.';
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += (summaryLines.length * 4.5) + 6;

  // Experience
  sectionTitle(lang === 'es' ? 'Experiencia Profesional' : 'Professional Experience');
  
  const experiences = [
    {
      company: 'Fundación Universitaria Horizonte',
      role: lang === 'es' ? 'Full Stack Developer / Auxiliar de Tecnología' : 'Full Stack Developer',
      period: '2024 – Actualidad',
      bullets: lang === 'es' ? [
        'Lideré la migración de sistemas legacy a una arquitectura moderna (Python/React), mejorando el rendimiento en un 60%.',
        'Automaticé la gestión de +500 identidades en Azure AD usando Microsoft Graph API, eliminando errores manuales.',
        'Desarrollé un motor ETL con Pandas que procesa 50k+ registros biométricos diarios para auditoría de nómina.'
      ] : [
        'Led migration of legacy systems to modern architecture (Python/React), improving performance by 60%.',
        'Automated 500+ identity management in Azure AD using Microsoft Graph API, eliminating manual errors.',
        'Developed ETL engine with Pandas processing 50k+ daily biometric records for payroll auditing.'
      ]
    },
    {
      company: 'Proyectos Independientes / Freelance',
      role: 'Python & JavaScript Specialist',
      period: '2023 – Actualidad',
      bullets: lang === 'es' ? [
        'Arquitectura de microservicios para sistemas de carnetización digital desplegados en entornos Linux/VPS.',
        'Optimización de consultas SQL críticas, logrando una reducción del 40% en tiempos de respuesta de reportes.',
        'Diseño y despliegue de soluciones SaaS con Astro y SQL Server para facturación electrónica.'
      ] : [
        'Microservices architecture for digital ID systems deployed in Linux/VPS environments.',
        'Optimization of critical SQL queries, achieving a 40% reduction in report response times.',
        'Design and deployment of SaaS solutions with Astro and SQL Server for electronic invoicing.'
      ]
    }
  ];

  experiences.forEach(exp => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.text(exp.company, margin, y);
    doc.setFont('helvetica', 'italic');
    doc.text(exp.period, 190, y, { align: 'right' });
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(wineRed);
    doc.text(exp.role, margin, y);
    y += 6;
    
    exp.bullets.forEach(bullet => {
      y = addBullet(bullet, y);
    });
    y += 3;
  });

  // Categorized Skills
  sectionTitle(lang === 'es' ? 'Habilidades Técnicas' : 'Technical Skills');
  const skillGroups = lang === 'es' ? [
    { label: 'LENGUAJES', items: 'Python (Django/DRF), JavaScript ES6+, TypeScript, SQL, PowerShell' },
    { label: 'BACKEND & DATA', items: 'Node.js, REST APIs, OAuth2/JWT, Pandas, ETL, Microsoft Graph API' },
    { label: 'BASES DE DATOS', items: 'MySQL, SQL Server, PostgreSQL, Redis, Optimización de Queries' },
    { label: 'FRONTEND', items: 'React, Next.js 14, Astro, Tailwind CSS, Framer Motion' },
    { label: 'DEVOPS & TOOLS', items: 'Docker, Git/GitHub, Vercel, Linux (Ubuntu), Azure AD, CI/CD' }
  ] : [
    { label: 'LANGUAGES', items: 'Python (Django/DRF), JavaScript ES6+, TypeScript, SQL, PowerShell' },
    { label: 'BACKEND & DATA', items: 'Node.js, REST APIs, OAuth2/JWT, Pandas, ETL, Microsoft Graph API' },
    { label: 'DATABASES', items: 'MySQL, SQL Server, PostgreSQL, Redis, Query Optimization' },
    { label: 'FRONTEND', items: 'React, Next.js 14, Astro, Tailwind CSS, Framer Motion' },
    { label: 'DEVOPS & TOOLS', items: 'Docker, Git/GitHub, Vercel, Linux (Ubuntu), Azure AD, CI/CD' }
  ];

  skillGroups.forEach(group => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(wineRed);
    doc.text(group.label + ':', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textColor);
    const itemsWidth = doc.getTextWidth(group.label + ': ');
    doc.text(group.items, margin + itemsWidth + 2, y);
    y += 4.5;
  });

  // Projects
  y += 5;
  sectionTitle(lang === 'es' ? 'Proyectos Estratégicos' : 'Key Strategic Projects');
  
  const projects = [
    {
      name: 'Marketify: Multi-Tenant E-commerce',
      desc: lang === 'es' 
        ? 'Sistema escalable con aislamiento de datos por cliente, integración de pasarela de pagos y facturación legal automática.'
        : 'Scalable system with per-client data isolation, payment gateway integration, and automatic legal invoicing.'
    },
    {
      name: 'Identity Pass: Microservices System',
      desc: lang === 'es'
        ? 'Arquitectura desacoplada en Node.js que gestiona identidades digitales masivas con alta disponibilidad en VPS.'
        : 'Decoupled Node.js architecture managing massive digital identities with high availability on VPS.'
    }
  ];

  projects.forEach(proj => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textColor);
    doc.text(proj.name, margin, y);
    y += 4.5;
    doc.setFont('helvetica', 'normal');
    const projLines = doc.splitTextToSize(proj.desc, contentWidth);
    doc.text(projLines, margin, y);
    y += (projLines.length * 4.5) + 3;
  });

  // Education
  y += 5;
  sectionTitle(lang === 'es' ? 'Formación Académica' : 'Education');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textColor);
  doc.text('Ingeniería de Sistemas', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Corporación Unificada Nacional (CUN)', margin + 40, y);
  doc.text('2023 - 2027', 190, y, { align: 'right' });
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Tecnología en Desarrollo de Software', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('SENA', margin + 65, y);
  doc.text('2024 - 2026', 190, y, { align: 'right' });

  doc.save(`CV_JeisonMolina_FullStack.pdf`);
};
