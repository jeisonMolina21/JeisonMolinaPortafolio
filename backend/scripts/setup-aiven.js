
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setup() {
  const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '15903'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false }
  };

  try {
    const connection = await mysql.createConnection(config);
    console.log('Creating database my_proyectsast...');
    await connection.query('CREATE DATABASE IF NOT EXISTS my_proyectsast');
    await connection.query('USE my_proyectsast');

    console.log('Creating necessary tables...');
    
    // profile_settings
    await connection.query(`
      CREATE TABLE IF NOT EXISTS profile_settings (
        id INT PRIMARY KEY DEFAULT 1,
        full_name VARCHAR(255),
        title TEXT,
        bio TEXT,
        location VARCHAR(100),
        whatsapp VARCHAR(255),
        email VARCHAR(255),
        linkedin VARCHAR(255),
        github VARCHAR(255),
        image_url VARCHAR(255),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Ensure github column exists if table was already there
    try {
      await connection.query('ALTER TABLE profile_settings ADD COLUMN github VARCHAR(255) AFTER linkedin');
    } catch (e) {
      // Column might already exist
    }

    // projects
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        video_url VARCHAR(255),
        github_url VARCHAR(255),
        demo_url VARCHAR(255),
        tech_stack TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // experience
    await connection.query(`
      CREATE TABLE IF NOT EXISTS experience (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        period VARCHAR(100),
        description TEXT,
        skills TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // education
    await connection.query(`
      CREATE TABLE IF NOT EXISTS education (
        id INT AUTO_INCREMENT PRIMARY KEY,
        institution VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        period VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // skills
    await connection.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // messages
    await connection.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        whatsapp VARCHAR(50),
        city VARCHAR(100),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.end();
    console.log('✅ Database and Tables SETUP SUCCESSFUL!');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

setup();
