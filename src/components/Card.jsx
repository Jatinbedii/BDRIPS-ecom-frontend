
import React from 'react'
import Stringshortner from '@/utils/stringshorterForCard'
import Link from 'next/link'
function Card(props) {
  return (
    

<div class="w-full max-w-sm rounded-lg shadow bg-gray-800 border-gray-700">
    <Link href={`/product/${props.id}`}>
        <img class="p-8 rounded-t-lg" src={props.image} alt="product image" />
    </Link>
    <div class="px-5 pb-5">
        
            <h5 class="text-xl font-semibold tracking-tight text-white">{props.name}</h5>
            <h5 class="tracking-tight text-white">{Stringshortner(props.description)}</h5>
        <div class="flex items-center mt-2.5 mb-5">
            
            <span class=" text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ms-3">{props.category}</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-white">{props.price} ₹</span>
            
        </div>
    </div>
</div>

  )
}

export default Card