import mysql from 'mysql2/promise';

/**
 * Database configuration aliases to support multiple environments and naming conventions.
 */
const DB_CONFIG = {
  url: process.env.DATABASE_URL || process.env.URL_DE_LA_BASE_DE_DATOS,
  host: process.env.DB_HOST || process.env.HOST_DE_LA_BASE_DE_DATOS || 'localhost',
  port: parseInt(process.env.DB_PORT || process.env.Puerto_DB || '3306'),
  user: process.env.DB_USER || process.env.USUARIO_DE_LA_BASE_DE_DATOS || 'root',
  password: process.env.DB_PASSWORD || process.env.CONTRASEÑA_DE_BASE_DE_DATOS || '',
  database: process.env.DB_NAME || process.env.NOMBRE_DE_LA_BASE_DE_DATOS || 'my_proyectsast',
};

const isLocalhost = DB_CONFIG.host === 'localhost';

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
      ssl: isLocalhost ? undefined : { rejectUnauthorized: false },
    };

console.log(`🔌 Conectando a la base de datos (${DB_CONFIG.url ? 'URL' : DB_CONFIG.host})...`);

const pool = mysql.createPool({
  ...connectionOptions,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// mysql2/promise Pool doesn't expose 'on' with 'error' in the same way as the raw pool in some type versions.
// We can handle errors on individual connections or the underlying pool if needed, 
// but for the build to pass, we'll remove this listener or use the underlying pool.
(pool as any).on('error', (err: any) => {
  console.error('❌ Error inesperado en el pool de la base de datos:', err);
});


export default pool;

