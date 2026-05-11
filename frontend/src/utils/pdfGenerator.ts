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

  const profile = data?.profile || {};
  
  // Header - Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(wineRed);
  doc.text((profile.full_name || 'JEISON MOLINA').toUpperCase(), 105, y, { align: 'center' });
  y += 8;
  
  // Header - Title
  doc.setFontSize(12);
  doc.setTextColor(textColor);
  doc.text(profile.title || 'Full Stack Developer', 105, y, { align: 'center' });
  y += 6;
  
  // Header - Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textColor);
  doc.text(`${profile.location || 'Bogotá, Colombia'} | ${profile.email || 'andreyyeisonmg@gmail.com'} | ${profile.whatsapp || '+57 350 549 8014'}`, 105, y, { align: 'center' });
  y += 6;

  // Clickable Shortened Links (Centered)
  const portfolioUrl = 'https://jeison-molina-portafolio-yerl.vercel.app';
  const linkedinUrl = profile.linkedin || 'https://linkedin.com/in/jeisonmolina';
  const githubUrl = profile.github || 'https://github.com/jeisonMolina21';

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
    ? 'Desarrollador Full Stack con enfoque en arquitectura Backend y automatización de procesos. Experto en integrar ecosistemas empresariales mediante APIs REST (OAuth2/JWT) y optimizar flujos de datos. Especializado en reducir la carga operativa mediante scripts en Python y arquitectura escalable en Node.js.'
    : 'Full Stack Developer focused on Backend architecture and process automation. Expert in integrating enterprise ecosystems via REST APIs (OAuth2/JWT) and optimizing data flows. Specialized in reducing operational workload through Python scripts and scalable Node.js architecture.';
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += (summaryLines.length * 4.5) + 6;

  // Experience
  sectionTitle(lang === 'es' ? 'Experiencia Profesional' : 'Professional Experience');
  
  const experiences = (data?.experience || []).map((exp: any) => ({
    company: exp.company,
    role: exp.role,
    period: exp.period,
    bullets: typeof exp.description === 'string' ? exp.description.split('\n').filter((l: string) => l.trim()) : []
  }));

  if (experiences.length === 0) {
    // Fallback if no data
    doc.setFont('helvetica', 'italic');
    doc.text(lang === 'es' ? 'Información en proceso de actualización.' : 'Information being updated.', margin, y);
    y += 10;
  }

  experiences.forEach((exp: any) => {
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
    
    exp.bullets.forEach((bullet: string) => {
      y = addBullet(bullet.replace(/^- /, ''), y);
    });
    y += 3;
  });

  // Categorized Skills
  // Dynamic Skills
  sectionTitle(lang === 'es' ? 'Habilidades Técnicas' : 'Technical Skills');
  
  const skillRows = data?.skills || [];
  const categories = [...new Set(skillRows.map((s: any) => s.category || (lang === 'es' ? 'Otros' : 'Others')))];
  
  categories.forEach((cat: any) => {
    const items = skillRows.filter((s: any) => (s.category || (lang === 'es' ? 'Otros' : 'Others')) === cat).map((s: any) => s.name).join(', ');
    if (items) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(wineRed);
      doc.text(String(cat).toUpperCase() + ':', margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor);
      const itemsWidth = doc.getTextWidth(String(cat).toUpperCase() + ': ');
      doc.text(items, margin + itemsWidth + 2, y);
      y += 4.5;
    }
  });

  // Projects
  y += 5;
  sectionTitle(lang === 'es' ? 'Proyectos Estratégicos' : 'Key Strategic Projects');
  
  const projects = (data?.projects || []).slice(0, 3).map((p: any) => ({
    name: p.title,
    desc: p.description
  }));

  if (projects.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.text(lang === 'es' ? 'Proyectos en actualización.' : 'Projects being updated.', margin, y);
    y += 10;
  }

  projects.forEach((proj: any) => {
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
  
  const education = (data?.education || []);
  if (education.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.text(lang === 'es' ? 'Ingeniería de Sistemas - CUN (En curso)' : 'Systems Engineering - CUN (Ongoing)', margin, y);
    y += 5;
  } else {
    education.forEach((edu: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(textColor);
      doc.text(edu.degree, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(edu.institution, margin + 60, y);
      doc.text(edu.period, 190, y, { align: 'right' });
      y += 6;
    });
  }

  doc.save(`CV_${(profile.full_name || 'JeisonMolina').replace(/\s+/g, '')}_FullStack.pdf`);
};
