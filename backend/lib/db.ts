import mysql from 'mysql2/promise';

// Fix: properly check env vars before using them as a URL string
const rawUrl = process.env.DATABASE_URL || process.env.URL_DE_LA_BASE_DE_DATOS;

const dbConfig = rawUrl
  ? rawUrl
  : {
      host: process.env.DB_HOST || process.env.HOST_DE_LA_BASE_DE_DATOS || 'localhost',
      port: parseInt(process.env.DB_PORT || process.env.Puerto_DB || '3306'),
      user: process.env.DB_USER || process.env.USUARIO_DE_LA_BASE_DE_DATOS || 'root',
      password: process.env.DB_PASSWORD || process.env.CONTRASEÑA_DE_BASE_DE_DATOS || '',
      database: process.env.DB_NAME || process.env.NOMBRE_DE_LA_BASE_DE_DATOS || 'my_proyectsast',
    };

if (typeof dbConfig === 'object') {
  console.log(`🔌 Attempting DB connection to host: ${dbConfig.host} (Port: ${dbConfig.port})`);
} else {
  console.log(`🔌 Attempting DB connection via DATABASE_URL (SSL Required)`);
}

const isLocalhost = typeof dbConfig === 'object' && (dbConfig as any).host === 'localhost';

const pool = mysql.createPool(
  typeof dbConfig === 'string'
    ? {
        uri: dbConfig,
        ssl: { rejectUnauthorized: false },
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      }
    : {
        ...(dbConfig as object),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        ssl: isLocalhost ? undefined : { rejectUnauthorized: false },
      }
);

(pool as any).on('error', (err: any) => {
  console.error('Unexpected error on idle database client', err);
});

export default pool;
