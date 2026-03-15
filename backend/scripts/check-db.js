
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
    
    const [users] = await connection.query('SELECT id, username FROM users');
    console.log('Users in DB:', JSON.stringify(users, null, 2));

    await connection.end();
  } catch (error) {
    console.error('❌ Check failed:', error.message);
  }
}

check();
