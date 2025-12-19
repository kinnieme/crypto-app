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
        await client.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name VARCHAR(50);');
      } catch (err) {
        // Column might already exist, which is fine
      }
      
      try {
        await client.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(50);');
      } catch (err) {
        // Column might already exist, which is fine
      }
      
      console.log('Database tables verified/created');
      
      // Create portfolio table if it doesn't exist
      await client.query(`
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
      
      // Insert a sample user if users table is empty
      const userCount = await client.query('SELECT COUNT(*) FROM users;');
      if (parseInt(userCount.rows[0].count) === 0) {
        await client.query(`
          INSERT INTO users (email, phone_code, phone_number, password_hash) VALUES
            ('john.doe@example.com', '+1', '1234567890', 'hashed_password');
        `);
        console.log('Sample user data inserted');
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
  // For backward compatibility, return the first user if no specific user requested
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

// API endpoint for user security information by user ID
app.get('/api/user-security/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT email, phone_code, phone_number FROM users WHERE id = $1';
  
  pool.query(query, [userId], (err, results) => {
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

// API endpoint for user account information
app.get('/api/user-account', (req, res) => {
  // For backward compatibility, return the first user if no specific user requested
  const query = 'SELECT first_name, last_name, email, phone_number FROM users ORDER BY id LIMIT 1';
  
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user account data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    if (results.rows.length > 0) {
      const user = results.rows[0];
      res.json({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone_number || ''
      });
    } else {
      // Return default values if no user found
      res.json({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      });
    }
  });
});

// API endpoint for user account information by user ID
app.get('/api/user-account/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT first_name, last_name, email, phone_number FROM users WHERE id = $1';
  
  pool.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user account data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    if (results.rows.length > 0) {
      const user = results.rows[0];
      res.json({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone_number || ''
      });
    } else {
      // Return default values if no user found
      res.json({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      });
    }
  });
});

// API endpoint to update user account information
app.put('/api/user-account', (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  
  // First check if any user exists
  pool.query('SELECT id FROM users LIMIT 1', (countErr, countResults) => {
    if (countErr) {
      console.error('Error checking user existence:', countErr);
      res.status(50).json({ error: 'Internal server error' });
      return;
    }

    if (countResults.rows.length > 0) {
      // User exists, update the first user
      const userId = countResults.rows[0].id;
      
      // Check if the email is being changed and if the new email already exists for another user
      if (email) {
        // First, get the current user's email to check if it's actually changing
        pool.query('SELECT email as current_email FROM users WHERE id = $1', [userId], (selectErr, selectResults) => {
          if (selectErr) {
            console.error('Error fetching current user email:', selectErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
  
          if (selectResults.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
          }
  
          const currentEmail = selectResults.rows[0].current_email;
  
          // Only check for duplicates if the email is actually changing
          if (currentEmail !== email) {
            // Check if email already exists for a different user
            pool.query('SELECT id FROM users WHERE email = $1 AND id != $2', [email, userId], (emailCheckErr, emailCheckResults) => {
              if (emailCheckErr) {
                console.error('Error checking email uniqueness:', emailCheckErr);
                res.status(500).json({ error: 'Internal server error' });
                return;
              }
              
              if (emailCheckResults.rows.length > 0) {
                // Email already exists for another user
                res.status(400).json({ error: 'Email is already registered by another user' });
                return;
              }
              
              // Email is unique, proceed with update
              const query = `
                UPDATE users
                SET first_name = $1, last_name = $2, email = $3, phone_number = $4, updated_at = CURRENT_TIMESTAMP
                WHERE id = $5
                RETURNING first_name, last_name, email, phone_number
              `;
              
              pool.query(query, [first_name, last_name, email, phone, userId], (err, results) => {
                if (err) {
                  console.error('Error updating user account data:', err);
                  res.status(500).json({ error: 'Internal server error' });
                  return;
                }
                
                if (results.rows.length > 0) {
                  const user = results.rows[0];
                  res.json({
                    first_name: user.first_name || '',
                    last_name: user.last_name || '',
                    email: user.email || '',
                    phone: user.phone_number || ''
                  });
                } else {
                  res.status(404).json({ error: 'User not found' });
                }
              });
            });
          } else {
            // Email is not changing, proceed with update without email validation
            const query = `
              UPDATE users
              SET first_name = $1, last_name = $2, phone_number = $3, updated_at = CURRENT_TIMESTAMP
              WHERE id = $4
              RETURNING first_name, last_name, email, phone_number
            `;
            
            pool.query(query, [first_name, last_name, phone, userId], (err, results) => {
              if (err) {
                console.error('Error updating user account data:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
              }
              
              if (results.rows.length > 0) {
                const user = results.rows[0];
                res.json({
                  first_name: user.first_name || '',
                  last_name: user.last_name || '',
                  email: user.email || '',
                  phone: user.phone_number || ''
                });
              } else {
                res.status(404).json({ error: 'User not found' });
              }
            });
          }
        });
      } else {
        // No email update, proceed directly
        const query = `
          UPDATE users
          SET first_name = $1, last_name = $2, phone_number = $3, updated_at = CURRENT_TIMESTAMP
          WHERE id = $4
          RETURNING first_name, last_name, email, phone_number
        `;
        
        pool.query(query, [first_name, last_name, phone, userId], (err, results) => {
          if (err) {
            console.error('Error updating user account data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          
          if (results.rows.length > 0) {
            const user = results.rows[0];
            res.json({
              first_name: user.first_name || '',
              last_name: user.last_name || '',
              email: user.email || '',
              phone: user.phone_number || ''
            });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        });
      }
    } else {
      // No users exist, create a new one
      const insertQuery = `
        INSERT INTO users (first_name, last_name, email, phone_number, password_hash)
        VALUES ($1, $2, $3, $4, 'default_hash')
        RETURNING first_name, last_name, email, phone_number
      `;
      
      pool.query(insertQuery, [first_name, last_name, email, phone], (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Error inserting user account data:', insertErr);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        
        if (insertResults.rows.length > 0) {
          const user = insertResults.rows[0];
          res.json({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            phone: user.phone_number || ''
          });
        } else {
          res.status(500).json({ error: 'Failed to create user' });
        }
      });
    }
  });
});

// API endpoint to update user account information by user ID
app.put('/api/user-account/:userId', (req, res) => {
  const userId = req.params.userId;
  const { first_name, last_name, email, phone } = req.body;
  
  // Check if the email is being changed and if the new email already exists for another user
  if (email) {
    // First, get the current user's email to check if it's actually changing
    pool.query('SELECT email as current_email FROM users WHERE id = $1', [userId], (selectErr, selectResults) => {
      if (selectErr) {
        console.error('Error fetching current user email:', selectErr);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (selectResults.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const currentEmail = selectResults.rows[0].current_email;

      // Only check for duplicates if the email is actually changing
      if (currentEmail !== email) {
        // Check if email already exists for a different user
        pool.query('SELECT id FROM users WHERE email = $1 AND id != $2', [email, userId], (emailCheckErr, emailCheckResults) => {
          if (emailCheckErr) {
            console.error('Error checking email uniqueness:', emailCheckErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          
          if (emailCheckResults.rows.length > 0) {
            // Email already exists for another user
            res.status(400).json({ error: 'Email is already registered by another user' });
            return;
          }
          
          // Email is unique, proceed with update
          const query = `
            UPDATE users
            SET first_name = $1, last_name = $2, email = $3, phone_number = $4, updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING first_name, last_name, email, phone_number
          `;
          
          pool.query(query, [first_name, last_name, email, phone, userId], (err, results) => {
            if (err) {
              console.error('Error updating user account data:', err);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }
            
            if (results.rows.length > 0) {
              const user = results.rows[0];
              res.json({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone: user.phone_number || ''
              });
            } else {
              res.status(404).json({ error: 'User not found' });
            }
          });
        });
      } else {
        // Email is not changing, proceed with update without email validation
        const query = `
          UPDATE users
          SET first_name = $1, last_name = $2, phone_number = $3, updated_at = CURRENT_TIMESTAMP
          WHERE id = $4
          RETURNING first_name, last_name, email, phone_number
        `;
        
        pool.query(query, [first_name, last_name, phone, userId], (err, results) => {
          if (err) {
            console.error('Error updating user account data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          
          if (results.rows.length > 0) {
            const user = results.rows[0];
            res.json({
              first_name: user.first_name || '',
              last_name: user.last_name || '',
              email: user.email || '',
              phone: user.phone_number || ''
            });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        });
      }
    });
  } else {
    // No email provided in update, proceed directly
    const query = `
      UPDATE users
      SET first_name = $1, last_name = $2, phone_number = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING first_name, last_name, email, phone_number
    `;
    
    pool.query(query, [first_name, last_name, phone, userId], (err, results) => {
      if (err) {
        console.error('Error updating user account data:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      
      if (results.rows.length > 0) {
        const user = results.rows[0];
        res.json({
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: user.email || '',
          phone: user.phone_number || ''
        });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });
  }
});

// API endpoint for user registration (signup)
app.post('/api/signup', async (req, res) => {
  const { method, email, phoneCode, phoneNumber, password } = req.body;

  // Validation
  if (!password || password.length < 6) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters long'
    });
  }

  if (method === 'email') {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please enter a valid email address'
      });
    }
  } else if (method === 'phone') {
    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      return res.status(400).json({
        error: 'Please enter a valid phone number'
      });
    }
  } else {
    return res.status(400).json({
      error: 'Invalid registration method'
    });
  }

  try {
    // Hash the password (in a real app, use bcrypt)
    // For now, we'll store the plain password hash as a placeholder
    const passwordHash = password; // In real app, use bcrypt.hashSync(password, 10);

    // Prepare user data based on registration method
    let insertQuery, queryParams;
    
    if (method === 'email') {
      insertQuery = `
        INSERT INTO users (email, password_hash, created_at, updated_at)
        VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id, first_name, last_name, email, phone_code, phone_number, created_at
      `;
      queryParams = [email, passwordHash];
    } else if (method === 'phone') {
      insertQuery = `
        INSERT INTO users (phone_code, phone_number, password_hash, created_at, updated_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id, first_name, last_name, email, phone_code, phone_number, created_at
      `;
      queryParams = [phoneCode, phoneNumber, passwordHash];
    }

    const result = await pool.query(insertQuery, queryParams);

    // Log successful registration in login_activity
    await pool.query(
      'INSERT INTO login_activity (time, status, ip) VALUES (CURRENT_TIMESTAMP, $1, $2)',
      ['Success', req.ip || req.connection.remoteAddress || 'unknown']
    );

    // Return success response with a token
    res.status(201).json({
      message: 'Registration successful',
      userId: result.rows[0].id,
      method: method,
      token: 'sample-jwt-token' // In a real app, generate an actual JWT token
    });

  } catch (err) {
    console.error('Error during registration:', err);
    
    // Check if it's a duplicate email error
    if (err.code === '23505') { // PostgreSQL unique violation
      return res.status(400).json({
        error: 'This email is already registered'
      });
    }
    
    res.status(500).json({
      error: 'Internal server error during registration'
    });
  }
});

// API endpoint for user login
app.post('/api/login', async (req, res) => {
  const { method, email, phoneCode, phoneNumber, password } = req.body;

  // Validation
  if (!password) {
    return res.status(400).json({
      error: 'Password is required'
    });
  }

  if (method === 'email') {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please enter a valid email address'
      });
    }
  } else if (method === 'phone') {
    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      return res.status(400).json({
        error: 'Please enter a valid phone number'
      });
    }
  } else {
    return res.status(400).json({
      error: 'Invalid login method'
    });
  }

  try {
    let query, queryParams;
    
    if (method === 'email') {
      query = 'SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = $1';
      queryParams = [email];
    } else if (method === 'phone') {
      query = 'SELECT id, first_name, last_name, phone_code, phone_number, password_hash FROM users WHERE phone_code = $1 AND phone_number = $2';
      queryParams = [phoneCode, phoneNumber];
    }

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      // Log failed login attempt
      await pool.query(
        'INSERT INTO login_activity (time, status, ip) VALUES (CURRENT_TIMESTAMP, $1, $2)',
        ['Fail', req.ip || req.connection.remoteAddress || 'unknown']
      );
      
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    const user = result.rows[0];
    
    // In a real app, compare hashed passwords using bcrypt.compareSync(password, user.password_hash)
    // For now, we'll do a simple comparison
    if (password !== user.password_hash) {
      // Log failed login attempt
      await pool.query(
        'INSERT INTO login_activity (time, status, ip) VALUES (CURRENT_TIMESTAMP, $1, $2)',
        ['Fail', req.ip || req.connection.remoteAddress || 'unknown']
      );
      
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Log successful login
    await pool.query(
      'INSERT INTO login_activity (time, status, ip) VALUES (CURRENT_TIMESTAMP, $1, $2)',
      ['Success', req.ip || req.connection.remoteAddress || 'unknown']
    );

    // Return success response with user info and token
    res.status(200).json({
      message: 'Login successful',
      userId: user.id,
      method: method,
      token: 'sample-jwt-token' // In a real app, generate an actual JWT token
    });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({
      error: 'Internal server error during login'
    });
  }
});

// API endpoint for purchasing cryptocurrency and adding to portfolio
app.post('/api/purchase-crypto', async (req, res) => {
  const { userId, token, amount } = req.body;

  // Validation
  if (!userId || !token || !amount || amount <= 0) {
    return res.status(400).json({
      error: 'User ID, token name, and positive amount are required'
    });
  }

  try {
    // Check if user exists
    const userResult = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    // Insert or update portfolio entry
    const query = `
      INSERT INTO portfolio (user_id, crypto_name, amount)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, crypto_name)
      DO UPDATE SET amount = portfolio.amount + EXCLUDED.amount, updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    const result = await pool.query(query, [userId, token, amount]);

    res.status(200).json({
      message: 'Cryptocurrency purchased successfully',
      portfolioEntry: result.rows[0]
    });

  } catch (err) {
    console.error('Error purchasing cryptocurrency:', err);
    res.status(500).json({
      error: 'Internal server error during purchase'
    });
  }
});

