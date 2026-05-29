import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';

const basePath = import.meta.env.VITE_BASE_URL || '/';
const basename = basePath === '/' ? '/' : basePath.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
