import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<CircularProgress />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
