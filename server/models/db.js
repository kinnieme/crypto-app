const { Pool } = require('pg');
const config = require('../../config/config');

// Database connection
const pool = new Pool(config.database);

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};