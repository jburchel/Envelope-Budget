import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './EnvelopeDecoration.css';

type EnvelopeDecorationType = 'corner' | 'header' | 'background';

interface EnvelopeDecorationProps {
  type: EnvelopeDecorationType;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const EnvelopeDecoration: React.FC<EnvelopeDecorationProps> = ({ 
  type, 
  position = 'top-right' 
}) => {
  const { theme } = useTheme();
  
  if (type === 'corner') {
    return (
      <div 
        className={`envelope-corner ${position}`}
        style={{
          borderColor: `transparent ${theme.accent} ${theme.accent} transparent`,
        }}
      />
    );
  }
  
  if (type === 'header') {
    return (
      <div 
        className="envelope-header"
        style={{
          backgroundColor: theme.primary,
          backgroundImage: `
            linear-gradient(45deg, ${theme.secondary} 25%, transparent 25%, transparent 75%, ${theme.secondary} 75%, ${theme.secondary}),
            linear-gradient(45deg, ${theme.secondary} 25%, transparent 25%, transparent 75%, ${theme.secondary} 75%, ${theme.secondary})
          `,
        }}
      >
        <div className="stamp" style={{ backgroundColor: theme.accent }}>
          <div className="stamp-inner" style={{ backgroundColor: theme.background }}>
            <span style={{ color: theme.text }}>$</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (type === 'background') {
    return (
      <div 
        className="envelope-background"
        style={{
          backgroundColor: theme.background,
          borderColor: theme.secondary,
        }}
      >
        <div className="envelope-flap" style={{ borderColor: `${theme.secondary} transparent transparent transparent` }} />
      </div>
    );
  }
  
  return null;
};

export default EnvelopeDecoration; 