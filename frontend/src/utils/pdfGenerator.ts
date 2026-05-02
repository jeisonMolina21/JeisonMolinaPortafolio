import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateATSPDF = (data: any, lang: 'es' | 'en') => {
  const doc = new jsPDF();
  const textColor = '#000000';
  const fontSize = 12;
  const margin = 20;
  const pageWidth = 210;
  const contentWidth = pageWidth - (margin * 2);

  let y = 20;

  // Header - Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(textColor);
  doc.text('JEISON MOLINA', 105, y, { align: 'center' });
  y += 8;

  // Header - Title
  doc.setFontSize(14);
  doc.text('Full Stack Developer | APIs & Data Engineering', 105, y, { align: 'center' });
  y += 8;

  // Header - Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Bogotá, Colombia | Open to Remote LATAM/US | andreyyeisonmg@gmail.com | +57 350 549 8014', 105, y, { align: 'center' });
  y += 5;

  // Clickable Links
  const portfolioUrl = 'http://jeison-molina-portafolio.vercel.app';
  const linkedinUrl = 'http://linkedin.com/in/jeisonmolina';
  const githubUrl = 'http://github.com/jeisonMolina21';

  doc.setTextColor('#0000EE'); // Blue for links
  
  // Portfolio Link
  const portfolioText = `Portafolio: ${portfolioUrl}`;
  doc.text(portfolioText, 105, y, { align: 'center' });
  const pWidth = doc.getTextWidth(portfolioText);
  doc.link(105 - (pWidth/2), y - 3, pWidth, 4, { url: portfolioUrl });
  y += 5;

  // Social Links
  const socialText = `LinkedIn: linkedin.com/in/jeisonmolina | GitHub: github.com/jeisonMolina21`;
  doc.text(socialText, 105, y, { align: 'center' });
  const sWidth = doc.getTextWidth(socialText);
  // Approximation for split links
  doc.link(105 - (sWidth/2), y - 3, sWidth/2, 4, { url: linkedinUrl });
  doc.link(105, y - 3, sWidth/2, 4, { url: githubUrl });
  y += 12;

  // Helper for Justified Sections
  const addJustifiedText = (text: string, x: number, currentY: number, width: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(textColor);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, x, currentY, { align: 'justify', maxWidth: width });
    return currentY + (lines.length * 6);
  };

  // Section Title Helper (Centered)
  const sectionTitle = (title: string) => {
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(textColor);
    doc.text(title.toUpperCase(), 105, y, { align: 'center' });
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(margin, y + 2, 190, y + 2);
    y += 10;
  };

  // Summary
  sectionTitle(lang === 'es' ? 'Resumen Profesional' : 'Professional Summary');
  const summary = lang === 'es' 
    ? 'Backend Python Developer con 2.5 años construyendo APIs REST y pipelines ETL para educación y RRHH. Especializado en integración de sistemas con Microsoft Graph API, procesamiento de datos con Pandas y despliegues con Docker/Linux. En Fundación Universitaria Horizonte desarrollé sistemas backend que procesan +50,000 registros biométricos diarios y gestionan +500 usuarios Microsoft 365 con 99.8% de integridad. Integré 6 sistemas vía REST APIs con OAuth2, reduciendo 70% validaciones manuales. Stack: Python, Django, MySQL, SQL Server, Pandas, Docker, Linux, React, Next.js, TypeScript. Busco rol remoto Backend/Data Engineer en equipos que valoren arquitectura escalable y CI/CD.'
    : 'Backend Python Developer with 2.5 years building REST APIs and ETL pipelines for education and HR. Specialized in system integration with Microsoft Graph API, data processing with Pandas, and deployments with Docker/Linux. At Fundación Universitaria Horizonte, I developed backend systems processing +50,000 biometric records daily and managing +500 Microsoft 365 users with 99.8% integrity. Integrated 6 systems via REST APIs with OAuth2, reducing manual validations by 70%. Stack: Python, Django, MySQL, SQL Server, Pandas, Docker, Linux, React, Next.js, TypeScript. Seeking remote Backend/Data Engineer roles in teams valuing scalable architecture and CI/CD.';
  
  y = addJustifiedText(summary, margin, y, contentWidth);

  // Experience
  sectionTitle(lang === 'es' ? 'Experiencia Profesional' : 'Professional Experience');
  
  const experiences = [
    {
      company: 'Fundación Universitaria Horizonte',
      role: 'Full Stack Developer (Auxiliar de Tecnología)',
      period: 'Julio 2025 – Actualidad',
      bullets: [
        'Diseñé e implementé desde cero la arquitectura integral del sistema (Base de Datos MySQL, Backend Python/Django y Frontend React).',
        'Desarrollé APIs REST con Django para Microsoft 365, gestionando +500 usuarios/semestre con autenticación OAuth2.',
        'Construí pipeline ETL con Pandas que procesa +50,000 registros biométricos diarios con 99.8% de integridad para nómina.',
        'Automaticé gestión de identidades en Azure AD con Graph API, reduciendo 70% las validaciones manuales.'
      ]
    },
    {
      company: 'Freelance',
      role: 'Python Developer & Automation Specialist',
      period: 'Abril 2024 – Actualidad',
      bullets: [
        'Desarrollo SaaS E-commerce Multi-Tenant con Next.js 14, React y SQL Server, incluyendo facturación electrónica DIAN y arquitectura serverless.',
        'Construí bots RPA con Python para migración ETL Excel -> MySQL y conciliación bancaria, reduciendo 60% tiempo operativo con Pandas.',
        'Optimicé 8 consultas SQL críticas en SQL Server mediante índices, logrando 60% más velocidad en extracción de datos.',
        'Diseño APIs REST con Node.js y TypeScript. Portafolio con Astro + React logrando 98/100 Lighthouse usando SSR.'
      ]
    },
    {
      company: 'Gi Group',
      role: 'Automation Engineer',
      period: 'Octubre 2023 – Marzo 2024',
      bullets: [
        'Automaticé procesos ETL con Python y MySQL para Power BI, reduciendo 50% el tiempo de reportes ejecutivos mediante vistas materializadas.',
        'Desarrollé scripts de automatización con Python para conciliación de datos financieros con manejo de logs.'
      ]
    }
  ];

  experiences.forEach(exp => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`${exp.company}`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(exp.period, 190, y, { align: 'right' });
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.text(exp.role, margin, y);
    y += 7;
    
    exp.bullets.forEach(bullet => {
      y = addJustifiedText(`- ${bullet}`, margin + 5, y, contentWidth - 5);
      y += 1;
    });
    y += 4;
    if (y > 270) { doc.addPage(); y = 20; }
  });

  // Skills
  sectionTitle(lang === 'es' ? 'Habilidades Técnicas' : 'Technical Skills');
  const skillText = lang === 'es' 
    ? 'Lenguajes: Python, SQL, JavaScript ES6+, TypeScript, PowerShell. Backend: Django, DRF, REST APIs, OAuth2, JWT, Graph API, Node.js. Bases de Datos: MySQL, SQL Server, PostgreSQL, Optimización, ETL. Data: Pandas, NumPy, Power BI. DevOps: Docker, Linux, Git, GitHub Actions, Vercel, Azure AD. Frontend: React, Next.js 14, Astro, Tailwind.'
    : 'Languages: Python, SQL, JavaScript ES6+, TypeScript, PowerShell. Backend: Django, DRF, REST APIs, OAuth2, JWT, Graph API, Node.js. Databases: MySQL, SQL Server, PostgreSQL, Optimization, ETL. Data: Pandas, NumPy, Power BI. DevOps: Docker, Linux, Git, GitHub Actions, Vercel, Azure AD. Frontend: React, Next.js 14, Astro, Tailwind.';
  
  y = addJustifiedText(skillText, margin, y, contentWidth);

  // Education
  y += 5;
  sectionTitle(lang === 'es' ? 'Educación' : 'Education');
  doc.setFont('helvetica', 'bold');
  doc.text('Corporación Unificada Nacional (CUN)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('(2023 – 2027)', 190, y, { align: 'right' });
  y += 5;
  doc.text('Ingeniería de Sistemas | En curso', margin, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Servicio Nacional de Aprendizaje (SENA)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('(2024 – 2026)', 190, y, { align: 'right' });
  y += 5;
  doc.text('Análisis y Desarrollo de Software | En curso', margin, y);
  y += 10;

  // Projects (In CV)
  sectionTitle(lang === 'es' ? 'Proyectos Destacados' : 'Key Projects');
  
  const projects = [
    {
      name: 'Marketify: SaaS E-commerce Multi-Tenant',
      tech: 'Node.js, Astro, React, SQL Server',
      desc: lang === 'es' 
        ? 'Plataforma con facturación DIAN, arquitectura multi-tenant y carga masiva CSV.'
        : 'Platform with DIAN legal invoicing, multi-tenant architecture, and CSV bulk upload.'
    },
    {
      name: 'Identity Digital Pass: Sistema de Carnetización',
      tech: 'React, Node.js, Microservicios, SQL Server, VPS Ubuntu',
      desc: lang === 'es'
        ? 'Sistema institucional con arquitectura de microservicios y despliegue en VPS Ubuntu Server.'
        : 'Institutional system with microservices architecture and deployment on VPS Ubuntu Server.'
    }
  ];

  projects.forEach(proj => {
    doc.setFont('helvetica', 'bold');
    doc.text(proj.name, margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(`Stack: ${proj.tech}`, margin, y);
    y += 5;
    y = addJustifiedText(proj.desc, margin, y, contentWidth);
    y += 4;
  });

  doc.save(`CV_Jeison_Molina_FullStack.pdf`);
};
