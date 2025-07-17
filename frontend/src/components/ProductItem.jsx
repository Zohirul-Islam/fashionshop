import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { shopContext } from '../context/Shopcontext';

const ProductItem = ({id,image,name,price}) => {
    const {currency} = useContext(shopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </div>

    </Link>
  )
}

export default ProductItem