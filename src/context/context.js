
import React, { createContext, useState } from 'react';

// Crie o contexto
export const QueryContext = createContext();

// Crie o provedor do contexto
export const QueryContextProvider = ({ children }) => {
  const [queryCOQL, setQueryCOQL] = useState([]);

  const handleSetQuery = (query) => {
    setQueryCOQL((state) => [...state, query])
  }
  
  return (
    <QueryContext.Provider value={{ handleSetQuery, queryCOQL }}>
      {children}
    </QueryContext.Provider>
  );
};
