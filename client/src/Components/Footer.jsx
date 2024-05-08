import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='flex bg-blue-500 py-3 px-2 justify-center mt-2 dark:bg-gray-800'>
       <Link className='mx-2 text-white' to='/'>Home</Link>
       <Link className='mx-2 text-white' to='/product'>Product</Link>
    </div>
  )
}

export default Footer