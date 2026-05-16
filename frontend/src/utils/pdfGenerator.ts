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
  doc.text('Backend Developer & Automation Engineer | Estudiante de Ingeniería de Sistemas', 105, y, { align: 'center' });
  y += 6;

  // Header - Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textColor);
  doc.text('Bogotá, Colombia | andreyyeisonmg@gmail.com | +57 350 549 8014', 105, y, { align: 'center' });
  y += 6;

  // Clickable Shortened Links (Centered)
  const portfolioUrl = 'https://jeison-molina-portafolio.vercel.app';
  const linkedinUrl = 'https://linkedin.com/in/jeisonmolina';
  const githubUrl = 'https://github.com/jeisonMolina21';

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(wineRed);
  
  const pWidth = doc.getTextWidth('Portafolio');
  const lWidth = doc.getTextWidth('LinkedIn');
  const gWidth = doc.getTextWidth('GitHub');
  const separatorWidth = doc.getTextWidth('  |  ');
  
  const totalWidth = pWidth + lWidth + gWidth + (separatorWidth * 2);
  let startX = (210 - totalWidth) / 2;

  // Portafolio Link
  doc.text('Portafolio', startX, y);
  doc.link(startX, y - 4, pWidth, 6, { url: portfolioUrl });
  startX += pWidth;
  
  doc.setTextColor(textColor);
  doc.text('  |  ', startX, y);
  startX += separatorWidth;
  
  // LinkedIn Link
  doc.setTextColor(wineRed);
  doc.text('LinkedIn', startX, y);
  doc.link(startX, y - 4, lWidth, 6, { url: linkedinUrl });
  startX += lWidth;
  
  doc.setTextColor(textColor);
  doc.text('  |  ', startX, y);
  startX += separatorWidth;
  
  // GitHub Link
  doc.setTextColor(wineRed);
  doc.text('GitHub', startX, y);
  doc.link(startX, y - 4, gWidth, 6, { url: githubUrl });

  y += 12;

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
    ? 'Ingeniero de software en formación enfocado en arquitectura Backend y automatización avanzada. Experto en diseñar flujos de datos invisibles y pipelines ETL que procesan +50k registros diarios. Especializado en n8n, Python y Node.js para eliminar la carga operativa y transformar la complejidad en rendimiento escalable.'
    : 'Software Engineer in training focused on Backend architecture and advanced automation. Expert in designing invisible data flows and ETL pipelines processing 50k+ daily records. Specialized in n8n, Python, and Node.js to eliminate operational workload and transform complexity into scalable performance.';
  
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
      role: lang === 'es' ? 'Backend Developer & Automation Engineer' : 'Backend & Automation Engineer',
      period: '2024 – Actualidad',
      bullets: lang === 'es' ? [
        'Orquesté ecosistemas de automatización híbridos (n8n + Python) para sincronizar datos de usuarios entre Q10 y Microsoft 365 (Azure AD).',
        'Diseñé e implementé pipelines ETL con Pandas que procesan +50k registros biométricos diarios, garantizando 100% de trazabilidad.',
        'Reduje la carga operativa manual en más de 60 horas mensuales mediante la automatización de flujos de trabajo administrativos.'
      ] : [
        'Orchestrated hybrid automation ecosystems (n8n + Python) to synchronize user data between Q10 and Microsoft 365 (Azure AD).',
        'Designed and implemented ETL pipelines with Pandas processing 50k+ daily biometric records, ensuring 100% traceability.',
        'Reduced manual operational workload by over 60 hours per month through administrative workflow automation.'
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
    { label: 'BACKEND', items: 'Node.js, Python (Django/FastAPI), SQL, n8n (Automation Engine)' },
    { label: 'DATA & ETL', items: 'Pandas, Procesamiento Masivo, Microsoft Graph API, OAuth 2.0' },
    { label: 'BASES DE DATOS', items: 'MySQL, SQL Server, PostgreSQL, Redis, Optimización de Queries' },
    { label: 'COMPLEMENTARIOS', items: 'React, Next.js, TypeScript, Tailwind CSS, Linux (Bash)' },
    { label: 'DEVOPS & TOOLS', items: 'Docker, Git/GitHub, CI/CD, Azure AD, Auditoría de Logs' }
  ] : [
    { label: 'BACKEND', items: 'Node.js, Python (Django/FastAPI), SQL, n8n (Automation Engine)' },
    { label: 'DATA & ETL', items: 'Pandas, Mass Processing, Microsoft Graph API, OAuth 2.0' },
    { label: 'DATABASES', items: 'MySQL, SQL Server, PostgreSQL, Redis, Query Optimization' },
    { label: 'COMPLEMENTARY', items: 'React, Next.js, TypeScript, Tailwind CSS, Linux (Bash)' },
    { label: 'DEVOPS & TOOLS', items: 'Docker, Git/GitHub, CI/CD, Azure AD, Log Auditing' }
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
      name: 'Sincronización Hermes (n8n + Python)',
      desc: lang === 'es' 
        ? 'Ecosistema de automatización que sincroniza en tiempo real datos de usuarios entre Q10 y Microsoft 365 vía MS Graph API.'
        : 'Automation ecosystem synchronizing real-time user data between Q10 and Microsoft 365 via MS Graph API.'
    },
    {
      name: 'Task Flow Automator (ETL Engine)',
      desc: lang === 'es'
        ? 'Orquestador de tareas asíncronas para procesamiento masivo de datos y generación automática de reportes ejecutivos.'
        : 'Asynchronous task orchestrator for massive data processing and automatic executive report generation.'
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
