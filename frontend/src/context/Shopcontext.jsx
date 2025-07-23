import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const shopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const backend_url = 'http://localhost:4000'
  const delivery_fee = 10;
  const [search, setSerch] = useState("");
  const [showSearch, setShowSerch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products,setProducts] = useState([]);
  const [token,setToken] = useState('');
  const navigate = useNavigate();

  const getProducts = async() =>{
      try {
        const response = await axios.get(backend_url + '/api/product/list');
        if(response.data.success){
          setProducts(response.data.products)
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error(error.message)
      }
  }

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

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
  };
  const getCartAmount = () =>{
    let totalAmout = 0;
    for(const items in cartItem){
        let productIfo = products.find(product=>product._id === items);
        for(const item in cartItem[items]){
            try {
              if (cartItem[items][item] > 0) {
                totalAmout += productIfo.price * cartItem[items][item]
              }
            } catch (error) {
              
            }
        }
    }
    return totalAmout
  }

  useEffect(() => {
    console.log(getCartCount());
  });
  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
  })
  useEffect(()=>{
    getProducts()
  },[])
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSerch,
    showSearch,
    setShowSerch,
    cartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backend_url,
    token,
    setToken
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};
export default ShopContextProvider;
