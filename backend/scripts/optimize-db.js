require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mysql = require('mysql2/promise');

async function optimizeAndNormalize() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  console.log('🚀 Starting Database Optimization & Normalization...');

  try {
    // 1. Add indices for faster lookups
    await connection.query('ALTER TABLE projects ADD INDEX IF NOT EXISTS idx_project_title (title)');
    await connection.query('ALTER TABLE experience ADD INDEX IF NOT EXISTS idx_experience_company (company)');
    await connection.query('ALTER TABLE education ADD INDEX IF NOT EXISTS idx_education_institution (institution)');
    await connection.query('ALTER TABLE profile_settings ADD INDEX IF NOT EXISTS idx_profile_name (full_name)');
    console.log('✅ Indices added for performance.');

    // 2. Add impact-related columns if they don't exist (Normalization for modern UI)
    const tablesToUpdate = ['projects', 'experience'];
    for (const table of tablesToUpdate) {
      try {
        await connection.query(`ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS challenge TEXT`);
        await connection.query(`ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS action TEXT`);
        await connection.query(`ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS result TEXT`);
        await connection.query(`ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS lang VARCHAR(5) DEFAULT 'es'`);
      } catch (e) {
        console.log(`ℹ️ Columns in ${table} might already exist or handled by engine.`);
      }
    }

    // 3. Update Profile Settings with the correct Social Links
    const newBio = `Backend Developer especializado en automatización de procesos, integración de sistemas y desarrollo de APIs REST escalables con Python y Django. 

Experiencia diseñando soluciones empresariales para sectores educativos y administrativos, automatizando flujos operativos mediante Python, Microsoft Graph API, n8n y pipelines ETL capaces de procesar más de 50,000 registros diarios.`;

    await connection.query(`
      UPDATE profile_settings 
      SET 
        full_name = 'Jeison Molina',
        title = 'Backend Python Developer | Automation & Systems Integration',
        bio = ?,
        location = 'Bogotá, Colombia',
        whatsapp = '+57 350 549 8014',
        email = 'andreyyeisonmg@gmail.com',
        linkedin = 'https://www.linkedin.com/in/jeison-molina12/',
        github = 'https://github.com/jeisonMolina21',
        image_url = 'https://r5gn07qd2saa8p0c.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-15%20at%207.22.08%20PM%20%281%29.jpeg'
      WHERE id = 1
    `, [newBio]);
    console.log('✅ Profile settings normalized and links updated.');

    // 4. Ensure Experience is clean (Single Horizonte entry)
    await connection.query('DELETE FROM experience');
    const expDesc = `• Diseñé e implementé 4 sistemas institucionales en producción utilizando Python, Django, React y MySQL.
• Automaticé el procesamiento de más de 1,000 correos institucionales en menos de 5 minutos.
• Eliminé más de 60 horas mensuales de trabajo operativo mediante automatización.
• Desarrollé APIs REST integradas con Microsoft 365 y Azure AD.
• Implementé pipelines ETL con Pandas procesando más de 50,000 registros biométricos diarios.`;

    await connection.query(`
      INSERT INTO experience (company, role, period, description, skills, lang) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      'Fundación Universitaria Horizonte',
      'Backend Developer / Automation Engineer',
      'Jul 2024 – Actualidad',
      expDesc,
      'Python, Django, Node.js, React, MySQL, Pandas, ETL',
      'es'
    ]);
    console.log('✅ Experience data normalized.');

  } catch (err) {
    console.error('❌ Error during optimization:', err);
  } finally {
    await connection.end();
    console.log('🏁 Database Optimization Finished.');
  }
}

optimizeAndNormalize();
