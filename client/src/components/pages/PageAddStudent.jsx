import React from 'react'
import Sidebar from '../common/Sidebar'
import Header from '../Header'
import AddStudent from '../AddStudent'

const PageAddStudent = () => {
  return (
    <div className='flex'>
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        <AddStudent />
      </div>
    </div>
  )
}

export default PageAddStudent
