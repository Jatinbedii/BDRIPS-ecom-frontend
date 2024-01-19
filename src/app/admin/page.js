"use client"
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

async function page() {
  const router= useRouter();


  useEffect(()=>{
    fetchuser();
 })

  async function fetchuser(){
    const cookie = Cookies.get('jwt');
    if(cookie){
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/user`,{jwt:cookie});
      if(res.data.error || res.data.isAdmin==false){
        return router.push('/') 
      }
      console.log(res);


    }else{
      router.push('/login')
    }
 
  }
  return (
    <div>

      <h2 className='text-center bg-[#121212] text-3xl text-white font-extrabold p-3'>
        ADMIN PANEL
      </h2>

      <div className='w-full bg-[#121212] text-center'><Link href={'/admin/additem'}><button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Add Product</button></Link></div>
    </div>
  )
}

export default page