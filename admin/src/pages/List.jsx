import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list,setList] = useState([]);

  const fetchData = async() =>{
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if(response.data.success){
        setList(response.data.products);
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const removeProduct = async(id)=>{
    try {
      const response = await axios.post(backendUrl + '/api/product/remove' ,{id},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchData();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div>
      <p className='mb-2'>All product list</p>
      <div className='flex flex-col gap-2'>
        {/* List table title */}
        <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm'>
          <b>image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* product List */}
        <div>
          {
            list.map((item,index)=>(
                <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border p-2" key={index}>
                    <img className="w-12 h-12 object-cover" src={item.image[0]} alt={item.name} />
                    <p className="truncate">{item.name}</p>
                    <p>{item.category}</p>
                    <p>{currency} {item.price}</p>
                    <p onClick={()=>removeProduct(item._id)} className="text-xl text-red-500 cursor-pointer">X</p>
                </div>

            ))
          }
        </div>
      </div>
    </div>
  )
}

export default List