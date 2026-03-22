const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function seed() {
  console.log('--- Updating Professional CV Data (v2026) ---');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    // 1. Clear existing data
    await connection.query('DELETE FROM skills');
    await connection.query('DELETE FROM experience');
    await connection.query('DELETE FROM projects');
    await connection.query('DELETE FROM education');

    // 2. Profile Settings (Updating)
    console.log('Updating Profile...');
    const profileBioEs = `Software Developer especializado en automatización de procesos, desarrollo backend y soluciones orientadas a datos. Experiencia en diseño e implementación de sistemas escalables utilizando Python, Node.js y arquitecturas basadas en APIs REST.\n\nHe desarrollado soluciones que optimizan procesos operativos mediante automatización, procesamiento de grandes volúmenes de datos y digitalización de flujos institucionales, logrando reducciones significativas en tiempos manuales.\n\nFuerte enfoque en backend development, data processing, system integration y automatización empresarial. Interesado en construir soluciones robustas, eficientes y orientadas a negocio.`;
    const profileBioEn = `Software Developer specialized in process automation, backend development, and data-oriented solutions. Experience in design and implementation of scalable systems using Python, Node.js, and REST API architectures.\n\nI have developed solutions that optimize operational processes through automation, processing of large volumes of data, and digitalization of institutional flows, achieving significant reductions in manual times.\n\nStrong focus on backend development, data processing, system integration, and enterprise automation. Interested in building robust, efficient, and business-oriented solutions.`;
    
    await connection.query(
        'UPDATE profile_settings SET full_name = ?, title_es = ?, title_en = ?, bio_es = ?, bio_en = ?, location = ?, whatsapp = ?, email = ?, linkedin = ? WHERE id = 1',
        [
            'Jeison Molina',
            'Software Developer | Automation Engineer | Backend specialist',
            'Software Developer | Automation Engineer | Backend specialist',
            profileBioEs,
            profileBioEn,
            'Bogotá, Colombia',
            '+573505498014',
            'andreyyeisonmg@gmail.com',
            'https://linkedin.com/in/jeisonmolina'
        ]
    );

    // 3. Skills
    console.log('Seeding Skills...');
    const skills = [
        // Programming Languages
        ['Python', 'Programming'], ['JavaScript (ES6+)', 'Programming'], ['SQL', 'Programming'], ['PHP', 'Programming'],
        // Backend Development
        ['Node.js (Express)', 'Backend'], ['REST APIs', 'Backend'], ['Django (basic)', 'Backend'], ['API Integration', 'Backend'],
        // Frontend Development
        ['React', 'Frontend'], ['HTML5', 'Frontend'], ['CSS3', 'Frontend'], ['Tailwind CSS', 'Frontend'], ['Bootstrap', 'Frontend'],
        // Databases
        ['MySQL', 'Databases'], ['PostgreSQL (basic)', 'Databases'],
        // Data Processing & Automation
        ['Pandas', 'Data'], ['Data Cleaning', 'Data'], ['Excel Automation', 'Data'], ['ETL Processes', 'Data'],
        // Tools & Technologies
        ['Git', 'Tools'], ['GitHub', 'Tools'], ['Docker', 'Tools'], ['Linux', 'Tools'], ['VS Code', 'Tools'],
        // Other
        ['Power BI', 'Other'], ['ServiceNow', 'Other'], ['Jira', 'Other'], ['Microsoft 365 Integration', 'Other'], ['Technical Documentation', 'Other']
    ];
    for (const skill of skills) {
        await connection.query('INSERT INTO skills (name, category) VALUES (?, ?)', skill);
    }

    // 4. Experience
    console.log('Seeding Experience...');
    const experiences = [
        [
            'Fundación Universitaria Horizonte', 
            'Software Developer / Automation Engineer', 
            'Jul 2025 – Mar 2026', 
            'Desarrollo de soluciones tecnológicas orientadas a la automatización de procesos académicos y administrativos. Diseño e implementación de scripts en Python para procesamiento de datos biométricos. Reducción de 12 días de trabajo manual mensual.', 
            'Python, Node.js, REST APIs, Microsoft 365, Automation',
            'es'
        ],
        [
            'Freelance', 
            'Python Developer / Automation Specialist', 
            'Apr 2024 – May 2025', 
            'Desarrollo de soluciones de automatización orientadas a optimización de procesos operativos. Creación de scripts en Python para automatización de tareas repetitivas y pipelines de datos.', 
            'Python, Pandas, MySQL, Excel Automation',
            'es'
        ],
        [
            'Gi Group', 
            'Automation Support Engineer (Python)', 
            'Oct 2023 – Mar 2024', 
            'Apoyo en automatización de procesos internos mediante procesamiento de datos. Reducción del 50% en tiempos de generación de reportes.', 
            'Python, MySQL, Data Processing, SQL',
            'es'
        ]
    ];
    for (const exp of experiences) {
        await connection.query('INSERT INTO experience (company, role, period, description, skills, lang) VALUES (?, ?, ?, ?, ?, ?)', exp);
    }

    // 5. Projects
    console.log('Seeding Projects...');
    const projects = [
        [
            'Identity Digital Pass', 
            'Sistema web para digitalización de carnets institucionales con arquitectura basada en roles y panel administrativo CRUD completo.', 
            'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=2000&auto=format&fit=crop', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'React, Node.js, Express, MySQL, Tailwind CSS',
            'es'
        ],
        [
            'Kairós – Automatización Control de Accesos', 
            'Sistema de automatización para procesamiento de registros biométricos, validación de horarios y filtrado automático.', 
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2060&auto=format&fit=crop', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'Python, Pandas, APIs, MySQL',
            'es'
        ],
        [
            'Hermes – Automatización Cuentas Académicas', 
            'Automatización de creación y gestión de cuentas institucionales integradas con Microsoft 365 API.', 
            'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'Python, Microsoft 365 API, MySQL',
            'es'
        ],
        [
            'Automatización de Reportes', 
            'Soluciones de automatización para generación de reportes empresariales con reducción del 50% en tiempos de ejecución.', 
            'https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=2070&auto=format&fit=crop', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'Python, Pandas, MySQL, Excel',
            'es'
        ]
    ];
    for (const proj of projects) {
        await connection.query('INSERT INTO projects (title, description, image_url, video_url, github_url, demo_url, tech_stack, lang) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', proj);
    }

    // 6. Education (Keeping existing for now)
    console.log('Seeding Education...');
    const education = [
        ['Corporación Unificada Nacional – CUN', 'Ingeniería de Sistemas', 'En curso', 'Formación avanzada en arquitectura de software y desarrollo de sistemas.', 'es'],
        ['Servicio Nacional de Aprendizaje – SENA', 'Tecnólogo en Análisis y Desarrollo de Software', 'En curso', 'Enfoque práctico en metodologías ágiles y ciclo de vida de desarrollo.', 'es']
    ];
    for (const edu of education) {
        await connection.query('INSERT INTO education (institution, degree, period, description, lang) VALUES (?, ?, ?, ?, ?)', edu);
    }

    await connection.end();
    console.log('✅ Portafolio data updated successfully for 2026!');
  } catch (error) {
    console.error('❌ Data update failed:', error.message);
    console.error(error);
  }
}

seed();
