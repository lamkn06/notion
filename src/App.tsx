import { ThemeProvider, createTheme } from '@mui/material';

import { Suspense, lazy } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = lazy(() => import('./pages/HomePage'));

const theme = createTheme({
  typography: {
    fontFamily: 'Inter',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        <HomePage />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
