"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import "../app/globals.css"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Chewy } from 'next/font/google'
const chewy = Chewy({ subsets: ['latin'] ,weight:'400',display:'swap'})
function Banner() {
  const autoplayOptions = {  delay: 3000,  rootNode: (emblaRoot) => emblaRoot.parentElement}

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay(autoplayOptions)])

  useEffect(() => { 
    if (emblaApi){
    }

  }, [emblaApi])


  return (
    <div className="embla bg-[#121212]" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <div className='w-full lg:min-h-screen bg-green-500 flex flex-row md:justify-around lg:justify-around'>
            
            <div><Image src={"https://res.cloudinary.com/jatinbedi/image/upload/v1704473184/h3vvbq7bawivstnp8kha.png"} height={400} width={400}/></div>
            <div className={`flex flex-col m-auto ${chewy.className}`}>
              <div className='text-white text-3xl md:text-6xl'>STAY IN </div>
              <div className='text-white text-3xl md:text-7xl'>STYLE WITH</div>
              <div className='text-green-950 text-3xl md:text-8xl lg:text-9xl'>BOLD DESIGNS</div>
            </div>
            
          </div>
        </div>
        <div className="embla__slide">
        <div className='w-full m-auto lg:min-h-screen bg-blue-500 flex flex-row md:justify-around lg:justify-around'>
            
           
            <div className={`flex flex-col m-auto ${chewy.className}`}>
              <div className='text-white text-3xl md:text-6xl'>BOLD</div>
              <div className=' text-3xl md:text-8xl lg:text-9xl'>UNIQUE</div>
              <div className='text-white text-3xl md:text-7xl'>DRIPS</div>
              
            </div>
            <div><Image src={"https://res.cloudinary.com/jatinbedi/image/upload/v1704478816/t8dglfijjvh6nw1ztifk.png"} height={400} width={400}/></div>
            
          </div>
        </div>
        <div className="embla__slide">
          <div className='w-full lg:min-h-screen bg-orange-500 flex flex-row md:justify-around lg:justify-around'>
            
            <div><Image src={"https://res.cloudinary.com/jatinbedi/image/upload/v1704521509/chvldys6a22pebjjwuzg.png"} height={400} width={400}/></div>
            <div className={`flex flex-col m-auto ${chewy.className}`}>
              <div className='text-white text-3xl md:text-6xl'>Jeans</div>
              <div className='text-white text-3xl md:text-7xl'>Tees</div>
              <div className='text-green-950 text-3xl md:text-8xl lg:text-9xl'>& more</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner

