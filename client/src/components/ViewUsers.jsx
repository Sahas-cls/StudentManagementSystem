import React from "react";
import useUsers from "../../hooks/useUsers";
import { FaUsersSlash } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa"; //active icon
import { MdCancel } from "react-icons/md"; //inactive icon
import { MdEdit } from "react-icons/md"; //edit icon
import { MdDelete } from "react-icons/md"; // delete icon
import Swal from "sweetalert2";
import axios from "axios";

const ViewUsers = ({
  userList,
  usersLoading,
  setEditingUser,
  refreshUsers,
}) => {
  // const { userList, usersLoading, refreshUsers } = useUsers();
  console.log("users list:", userList);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleEditingUser = (user) => {
    setEditingUser(user)
  }

  const handleDeleteUser = async (userId) => {
    //
    const isDelete = await Swal.fire({
      title: "Are you sure",
      text: "This action is permanent and can't be restored",
      icon: "warning",
      showCancelButton: true,
    })

    if (!isDelete.isConfirmed) {
      return;
    }

    try {
      if (userId) {
        const response = await axios.delete(`${apiUrl}/users/deleteUser/${userId}`, { withCredentials: true })
        console.log(response)
        if (response.status
          === 200) {
          Swal.fire({
            toast: true,
            title: "Success",
            text: "User delete success",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
            position: "bottom-end"
          });
          refreshUsers();
        }
      }
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <div>
      <div className="mx-12">
        {Array.isArray(userList) && userList.length > 0 ? (
          <div className="w-full my-8 rounded-lg overflow-hidden">
            <table className="w-full ">
              <thead className="bg-gradient-to-r from-gray-700 to-gray-500">
                <tr className="">
                  <th className="px-2 py-3 text-white border-l">User Name</th>
                  <th className="px-2 py-3 text-white border-l">Full Name</th>
                  <th className="px-2 py-3 text-white border-l">Email</th>
                  <th className="px-2 py-3 text-white border-l">Mobile No</th>
                  <th className="px-2 py-3 text-white border-l">User Role</th>
                  <th className="px-2 py-3 text-white border-l">Status</th>
                  <th className="px-2 py-3 text-white border-l">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {Array.isArray(userList) &&
                  userList.map((user, index) => (
                    <tr key={index} className="odd:bg-blue-100 even:bg-blue-200">
                      <td className="px-4 py-2 border">{user.userName}</td>
                      <td className="px-4 py-2 border">{user.fullName}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 border">{user.mobileNo}</td>
                      <td className="px-4 py-1  text-center border">
                        {user.userRole === "superadmin" && "Super Admin"}
                        {user.userRole === "admin" && "Admin"}
                        {user.userRole === "staff" && "Staff User"}
                      </td>
                      <td className="px-4 py-1 text-center border">
                        <div className="flex justify-center">
                          {user.status === "active" ? (
                            <div className="">
                              <FaCheckCircle className="text-xl text-green-600" />
                            </div>
                          ) : (
                            <MdCancel className="text-xl text-red-600" />
                          )}
                        </div>
                      </td>
                      <td className="">
                        <div className="flex justify-center gap-x-2">
                          <button
                            className="text-2xl text-blue-700"
                            type="button"
                            onClick={() => handleEditingUser(user)}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className="text-2xl text-red-700"
                            type="button"
                            onClick={() => handleDeleteUser(user.userId)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-300 h-48  mt-12 p-10 rounded-md text-center border shadow-md">
            <h4 className="text-5xl flex justify-center">
              <FaUsersSlash />
            </h4>
            <h3 className="">There are no users</h3>
            <div className="mt-4">
              <button className="bg-gradient-to-br from-blue-500 to-blue-700 px-4 py-1 rounded-md text-white">
                <span className="flex flex-col items-center justify-center">
                  <HiRefresh /> <p>Refresh</p>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
