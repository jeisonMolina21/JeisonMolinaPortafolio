const mysql = require('mysql2/promise');
require('dotenv').config();

async function seed() {
  console.log('--- Seeding PREMIUM Professional Data (Junior Developer) ---');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 15903,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'defaultdb', // Initial connection to defaultdb
      ssl: { rejectUnauthorized: false }
    });

    console.log('Connected to Aiven. Switching to my_proyectsast...');
    await connection.query('USE my_proyectsast');

    // 1. Clear existing data
    console.log('Clearing old records...');
    const tables = ['skills', 'profile_settings', 'experience', 'education', 'projects'];
    for (const table of tables) {
      console.log(`Clearing ${table}...`);
      await connection.query(`DELETE FROM ${table}`);
    }

    // 2. Profile Settings (High Impact Junior)
    console.log('Seeding Profile...');
    await connection.query(
        'INSERT INTO profile_settings (id, full_name, title, bio, location, whatsapp, email, linkedin, github, image_url) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            'Jeison Molina',
            'Junior Automation & Backend Developer',
            'Desarrollador Junior apasionado por la automatización de procesos y la arquitectura de backend. Me especializo en transformar desafíos operativos en soluciones digitales escalables mediante Python y Node.js, optimizando flujos de trabajo con un enfoque en la eficiencia de datos y la integridad arquitectónica.',
            'Bogotá, Colombia',
            '+573505498014',
            'andreyyeisonmg@gmail.com',
            'https://linkedin.com/in/jeisonmolina',
            'https://github.com/jeisonmolina',
            'https://media.licdn.com/dms/image/v2/D4E03AQE_z60_8_j_zg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718224564848?e=1747267200&v=beta&t=H-W6zW6v8v-Xv7mY-D2Z0-v-X-Z0vX-z0-v-X-Z0vX-z0'
        ]
    );

    // 3. Skills
    console.log('Seeding Skills...');
    const skills = [
        ['Python'], ['JavaScript'], ['SQL'], ['PHP'], 
        ['Node.js'], ['React'], ['Django'], 
        ['MySQL'], ['PostgreSQL'],
        ['Pandas'], ['Excel Automation'], ['Power BI'],
        ['Git'], ['Docker'], ['Linux'], ['ServiceNow'], ['Jira'], ['n8n']
    ];
    for (const skill of skills) {
        await connection.query('INSERT INTO skills (name) VALUES (?)', skill);
    }

    // 4. Experience (Highlighting Metrics)
    console.log('Seeding Experience...');
    const experiences = [
        [
            'Fundación Universitaria Horizonte', 
            'Software Developer & Automation Specialist', 
            'Julio 2025 – Actualidad', 
            'Liderazgo en el desarrollo de infraestructuras de automatización corporativa. Implementación de sistemas biométricos y gestión masiva de identidades mediante Python, logrando una reducción del 80% en tiempos de procesamiento manual.', 
            'Python, React, Node.js, MySQL, Microsoft 365, Automation Engineering',
            'es'
        ],
        [
            'Freelance / Proyectos Independientes', 
            'Junior Backend Developer', 
            'Abril 2024 – Mayo 2025', 
            'Diseño y ejecución de soluciones ETL personalizadas. Automatización de flujos de datos complejos entre hojas de cálculo y bases de datos relacionales, eliminando errores de entrada manual.', 
            'Python, Pandas, MySQL, Automation, ETL Process',
            'es'
        ],
        [
            'Gi Group', 
            'Automation Support Analyst', 
            'Octubre 2023 – Marzo 2024', 
            'Optimización de generación de reportes operativos mediante Python. Reduje en un 50% el tiempo de entrega de informes críticos para la toma de decisiones.', 
            'Python, Data Analysis, Reporting Automation',
            'es'
        ]
    ];
    for (const exp of experiences) {
        await connection.query('INSERT INTO experience (company, role, period, description, skills) VALUES (?, ?, ?, ?, ?)', exp.slice(0, 5));
    }

    // 5. Projects (Visual & Technical WOW)
    console.log('Seeding Projects...');
    const projects = [
        [
            'Proyecto Kairós: Infraestructura Biométrica', 
            'Sistema de automatización para el control de accesos. Procesamiento masivo de datos biométricos mediante Python, ahorrando 12 días de trabajo manual al mes.', 
            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'Python, Pandas, ZKTECO API, JSON Automation',
            'es'
        ],
        [
            'Proyecto Hermes: Sync Microsoft 365', 
            'Orquestador de identidades digitales para entornos corporativos. Automatización completa de cuentas académicas y notificaciones masivas para +1000 usuarios.', 
            'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'Python, Microsoft Graph API, Excel Automation',
            'es'
        ],
        [
            'Ecosistema de Carnetización Digital', 
            'Plataforma integral Full-Stack para la gestión de identidades. Arquitectura distribuida con capas de administración seguras y visualización en tiempo real.', 
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'React, Node.js, MySQL, Architectural Design',
            'es'
        ]
    ];
    for (const proj of projects) {
        await connection.query('INSERT INTO projects (title, description, image_url, video_url, github_url, demo_url, tech_stack) VALUES (?, ?, ?, ?, ?, ?, ?)', proj.slice(0, 7));
    }

    // 6. Education
    console.log('Seeding Education...');
    const education = [
        ['Corporación Unificada Nacional – CUN', 'Ingeniería de Sistemas', 'En curso (7mo Semestre)', 'Enfoque en computación de alto rendimiento, arquitectura de redes y desarrollo de software escalable.', 'es'],
        ['Servicio Nacional de Aprendizaje – SENA', 'Tecnólogo en Análisis y Desarrollo de Software', 'Graduación 2026', 'Fundamentos sólidos en metodologías ágiles, bases de datos relacionales y ciclos de vida de aplicaciones.', 'es']
    ];
    for (const edu of education) {
        await connection.query('INSERT INTO education (institution, degree, period, description) VALUES (?, ?, ?, ?)', edu.slice(0, 4));
    }

    await connection.end();
    console.log('✅ DATABASE CONTENT TRANSFORMATION COMPLETE!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  }
}

seed();
