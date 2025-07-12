import React from 'react'
import {assets} from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between px-[4%] py-2'>
      <img src={assets.logo} className='w-[max(10%,80px)]' alt="" />
      <button onClick={()=>setToken('')} className='bg-gray-700 text-white px-7 py-2 rounded-full text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
