"use client"
import { CartContext } from '@/context/Cart';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Addtocart(props) {
  
  const {setnumberofitems,numberofitems}= useContext(CartContext);

  const router = useRouter();
  const cookie = Cookies.get('jwt');

  function addtocardhandler(){
    

    
    if(cookie){
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/addtocart`,{jwt:cookie,price:props.price,productid:props.productid}).then((res)=>{
          setnumberofitems(numberofitems+1); toast("Added to cart");
        }).catch(err=>console.log(err));

        
    }else{
      router.push('/login')
    }
    }


  return (<>
    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={addtocardhandler}><div className='flex flex-row'>Add to cart<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 21">
    <path d="M15 14H7.78l-.5-2H16a1 1 0 0 0 .962-.726l.473-1.655A2.968 2.968 0 0 1 16 10a3 3 0 0 1-3-3 3 3 0 0 1-3-3 2.97 2.97 0 0 1 .184-1H4.77L4.175.745A1 1 0 0 0 3.208 0H1a1 1 0 0 0 0 2h1.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 10 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3Zm-8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
    <path d="M19 3h-2V1a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V5h2a1 1 0 1 0 0-2Z"/>
  </svg></div></button>
    <ToastContainer />
    </>
  )
}

export default Addtocart