import React, { useContext } from 'react'
import { shopContext } from '../context/Shopcontext'
import Title from './Title';

const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount} = useContext(shopContext);
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title txt1={'CART'} txt2={'TOTALS'}/>
        </div>
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping fee</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal