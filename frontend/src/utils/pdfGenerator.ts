import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateATSPDF = (data: any, lang: 'es' | 'en') => {
  const doc = new jsPDF();
  const primaryColor = '#0B2B40';
  const textColor = '#1F2937';
  const mutedColor = '#4B5563';

  let y = 20;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(textColor);
  doc.text('JEISON MOLINA', 105, y, { align: 'center' });
  y += 8;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Backend Python Developer | APIs & Data Automation', 105, y, { align: 'center' });
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor);
  doc.text('Bogotá, Colombia | Remote LATAM/US | andreyyeisonmg@gmail.com | +57 350 549 8014', 105, y, { align: 'center' });
  y += 5;
  doc.text('LinkedIn: linkedin.com/in/jeisonmolina | GitHub: github.com/jeisonMolina21', 105, y, { align: 'center' });
  y += 12;

  // Helper for Section Titles
  const sectionTitle = (title: string) => {
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor);
    doc.text(title.toUpperCase(), 20, y);
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(20, y + 1.5, 190, y + 1.5);
    y += 8;
  };

  // Summary
  sectionTitle(lang === 'es' ? 'Resumen Profesional' : 'Professional Summary');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textColor);
  const summary = lang === 'es' 
    ? 'Backend Python Developer con 2.5 años desarrollando APIs REST y pipelines ETL para educación y RRHH. Especializado en integración de sistemas con Microsoft Graph API, procesamiento de datos con Pandas y despliegues con Docker/Linux. Experiencia procesando +50,000 registros diarios con 99.8% de integridad e integrando 6 sistemas vía REST APIs con OAuth2.'
    : 'Backend Python Developer with 2.5 years of experience developing REST APIs and ETL pipelines for Education and HR. Specialized in system integration with Microsoft Graph API, data processing with Pandas, and deployments with Docker/Linux. Experienced in processing +50,000 records daily with 99.8% integrity and integrating 6 systems via REST APIs with OAuth2.';
  
  const splitSummary = doc.splitTextToSize(summary, 170);
  doc.text(splitSummary, 20, y);
  y += (splitSummary.length * 5) + 5;

  // Experience
  sectionTitle(lang === 'es' ? 'Experiencia Profesional' : 'Professional Experience');
  
  const experiences = [
    {
      company: 'Fundación Universitaria Horizonte',
      role: 'Backend Python Developer',
      period: 'Jul 2024 – Mar 2025',
      bullets: lang === 'es' ? [
        'Desarrollé APIs REST con Python y Django REST Framework para Microsoft 365, gestionando +500 usuarios/semestre con autenticación OAuth2 y Microsoft Graph API.',
        'Construí pipeline ETL con Pandas y MySQL que procesa +50,000 registros biométricos diarios, garantizando 99.8% de integridad para nómina.',
        'Automaticé gestión de identidades en Azure AD usando Microsoft Graph API y PowerShell, eliminando procesos manuales en Talento Humano.',
        'Integré 6 sistemas vía REST APIs con documentación OpenAPI, reduciendo 70% de las validaciones manuales. Stack: Django, MySQL, Linux, Docker.'
      ] : [
        'Developed REST APIs with Python and Django REST Framework for Microsoft 365, managing +500 users/semester with OAuth2 authentication and Microsoft Graph API.',
        'Built ETL pipeline with Pandas and MySQL processing +50,000 biometric records daily, ensuring 99.8% integrity for payroll.',
        'Automated identity management in Azure AD using Microsoft Graph API and PowerShell, eliminating manual HR processes.',
        'Integrated 6 systems via REST APIs with OpenAPI documentation, reducing manual validations by 70%. Stack: Django, MySQL, Linux, Docker.'
      ]
    },
    {
      company: 'Freelance',
      role: 'Python Developer & Automation Specialist',
      period: 'Abr 2024 – May 2025',
      bullets: lang === 'es' ? [
        'Desarrollo SaaS E-commerce Multi-Tenant con Next.js 14, React y SQL Server, incluyendo facturación DIAN y arquitectura serverless.',
        'Construí bots RPA con Python para ETL Excel → MySQL y conciliación bancaria, reduciendo 60% el tiempo operativo con Pandas.',
        'Optimicé 8 consultas SQL críticas en SQL Server mediante índices, logrando un 60% más de velocidad en la extracción de datos.'
      ] : [
        'Developing Multi-Tenant E-commerce SaaS with Next.js 14, React, and SQL Server, including DIAN legal invoicing and serverless architecture.',
        'Built RPA bots with Python for Excel → MySQL ETL and bank reconciliation, reducing operational time by 60% with Pandas.',
        'Optimized 8 critical SQL queries in SQL Server using indexes, achieving 60% faster data extraction speed.'
      ]
    },
    {
      company: 'Gi Group',
      role: 'Backend Developer (Automation Focus)',
      period: 'Oct 2023 – Mar 2024',
      bullets: lang === 'es' ? [
        'Automaticé procesos ETL con Python y MySQL para Power BI, reduciendo 50% el tiempo de reportes ejecutivos mediante vistas materializadas.'
      ] : [
        'Automated ETL processes with Python and MySQL for Power BI, reducing executive report generation time by 50% through materialized views.'
      ]
    }
  ];

  experiences.forEach(exp => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${exp.company} | ${exp.role}`, 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(exp.period, 190, y, { align: 'right' });
    y += 5;
    
    exp.bullets.forEach(bullet => {
      const splitBullet = doc.splitTextToSize(`• ${bullet}`, 165);
      doc.text(splitBullet, 25, y);
      y += (splitBullet.length * 4.5);
    });
    y += 4;
    if (y > 270) { doc.addPage(); y = 20; }
  });

  // Skills
  sectionTitle(lang === 'es' ? 'Habilidades Técnicas' : 'Technical Skills');
  doc.setFontSize(8.5);
  const skillLines = lang === 'es' ? [
    'Backend: Python, Django, Django REST Framework, REST APIs, OAuth2, JWT, Microsoft Graph API',
    'Bases de Datos: MySQL, SQL Server, PostgreSQL, Optimización de Consultas, ETL, Índices',
    'Data: Pandas, NumPy, Limpieza de Datos, Power BI, Power Query',
    'DevOps: Docker, Linux, Git/GitHub, CI/CD, PowerShell, Azure AD, Vercel',
    'Frontend: JavaScript ES6+, TypeScript, React, Next.js 14, Astro, HTML5, CSS3, Tailwind'
  ] : [
    'Backend: Python, Django, Django REST Framework, REST APIs, OAuth2, JWT, Microsoft Graph API',
    'Databases: MySQL, SQL Server, PostgreSQL, Query Optimization, ETL, Indexes',
    'Data: Pandas, NumPy, Data Cleaning, Power BI, Power Query',
    'DevOps: Docker, Linux, Git/GitHub, CI/CD, PowerShell, Azure AD, Vercel',
    'Frontend: JavaScript ES6+, TypeScript, React, Next.js 14, Astro, HTML5, CSS3, Tailwind'
  ];

  skillLines.forEach(line => {
    doc.text(line, 20, y);
    y += 4.5;
  });

  // Education
  y += 5;
  sectionTitle(lang === 'es' ? 'Educación' : 'Education');
  doc.setFont('helvetica', 'bold');
  doc.text(lang === 'es' ? 'Ingeniería de Sistemas – Corporación Unificada Nacional (CUN)' : 'Systems Engineering – Corporación Unificada Nacional (CUN)', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.text(lang === 'es' ? 'En curso' : 'Ongoing', 190, y, { align: 'right' });
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text(lang === 'es' ? 'Tecnología en Análisis y Desarrollo de Software – SENA' : 'Software Analysis and Development Technologist – SENA', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.text(lang === 'es' ? 'En curso' : 'Ongoing', 190, y, { align: 'right' });

  doc.save(`CV_Jeison_Molina_Backend_Python.pdf`);
};
