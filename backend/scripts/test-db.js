
const mysql = require('mysql2/promise');
require('dotenv').config();

async function test() {
  const configs = [
    { 
      host: process.env.DB_HOST, 
      port: parseInt(process.env.DB_PORT || '15903'),
      user: process.env.DB_USER, 
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME || 'my_proyectsast',
      ssl: { rejectUnauthorized: false }
    }
  ];

  for (const config of configs) {
    console.log(`Testing Aiven connection for user ${config.user}...`);
    try {
      const connection = await mysql.createConnection(config);
      console.log('✅ Aiven Connection SUCCESSFUL!');
      await connection.end();
      return;
    } catch (e) {
      console.log('❌ Failed:', e.message);
    }
  }
}

test();
