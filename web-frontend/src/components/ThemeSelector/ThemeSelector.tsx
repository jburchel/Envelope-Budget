import React from 'react';
import { useTheme, colorPalettes, ThemeName } from '../../context/ThemeContext';
import './ThemeSelector.css';

const ThemeSelector: React.FC = () => {
  const { themeName, setTheme } = useTheme();

  return (
    <div className="theme-selector">
      <h3>Choose a Color Theme</h3>
      <div className="theme-options">
        {Object.entries(colorPalettes).map(([name, colors]) => (
          <button
            key={name}
            className={`theme-option ${themeName === name ? 'active' : ''}`}
            onClick={() => setTheme(name as ThemeName)}
            title={name}
            aria-label={`Select ${name} theme`}
          >
            <div className="color-preview" style={{ display: 'flex' }}>
              <div 
                style={{ 
                  backgroundColor: colors.primary,
                  width: '20px',
                  height: '20px'
                }}
              />
              <div 
                style={{ 
                  backgroundColor: colors.secondary,
                  width: '20px',
                  height: '20px'
                }}
              />
              <div 
                style={{ 
                  backgroundColor: colors.accent,
                  width: '20px',
                  height: '20px'
                }}
              />
            </div>
            <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector; 