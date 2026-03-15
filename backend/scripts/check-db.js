
const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 15903,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'my_proyectsast',
      ssl: { rejectUnauthorized: false }
    });

    console.log('--- Checking Database Content ---');
    
    const [profile] = await connection.query('SELECT * FROM profile_settings WHERE id = 1');
    console.log('Profile:', JSON.stringify(profile, null, 2));

    const [projects] = await connection.query('SELECT COUNT(*) as count FROM projects');
    console.log('Projects count:', projects[0].count);

    const [experience] = await connection.query('SELECT COUNT(*) as count FROM experience');
    console.log('Experience count:', experience[0].count);

    await connection.end();
  } catch (error) {
    console.error('❌ Check failed:', error.message);
  }
}

check();
