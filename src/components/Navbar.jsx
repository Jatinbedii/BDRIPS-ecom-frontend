"use client"
import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link';
import { LoginContext } from '@/context/Login';
import { CartContext } from '@/context/Cart';
import { Bebas_Neue } from 'next/font/google';
import { usePathname } from 'next/navigation';
const bebas = Bebas_Neue({ subsets: ['latin'] ,weight:'400',display:'swap'})


function Navbar() {
  const pathname = usePathname();
  
 
  const {login,setLogin,userinfo,setuserinfo}=useContext(LoginContext);
  const {numberofitems,setnumberofitems}=useContext(CartContext);
async function fetchdata(){
  try {
     const cookie = Cookies.get('jwt');

    if(cookie){
    const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/user`,{jwt:cookie});
      
    if(res.status==201){
      
      if(res.data.cart.length!=numberofitems){
        setnumberofitems(res.data.cart.length);
      }
      setuserinfo(res.data);
      if(login==false){
      setLogin(true);}
    }else{
      if(login==true){
      setLogin(false);}
    }
    }

  } catch (error) {
    
  }
      
    

       

    }
  
  
  
    useEffect(()=>{
    
    

    fetchdata();
  },[login,numberofitems])

  useEffect(()=>{
    fetchdata()
  })

  function logouthandler(){
    Cookies.remove('jwt');
    setLogin(false);
    
  }


  return (
    <>


<nav className="bg-[#121212]">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            
            <h1 className={`flex flex-row gap-0  ${bebas.className}  text-2xl sm:text-4xl`}><div className='text-red-500'>B</div><div className='text-blue-500'>DRIPS</div> </h1>
        </a>

        

        {(pathname!='/login' && pathname!='/register' && pathname!='/cart')?<div class="flex items-center space-x-6 rtl:space-x-reverse">
        {login?<div className='flex flex-row gap-2'><button onClick={logouthandler} className='text-blue-500'>Logout</button><div><Link href={'/orders'}><svg class="w-6 h-6 text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
  </svg></Link></div><Link href={'/cart'} className='text-blue-500'>
          
  <svg class="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
  </svg>
          
          </Link><div className='text-blue-500'>{numberofitems}</div> <div className='text-blue-500'>{userinfo.isAdmin?<div>

         <Link href={'/admin'}  ><svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M19.728 10.686c-2.38 2.256-6.153 3.381-9.875 3.381-3.722 0-7.4-1.126-9.571-3.371L0 10.437V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7.6l-.272.286Z"/>
    <path d="m.135 7.847 1.542 1.417c3.6 3.712 12.747 3.7 16.635.01L19.605 7.9A.98.98 0 0 1 20 7.652V6a2 2 0 0 0-2-2h-3V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H2a2 2 0 0 0-2 2v1.765c.047.024.092.051.135.082ZM10 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM7 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H7V3Z"/>
    </svg> </Link>
          </div>:<div></div>}</div></div>:<div><div className='text-blue-500 font-semibold'><Link href={'/login'}>Login</Link></div></div>}
        </div>:<div></div>}
    </div>
</nav>


    </>
  )
}

export default Navbar