import { ThemeProvider, createTheme } from '@mui/material';

import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = lazy(() => import('./pages/HomePage'));

const theme = createTheme({
  typography: {
    fontFamily: 'Inter',
  },
});

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: '/',
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
