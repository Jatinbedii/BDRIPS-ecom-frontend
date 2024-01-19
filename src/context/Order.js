"use client"

import { createContext, useState } from "react";
export const OrderContext = createContext();

export const Orderprovider = ({children}) =>{
    const [items, setItems] = useState([]);
    const [idsofcart, setidsofcart] = useState([]);
    const [price, setPrice] = useState();
     
    return (
        <OrderContext.Provider value={{items,setItems,idsofcart,setidsofcart,price,setPrice}}>
            <div>{children}</div>
        </OrderContext.Provider>
        
    )


}