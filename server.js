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
  database: process.env.DB_NAME || 'crypto',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to database');
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
  // Return sample data for market trends
  res.json([
    { id: 1, rank: 1, name: 'Bitcoin', price: '43,250.30', change_24h: '2.45' },
    { id: 2, rank: 2, name: 'Ethereum', price: '2,310.75', change_24h: '-1.23' },
    { id: 3, rank: 3, name: 'Tether', price: '1.00', change_24h: '0.01' },
    { id: 4, rank: 4, name: 'Ripple', price: '0.6235', change_24h: '3.75' },
    { id: 5, rank: 5, name: 'Dogecoin', price: '0.0823', change_24h: '-2.15' }
  ]);
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