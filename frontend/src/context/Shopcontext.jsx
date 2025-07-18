import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
export const shopContext = createContext();

const ShopContextProvider = ({children}) =>{
    const currency = '$';

    const delivery_fee = 10;
    const [search,setSerch] = useState('');
    const [showSearch,setShowSerch] = useState(false);
    const [cartItem,setCartItem] = useState({});

const addToCart = async (itemId, size) => {
  // Check if size is selected
  if (!size) {
    toast.error("Please select product size");
    return;
  }

  // Deep clone existing cart to avoid direct mutation
  let cartData = structuredClone(cartItem || {});

  // If the item already exists in cart
  if (cartData[itemId]) {
    // If size exists, increment it
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
  } else {
    // If item doesn't exist, create it
    cartData[itemId] = { [size]: 1 };
  }

  // Update the cart state
  setCartItem(cartData);

  // Optional toast success
  toast.success("Added to cart");
};
const getCartCount = () => {
  let totalCount = 0;
  for (const itemId in cartItem) {
    for (const size in cartItem[itemId]) {
      const qty = cartItem[itemId][size];
      if (qty > 0) {
        totalCount += qty;
      }
    }
  }
  return totalCount;
};

useEffect(()=>{
    console.log(getCartCount());
})
   const value = {
        products,currency,delivery_fee,search,setSerch,showSearch,setShowSerch,cartItem,addToCart,getCartCount
    }

    return (
        <shopContext.Provider value={value}>
            {children}
        </shopContext.Provider>
    )
}
export default ShopContextProvider