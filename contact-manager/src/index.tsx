import ReactDOM from 'react-dom/client';
import './styles/global.css';
import './styles/tokens.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store'
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--surface)',
            color: 'var(--text-900)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            borderRadius: '10px',
          },
          success: {
            icon: '✅',
          },
          error: {
            icon: '❌',
          },
        }}
      />
    </PersistGate>
  </Provider>
);
