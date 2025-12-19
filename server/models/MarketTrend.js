const db = require('./db');

class MarketTrend {
  // Get all market trends
  static async getAll() {
    const query = 'SELECT rank, name, price, change_24h FROM market_trends ORDER BY rank';
    const result = await db.query(query);
    
    // Format the data to match what the frontend expects
    return result.rows.map(row => ({
      id: row.rank, // Using rank as id since it's unique
      rank: row.rank,
      name: row.name,
      price: row.price,
      change_24h: row.change_24h
    }));
  }

  // Update market trend
  static async update(rank, data) {
    const { name, price, change_24h } = data;
    const query = `
      UPDATE market_trends
      SET name = $1, price = $2, change_24h = $3
      WHERE rank = $4
      RETURNING *
    `;
    const result = await db.query(query, [name, price, change_24h, rank]);
    return result.rows[0];
  }

  // Add new market trend
 static async create(data) {
    const { rank, name, price, change_24h } = data;
    const query = `
      INSERT INTO market_trends (rank, name, price, change_24h)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await db.query(query, [rank, name, price, change_24h]);
    return result.rows[0];
  }
}

module.exports = MarketTrend;