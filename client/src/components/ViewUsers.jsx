import React from 'react'
import useUsers from "../../hooks/useUsers"
import { FaUsersSlash } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";

const ViewUsers = ({ setEditingUser }) => {
  const { userList, usersLoading, refreshUsers } = useUsers();
  console.log("users list:", userList)
  return (
    <div>
      <div className="">
        {Array.isArray(userList) && userList.length > 20 ? (
          <div className=""></div>
        ) : (
          <div className="bg-gray-300 h-32 mx-12 mt-12 p-8 rounded-md text-center border shadow-md">
            <h4 className='text-5xl flex justify-center'><FaUsersSlash /></h4>
            <h3 className="">There are no users</h3>
            <div className="">
              <button className=''><span className='flex flex-col items-center justify-center'><HiRefresh /> <p>Refresh</p></span></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewUsers
