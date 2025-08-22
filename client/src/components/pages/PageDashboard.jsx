import React from 'react'
import Sidebar from '../common/Sidebar'
import Header from '../Header'
import Dashboard from '../admin/Dashboard'

const PageDashboard = () => {
  return (
    <div className='flex'>
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        <div className="">
          <Dashboard />
        </div>
      </div>
    </div>
  )
}

export default PageDashboard
