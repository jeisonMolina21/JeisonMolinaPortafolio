import mysql from 'mysql2/promise';

const dbConfig = process.env.DATABASE_URL || process.env.URL_DE_LA_BASE_DE_DATOS
  ? (process.env.DATABASE_URL || process.env.URL_DE_LA_BASE_DE_DATOS)
  : {
      host: process.env.DB_HOST || process.env.HOST_DE_LA_BASE_DE_DATOS || 'localhost',
      port: parseInt(process.env.DB_PORT || process.env.Puerto_DB || '3306'),
      user: process.env.DB_USER || process.env.USUARIO_DE_LA_BASE_DE_DATOS || 'root',
      password: process.env.DB_PASSWORD || process.env.CONTRASEÑA_DE_BASE_DE_DATOS || '',
      database: process.env.DB_NAME || process.env.NOMBRE_DE_LA_BASE_DE_DATOS || 'my_proyectsast',
    };

const pool = typeof dbConfig === 'string' 
  ? mysql.createPool(dbConfig)
  : mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: false
      }
    });

export default pool;
