import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import EnvelopeDecoration from '../../components/EnvelopeTheme/EnvelopeDecoration';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // This will be connected to the backend API in future tasks
      console.log('Forgot password form submitted', { email });
      
      // TODO: Implement actual password reset with the backend
      // const response = await fetch('http://localhost:5000/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Password reset request failed');
      // }
      
      setIsSubmitted(true);
      setMessage('If an account with that email exists, we have sent a password reset link.');
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div className="forgot-password-page">
      <EnvelopeDecoration type="corner" position="top-right" />
      
      <h1 style={{ color: theme.primary }}>Reset Your Password</h1>
      
      {!isSubmitted ? (
        <>
          <p>Enter your email address below and we'll send you a link to reset your password.</p>
          
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
            
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ 
                backgroundColor: theme.primary,
                borderColor: theme.primary 
              }}
            >
              Send Reset Link
            </button>
          </form>
        </>
      ) : (
        <div className="success-message" style={{ color: theme.success }}>
          {message}
        </div>
      )}
      
      <div className="links">
        <Link to="/login" style={{ color: theme.primary }}>Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 