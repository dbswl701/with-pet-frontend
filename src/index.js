import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
import worker from './mocks/browsers';

// msw
// if (process.env.NODE_ENV === 'development') {
//   worker.start();
// }

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  // eslint-disable-next-line consistent-return
  return worker.start();
}

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR',
  },
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>,
  );
});
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ThemeProvider theme={theme}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </ThemeProvider>,
// );
