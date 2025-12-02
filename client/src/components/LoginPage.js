import React, { useState } from 'react';
import './SignupPage.css';

const LoginPage = () => {
  const [registrationMethod, setRegistrationMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('+7');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistrationMethodChange = (method) => {
    setRegistrationMethod(method);
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация пароля
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    let userData = {};
    
    if (registrationMethod === 'email') {
      // Валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      userData = {
        method: 'email',
        email: email,
        password: password
      };
    } else {
      // Валидация номера телефона
      if (!phoneNumber || phoneNumber.length < 10) {
        alert('Please enter a valid phone number');
        return;
      }
      
      userData = {
        method: 'phone',
        phoneCode: phoneCode,
        phoneNumber: phoneNumber,
        password: password
      };
    }
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        const result = await response.json();
        alert('Login successful!');
        console.log(result);
        // Сохраняем токен в localStorage (в реальном приложении токен будет в ответе)
        localStorage.setItem('authToken', 'some-token-value');
        // Перенаправление на главную страницу или другую страницу после входа
        window.location.href = '/dashboard';
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  };

 return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="logo-section">
          <img src="/image/signup/logo.svg" alt="Zyrix Logo" className="signup-logo" />
        </div>
        
        <div className="registration-method-section">
          <div 
            className={`method-button ${registrationMethod === 'email' ? 'selected' : ''}`}
            onClick={() => handleRegistrationMethodChange('email')}
          >
            Email
          </div>
          <div 
            className={`method-button ${registrationMethod === 'phone' ? 'selected' : ''}`}
            onClick={() => handleRegistrationMethodChange('phone')}
          >
            Phone number
          </div>
        
        </div>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          {registrationMethod === 'phone' ? (
            <div className="phone-input-container">
              <div className="phone-code-container">
                <img src="/image/signup/us.svg" alt="Country" className="country-flag" />
                <select
                  className="phone-code-select"
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                >
                  <option value="+7">+7</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+33">+33</option>
                  <option value="+81">+81</option>
                  <option value="+86">+86</option>
                </select>
              </div>
              <input
                type="tel"
                placeholder="Phone number"
                className="input-field"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          ) : (
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field password-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src="/image/signup/eye.svg"
              alt="Toggle password visibility"
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          
          <button type="submit" className="signup-button">
            Login to your account
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;