"use client"

import { createContext, useState } from "react";
export const LoginContext = createContext();

export const Loginprovider = ({children}) =>{
    const [login,setLogin]= useState(false);
    const [userinfo,setuserinfo]= useState();
     
    return (
        <LoginContext.Provider value={{login,setLogin,userinfo,setuserinfo}}>
            <div>{children}</div>
        </LoginContext.Provider>
    )


}