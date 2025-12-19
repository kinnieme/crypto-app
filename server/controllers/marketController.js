const MarketTrend = require('../models/MarketTrend');
const LoginActivity = require('../models/LoginActivity');
const User = require('../models/User');

// Get market trends
const getMarketTrends = async (req, res) => {
  try {
    const marketTrends = await MarketTrend.getAll();
    res.json(marketTrends);
  } catch (error) {
    console.error('Error fetching market trends:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get login activity
const getLoginActivity = async (req, res) => {
  try {
    const loginActivity = await LoginActivity.getRecentActivities();
    res.json(loginActivity);
  } catch (error) {
    console.error('Error fetching login activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user ID (for backward compatibility)
const getUserId = async (req, res) => {
  try {
    // In a real application, we would get the user ID from the authenticated session
    // For now, we'll return the ID of the first user in the database
    const users = await User.getAll(1, 0);
    
    if (users.length > 0) {
      res.json({ userId: users[0].id });
    } else {
      // Return a default ID if no user is found
      res.json({ userId: 12345 });
    }
  } catch (error) {
    console.error('Error fetching user ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getMarketTrends,
  getLoginActivity,
  getUserId
};