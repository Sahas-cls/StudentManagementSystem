import React from 'react'
import Sidebar from '../common/Sidebar'
import Header from '../Header'
import ViewStudents from '../ViewStudents'

const PageViewStudent = () => {
  return (
    <div className='flex'>
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        <ViewStudents />
      </div>
    </div>
  )
}

export default PageViewStudent
