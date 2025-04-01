import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import EnvelopeDecoration from '../../components/EnvelopeTheme/EnvelopeDecoration';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { theme } = useTheme();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      // This will be connected to the backend API in future tasks
      console.log('Reset password form submitted', { token, password });
      
      // TODO: Implement actual password reset with the backend
      // const response = await fetch(`http://localhost:5000/auth/reset-password/${token}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ password }),
      // });
      
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Password reset failed');
      // }
      
      setSuccess(true);
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="reset-password-page">
      <EnvelopeDecoration type="corner" position="top-left" />
      <EnvelopeDecoration type="corner" position="bottom-right" />
      
      <h1 style={{ color: theme.primary }}>Set New Password</h1>
      
      {error && <div className="error-message" style={{ color: theme.error }}>{error}</div>}
      
      {success ? (
        <div className="success-message" style={{ color: theme.success }}>
          <p>Your password has been successfully reset!</p>
          <p>Redirecting to login page...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password" style={{ color: theme.primary }}>New Password</label>
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
            Reset Password
          </button>
        </form>
      )}
      
      <div className="links">
        <Link to="/login" style={{ color: theme.primary }}>Back to Login</Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 