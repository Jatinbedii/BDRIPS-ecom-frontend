"use client";
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { OrderContext } from '@/context/Order';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
function page() {
  const router = useRouter();
  const {items,setItems,idsofcart,setidsofcart,price,setPrice}= useContext(OrderContext);

 async function removehandler(id){
    const cookie = Cookies.get('jwt');
    if(cookie){

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/removefromcart`,{id,jwt:cookie});

      if(res.status==201){
        fetchData();
        console.log("item removed");
      }
    } catch (error) {
      console.log(error);
    }
    
    }else{
      console.log("go to login page");
    }
 }


 async function fetchData() {
  try {
    const cookie = Cookies.get('jwt');
    if (cookie) {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/user`, { jwt: cookie });
      if (res.status === 201) {
        const ids = res.data.cart;
        setidsofcart(ids);

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/products`);
        if (data) {
          function checkItem(obj) {
            const id = obj._id;
            let i = 0;
            while (i < ids.length) {
              if (ids[i].productid === id) {
                return obj;
              }
              i++;
            }
          }

          const resultedArray = data.filter(checkItem);
          setItems(resultedArray);

          let rate = 0;
          function checkingPrice() {
            let i = 0;
            while (i < ids.length) {
              rate = rate + ids[i].price * ids[i].quantity;
              i++;
            }
            setPrice(rate);
          }

          checkingPrice();
        }
      }else{
        router.push('/login');
      }
    }else{
      router.push('/login')
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    router.push('/login')
  }
}


useEffect(() => {
    
  fetchData();
}, []);

  return (
    <div>

      <div className='w-full text-white text-center bg-[#121212]        text-3xl p-3'>CART</div>
      <div className='w-full bg-[#121212]'>
      <div className='w-fit flex flex-row bg-white rounded-lg p-2 mx-auto pt-3'>
      {items.length > 0 ? (
        <div>
          {items.map((item) => (
            <div key={item._id} className='flex flex-col text-black font-semibold '>
            <div className='flex flex-row'> <button onClick={()=>removehandler(item._id)}><svg class="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 10">
    <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z"/>
  </svg></button><Link href={`product/${item._id}`}><Image width={100}  height={100} src={item.image}/>{item.name}</Link></div>
            </div>
          ))}
        </div>
      ) : (
        <div>No items available</div>
      )}
      {idsofcart? <div>
        {
          idsofcart.map((data)=>{
            return (
              <div key={data._id} className='ml-2 mt-[80px]'> {data.price}₹ × {data.quantity} units</div>
            )
          })
        }
      </div>:<div></div>}
      </div>

      </div>
      
     <div className='w-full text-center bg-[#121212]  text-white pt-3 text-xl'> Total Amount: {price ? <div>{price} ₹
   
      </div> : <div>0 ₹</div>}</div>
      <div className='w-full text-center bg-[#121212] mt-3'>
      <Link href={'/book-order'}><button type="button" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Place Order</button></Link>
      </div>
    </div>
  );
}

export default page;