import AllProducts from "@/components/AllProducts"
import Banner from "@/components/Banner"
import Featureditems from "@/components/Featureditems"
import Footer from "@/components/Footer"
import Link from "next/link"



export default async function Home() {
 

  return (
    <main>
     <Banner/>
     


      <h2  className="bg-[#121212] text-white sm:pt-3 w-full text-center text-xl p-2">Category</h2>
    <div className='bg-[#121212] w-full grid  grid-cols-3 md:grid-cols-5'>
      <Link href={'/category/shirts'}><button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#121212] text-white rounded-md group-hover:bg-opacity-0">
Shirts
</span>
</button></Link>
      <Link href={'/category/pants'}><button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#121212] text-white  rounded-md group-hover:bg-opacity-0">
Pants
</span>
</button></Link>
      <Link href={'/category/shoes'}><button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#121212] text-white  rounded-md group-hover:bg-opacity-0">
Shoe
</span>
</button></Link>
      <Link href={'/category/hats'}><button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#121212] text-white  rounded-md group-hover:bg-opacity-0">
Hats
</span>
</button></Link>
      <Link href={'/category/others'}><div><button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#121212] text-white  rounded-md group-hover:bg-opacity-0">
Others
</span>
</button></div></Link>
    </div>

    <div className="pt-2 bg-[#121212]">
    <AllProducts/>
    </div>
    
    <Featureditems/>

    <Footer/>
    
      
    </main>
  )
}
