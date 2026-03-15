import mysql from 'mysql2/promise';

const dbConfig = process.env.DATABASE_URL 
  ? { uri: process.env.DATABASE_URL }
  : {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'my_proyectsast',
    };

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
