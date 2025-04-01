import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector/ThemeSelector';
import EnvelopeDecoration from '../components/EnvelopeTheme/EnvelopeDecoration';

const HomePage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="home-page" style={{ backgroundColor: theme.background, color: theme.text }}>
      <EnvelopeDecoration type="background" />
      <EnvelopeDecoration type="corner" position="top-right" />
      
      <div className="theme-selector-container" style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeSelector />
      </div>
      
      <div className="home-content" style={{ position: 'relative', zIndex: 2, padding: '40px' }}>
        <h1 style={{ color: theme.primary, fontSize: '3rem', marginBottom: '2rem' }}>
          Envelope Budgeting
        </h1>
        
        <div className="tagline" style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
          <p>The simple way to manage your money and achieve your financial goals</p>
        </div>
        
        <div className="features" style={{ marginBottom: '3rem' }}>
          <div className="feature-item" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: theme.secondary }}>✉️ Envelope System</h3>
            <p>Organize your spending with virtual envelopes - a time-tested budgeting method</p>
          </div>
          
          <div className="feature-item" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: theme.secondary }}>📊 Track Progress</h3>
            <p>See where your money goes with beautiful, intuitive visualizations</p>
          </div>
          
          <div className="feature-item" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: theme.secondary }}>🎯 Achieve Goals</h3>
            <p>Set financial goals and watch as you make progress toward them</p>
          </div>
        </div>
        
        <div className="cta-buttons">
          <Link 
            to="/register" 
            className="btn btn-primary" 
            style={{ 
              backgroundColor: theme.primary, 
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginRight: '16px',
              display: 'inline-block',
            }}
          >
            Create Account
          </Link>
          
          <Link 
            to="/login" 
            className="btn btn-secondary" 
            style={{ 
              backgroundColor: 'transparent',
              border: `2px solid ${theme.secondary}`,
              color: theme.secondary,
              padding: '10px 22px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 