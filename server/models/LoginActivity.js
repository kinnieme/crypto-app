const db = require('./db');

class LoginActivity {
  // Get recent login activities
  static async getRecentActivities(limit = 5) {
    const query = 'SELECT time, status, ip FROM login_activity ORDER BY time DESC LIMIT $1';
    const result = await db.query(query, [limit]);
    return result.rows;
  }

 // Add login activity
  static async addActivity(status, ip) {
    const query = 'INSERT INTO login_activity (time, status, ip) VALUES (CURRENT_TIMESTAMP, $1, $2)';
    await db.query(query, [status, ip]);
  }
}

module.exports = LoginActivity;