import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
      document.documentElement.style.setProperty('--header-bg', '#2d2d2d');
      document.documentElement.style.setProperty('--footer-bg', '#1e3a1e');
      document.documentElement.style.setProperty('--box-bg', '#2d2d2d');
      document.documentElement.style.setProperty('--box-border', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#000000');
      document.documentElement.style.setProperty('--header-bg', '#f2aeb9');
      document.documentElement.style.setProperty('--footer-bg', '#306230');
      document.documentElement.style.setProperty('--box-bg', '#000000');
      document.documentElement.style.setProperty('--box-border', '#ffffff');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 