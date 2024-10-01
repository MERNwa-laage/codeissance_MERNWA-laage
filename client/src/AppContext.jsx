import React, { createContext, useReducer } from 'react';

const initialState = {
  flights: {
    origin: '',
    destination: '',
    date: '',
  },
  hotels: {
    location: '',
    checkIn: '',
    checkOut: '',
  },
  // Add more fields as needed
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.route]: {
          ...state[action.route],
          [action.field]: action.value,
        },
      };
    default:
      return state;
  }
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};