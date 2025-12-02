const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'crypto_app',
 password: process.env.DB_PASSWORD || '123123',
  port: process.env.DB_PORT || 5432,
});

// Initialize database tables if they don't exist
async function initializeDatabase() {
  try {
    const client = await pool.connect();
    try {
      // Create market_trends table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS market_trends (
          id SERIAL PRIMARY KEY,
          rank INTEGER NOT NULL,
          name VARCHAR(100) NOT NULL,
          price DECIMAL(15, 3) NOT NULL,
          change_24h DECIMAL(6, 2) NOT NULL
        );
      `);
      
      // Create login_activity table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS login_activity (
          id SERIAL PRIMARY KEY,
          time TIMESTAMP NOT NULL,
          status VARCHAR(10) NOT NULL CHECK (status IN ('Success', 'Fail')),
          ip INET NOT NULL
        );
      `);
      
      // Create users table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE,
          phone_code VARCHAR(10),
          phone_number VARCHAR(20),
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      console.log('Database tables verified/created');
      
      // Insert sample data if market_trends table is empty
      const marketCount = await client.query('SELECT COUNT(*) FROM market_trends;');
      if (parseInt(marketCount.rows[0].count) === 0) {
        await client.query(`
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
      const loginCount = await client.query('SELECT COUNT(*) FROM login_activity;');
      if (parseInt(loginCount.rows[0].count) === 0) {
        await client.query(`
          INSERT INTO login_activity (time, status, ip) VALUES
            ('2025-04-24 19:50:45', 'Success', '192.72.134.201'),
            ('2025-04-23 14:02:11', 'Fail', '104.16.201.8'),
            ('2025-04-22 09:15:33', 'Success', '72.21.214.11'),
            ('2025-04-21 22:40:57', 'Success', '185.64.12.55'),
            ('2025-04-20 06:05:02', 'Fail', '45.91.184.62');
        `);
        console.log('Sample login_activity data inserted');
      }
      
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

// Connect to database and initialize tables
pool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    // Try to create the database by connecting to default postgres database
    console.log('Attempting to create database and tables...');
    return;
  }
  console.log('Connected to database');
  initializeDatabase();
});

// API endpoint for login activity
app.get('/api/login-activity', (req, res) => {
  const query = 'SELECT time, status, ip FROM login_activity ORDER BY time DESC LIMIT 5';
  
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching login activity:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    res.json(results.rows);
  });
});

// API endpoint for market trends
app.get('/api/market-trends', (req, res) => {
  const query = 'SELECT rank, name, price, change_24h FROM market_trends ORDER BY rank';
  
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching market trends:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    // Format the data to match what the frontend expects
    const formattedResults = results.rows.map(row => ({
      id: row.rank, // Using rank as id since it's unique
      rank: row.rank,
      name: row.name,
      price: row.price,
      change_24h: row.change_24h
    }));
    
    res.json(formattedResults);
  });
});

// API endpoint for user ID
app.get('/api/user-id', (req, res) => {
  // In a real application, we would get the user ID from the authenticated session
  // For now, we'll return the ID of the first user in the database
  const query = 'SELECT id FROM users ORDER BY id LIMIT 1';
  
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user ID:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    if (results.rows.length > 0) {
      res.json({ userId: results.rows[0].id });
    } else {
      // Return a default ID if no user is found
      res.json({ userId: 12345 });
    }
  });
});

// API endpoint for user security information
app.get('/api/user-security', (req, res) => {
  // In a real application, we would get the user ID from the authenticated session
  // For now, we'll use a placeholder user ID or fetch the first user
  const query = 'SELECT email, phone_code, phone_number FROM users ORDER BY id LIMIT 1';
  
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user security data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    if (results.rows.length > 0) {
      const user = results.rows[0];
      // Format the phone number with the code if available
      const phoneNumber = user.phone_number ? `${user.phone_code || ''} ${user.phone_number}`.trim() : 'Unverified';
      res.json({
        email: user.email || 'Unverified',
        phone: phoneNumber,
        loginPassword: 'Set', // This would be determined by checking if password_hash exists
        antiPhishingEnabled: false // This would be stored in the database in a real app
      });
    } else {
      // Return default values if no user found
      res.json({
        email: 'Unverified',
        phone: 'Unverified',
        loginPassword: 'Not Set',
        antiPhishingEnabled: false
      });
    }
  });
});

// Serve static files from the React app build directory
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});