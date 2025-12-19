const db = require('./db');

class Portfolio {
  // Get user's crypto assets
 static async getUserAssets(userId) {
    const query = `
      SELECT user_id, crypto_name as crypto_type, amount
      FROM portfolio
      WHERE user_id = $1
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

 // Add cryptocurrency to user's portfolio
  static async addCrypto(userId, token, amount) {
    const query = `
      INSERT INTO portfolio (user_id, crypto_name, amount)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, crypto_name)
      DO UPDATE SET amount = portfolio.amount + EXCLUDED.amount, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    const result = await db.query(query, [userId, token, amount]);
    return result.rows[0];
  }

  // Remove cryptocurrency from user's portfolio
  static async removeCrypto(userId, token, amount) {
    const currentAmountResult = await db.query(
      'SELECT amount FROM portfolio WHERE user_id = $1 AND crypto_name = $2',
      [userId, token]
    );

    if (currentAmountResult.rows.length === 0) {
      throw new Error('User does not own this cryptocurrency');
    }

    const currentAmount = parseFloat(currentAmountResult.rows[0].amount);
    const sellAmount = parseFloat(amount);

    if (sellAmount > currentAmount) {
      throw new Error(`Insufficient funds. User has ${currentAmount}, but tried to sell ${sellAmount}`);
    }

    let result;
    if (sellAmount === currentAmount) {
      // Remove the entry completely if selling all
      await db.query(
        'DELETE FROM portfolio WHERE user_id = $1 AND crypto_name = $2',
        [userId, token]
      );
      result = { message: 'Cryptocurrency sold successfully' };
    } else {
      // Reduce the amount
      await db.query(
        'UPDATE portfolio SET amount = amount - $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND crypto_name = $3',
        [sellAmount, userId, token]
      );
      result = { message: 'Cryptocurrency sold successfully' };
    }

    return result;
  }

  // Get user's specific crypto amount
  static async getUserCryptoAmount(userId, token) {
    const query = 'SELECT amount FROM portfolio WHERE user_id = $1 AND crypto_name = $2';
    const result = await db.query(query, [userId, token]);
    return result.rows[0] ? parseFloat(result.rows[0].amount) : 0;
  }
}

module.exports = Portfolio;