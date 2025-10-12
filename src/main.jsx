import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App';

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

// 커머스
import ProductIndex from './pages/products/ProductIndex';
import StickyPage from './pages/products/StickyPage';
import ProductListPage from './pages/products/ProductListPage';

// 기타
import CanvasDetail from './pages/CanvasDetail';
import Etc from './pages/Etc';
import ScrollButtonPage from './pages/ScrollPage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

// error
import ErrorPage from './pages/ErrorPage';

// 컴퍼넌트 예제
import AgreeForm from './pages/example/AgreeFormExample';
import BottomSheet from './pages/example/BottomSheetExample';
import Button from './pages/example/ButtonExample';
import Chart from './pages/example/ChartExample';
import Checkbox from './pages/example/CheckboxExample';
import CommonIndex from './pages/example/CommonIndex';
import FAQ from './pages/example/FaqExample';
import FloatingBar from './pages/example/FloatingBarExample';
import Form from './pages/example/FormExample';
import HeadTitle from './pages/example/HeadTitleExample';
import Info from './pages/example/InfoExample';
import List from './pages/example/ListExample';
import Popup from './pages/example/PopupExample';
import SelectBox from './pages/example/SelectboxExample';
import SearchForm from './pages/example/SearchFormExample';
import Tabs from './pages/example/TabsExample';
import Table from './pages/example/TableExample';

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
        path: 'example',
        element: <CommonIndex />,
        children: [
          { index: true, element: <AgreeForm /> },
          { path: 'bottomsheet', element: <BottomSheet /> },
          { path: 'chart', element: <Chart /> },
          { path: 'checkbox', element: <Checkbox /> },
          { path: 'faq', element: <FAQ /> },
          { path: 'list', element: <List /> },
          { path: 'selectbox', element: <SelectBox /> },
          { path: 'title', element: <HeadTitle /> },
          { path: 'floatingbar', element: <FloatingBar /> },
          { path: 'popup', element: <Popup /> },
          { path: 'search', element: <SearchForm /> },
          { path: 'form', element: <Form /> },
          { path: 'button', element: <Button /> },
          { path: 'info', element: <Info /> },
          { path: 'tabs', element: <Tabs /> },
          { path: 'table', element: <Table /> },
        ],
      },
      {
        path: 'product',
        element: <ProductIndex />,
        children: [
          { index: true, element: <ProductListPage /> },
          { path: 'stickypage', element: <StickyPage /> },
        ],
      },
      {
        path: 'etc',
        element: <Etc />,
        children: [
          { index: true, element: <ScrollButtonPage /> },
          { path: 'page1', element: <Page1 /> },
          { path: 'page2', element: <Page2 /> },
          { path: 'page3', element: <Page3 /> },
          { path: 'stickypage', element: <StickyPage /> },
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
