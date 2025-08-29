import { useState, useEffect } from "react"
import axios from "axios";

function useUsers() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${apiUrl}/users/getUsers`)
      if (response.status === 200) {
        setUserList(response.data.data);
      }
    } catch (error) {
      console.log("Error while fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [apiUrl])


  return { userList, usersLoading: isLoading, refreshUsers: fetchUsers }
}

export default useUsers;
