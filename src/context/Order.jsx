'use client'
import { createContext, useContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // const [order, setOrder] = useState([{boughtProduct:1,category: "bedroom",description: "description", id: 2,image: "images/products/bed.jpg",image_url: "http://localhost:999/furninest/images/products/bed.jpg",name: "bed",price: 1200,quantity: 59,subcategory: "bed"}]);
  const [order, setOrder] = useState([]);
  const [userNameContext,setUserNameContext] = useState()

  return (
    <OrderContext.Provider value={{ order, setOrder,userNameContext,setUserNameContext }}>
      {children}
    </OrderContext.Provider>
  );
};

