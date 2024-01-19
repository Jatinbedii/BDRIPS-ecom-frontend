"use client"
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
function page() {
  function getObjectById(array, id) {
    for (var i = 0; i < array.length; i++) {
      if (array[i]._id === id) {
        return array[i];
      }
    }
    // Return null if the object with the specified id is not found
    return null;
  }
  

  const [products,setproducts] = useState();
  const router = useRouter('/login')   
  const [orders,setorders]= useState();
  async function fetchdata(){
     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/products`);
      setproducts(data);
    const cookie = Cookies.get('jwt');
    if(cookie){
      const user = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/user`, { jwt: cookie });



      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/allorders`);
      function filterfunction(unit){

        if(unit.id==user.data._id){
          return unit
        }

      }
      const items = res.data.filter(filterfunction);
      setorders(items);
    
    }else{
      router.push('/login');  
    }
   



  }
  useEffect(()=>{
    fetchdata();
  },[])
  return (
  <div>
    <div className='w-full text-center text-3xl text-gray-400 '>ORDERS</div>
    {orders?<div >{orders.map((item)=>{return <div className='bg-gray-800 rounded-md p-1 text-white m-2'>
    <div className='flex flex-col w-full text-center'>
     <div className='font-semibold text-gray-400'> Order Details</div>
      <div>Name: {item.name}</div>
<div>Contact Number: {item.contact}</div>
<div>Order ID: {item._id}</div>
<div>Address: {item.address}</div>
<div>PIN Code: {item.pincode}</div>
{item.createdAt? <div>Booked on :{item.createdAt}</div>:<div></div>}
      </div>
      <div className='w-full'>
        <div className='font-semibold text-gray-400 w-full text-center'> Products</div>
        <div className='grid grid-cols-2 md:grid-cols-4 w-full'>
        {item.items.map((prod)=>{ const details = getObjectById(products,prod.productid);
        return (

          <Link className='' href={`product/${details._id}`}><Image width={100} height={100} src={details.image} /><div>{details.name}</div></Link>
        )
        })}
        </div>
      </div>
    <div className='w-full flex justify-center'>{item.type=="paid"?<div className='text-white w-fit bg-green-700 p-1  rounded-md'>Already Paid</div>:<div className='text-white w-fit bg-red-700 p-1  rounded-md'>Cash on Delivery</div>}</div>
    <div className='w-full text-center'>Total Amount : {item.price} ₹</div>
    </div>})}</div>:<div></div>}</div>
  )
}

export default page