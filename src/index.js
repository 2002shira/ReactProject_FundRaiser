import React from 'react';
import ReactDOM from 'react-dom/client';
import './csses/index.css'
import App from './App';
import reportWebVitals from './components/reportWebVitals'
import { BrowserRouter } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useState } from 'react';
import { CurrencyProvider } from './components/CurrencyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <BrowserRouter>
    <React.StrictMode>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
