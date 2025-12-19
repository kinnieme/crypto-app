const db = require('./db');

class User {
  // Get user by ID
  static async getById(id) {
    const query = 'SELECT id, first_name, last_name, email, phone_code, phone_number, created_at, updated_at FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Get user by email
  static async getByEmail(email) {
    const query = 'SELECT id, first_name, last_name, email, phone_code, phone_number, password_hash FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  // Get user by phone
  static async getByPhone(phoneCode, phoneNumber) {
    const query = 'SELECT id, first_name, last_name, email, phone_code, phone_number, password_hash FROM users WHERE phone_code = $1 AND phone_number = $2';
    const result = await db.query(query, [phoneCode, phoneNumber]);
    return result.rows[0];
  }

  // Create new user
  static async create(userData) {
    const {
      email,
      phoneCode,
      phoneNumber,
      passwordHash,
      firstName,
      lastName
    } = userData;

    let query, queryParams;
    
    if (email) {
      query = `
        INSERT INTO users (first_name, last_name, email, password_hash, created_at, updated_at)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id, first_name, last_name, email, phone_code, phone_number, created_at
      `;
      queryParams = [firstName, lastName, email, passwordHash];
    } else {
      query = `
        INSERT INTO users (first_name, last_name, phone_code, phone_number, password_hash, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id, first_name, last_name, email, phone_code, phone_number, created_at
      `;
      queryParams = [firstName, lastName, phoneCode, phoneNumber, passwordHash];
    }

    const result = await db.query(query, queryParams);
    return result.rows[0];
  }

  // Update user
  static async update(id, userData) {
    const {
      first_name,
      last_name,
      email,
      phone_number
    } = userData;

    // Check if email already exists for another user
    if (email) {
      const emailCheckQuery = 'SELECT id FROM users WHERE email = $1 AND id != $2';
      const emailCheckResult = await db.query(emailCheckQuery, [email, id]);
      if (emailCheckResult.rows.length > 0) {
        throw new Error('Email is already registered by another user');
      }
    }

    let query, queryParams;
    if (email) {
      query = `
        UPDATE users
        SET first_name = $1, last_name = $2, email = $3, phone_number = $4, updated_at = CURRENT_TIMESTAMP
        WHERE id = $5
        RETURNING first_name, last_name, email, phone_number
      `;
      queryParams = [first_name, last_name, email, phone_number, id];
    } else {
      query = `
        UPDATE users
        SET first_name = $1, last_name = $2, phone_number = $3, updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING first_name, last_name, email, phone_number
      `;
      queryParams = [first_name, last_name, phone_number, id];
    }

    const result = await db.query(query, queryParams);
    return result.rows[0];
  }

  // Get all users (for admin purposes)
  static async getAll(limit = 10, offset = 0) {
    const query = `
      SELECT id, first_name, last_name, email, phone_code, phone_number, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  }
}

module.exports = User;