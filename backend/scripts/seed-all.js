const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function seed() {
  console.log('--- Seeding Professional CV Data for Jeison Molina ---');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '15903'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false }
    });

    // 1. Clear existing data
    await connection.query('DELETE FROM skills');
    await connection.query('DELETE FROM profile_settings');
    await connection.query('DELETE FROM experience');
    await connection.query('DELETE FROM education');
    await connection.query('DELETE FROM projects');

    // 2. Profile Settings
    console.log('Seeding Profile...');
    await connection.query(
        'INSERT INTO profile_settings (id, full_name, title_es, title_en, bio_es, bio_en, location, whatsapp, email, linkedin) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            'Jeison Molina',
            'Desarrollador de Software | Automatización con Python | Desarrollo Backend',
            'Software Developer | Python Automation | Backend Development',
            'Desarrollador de software con experiencia en automatización de procesos, desarrollo backend y procesamiento de datos, especializado en soluciones basadas en Python, integración de APIs y gestión de bases de datos. Interesado en continuar desarrollando soluciones escalables enfocadas en backend, automatización y desarrollo de software empresarial.',
            'Software developer with experience in process automation, backend development, and data processing, specialized in Python-based solutions, API integration, and database management. Interested in continuing to develop scalable solutions focused on backend, automation, and enterprise software development.',
            'Bogotá, Colombia',
            '+573505498014',
            'andreyyeisonmg@gmail.com',
            'https://linkedin.com/in/jeisonmolina'
        ]
    );

    // 3. Skills
    console.log('Seeding Skills...');
    const skills = [
        ['Python'], ['JavaScript'], ['SQL'], ['PHP'], 
        ['Node.js'], ['React'], ['Django'], 
        ['MySQL'], ['PostgreSQL'],
        ['Pandas'], ['Excel Automation'], ['Power BI'],
        ['Git'], ['Docker'], ['Linux'], ['ServiceNow'], ['Jira']
    ];
    for (const skill of skills) {
        await connection.query('INSERT INTO skills (name) VALUES (?)', skill);
    }

    // 4. Experience
    console.log('Seeding Experience...');
    const experiences = [
        [
            'Fundación Universitaria Horizonte', 
            'Asistente de Tecnología / Desarrollador de Software', 
            'Julio 2025 – Marzo 2026', 
            'Participación en el desarrollo de soluciones tecnológicas enfocadas en la automatización de procesos académicos y administrativos. Liderazgo técnico en proyectos como Kairós (Biometría), Hermes (Cuentas Microsoft 365) y el Sistema de Carnet Digital Institucional.', 
            'Python, React, Node.js, MySQL, Microsoft 365, Automation',
            'es'
        ],
        [
            'Freelance', 
            'Junior Python Developer / Automation Specialist', 
            'Abril 2024 – Mayo 2025', 
            'Desarrollo de soluciones de automatización enfocadas en el procesamiento de datos y optimización de flujos operativos (Excel -> MySQL).', 
            'Python, Pandas, MySQL, Excel Automation',
            'es'
        ],
        [
            'Gi Group', 
            'Automation Support Engineer (Python)', 
            'Octubre 2023 – Marzo 2024', 
            'Apoyo en iniciativas de automatización de procesos internos mediante herramientas de procesamiento de datos en Python. Reducción del 50% del tiempo de reportes.', 
            'Python, MySQL, Data Processing, ETL',
            'es'
        ],
        // English versions
        [
            'Fundación Universitaria Horizonte', 
            'Technology Assistant / Software Developer', 
            'July 2025 – March 2026', 
            'Participation in the development of technological solutions focused on the automation of academic and administrative processes. Technical leadership in projects such as Kairós, Hermes, and the Institutional Digital ID System.', 
            'Python, React, Node.js, MySQL, Microsoft 365, Automation',
            'en'
        ],
        [
            'Freelance', 
            'Junior Python Developer / Automation Specialist', 
            'April 2024 – May 2025', 
            'Development of automation solutions focused on data processing and operational workflow optimization (Excel -> MySQL).', 
            'Python, Pandas, MySQL, Excel Automation',
            'en'
        ],
        [
            'Gi Group', 
            'Automation Support Engineer (Python)', 
            'October 2023 – March 2024', 
            'Support in internal process automation initiatives using Python data processing tools. 50% reduction in report generation time.', 
            'Python, MySQL, Data Processing, ETL',
            'en'
        ]
    ];
    for (const exp of experiences) {
        await connection.query('INSERT INTO experience (company, role, period, description, skills, lang) VALUES (?, ?, ?, ?, ?, ?)', exp);
    }

    // 5. Projects
    console.log('Seeding Projects...');
    const projects = [
        [
            'Proyecto Kairós', 
            'Automatización de control de accesos mediante lógica en Python para procesar archivos biométricos. Integración con APIs internas y reducción de 12 días de trabajo manual mensualmente.', 
            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'Python, Pandas, ZKTECO API, JSON',
            'es'
        ],
        [
            'Proyecto Hermes', 
            'Automatización de cuentas académicas Microsoft 365 mediante scripts en Python. Gestión masiva de identidades, validación de datos institucionales y envío automático de notificaciones.', 
            'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'Python, Microsoft Graph API, Excel Automation',
            'es'
        ],
        [
            'Carnet Digital Institucional', 
            'Plataforma web Full-Stack para la digitalización de identificaciones universitarias. Arquitectura basada en roles (Estudiantes, Docentes, Administradores) con panel de gestión centralizado.', 
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'React, Node.js, MySQL, Web Dev',
            'es'
        ],
        // English Projects
        [
            'Kairós Project', 
            'Access control automation using Python logic to process biometric files. Integration with internal APIs and reduction of 12 days of manual work per month.', 
            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'Python, Pandas, ZKTECO API, JSON',
            'en'
        ],
        [
            'Hermes Project', 
            'Microsoft 365 account automation using Python scripts. Mass identity management, validation of institutional data, and automatic notification delivery.', 
            'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'Python, Microsoft Graph API, Excel Automation',
            'en'
        ],
        [
            'Institutional Digital ID System', 
            'Full-Stack web platform for university ID digitalization. Role-based architecture (Students, Teachers, Admins) with a centralized management panel.', 
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', 
            null, 
            'https://github.com/jeisonmolina', 
            null, 
            'React, Node.js, MySQL, Web Dev',
            'en'
        ]
    ];
    for (const proj of projects) {
        await connection.query('INSERT INTO projects (title, description, image_url, video_url, github_url, demo_url, tech_stack, lang) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', proj);
    }

    // 6. Education
    console.log('Seeding Education...');
    const education = [
        ['Corporación Unificada Nacional – CUN', 'Ingeniería de Sistemas', 'En curso', 'Formación avanzada en arquitectura de software y desarrollo de sistemas.', 'es'],
        ['Servicio Nacional de Aprendizaje – SENA', 'Tecnólogo en Análisis y Desarrollo de Software', 'En curso', 'Enfoque práctico en metodologías ágiles y ciclo de vida de desarrollo.', 'es'],
        ['Corporación Unificada Nacional – CUN', 'Systems Engineering', 'Ongoing', 'Advanced training in software architecture and systems development.', 'en'],
        ['Servicio Nacional de Aprendizaje – SENA', 'Software Analysis and Development Technologist', 'Ongoing', 'Practical focus on agile methodologies and development lifecycle.', 'en']
    ];
    for (const edu of education) {
        await connection.query('INSERT INTO education (institution, degree, period, description, lang) VALUES (?, ?, ?, ?, ?)', edu);
    }

    await connection.end();
    console.log('✅ All professional data seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  }
}

seed();
