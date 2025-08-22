import { MdOutlineDashboard } from "react-icons/md"; // dashbaord icon
import { PiStudentBold } from "react-icons/pi";
import { AiOutlineBook } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";


export const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    icon: MdOutlineDashboard,
    navigateTo: "/dashboard"
  },
  {
    id: 2,
    title: "Students",
    icon: PiStudentBold,
    subMenu: [
      {
        id: 2.1,
        title: "Add Student",
        icon: "",
        navigateTo: "/student/add"
      },
      {
        id: 2.2,
        title: "View Students",
        icon: "",
        navigateTo: "/student/view"
      },
    ]
  },
  {
    id: 3,
    title: "Courses",
    icon: AiOutlineBook,
    navigateTo: "/courses"
  },
  {
    id: 4,
    title: "Users",
    icon: FaUsersCog,
    navigateTo: "/users"
  },

]