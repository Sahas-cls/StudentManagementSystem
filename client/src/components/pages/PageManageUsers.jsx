import React from 'react'
import Sidebar from '../common/Sidebar'
import Header from '../Header'
import AddUser from '../AddUser'
import ViewUsers from '../ViewUsers'

const PageManageUsers = () => {
  return (
    <div className='flex'>
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        <AddUser />
        <ViewUsers />
      </div>
    </div>
  )
}

export default PageManageUsers
