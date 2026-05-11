require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mysql = require('mysql2/promise');

async function updateProfileImage() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const imageUrl = 'https://r5gn07qd2saa8p0c.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-15%20at%207.22.08%20PM%20%281%29.jpeg';
    await connection.query('UPDATE profile_settings SET image_url = ? WHERE id = 1', [imageUrl]);
    console.log('✅ Profile image updated successfully!');
  } catch (err) {
    console.error('❌ Error updating profile image:', err);
  } finally {
    await connection.end();
  }
}

updateProfileImage();
