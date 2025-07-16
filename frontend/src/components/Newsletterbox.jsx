import React from 'react'

const Newsletterbox = () => {
  const onSubmitHandler =(e)=>{
    e.preventDefault();
  }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
        <p className='text-gray-400 mt-3'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure laudantium accusantium similique! Eveniet, vel fugit tenetur tempore eligendi deleniti rerum?
        </p>
        <form onClick={()=>onSubmitHandler()} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3 border' >
          <input type="email" placeholder='Ener your email' className='w-full outline-none sm:flex-1' />
          <button className='px-10 py-4 bg-black text-white text-sm' type='submit'>Subscribe</button>
        </form>
    </div>
  )
}

export default Newsletterbox