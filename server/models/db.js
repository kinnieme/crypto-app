const { Pool, Client } = require('pg');
const config = require('../../config/config');

// Function to create database if it doesn't exist
async function createDatabaseIfNotExists() {
  // Connect to default postgres database first
  const client = new Client({
    user: config.database.user,
    host: config.database.host,
    database: 'postgres', // Connect to default postgres database
    password: config.database.password,
    port: config.database.port,
  });

  try {
    await client.connect();
    const result = await client.query(
      `SELECT 1 FROM pg_catalog.pg_database WHERE datname = '${config.database.database}'`
    );

    if (result.rowCount === 0) {
      // Database doesn't exist, create it
      await client.query(`CREATE DATABASE "${config.database.database}"`);
      console.log(`Database "${config.database.database}" created successfully`);
    } else {
      console.log(`Database "${config.database.database}" already exists`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
    throw err;
  } finally {
    await client.end();
  }
}

// Create database if it doesn't exist before creating the pool
async function initializeDatabaseConnection() {
  await createDatabaseIfNotExists();
  return new Pool(config.database);
}

// Initialize the database connection
const initializePool = initializeDatabaseConnection();

module.exports = {
  query: async (text, params) => {
    const pool = await initializePool;
    return pool.query(text, params);
  },
  pool: initializePool
};