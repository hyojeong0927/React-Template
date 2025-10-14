import { createTheme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';

export const getTheme = (mode = 'light') => {
  const palette = mode === 'light' ? lightPalette : darkPalette;

  return createTheme({
    palette: {
      mode,
      primary: { main: palette.primary },
      secondary: { main: palette.secondary },
      background: { default: palette.background },
      text: { primary: palette.text },
    },
  });
};
