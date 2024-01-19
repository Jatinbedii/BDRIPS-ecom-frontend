"use client"

import { OrderContext } from "@/context/Order"
import Cookies from "js-cookie";
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";

function page() {
  const [selectedOption, setSelectedOption] = useState('');
  const {price,setPrice}= useContext(OrderContext);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Error,setError]=useState("");
  const [email,setemail]=useState("");

 useEffect(()=>{
  const cookie = Cookies.get('jwt');
  if(cookie){

  }else{
    router.push('/login')
  }
 })
async function paymenthandler(e){
  e.preventDefault();
  const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/createorder`,{price});
  if(res.status!=201){
    console.log(res);
    return;
  }

  console.log(res);

  var options = {
    "key": "rzp_test_NI0cQfABqaMzkt", // Enter the Key ID generated from the Dashboard
    "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "",
    "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": async function (response){
       
        //alert(response.razorpay_payment_id);
       // alert(response.razorpay_order_id);
        //alert(response.razorpay_signature);

          try {
      const cookie= Cookies.get('jwt');
      if(cookie){
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/cod`,{jwt:cookie,name:fullName,address,pincode:postalCode,contact:phoneNumber,price,type:selectedOption,paymentid:  response.razorpay_payment_id});
      if(res.status==201){
        router.push('/orders');
      }else{
        setError(res.data.error);
      }
      
      }
    } catch (error) {
      console.log(error);
    }
   
        
    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new window.Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});

rzp1.open();
e.preventDefault();
}


  
  async function cashondelivery(e){
    e.preventDefault();
    try {
      const cookie= Cookies.get('jwt');
      if(cookie){
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/cod`,{jwt:cookie,name:fullName,address,pincode:postalCode,contact:phoneNumber,price,type:selectedOption,paymentid:"no"});
      if(res.status==201){
        router.push('/orders');
      }else{
        setError(res.data.error);
      }
      
      }
    } catch (error) {
      console.log(error);
    }
    

  }


  async function fetchData() {
    try {
      const cookie = Cookies.get('jwt');
      if (cookie) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/user`, { jwt: cookie });
        if (res.status === 201) {
          const ids = res.data.cart;

          let i=0;
          let amount =0;
          while(i<ids.length){
            amount= amount + (ids[i].price * ids[i].quantity) ;
            i++;
          }
          setPrice(amount);
          
  
         
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }




  useEffect(()=>{
    fetchData();
  },[])


  return (
    <div className="w-full">
      <div className="w-full text-center bg-[#121212]   font-semibold p-3 text-3xl text-blue-500">Place your order</div>
      <div className="flex flex-row w-full bg-[#121212] text-white p-3  justify-center text-xl">Total Amount : {price? <div>{price} ₹</div>:<div>empty</div>}</div>
     
     <div className="flex flex-row w-full bg-[#121212] p-3  justify-center text-xl font-semibold text-blue-500">Select payment method</div>
      <div className="w-full bg-[#121212] flex flex-row  gap-3">
        <label>
          <input name="payment" type="radio" value={"cashondelivery"} onChange={e=>setSelectedOption(e.target.value)}/>
          <div className="text-white">Cash on delivery</div>
        </label>
        <label>
          <input name="payment" type="radio" value={"paid"} onChange={e=>setSelectedOption(e.target.value)}/>
         <div className="text-white">Online payment</div>
        </label>
      </div>

      {
        selectedOption=="cashondelivery"?<div><form className="flex flex-col w-fit mx-auto gap-2 bg-[#121212]">
          <div className="text-xl w-fit text-blue-500 font-semibold mx-auto">Enter your details</div>
        <label>
        <span className='text-white font-semibold mr-2'>
          Full Name:</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
  
        <label>
        <span className='text-white font-semibold mr-2'>
          Address:</span>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
  
        
  
        <label> <span className='text-white font-semibold mr-2'>
          PIN Code:</span>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
  
        <label> <span className='text-white font-semibold mr-2'>
          Phone Number:</span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
        
        <br/>
        <div className='bg-red-600 mt-2 rounded-md text-white text-center'>{Error}</div>
        {<div className="text-white"><span className="text-blue-500">NOTE: </span> 40 is Cash on Delivery fees,new total amount is {price +40} ₹</div>}
        <button onClick={cashondelivery} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">CONFIRM THE ORDER</button>
      </form></div>:<div>

      <form className="flex flex-col w-fit mx-auto gap-2 bg-[#121212]">
          <div className="text-xl w-fit text-blue-500 font-semibold mx-auto">Enter your details</div>
        <label>
        <span className='text-white font-semibold mr-2'>
          Full Name:</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
        <label> <span className='text-white font-semibold mr-2'>
          Email:</span>
          <input
            type="tel"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
        <label>
        <span className='text-white font-semibold mr-2'>
          Address:</span>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
  
        
  
        <label> <span className='text-white font-semibold mr-2'>
          PIN Code:</span>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
  
        <label> <span className='text-white font-semibold mr-2'>
          Phone Number:</span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="rounded-md border px-4 py-2"
          />
        </label>
        <br/>
        <div className='bg-red-600 mt-2 rounded-md text-white text-center'>{Error}</div>
        
        <button onClick={paymenthandler} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">PAY ONLINE</button>
      </form>
        
      </div>
      }

      
    </div>
  )
}

export default page