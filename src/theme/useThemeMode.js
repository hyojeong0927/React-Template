import { useState, useEffect, useMemo } from 'react';
import { getTheme } from './index';

export default function useThemeMode() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggleTheme = () =>
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  return { theme, mode, toggleTheme };
}
