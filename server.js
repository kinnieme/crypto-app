const express = require('express');
const path = require('path');
const cors = require('cors');

// Load configuration
const config = require('./config/config');

// Import security middleware
const {
  limiter,
  speedLimiter,
  sanitizeMongo,
 sanitizeXss,
  securityHeaders,
  additionalSecurity
} = require('./server/middleware/security');

// Import performance middleware
const {
  compress,
  cacheStaticAssets,
  trackResponseTime,
  serveStaticFiles
} = require('./server/middleware/performance');

// Import logging
const { logger, requestLogger } = require('./server/utils/logger');

const app = express();
require('dotenv').config();

// Apply logging middleware first
app.use(requestLogger); // Log all HTTP requests

// Apply performance middleware
app.use(compress); // Compression for all responses
app.use(trackResponseTime); // Track response times

// Apply security middleware
app.use(limiter); // Rate limiting
app.use(speedLimiter); // Slow down requests
app.use(securityHeaders); // Security headers
app.use(additionalSecurity); // Additional security headers

// Middleware
app.use(cors(config.security.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeMongo); // Sanitize data against NoSQL query injection
app.use(sanitizeXss); // Sanitize data against XSS
app.use(cacheStaticAssets); // Cache static assets
app.use(serveStaticFiles); // Serve static files with performance optimizations

// Import routes
const apiRoutes = require('./server/routes');

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
app.use(config.api.basePath, apiRoutes);

// Catch-all handler for React Router to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error occurred:', { error: err.message, stack: err.stack, url: req.url, method: req.method });
  res.status(500).send('Something broke!');
});

// Import and run database initialization
const { initializeDatabase } = require('./server/utils/dbInitializer');
const { pool } = require('./server/models/db');

// Connect to database and initialize tables
(async () => {
  try {
    const dbPool = await pool;
    // Test the connection
    await dbPool.query('SELECT 1');
    logger.info('Connected to database');
    initializeDatabase();
  } catch (err) {
    logger.error('Database connection failed:', err);
  }
})();

const PORT = config.server.port;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} in ${config.server.env} mode`);
});