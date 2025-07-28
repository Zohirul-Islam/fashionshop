import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";
const Navbar = () => {
    const [visible,setVisible] = useState(false);
    const {setShowSerch,getCartCount,token,setToken,navigate,setCartItem} = useContext(ShopContext);
    const Logout = () =>{
      navigate('/login');
      localStorage.removeItem('token');
      setCartItem({})
      setToken('');
      
    }
  return (
    <div className="flex items-center justify-between py-5 font-medium  text-white border-b border-gray-300">
      <Link to={"/"}>
        {/* <img className="36" src={assets.logo} alt="" /> */}
        <h2 className="text-blue-800 font-bold sm:text-5xl text-2xl">Fashion <span className="text-blue-800">Shop</span></h2>
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/">
          <div className="flex flex-col items-center gap-1">
            <p className="">HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </div>
        </NavLink>
        <NavLink to="/about">
          <div className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </div>
        </NavLink>
        <NavLink to="/collection">
          <div className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </div>
        </NavLink>
        <NavLink to="/contact">
          <div className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </div>
        </NavLink>
      </ul>
      <div className="flex items-center gap-3 sm:gap-6">
        <img onClick={()=>setShowSerch(true)} src={assets.search_icon} alt="" className="w-5 cursor-pointer" />
        <div className="group relative">
          <img
          onClick={()=>token ? null :navigate('/login')}
            src={assets.profile_icon}
            alt=""
            className="w-5 cursor-pointer"
          />
          {
            token && 
          <div className="absolute hidden group-hover:block dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-40 py-2 px-5 bg-slate-600">
              <p className="cursor-pointer">My Profile</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer">Orders</p>
              <p onClick={()=>Logout()} className="cursor-pointer">Logout</p>
            </div>
          </div>
          }
        </div>
        <Link to="/cart" className="relative">
            <img className="w-5 cursor-pointer" src={assets.cart_icon} alt="" />
            <p className="bg-black w-8 h-8 text-center text-white  border rounded-full absolute top-[-25px] right-[-20px]">{getCartCount()}</p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className="cursor-pointer w-5 sm:hidden" alt="" />
      </div>
      {/* sidebar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' :"w-0"}`}>
        <div className="flex flex-col text-gray-600">
            <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-3">
                <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
                <p>BACK</p>
            </div>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
