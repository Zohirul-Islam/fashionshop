import { useContext, useEffect, useState } from "react"
import { shopContext } from "../context/Shopcontext"
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
const { products, currency, cartItem,updateQuantity,navigate } = useContext(shopContext);
const [cartData, setCartData] = useState([]);

useEffect(() => {
  if(products.length > 0){
      const tempData = [];
  for (const itemId in cartItem) {
    for (const size in cartItem[itemId]) {
      const quantity = cartItem[itemId][size];
      if (quantity > 0) {
        tempData.push({
          _id: itemId,
          size: size,
          quantity: quantity
        });
      }
    }
  }

  setCartData(tempData);
  }
}, [cartItem,products]); // ✅ Add cartItem as dependency

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title txt1={'Your'} txt2={'Cart'}/>
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=>product._id === item._id );
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                  <div className="flex items-start gap-6">
                    <img src={productData.image[0]} className="w-16 sm:w-20" alt="" />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                      <div className="flex items-center gap-5 mt-2">
                          <p>{currency}{productData.price}</p>
                          <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null :updateQuantity(item._id,item.size,Number(e.target.value))} className="border max-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number"  min={1} defaultValue={item.quantity} />
                  <img onClick={()=>updateQuantity(item._id,item.size,0)} className="w-4 mr-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt="" />
              </div>
            )
          })
        }
      </div>
      <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal/>
            <div className="w-full text-end">
              <button onClick={()=>navigate('/place-orders')} className="bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer">PROCEED TO CHECKOUT</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Cart