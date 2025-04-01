import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import EnvelopeDecoration from '../../components/EnvelopeTheme/EnvelopeDecoration';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      // This will be connected to the backend API in future tasks
      console.log('Registration form submitted', { name, email, password });
      
      // TODO: Implement actual registration with the backend
      // const response = await fetch('http://localhost:5000/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // });
      
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Registration failed');
      // }
      
      // redirect to login page
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="register-page">
      <EnvelopeDecoration type="corner" position="top-left" />
      <EnvelopeDecoration type="corner" position="bottom-right" />
      
      <h1 style={{ color: theme.primary }}>Create Your Account</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" style={{ color: theme.primary }}>Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ borderColor: theme.secondary }}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email" style={{ color: theme.primary }}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ borderColor: theme.secondary }}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password" style={{ color: theme.primary }}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            style={{ borderColor: theme.secondary }}
          />
          <small>Password must be at least 8 characters long</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword" style={{ color: theme.primary }}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ borderColor: theme.secondary }}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          style={{ 
            backgroundColor: theme.primary,
            borderColor: theme.primary 
          }}
        >
          Sign Up
        </button>
      </form>
      
      <div className="links">
        <Link to="/login" style={{ color: theme.primary }}>Already have an account? Log in</Link>
      </div>
    </div>
  );
};

export default RegisterPage; 