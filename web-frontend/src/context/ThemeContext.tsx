import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define our color palettes with envelope theme in mind
export const colorPalettes = {
  // Forest Green and Kraft Paper - classic envelope feel
  classic: {
    primary: '#2E7D32', // forest green
    secondary: '#D4C19C', // kraft paper
    accent: '#795548', // brown
    background: '#F5F3ED', // off-white
    text: '#333333', // dark gray
    headerBg: '#2E7D32',
    headerText: '#FFFFFF',
    success: '#4CAF50', // green
    error: '#F44336', // red
  },
  // Blue and Cream - modern postal theme
  modern: {
    primary: '#1976D2', // blue
    secondary: '#BBDEFB', // light blue
    accent: '#FF5722', // orange postmark
    background: '#FAFAFA', // off-white
    text: '#212121', // dark gray
    headerBg: '#1976D2',
    headerText: '#FFFFFF',
    success: '#4CAF50', // green
    error: '#F44336', // red
  },
  // Purple and Gold - royal mail theme
  royal: {
    primary: '#673AB7', // purple
    secondary: '#D1C4E9', // light purple
    accent: '#FFC107', // gold
    background: '#F3F1F8', // light purple-gray
    text: '#311B92', // deep purple
    headerBg: '#4A148C',
    headerText: '#FFFFFF',
    success: '#4CAF50', // green
    error: '#F44336', // red
  },
  // Teal and Coral - modern envelope
  coastal: {
    primary: '#00897B', // teal
    secondary: '#B2DFDB', // light teal
    accent: '#FF7043', // coral
    background: '#E0F2F1', // very light teal
    text: '#00352C', // dark teal
    headerBg: '#00695C',
    headerText: '#FFFFFF',
    success: '#4CAF50', // green
    error: '#F44336', // red
  },
  // Black and Red - priority mail theme
  priority: {
    primary: '#212121', // black
    secondary: '#BDBDBD', // gray
    accent: '#D32F2F', // red
    background: '#F5F5F5', // very light gray
    text: '#212121', // black
    headerBg: '#212121',
    headerText: '#FFFFFF',
    success: '#4CAF50', // green
    error: '#F44336', // red
  },
};

export type ThemeName = keyof typeof colorPalettes;
export type Theme = typeof colorPalettes.classic;

type ThemeContextType = {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
};

const defaultTheme: ThemeName = 'classic';

const ThemeContext = createContext<ThemeContextType>({
  theme: colorPalettes[defaultTheme],
  themeName: defaultTheme,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);

  const theme = colorPalettes[themeName];

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
    // Store theme preference in localStorage
    localStorage.setItem('theme', name);
  };

  // Initialize theme from localStorage if available
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName;
    if (savedTheme && colorPalettes[savedTheme]) {
      setThemeName(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 