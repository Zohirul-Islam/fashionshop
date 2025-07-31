import { useContext } from "react";
import { assets } from "../assets/assets";
import { IoMdHome } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { ShopContext } from "../context/Shopcontext";
import { Link } from "react-router-dom";
const MobileMenu = () => {
    const {token,navigate,getCartCount,logout,setCartItem,setToken} = useContext(ShopContext);
    const count = getCartCount();
      const Logout = () =>{
      navigate('/login');
      localStorage.removeItem('token');
      setCartItem({})
      setToken('');
      
    }
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-amber-600 w-full sm:hidden">
      <div  className="py-3 flex justify-between items-center px-5">
        <div onClick={()=>navigate('/')} className="flex flex-col items-center text-gray-800 cursor-pointer">
        <IoMdHome className="text-3xl" />
        <p className="text-sm font-semibold ">Home</p>
        </div>
        
        <Link to={'/cart'} className="relative ">
            <div  className="flex flex-col items-center text-gray-800">
            <FiShoppingCart className="text-3xl" />
            <p className="text-sm font-semibold">cart</p>
            </div>
           { count ? <p className=" bg-gray-50 text-black w-5 sm:w-8 h-5 sm:h-8 text-center  border rounded-full absolute top-[-10px] right-[-10px]">{count}</p> : null}
        </Link>
        
        <div 
        onClick={()=>{if(token){
          Logout();
        }else{
          navigate('/login');
        }
        }} className="flex flex-col items-center cursor-pointer text-gray-800">
          <img
            src={assets.profile_icon}
            alt=""
            className="w-5 cursor-pointer"
          />
          
        <p  className="font-semibold text-gray-800 text-sm">{token ? "Logout" :"Login"}</p>
          
        </div>
        
      </div>
    </div>
  );
};

export default MobileMenu;