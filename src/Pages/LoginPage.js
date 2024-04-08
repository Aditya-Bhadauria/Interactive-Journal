import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { Link } from 'react-router-dom';
import './Login.css'
function SignupLogin() {
  const [isSignup, setIsSignup] = useState(true); // Track signup/login mode
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    
  });
  const [errors, setErrors] = useState({}); // Store any validation errors
  const [isLoading, setIsLoading] = useState(false); // Track form submission state

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Indicate form submission in progress

    setErrors({}); // Clear errors before submission

    try {
      const url = isSignup
        ? 'http://your-backend-server/api/signup' // Replace with your signup API endpoint
        : 'http://your-backend-server/api/login'; // Replace with your login API endpoint

      const response = await axios.post(url, formData);

      // Handle successful signup/login on the backend (e.g., set a session or token)
      console.log('Signup/Login successful:', response.data);
      // Redirect to appropriate page or display success message

    } catch (error) {
      setIsLoading(false); // Reset loading state on error
      if (error.response) {
        // Handle validation or other errors from the backend
        setErrors(error.response.data.errors || { message: 'Something went wrong.' });
      } else {
        console.error('Error:', error); // Log errors for debugging
        setErrors({ message: 'Network error or other unexpected issue.' });
      }
    }
  };

  return (
    <div className="signup-login-container container">
    <div className="signup-login-box">
      <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : (isSignup ? 'Sign Up' : 'Login')}
        </button>
      </form>
      <div className="toggle-mode">
        <span>Already have an account? </span>
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Login' : 'Sign Up'} instead
        </button>
      </div>
      {errors && (
        <div className="error-messages">
          {/* Display error messages in a user-friendly way */}
          {Object.values(errors).map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default SignupLogin;

