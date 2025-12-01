// @ts-nocheck
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter } from "react-router-dom";
import App from './App.jsx'
import { theme } from './theme.js';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './utils/store.js';
import { SnackbarProvider } from './common/snackbar/SnackbarContext.jsx';
import AuthInitializer from './AuthInitializer.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AuthInitializer>
          <SnackbarProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </SnackbarProvider>
        </AuthInitializer>
      </Provider>
    </HashRouter>
  </StrictMode>
);
