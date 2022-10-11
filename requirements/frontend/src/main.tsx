import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { worker } from './mocks/browser';

if (import.meta.env.DEV) {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>,
);
