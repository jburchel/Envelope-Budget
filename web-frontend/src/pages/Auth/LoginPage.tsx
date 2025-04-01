import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import EnvelopeDecoration from '../../components/EnvelopeTheme/EnvelopeDecoration';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // This will be connected to the backend API in future tasks
      console.log('Login form submitted', { email, password });
      
      // TODO: Implement actual authentication with the backend
      // const response = await fetch('http://localhost:5000/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Login failed');
      // }
      
      // const data = await response.json();
      // localStorage.setItem('token', data.token);
      // redirect to dashboard
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="login-page">
      <EnvelopeDecoration type="corner" position="top-right" />
      <h1 style={{ color: theme.primary }}>Login to Your Account</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
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
          Log In
        </button>
      </form>
      
      <div className="links">
        <Link to="/register" style={{ color: theme.primary }}>Don't have an account? Sign up</Link>
        <Link to="/forgot-password" style={{ color: theme.accent }}>Forgot your password?</Link>
      </div>
    </div>
  );
};

export default LoginPage; 