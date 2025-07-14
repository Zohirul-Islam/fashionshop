import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const {products} = useContext(shopContext);
    const [latestProducts,setLatestProducts] = useState([]);
    
    useEffect(()=>{setLatestProducts(products.slice(0,10))},[])
  return (
    <div className='my-10'>
        <div className="text-center py-10 text-3xl">
            <Title txt1='LATEST' txt2='COLLECTION'/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base font-medium text-gray-700'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas quas modi est quaerat velit vitae nulla labore ipsum quo distinctio.</p>
        </div>
        {/* Rendering products */}
        <div className="grid grid-col-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-col-5 gap-y-6">
            {
                latestProducts.map((item,index)=>(
                    <ProductItem key={index} id = {item._id} image={item.image} name={item.name} price ={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection