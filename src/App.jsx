import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import { MultiBottomSheetProvider } from './components/bottomsheet';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import useThemeMode from './theme/useThemeMode';
import './styles/global.scss';

function App() {
  const { theme, mode, toggleTheme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <MultiBottomSheetProvider>
        <Header />
        <div className="container" style={{ padding: 20 }}>
          <h1>{mode === 'light' ? '🌞 Light Mode' : '🌙 Dark Mode'}</h1>
          <Button variant="contained" onClick={toggleTheme}>
            테마 전환
          </Button>
        </div>
        <Main>
          <Outlet />
        </Main>
      </MultiBottomSheetProvider>
    </ThemeProvider>
  );
}

export default App;
