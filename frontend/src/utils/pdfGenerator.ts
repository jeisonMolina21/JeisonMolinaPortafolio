import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateATSPDF = (data: any, lang: 'es' | 'en') => {
  const doc = new jsPDF();
  const primaryColor = '#2A9D8F';
  const textColor = '#212529';
  const mutedColor = '#6C757D';

  let y = 20;

  // Helper for Section Titles
  const sectionTitle = (title: string) => {
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.text(title.toUpperCase(), 20, y);
    doc.setDrawColor(primaryColor);
    doc.line(20, y + 2, 190, y + 2);
    y += 10;
  };

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(textColor);
  doc.text(data.profile.full_name || 'Jeison Molina', 20, y);
  y += 8;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedColor);
  doc.text(lang === 'es' ? data.profile.title_es : data.profile.title_en, 20, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(`${data.profile.email} | ${data.profile.linkedin}`, 20, y);
  y += 15;

  // Profile / Summary
  sectionTitle(lang === 'es' ? 'Perfil Profesional' : 'Professional Summary');
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  const bio = lang === 'es' ? data.profile.bio_es : data.profile.bio_en;
  const splitBio = doc.splitTextToSize(bio, 170);
  doc.text(splitBio, 20, y);
  y += (splitBio.length * 5) + 5;

  // Impact Metrics
  const metrics = JSON.parse(data.profile.metrics_json || '[]');
  if (metrics.length > 0) {
    sectionTitle(lang === 'es' ? 'Impacto y Logros' : 'Impact & Achievements');
    metrics.forEach((m: string) => {
      const splitM = doc.splitTextToSize(`• ${m}`, 170);
      doc.text(splitM, 20, y);
      y += (splitM.length * 5);
    });
    y += 5;
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    sectionTitle(lang === 'es' ? 'Experiencia Laboral' : 'Work Experience');
    data.experience.forEach((exp: any) => {
      doc.setFont('helvetica', 'bold');
      doc.text(exp.role, 20, y);
      doc.setFont('helvetica', 'normal');
      doc.text(exp.period, 190, y, { align: 'right' });
      y += 5;
      doc.setFont('helvetica', 'italic');
      doc.text(exp.company, 20, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      const desc = exp.description;
      const splitDesc = doc.splitTextToSize(desc, 170);
      doc.text(splitDesc, 20, y);
      y += (splitDesc.length * 5) + 8;

      if (y > 270) { doc.addPage(); y = 20; }
    });
  }

  // Skills
  sectionTitle(lang === 'es' ? 'Habilidades Técnicas' : 'Technical Skills');
  const skillsText = data.skills.map((s: any) => s.name).join(', ');
  const splitSkills = doc.splitTextToSize(skillsText, 170);
  doc.text(splitSkills, 20, y);
  y += (splitSkills.length * 5) + 10;

  // Education
  if (data.education && data.education.length > 0) {
    sectionTitle(lang === 'es' ? 'Educación' : 'Education');
    data.education.forEach((edu: any) => {
      doc.setFont('helvetica', 'bold');
      doc.text(edu.degree, 20, y);
      doc.setFont('helvetica', 'normal');
      doc.text(edu.period, 190, y, { align: 'right' });
      y += 5;
      doc.text(edu.institution, 20, y);
      y += 10;
    });
  }

  doc.save(`CV_Jeison_Molina_${lang.toUpperCase()}.pdf`);
};