// API endpoint to get user's crypto assets
app.get('/api/user-assets/:userId', async (req, res) => {
  console.log('Received request for user assets:', req.params.userId);
  const { userId } = req.params;

  if (!userId) {
    console.log('No userId provided');
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Check if user exists
    const userQuery = 'SELECT id FROM users WHERE id = $1';
    const userResults = await pool.query(userQuery, [userId]);
    console.log('User query results:', userResults.rows.length);

    if (userResults.rows.length === 0) {
      console.log('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's crypto assets from the portfolio table
    const assetsQuery = `
      SELECT user_id, crypto_name as crypto_type, amount
      FROM portfolio
      WHERE user_id = $1
    `;
    const assets = await pool.query(assetsQuery, [userId]);
    console.log('Assets query results:', assets.rows);

    res.json(assets.rows);
  } catch (error) {
    console.error('Fetch user assets error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint for selling cryptocurrency and reducing from portfolio
app.post('/api/sell-crypto', async (req, res) => {
  const { userId, token, amount } = req.body;

  // Validation
  if (!userId || !token || !amount || amount <= 0) {
    return res.status(400).json({
      message: 'User ID, token name, and positive amount are required'
    });
  }

  try {
    // Check if user exists
    const userResult = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Check if user has enough of the specified crypto
    const currentAmountResult = await pool.query(
      'SELECT amount FROM portfolio WHERE user_id = $1 AND crypto_name = $2',
      [userId, token]
    );

    if (currentAmountResult.rows.length === 0) {
      return res.status(400).json({
        message: 'User does not own this cryptocurrency'
      });
    }

    const currentAmount = parseFloat(currentAmountResult.rows[0].amount);
    const sellAmount = parseFloat(amount);

    if (sellAmount > currentAmount) {
      return res.status(400).json({
        message: `Insufficient funds. User has ${currentAmount}, but tried to sell ${sellAmount}`
      });
    }

    // Update portfolio - reduce amount or remove entry if amount becomes 0
    if (sellAmount === currentAmount) {
      // Remove the entry completely if selling all
      await pool.query(
        'DELETE FROM portfolio WHERE user_id = $1 AND crypto_name = $2',
        [userId, token]
      );
    } else {
      // Reduce the amount
      await pool.query(
        'UPDATE portfolio SET amount = amount - $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND crypto_name = $3',
        [sellAmount, userId, token]
      );
    }

    res.status(200).json({
      message: 'Cryptocurrency sold successfully'
    });

  } catch (err) {
    console.error('Error selling cryptocurrency:', err);
    res.status(500).json({
      message: 'Internal server error during sale'
    });
  }
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