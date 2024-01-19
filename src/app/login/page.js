'use client'
import { CartContext } from '@/context/Cart';
import { LoginContext } from '@/context/Login';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

function Page() {
  const {setLogin,setuserinfo}=useContext(LoginContext);
  const {setnumberofitems}= useContext(CartContext);
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState('');
  const [loading, setloading] = useState(false);


  useEffect(()=>{
    if(Cookies.get('jwt')){
      Cookies.remove('jwt');
      setLogin(false);
      router.push('/')
    }
  },[]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setloading(true)
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/login`,{email,password},{ withCredentials: true })
    if(res.status===201){
        setLogin(true);
        setuserinfo(res.data);
        setnumberofitems(res.data.cart.length);
        setloading(false)
        router.push('/')
    }else{
        setloading(false);
        setError(res.data.error);
    }
  }

  return (
    <div className='w-full bg-[#121212] '>
      <h2 className='w-full text-center font-bold text-red-500 text-3xl sm:text-5xl'>BDRIPS Welcomes You</h2>
      <h3 className='w-full text-center text-blue-600 text-xl sm:text-3xl mt-2 font-semibold'>Log in to your account</h3>
      <div className='w-full '>
      <form className='mx-auto w-fit mt-4'>
        
        <label>
        <span className='text-white font-semibold mr-2'>
          Email:
          </span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
        
        <br />
        <div className='mt-2'></div>
        <label>
        <span className='text-white font-semibold mr-2'>
          Password:
          </span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
        <br />
        <div className='bg-red-600 mt-2 rounded-md text-white text-center'>{Error}</div>
        
        <div className='text-center'>
        <button type="button" onClick={handleSubmit} class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading? <div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>:<div>Login</div>}</button></div>
      </form>
      <Link href={'/register'}><div className='w-full text-center text-white mt-3'>New to BDRIPS? <span className='text-blue-500'>Register</span> here</div></Link>
      </div>
    </div>
  );
}

export default Page;