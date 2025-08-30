import React from 'react'
import { FaUser } from 'react-icons/fa'

const Header = () => {
  return (
    <div className='w-full bg-gray-400 h-[10vh] flex items-center justify-between px-8'>
      <h1>Admin Panel</h1>
      <div className="rounded-full border border-black p-2">
        <FaUser/>
      </div>
    </div>
  )
}

export default Header
