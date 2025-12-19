const db = require('../models/db');

async function initializeDatabase() {
  try {
    // Create market_trends table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS market_trends (
        id SERIAL PRIMARY KEY,
        rank INTEGER NOT NULL,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(15, 3) NOT NULL,
        change_24h DECIMAL(6, 2) NOT NULL
      );
    `);
    
    // Create login_activity table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS login_activity (
        id SERIAL PRIMARY KEY,
        time TIMESTAMP NOT NULL,
        status VARCHAR(10) NOT NULL CHECK (status IN ('Success', 'Fail')),
        ip INET NOT NULL
      );
    `);
    
    // Create users table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(255) UNIQUE,
        phone_code VARCHAR(10),
        phone_number VARCHAR(20),
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Add first_name and last_name columns if they don't exist
    try {
      await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name VARCHAR(50);');
    } catch (err) {
      // Column might already exist, which is fine
    }
    
    try {
      await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(50);');
    } catch (err) {
      // Column might already exist, which is fine
    }
    
    console.log('Database tables verified/created');
    
    // Create portfolio table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        crypto_name VARCHAR(50) NOT NULL,
        amount DECIMAL(18, 8) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, crypto_name)
      );
    `);
    console.log('Portfolio table verified/created');
    
    // Insert sample data if market_trends table is empty
    const marketCount = await db.query('SELECT COUNT(*) FROM market_trends;');
    if (parseInt(marketCount.rows[0].count) === 0) {
      await db.query(`
        INSERT INTO market_trends (rank, name, price, change_24h) VALUES
          (1, 'Bitcoin', 94456.987, 16.50),
          (2, 'Ethereum', 50632.964, -10.80),
          (3, 'Tether', 15896.123, -5.80),
          (4, 'Ripple', 5548.621, 14.60),
          (5, 'Dogecoin', 15548.621, 14.60);
      `);
      console.log('Sample market_trends data inserted');
    }
    
    // Insert sample data if login_activity table is empty
    const loginCount = await db.query('SELECT COUNT(*) FROM login_activity;');
    if (parseInt(loginCount.rows[0].count) === 0) {
      await db.query(`
        INSERT INTO login_activity (time, status, ip) VALUES
          ('2025-04-24 19:50:45', 'Success', '192.72.134.201'),
          ('2025-04-23 14:02:11', 'Fail', '104.16.201.8'),
          ('2025-04-22 09:15:33', 'Success', '72.21.214.11'),
          ('2025-04-21 22:40:57', 'Success', '185.64.12.55'),
          ('2025-04-20 06:05:02', 'Fail', '45.91.184.62');
      `);
      console.log('Sample login_activity data inserted');
    }
    
    // Insert a sample user if users table is empty
    const userCount = await db.query('SELECT COUNT(*) FROM users;');
    if (parseInt(userCount.rows[0].count) === 0) {
      const bcrypt = require('bcryptjs');
      const defaultPasswordHash = bcrypt.hashSync('default_password', 10);
      await db.query(`
        INSERT INTO users (email, phone_code, phone_number, password_hash) VALUES
          ('john.doe@example.com', '+1', '1234567890', $1);
      `, [defaultPasswordHash]);
      console.log('Sample user data inserted');
    }
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

module.exports = { initializeDatabase };