"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Stringshortner from '@/utils/stringshortner';
function AllProducts() {
 

  const [data,setdata]= useState();
  
  const autoplayOptions = {  delay: 3000,  rootNode: (emblaRoot) => emblaRoot.parentElement}

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay(autoplayOptions)])

  useEffect(() => { 
    if (emblaApi){
    }

  }, [emblaApi])

  function fetchdata(){
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/products`).then((res)=>{setdata(res.data)}).catch(err=>console.log(err))
      

  }
  useEffect(()=>{
    fetchdata();
  },[])
  
  
  return (
    <div className='w-full bg-blue-600 border-solid border-2 border-[#121212]'>
    <div className="w-full bg-blue-600 p-3 text-center text-white font-semibold">EXCLUSIVE ITEMS & LIMITED STOCKS</div>
    <div className="embla" ref={emblaRef}>
    <div className="embla__container">
    
    {data?
        data.map((data)=>{
          return(
            <div className="embla__slide">
              <div className='w-full bg-blue-600  flex flex-col sm:flex-row sm:justify-around '>
                <img src={data.image} height="100" width={"200"} className='p-1 rounded-lg'/>
                <div className='flex flex-col p-2'><div className='font-bold'>{data.name}</div><div>{Stringshortner(data.description)}</div> <div className='font-semibold'>{data.price} ₹</div></div>
                
                </div>

            </div>
          )
        }) : <div></div>
      }
      </div>
      </div>
    </div>
  )
}

export default AllProducts