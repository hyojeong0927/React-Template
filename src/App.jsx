import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import { MultiBottomSheetProvider } from './components/bottomsheet';

function App() {
  return (
    <MultiBottomSheetProvider>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </MultiBottomSheetProvider>
  );
}

export default App;
