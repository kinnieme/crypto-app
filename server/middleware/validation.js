const validateUserId = (req, res, next) => {
  const userId = req.params.userId || req.body.userId;
  
  if (userId === undefined || userId === null) {
    return next(); // Allow undefined userId for routes that have fallback logic
  }
  
  if (isNaN(userId) || parseInt(userId) <= 0) {
    return res.status(400).json({ error: 'User ID must be a positive integer' });
  }
  
  req.userId = parseInt(userId);
  next();
};

const validateRegistrationData = (req, res, next) => {
 const { method, email, phoneCode, phoneNumber, password } = req.body;
  
  // Validation
  if (!password || password.length < 6) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters long'
    });
 }

  if (method === 'email') {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please enter a valid email address'
      });
    }
  } else if (method === 'phone') {
    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      return res.status(400).json({
        error: 'Please enter a valid phone number'
      });
    }
    
    if (!phoneCode) {
      return res.status(400).json({
        error: 'Phone code is required'
      });
    }
  } else {
    return res.status(400).json({
      error: 'Invalid registration method'
    });
  }
  
  next();
};

const validateLoginData = (req, res, next) => {
 const { method, email, phoneCode, phoneNumber, password } = req.body;

  // Validation
  if (!password) {
    return res.status(400).json({
      error: 'Password is required'
    });
  }

 if (method === 'email') {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please enter a valid email address'
      });
    }
  } else if (method === 'phone') {
    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      return res.status(400).json({
        error: 'Please enter a valid phone number'
      });
    }
    
    if (!phoneCode) {
      return res.status(400).json({
        error: 'Phone code is required'
      });
    }
  } else {
    return res.status(400).json({
      error: 'Invalid login method'
    });
  }
  
  next();
};

const validateCryptoTransaction = (req, res, next) => {
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
  
  next();
};

module.exports = {
  validateUserId,
  validateRegistrationData,
  validateLoginData,
  validateCryptoTransaction
};