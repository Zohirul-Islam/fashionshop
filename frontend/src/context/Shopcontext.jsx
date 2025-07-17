import { createContext, useState } from "react";
import { products } from "../assets/assets";
export const shopContext = createContext();

const ShopContextProvider = ({children}) =>{
    const currency = '$';

    const delivery_fee = 10;
    const [search,setSerch] = useState('');
    const [showSearch,setShowSerch] = useState(false);
   const value = {
        products,currency,delivery_fee,search,setSerch,showSearch,setShowSerch
    }

    return (
        <shopContext.Provider value={value}>
            {children}
        </shopContext.Provider>
    )
}
export default ShopContextProvider