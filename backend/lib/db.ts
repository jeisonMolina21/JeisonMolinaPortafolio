import mysql from 'mysql2/promise';

/**
 * Singleton pattern for Database Pool to avoid multiple connections in Serverless.
 */
let pool: mysql.Pool;

const DB_CONFIG = {
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

if (!(global as any).pool) {
  const connectionOptions: any = DB_CONFIG.url
    ? {
        uri: DB_CONFIG.url,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: DB_CONFIG.host,
        port: DB_CONFIG.port,
        user: DB_CONFIG.user,
        password: DB_CONFIG.password,
        database: DB_CONFIG.database,
        ssl: { rejectUnauthorized: false },
      };

  (global as any).pool = mysql.createPool({
    ...connectionOptions,
    waitForConnections: true,
    connectionLimit: 1, // Reducimos a 1 para serverless para evitar saturar Aiven
    maxIdle: 1,
    idleTimeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
  
  console.log('🔌 [DB]: Pool de conexiones inicializado (Modo Serverless)');
}

pool = (global as any).pool;

export default pool;

