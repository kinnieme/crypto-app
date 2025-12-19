const Portfolio = require('../models/Portfolio');

// Purchase cryptocurrency and add to portfolio
const purchaseCrypto = async (req, res) => {
  try {
    const { userId, token, amount } = req.body;

    // Validation
    if (!userId || !token || !amount || amount <= 0) {
      return res.status(400).json({
        error: 'User ID, token name, and positive amount are required'
      });
    }

    // Validate userId is a number
    if (isNaN(userId) || parseInt(userId) <= 0) {
      return res.status(400).json({
        error: 'User ID must be a positive integer'
      });
    }

    // Validate amount is a positive number
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({
        error: 'Amount must be a positive number'
      });
    }

    // Validate token name
    if (typeof token !== 'string' || token.trim().length === 0) {
      return res.status(400).json({
        error: 'Token name must be a non-empty string'
      });
    }

    // Check if user exists (by attempting to get their assets)
    try {
      await Portfolio.getUserAssets(userId);
    } catch (error) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const portfolioEntry = await Portfolio.addCrypto(userId, token, amount);

    res.status(200).json({
      message: 'Cryptocurrency purchased successfully',
      portfolioEntry: portfolioEntry
    });
 } catch (error) {
    console.error('Error purchasing cryptocurrency:', error);
    res.status(500).json({
      error: 'Internal server error during purchase'
    });
 }
};

// Sell cryptocurrency and reduce from portfolio
const sellCrypto = async (req, res) => {
  try {
    const { userId, token, amount } = req.body;

    // Validation
    if (!userId || !token || !amount || amount <= 0) {
      return res.status(400).json({
        message: 'User ID, token name, and positive amount are required'
      });
    }

    // Validate userId is a number
    if (isNaN(userId) || parseInt(userId) <= 0) {
      return res.status(400).json({
        message: 'User ID must be a positive integer'
      });
    }

    // Validate amount is a positive number
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({
        message: 'Amount must be a positive number'
      });
    }

    // Validate token name
    if (typeof token !== 'string' || token.trim().length === 0) {
      return res.status(400).json({
        message: 'Token name must be a non-empty string'
      });
    }

    // Check if user exists (by attempting to get their assets)
    try {
      await Portfolio.getUserAssets(userId);
    } catch (error) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const result = await Portfolio.removeCrypto(userId, token, amount);

    res.status(200).json(result);
 } catch (error) {
    console.error('Error selling cryptocurrency:', error);
    if (error.message.includes('Insufficient funds') || error.message.includes('does not own')) {
      res.status(40).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error during sale' });
    }
  }
};

// Get user's crypto assets
const getUserAssets = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Validate userId is a number
    if (isNaN(userId) || parseInt(userId) <= 0) {
      return res.status(400).json({ message: 'User ID must be a positive integer' });
    }

    const assets = await Portfolio.getUserAssets(userId);
    res.json(assets);
  } catch (error) {
    console.error('Fetch user assets error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  purchaseCrypto,
 sellCrypto,
  getUserAssets
};