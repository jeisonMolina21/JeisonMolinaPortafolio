require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function migrate() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL not found in .env');
    return;
  }

  // Remove ssl-mode from string for mysql2 if it causes issues, or just use separate config
  const pool = mysql.createPool(connectionString);

  try {
    console.log('Starting strategic database update...');

    // 0. Ensure users table exists and add admin
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const adminUsername = 'jm6120346@gmail.com';
    const adminPassword = 'Horizonte.2026';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    try {
      await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [adminUsername, hashedPassword]);
      console.log('Admin user created successfully.');
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        await pool.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, adminUsername]);
        console.log('Admin user password updated.');
      } else {
        throw e;
      }
    }

    // 1. Add columns to projects (one by one to handle "already exists" errors)
    const projectColumns = [
      'ADD COLUMN challenge TEXT',
      'ADD COLUMN action TEXT',
      'ADD COLUMN result TEXT',
      'ADD COLUMN impact VARCHAR(255)',
      'ADD COLUMN category VARCHAR(100)'
    ];

    for (const col of projectColumns) {
      try {
        await pool.query(`ALTER TABLE projects ${col}`);
      } catch (e) {
        if (!e.message.includes('Duplicate column name')) throw e;
      }
    }

    // 2. Add columns to profile_settings
    const profileColumns = [
      'ADD COLUMN headline_metric VARCHAR(255)',
      'ADD COLUMN metrics_json TEXT'
    ];

    for (const col of profileColumns) {
      try {
        await pool.query(`ALTER TABLE profile_settings ${col}`);
      } catch (e) {
        if (!e.message.includes('Duplicate column name')) throw e;
      }
    }

    // 3. Update Profile with strategic info
    await pool.query(`
      UPDATE profile_settings SET 
        full_name = 'Jeison Molina',
        title_es = 'Backend Python Developer',
        title_en = 'Backend Python Developer',
        headline_metric = 'Automatizo 40 horas de trabajo manual a 5 minutos',
        bio_es = 'Backend Python de Bogotá. 2.5 años automatizando procesos en educación y RRHH.',
        bio_en = 'Backend Python based in Bogotá. 2.5 years automating processes in Education and HR.',
        metrics_json = ? ,
        email = 'andreyyeisonmg@gmail.com',
        linkedin = 'https://linkedin.com/in/jeisonmolina',
        github = 'https://github.com/jeisonMolina21'
      WHERE id = 1;
    `, [JSON.stringify([
      "Reduje 50% tiempos operativos en UniHorizonte ahorrando 12 días/mes con Python",
      "Integré 6 APIs y sistemas biométricos para +1,000 usuarios diarios",
      "Busco rol remoto como Backend/Automation Engineer. Stack: Python, SQL, Docker, React"
    ])]);

    // 4. Clean old projects and insert Strategic Projects
    await pool.query('DELETE FROM projects');

    const strategicProjects = [
      {
        title: 'Hermes: Automatización Microsoft 365',
        category: 'Backend & Automation',
        description: 'Automatización de gestión de identidades y licencias para Microsoft 365.',
        challenge: 'Crear +500 cuentas de estudiantes cada semestre tomaba 40h/semana manual.',
        action: 'Desarrollo de script Python con Graph API que automatiza creación, licencias y grupos.',
        result: 'Reducción de 40 horas/semana a 5 minutos/día. 99.8% precisión sin errores.',
        tech_stack: 'Python, Graph API, PowerShell, Docker',
        image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80',
        github_url: 'https://github.com/jeisonMolina21'
      },
      {
        title: 'Kairós: Sistema de Asistencia Biométrica',
        category: 'Data Engineering / ETL',
        description: 'Procesamiento masivo de datos biométricos para control de asistencia.',
        challenge: 'Análisis de asistencia de 6 pisos tomaba 1.5 días/mes en Excel.',
        action: 'ETL con Python + Pandas procesando 50,000 registros biométricos diarios.',
        result: 'De 12 horas/mes a 30 minutos. Precisión 99.8% para nómina.',
        tech_stack: 'Python, Pandas, MySQL, ETL',
        image_url: 'https://images.unsplash.com/photo-1551288049-bbda48ad4882?auto=format&fit=crop&q=80',
        github_url: 'https://github.com/jeisonMolina21'
      },
      {
        title: 'SaaS E-commerce Multi-Tenant',
        category: 'Full Stack / SaaS',
        description: 'Plataforma de comercio electrónico con integración de facturación legal.',
        challenge: 'PyMEs necesitan tienda online con facturación legal colombiana (DIAN).',
        action: 'Plataforma multi-tenant con 3 planes y API DIAN integrada.',
        result: 'MVP usado por 2 negocios locales. Carga masiva de 1,000 productos en 2 min.',
        tech_stack: 'React, Next.js, Node.js, SQL Server',
        image_url: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80',
        github_url: 'https://github.com/jeisonMolina21'
      }
    ];

    for (const p of strategicProjects) {
      await pool.query(
        'INSERT INTO projects (title, category, description, challenge, action, result, tech_stack, image_url, github_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [p.title, p.category, p.description, p.challenge, p.action, p.result, p.tech_stack, p.image_url, p.github_url]
      );
    }

    // 5. Update Skills Categories
    const skillMappings = [
      { category: 'Backend & Data', skills: ['Python', 'Django', 'Pandas', 'MySQL', 'PostgreSQL', 'SQL', 'REST APIs', 'Node.js'] },
      { category: 'Frontend', skills: ['JavaScript', 'React', 'Astro', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
      { category: 'DevOps & Cloud', skills: ['Git', 'Docker', 'Linux', 'Microsoft 365', 'Power BI', 'Vercel'] }
    ];

    for (const mapping of skillMappings) {
      await pool.query(
        'UPDATE skills SET category = ? WHERE name IN (?)',
        [mapping.category, mapping.skills]
      );
    }

    console.log('Database updated successfully with strategic content!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

migrate();
