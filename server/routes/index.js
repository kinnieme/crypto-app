const express = require('express');
const router = express.Router();

const {
  getUserAccount,
  updateUserAccount,
  registerUser,
  loginUser,
  getUserSecurity
} = require('../controllers/userController');

const {
  purchaseCrypto,
  sellCrypto,
  getUserAssets
} = require('../controllers/portfolioController');

const {
  getMarketTrends,
  getLoginActivity,
  getUserId
} = require('../controllers/marketController');

const {
  validateUserId,
  validateRegistrationData,
  validateLoginData,
  validateCryptoTransaction
} = require('../middleware/validation');

// User routes
router.get('/user-account/:userId?', validateUserId, getUserAccount);
router.put('/user-account/:userId?', validateUserId, updateUserAccount);
router.post('/signup', validateRegistrationData, registerUser);
router.post('/login', validateLoginData, loginUser);
router.get('/user-security/:userId?', validateUserId, getUserSecurity);

// Portfolio routes
router.post('/purchase-crypto', validateCryptoTransaction, purchaseCrypto);
router.post('/sell-crypto', validateCryptoTransaction, sellCrypto);
router.get('/user-assets/:userId', validateUserId, getUserAssets);

// Market and general routes
router.get('/market-trends', getMarketTrends);
router.get('/login-activity', getLoginActivity);
router.get('/user-id', getUserId);

module.exports = router;