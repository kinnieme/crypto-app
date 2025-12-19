// Application configuration
const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development',
  },

  // Database configuration
  database: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'crypto_app',
    password: process.env.DB_PASSWORD || '123123',
    port: process.env.DB_PORT || 5432,
  },

  // Security configuration
  security: {
    // Rate limiting
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10, // Limit each IP to 100 requests per windowMs
    },
    
    // JWT configuration (if implemented later)
    jwt: {
      secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
    
    // CORS configuration
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    }
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    logDir: process.env.LOG_DIR || './logs',
  },

  // Performance configuration
  performance: {
    compression: {
      level: 6,
      threshold: 1024,
    },
  },

  // API configuration
  api: {
    version: 'v1',
    basePath: '/api',
  }
};

module.exports = config;