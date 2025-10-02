import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App';

// 공통 컴퍼넌트
import CommonIndex from './pages/common/CommonIndex';
import CheckboxDemo from './pages/common/CheckboxDemo';
import SelectBox from './pages/common/SelectBox';
import List from './pages/common/List';
import HeadTitle from './pages/common/HeadTitle';
import AgreeForm from './pages/common/AgreeForm';

// 작업리스트 & 가이드
import WorkIndex from './pages/work/WorkIndex';
import PublishStatus from './pages/work/PublishStatus';
import Guide from './pages/work/Guide';

// 홈
import Home from './pages/Home';

// about
import AboutIndex from './pages/about/AboutIndex';
import About from './pages/about/About';
import Contact from './pages/about/Contact';

// 기타
import CanvasDetail from './pages/CanvasDetail';

// error
import ErrorPage from './pages/ErrorPage';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'about',
        element: <AboutIndex />,
        children: [
          { index: true, element: <About /> },
          { path: 'contact', element: <Contact /> },
        ],
      },
      { path: 'canvases/:id', element: <CanvasDetail /> },
      {
        path: 'work',
        element: <WorkIndex />,
        children: [
          { index: true, element: <PublishStatus /> },
          { path: 'guide', element: <Guide /> },
        ],
      },
      {
        path: 'common',
        element: <CommonIndex />,
        children: [
          { index: true, element: <AgreeForm /> },
          { path: 'checkbox', element: <CheckboxDemo /> },
          { path: 'list', element: <List /> },
          { path: 'selectbox', element: <SelectBox /> },
          { path: 'title', element: <HeadTitle /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
