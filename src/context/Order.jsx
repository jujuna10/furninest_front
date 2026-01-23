'use client'
import { createContext, useContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [userNameContext,setUserNameContext] = useState()

  return (
    <OrderContext.Provider value={{ order, setOrder,userNameContext,setUserNameContext }}>
      {children}
    </OrderContext.Provider>
  );
};

