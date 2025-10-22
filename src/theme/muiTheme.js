// theme/muiTheme.js
import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  spacing: 8,
  palette: {
    primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
    secondary: { main: '#9c27b0' },
    error: { main: '#d32f2f' },
    success: { main: '#2e7d32' },
    warning: { main: '#ed6c02' },
    info: { main: '#0288d1' },
  },
});
