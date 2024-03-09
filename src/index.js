import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
import worker from './mocks/browsers';

// msw
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);
