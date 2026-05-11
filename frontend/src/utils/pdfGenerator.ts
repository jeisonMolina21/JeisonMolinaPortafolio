import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateATSPDF = (data: any, lang: 'es' | 'en') => {
  const doc = new jsPDF();
  
  // Harvard ATS Style - Minimalist Black & White
  const primaryColor = '#000000';
  const textColor = '#000000';
  const margin = 20;
  const pageWidth = 210;
  const contentWidth = pageWidth - (margin * 2);

  let y = 15;

  const profile = data?.profile || {};
  
  // Header - Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(primaryColor);
  doc.text((profile.full_name || 'JEISON MOLINA').toUpperCase(), 105, y, { align: 'center' });
  y += 7;
  
  // Header - Title
  doc.setFontSize(11);
  doc.setTextColor(textColor);
  doc.text(profile.title || 'Backend Python Developer | Automation & Integrations', 105, y, { align: 'center' });
  y += 5;
  
  // Header - Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`${profile.location || 'Bogotá, Colombia'} | ${profile.email || 'andreyyeisonmg@gmail.com'} | ${profile.whatsapp || '+57 350 549 8014'}`, 105, y, { align: 'center' });
  y += 5;

  // Links (Individually clickable)
  const portfolioUrl = 'https://jeison-molina-portafolio-yerl.vercel.app';
  const linkedinUrl = profile.linkedin || 'https://www.linkedin.com/in/jeison-molina-fullstack';
  const githubUrl = profile.github || 'https://github.com/jeisonMolina21';

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  
  const pWidth = doc.getTextWidth('Portafolio');
  const lWidth = doc.getTextWidth('LinkedIn');
  const gWidth = doc.getTextWidth('GitHub');
  const sep = '  |  ';
  const sWidth = doc.getTextWidth(sep);
  
  const totalLinksWidth = pWidth + lWidth + gWidth + (sWidth * 2);
  let currentX = (210 - totalLinksWidth) / 2;

  // Portafolio
  doc.setTextColor(primaryColor);
  doc.text('Portafolio', currentX, y);
  doc.link(currentX, y - 4, pWidth, 6, { url: portfolioUrl });
  currentX += pWidth;
  
  doc.setTextColor(textColor);
  doc.text(sep, currentX, y);
  currentX += sWidth;

  // LinkedIn
  doc.setTextColor(primaryColor);
  doc.text('LinkedIn', currentX, y);
  doc.link(currentX, y - 4, lWidth, 6, { url: linkedinUrl });
  currentX += lWidth;

  doc.setTextColor(textColor);
  doc.text(sep, currentX, y);
  currentX += sWidth;

  // GitHub
  doc.setTextColor(primaryColor);
  doc.text('GitHub', currentX, y);
  doc.link(currentX, y - 4, gWidth, 6, { url: githubUrl });

  y += 10;

  // Section Title Helper
  const sectionTitle = (title: string) => {
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(primaryColor);
    doc.text(title.toUpperCase(), margin, y);
    doc.setDrawColor(0, 0, 0); 
    doc.setLineWidth(0.2);
    doc.line(margin, y + 1.2, 190, y + 1.2);
    y += 7;
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
  const summary = profile.bio || (lang === 'es' 
    ? 'Backend Developer especializado en automatización de procesos, integración de sistemas y desarrollo de APIs REST escalables con Python y Django.'
    : 'Backend Developer specialized in process automation, systems integration, and scalable REST API development.');
  
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

  experiences.forEach((exp: any) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(exp.company, margin, y);
    doc.setFont('helvetica', 'italic');
    doc.text(exp.period, 190, y, { align: 'right' });
    y += 4.5;
    doc.setFont('helvetica', 'bold');
    doc.text(exp.role, margin, y);
    y += 5.5;
    
    exp.bullets.forEach((bullet: string) => {
      y = addBullet(bullet.replace(/^[•\-\*]\s*/, ''), y);
    });
    y += 3;
  });

  // Skills
  sectionTitle(lang === 'es' ? 'Habilidades Técnicas' : 'Technical Skills');
  const skillRows = data?.skills || [];
  const categories = [...new Set(skillRows.map((s: any) => s.category))];
  
  categories.forEach((cat: any) => {
    const items = skillRows.filter((s: any) => s.category === cat).map((s: any) => s.name).sort().join(', ');
    if (items) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(String(cat).toUpperCase() + ':', margin, y);
      doc.setFont('helvetica', 'normal');
      const itemsWidth = doc.getTextWidth(String(cat).toUpperCase() + ': ');
      
      const skillLines = doc.splitTextToSize(items, contentWidth - itemsWidth - 5);
      doc.text(skillLines, margin + itemsWidth + 2, y);
      y += (skillLines.length * 4.5) + 1;
    }
  });

  // Projects
  y += 4;
  sectionTitle(lang === 'es' ? 'Proyectos Estratégicos' : 'Key Strategic Projects');
  const projects = (data?.projects || []).slice(0, 3);
  projects.forEach((proj: any) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(proj.title, margin, y);
    y += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const projLines = doc.splitTextToSize(proj.description, contentWidth);
    doc.text(projLines, margin, y);
    y += (projLines.length * 4.5) + 1;
    
    if (proj.result) {
        doc.setFont('helvetica', 'bolditalic');
        const resultText = lang === 'es' ? `Impacto: ${proj.result}` : `Impact: ${proj.result}`;
        const resultLines = doc.splitTextToSize(resultText, contentWidth);
        doc.text(resultLines, margin, y);
        y += (resultLines.length * 4.5) + 4;
    } else {
        y += 3;
    }
  });

  // Education & Languages
  if (y > 240) doc.addPage(); // Prevent cutoff
  sectionTitle(lang === 'es' ? 'Educación e Idiomas' : 'Education & Languages');
  const education = (data?.education || []);
  education.forEach((edu: any) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(edu.degree, margin, y);
    doc.setFont('helvetica', 'normal');
    // Align institution better
    doc.text(edu.institution, margin + 70, y);
    doc.text(edu.period, 190, y, { align: 'right' });
    y += 5.5;
  });
  
  y += 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(lang === 'es' ? 'IDIOMAS:' : 'LANGUAGES:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(lang === 'es' ? 'Español (Nativo), Inglés (B1 - Colombo Americano, En formación)' : 'Spanish (Native), English (B1 - Colombo Americano, In training)', margin + 25, y);

  doc.save(`CV_${(profile.full_name || 'JeisonMolina').replace(/\s+/g, '')}_ATS.pdf`);
};
