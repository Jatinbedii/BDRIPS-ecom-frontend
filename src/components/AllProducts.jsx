
import Card from './Card'
import axios from 'axios';

async function AllProducts() {
  
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/products`)
      

  
  
  
  return (
    <div className='w-full bg-black p-2'>
        <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-5">
      {data?
        data.map((data)=>{
          return(
            <Card name={data.name} description={data.description} price={data.price} image={data.image} id={data._id} category={data.category}/>
          )
        }) : <div></div>
      }
    </div>
    
    </div>
  )
}

export default AllProducts