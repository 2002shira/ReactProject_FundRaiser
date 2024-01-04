import React, { createContext, useContext, useState } from 'react';

// Create the currency context
export const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

// Create a CurrencyProvider component to wrap the app
export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('dollar');

  // Function to toggle the currency
  const toggleCurrency = () => {
    setCurrency(currency === 'dollar' ? 'shekel' : 'dollar');
  };
  // Provide the currency value and toggle function to the children components
  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

