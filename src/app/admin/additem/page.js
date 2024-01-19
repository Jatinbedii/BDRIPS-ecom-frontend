'use client'


import axios from 'axios';
import React, { useState } from 'react';
function page(){
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); 
  const [price, setPrice] = useState('');
  const [err,seterr]= useState('');
  const [ imageurl,setimageurl]= useState();
  
  function imageuploadfunc(e){
    e.preventDefault();
    const file= e.target.files[0] ;
    const data = new FormData();
    
    data.append("upload_preset","chatapp");
    data.append("file",file);
    data.append("cloud_name","jatinbedi");

    fetch("https://api.cloudinary.com/v1_1/jatinbedi/image/upload",{method:"post", body:data}).then((res)=>res.json()).then(data=>{
      
    
    setimageurl(data.secure_url)
    
   }).catch(err=>console.log(err));

  }

 
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/additem`,{name,description,category,price,image:imageurl});
    if(res.status===201){
      console.log("added");
    }else{
      seterr(res.data.error);
    }


    
  };

  return (
    <div>
      <h2 className='text-center w-full text-3xl text-gray-400 font-semibold'>Add a new Product</h2>
      <div className='w-full flex justify-center bg-[#121212] '>
      <form className='w-fit p-2 '>
        <div>
        <label>
          <span className='text-white font-semibold mr-2'>
          Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
className="rounded-md border px-4 py-2"
          />
        </label> </div>
        <br />
       <div>
        <label><span className='text-white font-semibold mr-2'>
          Description:</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
className="rounded-md border px-4 py-2"
          />
        </label> </div> 
        <br />
       <div>
        <label><span className='text-white font-semibold mr-2'>
          Category:</span>
          <div>
            <label>
              <input

                type="radio"
                value="Pants"
                checked={category === 'Pants'}
                onChange={() => setCategory('Pants')}
              />
              <span className='text-white font-semibold mr-2'>Pants</span>
            </label>
            <label>
              <input
                type="radio"
                value="Shirts"
                checked={category === 'Shirts'}
                onChange={() => setCategory('Shirts')}
              />
              <span className='text-white font-semibold mr-2'>Shirts</span>
            </label>
            <label>
              <input
                type="radio"
                value="Hats"
                checked={category === 'Hats'}
                onChange={() => setCategory('Hats')}
              />
              <span className='text-white font-semibold mr-2'>Pants</span>
            </label>
            <label>
              <input
                type="radio"
                value="Shoes"
                checked={category === 'Shoes'}
                onChange={() => setCategory('Shoes')}
              />
               <span className='text-white font-semibold mr-2'>Shoes</span>
            </label>
            <label>
              <input
                type="radio"
                value="Others"
                checked={category === 'Others'}
                onChange={() => setCategory('Others')}
              />
               <span className='text-white font-semibold mr-2'>Others</span>
            </label>
          </div>
        </label>  
        </div> 
        <br />

        <label>
         <span className='text-white font-semibold mr-2'> Price:</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
className="rounded-md border px-4 py-2"
          />
        </label>
        
        <br />
        

        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="small_size">Select Image</label>
<input class="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="small_size"  onChange={imageuploadfunc} type="file"/>
        <div className='bg-red-600 mt-2 rounded-md text-white text-center'>{err}</div>

        <button onClick={handleSubmit} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
      </form> </div>
    </div>
  );
};

export default page;