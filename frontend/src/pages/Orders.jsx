import React, { useContext } from 'react'
import Title from '../components/Title'
import { shopContext } from "../context/Shopcontext";
const Orders = () => {
  const { products, currency } = useContext(shopContext);
  return (
    <div className='pt-16 border'>
      <div className="text-2xl">
        <Title txt1={'My'} txt2={'ORDERS'}/>
        <div className=''>
          {
            products.slice(1,4).map((item,indexz)=>(
              <div className='py-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-t border-b text-gray-700 ' key={indexz}>
                    <div className='flex items-start gap-6 text-sm'>
                        <img className='w-16 sm:w-20' src={item.image[0]} />
                        <div>
                          <p className='sm:text-base font-medium'>{item.name}</p>
                          <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                            <p className='text-lg'>{currency}{item.price}</p>
                            <p>Quantity: 1</p>
                            <p>Size: M</p>

                          </div>
                          <p className='mt-2'>Date: <span className='text-gray-400'>25, jul, 2024</span></p>
                        </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between'>
                      <div className="flex items-center gap-2">
                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                        <p className='text-sm md:text-base'>Ready to Ship</p>
                      </div>
                      <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                    </div>
              </div>
            ))
          }
        </div>
      </div>
      </div>
  )
}

export default Orders