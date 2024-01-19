"use client"

import { createContext, useState } from "react";
export const CartContext = createContext();

export const Cartprovider = ({children}) =>{
    const [numberofitems,setnumberofitems]= useState(0);
     
    return (
        <CartContext.Provider value={{numberofitems,setnumberofitems}}>
            <div>{children}</div>
        </CartContext.Provider>
    )


}