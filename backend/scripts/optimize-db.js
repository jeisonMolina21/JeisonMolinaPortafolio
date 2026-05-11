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
    // 1. Add indices for faster lookups (wrapped in try/catch to avoid duplicates)
    try { await connection.query('ALTER TABLE projects ADD INDEX idx_project_title (title)'); } catch(e){}
    try { await connection.query('ALTER TABLE experience ADD INDEX idx_experience_company (company)'); } catch(e){}
    try { await connection.query('ALTER TABLE education ADD INDEX idx_education_institution (institution)'); } catch(e){}
    try { await connection.query('ALTER TABLE profile_settings ADD INDEX idx_profile_name (full_name)'); } catch(e){}
    console.log('✅ Indices processed.');

    // 2. Add impact-related columns if they don't exist
    const tablesToUpdate = ['projects', 'experience'];
    for (const table of tablesToUpdate) {
        try { await connection.query(`ALTER TABLE ${table} ADD COLUMN challenge TEXT`); } catch(e){}
        try { await connection.query(`ALTER TABLE ${table} ADD COLUMN action TEXT`); } catch(e){}
        try { await connection.query(`ALTER TABLE ${table} ADD COLUMN result TEXT`); } catch(e){}
        try { await connection.query(`ALTER TABLE ${table} ADD COLUMN lang VARCHAR(5) DEFAULT 'es'`); } catch(e){}
    }
    console.log('✅ Columns normalized.');

    // 3. Update Profile Settings with the correct Social Links
    const newBio = `Backend Developer especializado en automatización de procesos, integración de sistemas y desarrollo de APIs REST escalables con Python y Django. 

Experiencia diseñando soluciones empresariales para sectores educativos y administrativos, automatizando flujos operativos mediante Python, Microsoft Graph API, n8n y pipelines ETL capaces de procesar más de 50,000 registros diarios.`;

    await connection.query(`
      UPDATE profile_settings 
      SET 
        full_name = 'Jeison Molina',
        title_es = 'Backend Python Developer | Automation & Systems Integration',
        bio_es = ?,
        location = 'Bogotá, Colombia',
        whatsapp = '+57 350 549 8014',
        email = 'andreyyeisonmg@gmail.com',
        linkedin = 'https://www.linkedin.com/in/jeison-molina12/',
        github = 'https://github.com/jeisonMolina21',
        image_url = 'https://r5gn07qd2saa8p0c.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-15%20at%207.22.08%20PM%20%281%29.jpeg'
      WHERE id = 1
    `, [newBio]);
    console.log('✅ Profile settings updated.');

    // 4. Ensure Experience is clean and updated
    await connection.query('DELETE FROM experience');
    
    const experiences = [
      {
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
        company: 'Gi Group',
        role: 'Automation Engineer & Operations Support',
        period: 'Oct 2023 – Mar 2024',
        description: `• Diseñé procesos ETL automatizados utilizando Python y MySQL para consolidación y transformación de datos destinados a dashboards ejecutivos en Power BI.
• Optimicé flujos operativos y generación de reportes mediante consultas SQL avanzadas, reduciendo aproximadamente un 50% los tiempos de procesamiento.
• Desarrollé scripts de conciliación y validación de datos financieros con manejo automatizado de logs y control de errores.
• Implementé automatizaciones orientadas a reducir tareas repetitivas y mejorar la integridad de datos operacionales.`,
        skills: 'Python, MySQL, SQL, Power BI, ETL, Automatización'
      }
    ];

    for (const exp of experiences) {
      await connection.query(`
        INSERT INTO experience (company, role, period, description, skills, lang) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, [exp.company, exp.role, exp.period, exp.description, exp.skills, 'es']);
    }
    console.log('✅ All experiences normalized and inserted.');

  } catch (err) {
    console.error('❌ Error during optimization:', err);
  } finally {
    await connection.end();
    console.log('🏁 Database Optimization Finished.');
  }
}

optimizeAndNormalize();
