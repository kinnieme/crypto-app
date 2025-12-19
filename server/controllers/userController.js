const User = require('../models/User');
const LoginActivity = require('../models/LoginActivity');
const bcrypt = require('bcryptjs');

// Get user account information
const getUserAccount = async (req, res) => {
  try {
    const userId = req.params.userId || (await User.getAll(1, 0))[0]?.id; // fallback to first user
    
    if (!userId) {
      return res.status(404).json({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      });
    }

    const user = await User.getById(userId);
    
    if (user) {
      res.json({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone_number || ''
      });
    } else {
      res.status(404).json({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      });
    }
 } catch (error) {
    console.error('Error fetching user account data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user account information
const updateUserAccount = async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;
    const userId = req.params.userId || (await User.getAll(1, 0))[0]?.id; // fallback to first user

    // Validate input
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
    }

    if (phone && phone.length < 10) {
      return res.status(400).json({ error: 'Phone number must be at least 10 digits' });
    }

    if (!userId) {
      // No users exist, create a new one
      const passwordHash = bcrypt.hashSync('default_password', 10); // В реальном приложении пароль должен быть предоставлен
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        phone_number: phone,
        passwordHash
      });

      return res.json({
        first_name: newUser.first_name || '',
        last_name: newUser.last_name || '',
        email: newUser.email || '',
        phone: newUser.phone_number || ''
      });
    }

    const updatedUser = await User.update(userId, {
      first_name,
      last_name,
      email,
      phone_number: phone
    });

    res.json({
      first_name: updatedUser.first_name || '',
      last_name: updatedUser.last_name || '',
      email: updatedUser.email || '',
      phone: updatedUser.phone_number || ''
    });
  } catch (error) {
    console.error('Error updating user account data:', error);
    if (error.message === 'Email is already registered by another user') {
      res.status(409).json({ error: error.message }); // Use 409 Conflict for duplicate email
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// User registration
const registerUser = async (req, res) => {
  try {
    const { method, email, phoneCode, phoneNumber, password, firstName, lastName } = req.body;

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
    } else {
      return res.status(400).json({
        error: 'Invalid registration method'
      });
    }

    // Check if user already exists
    if (method === 'email') {
      const existingUser = await User.getByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          error: 'This email is already registered'
        });
      }
    } else if (method === 'phone') {
      const existingUser = await User.getByPhone(phoneCode, phoneNumber);
      if (existingUser) {
        return res.status(409).json({
          error: 'This phone number is already registered'
        });
      }
    }

    // Hash the password
    const passwordHash = bcrypt.hashSync(password, 10);

    // Create user
    let userData = {
      passwordHash,
      firstName: firstName || null,
      lastName: lastName || null
    };

    if (method === 'email') {
      userData.email = email;
    } else if (method === 'phone') {
      userData.phoneCode = phoneCode;
      userData.phoneNumber = phoneNumber;
    }

    const newUser = await User.create(userData);

    // Log successful registration
    await LoginActivity.addActivity('Success', req.ip || req.connection.remoteAddress || 'unknown');

    // Return success response with a token
    res.status(201).json({
      message: 'Registration successful',
      userId: newUser.id,
      method: method,
      token: 'sample-jwt-token' // In a real app, generate an actual JWT token
    });
  } catch (error) {
    console.error('Error during registration:', error);
    
    // Check if it's a duplicate email error
    if (error.code === '23505') { // PostgreSQL unique violation
      return res.status(409).json({
        error: 'This email is already registered'
      });
    }
    
    res.status(500).json({
      error: 'Internal server error during registration'
    });
 }
};

// User login
const loginUser = async (req, res) => {
  try {
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
    } else {
      return res.status(400).json({
        error: 'Invalid login method'
      });
    }

    let user;
    if (method === 'email') {
      user = await User.getByEmail(email);
    } else if (method === 'phone') {
      user = await User.getByPhone(phoneCode, phoneNumber);
    }

    if (!user) {
      // Log failed login attempt
      await LoginActivity.addActivity('Fail', req.ip || req.connection.remoteAddress || 'unknown');
      
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Compare passwords
    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordValid) {
      // Log failed login attempt
      await LoginActivity.addActivity('Fail', req.ip || req.connection.remoteAddress || 'unknown');
      
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Log successful login
    await LoginActivity.addActivity('Success', req.ip || req.connection.remoteAddress || 'unknown');

    // Return success response with user info and token
    res.status(200).json({
      message: 'Login successful',
      userId: user.id,
      method: method,
      token: 'sample-jwt-token' // In a real app, generate an actual JWT token
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      error: 'Internal server error during login'
    });
 }
};

// Get user security information
const getUserSecurity = async (req, res) => {
  try {
    const userId = req.params.userId || (await User.getAll(1, 0))[0]?.id; // fallback to first user
    
    if (!userId) {
      return res.json({
        email: 'Unverified',
        phone: 'Unverified',
        loginPassword: 'Not Set',
        antiPhishingEnabled: false
      });
    }

    const user = await User.getById(userId);
    
    if (user) {
      // Format the phone number with the code if available
      const phoneNumber = user.phone_number ? `${user.phone_code || ''} ${user.phone_number}`.trim() : 'Unverified';
      res.json({
        email: user.email || 'Unverified',
        phone: phoneNumber,
        loginPassword: 'Set', // This would be determined by checking if password_hash exists
        antiPhishingEnabled: false // This would be stored in the database in a real app
      });
    } else {
      // Return default values if no user found
      res.json({
        email: 'Unverified',
        phone: 'Unverified',
        loginPassword: 'Not Set',
        antiPhishingEnabled: false
      });
    }
  } catch (error) {
    console.error('Error fetching user security data:', error);
    res.status(500).json({ error: 'Internal server error' });
 }
};

module.exports = {
  getUserAccount,
 updateUserAccount,
  registerUser,
  loginUser,
  getUserSecurity
};