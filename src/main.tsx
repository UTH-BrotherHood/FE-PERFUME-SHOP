import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Toaster } from './components/ui/toaster.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import ErrorBoundary from './utils/errorBoundary.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>,
);
