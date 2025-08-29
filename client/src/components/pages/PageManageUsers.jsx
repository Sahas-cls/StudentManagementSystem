import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import Header from "../Header";
import AddUser from "../AddUser";
import ViewUsers from "../ViewUsers";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import useUsers from "../../../hooks/useUsers";

const PageManageUsers = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingUser, setEditingUser] = useState({});
  const { userList, usersLoading, refreshUsers } = useUsers();

  // framer motion variants
  const containerVar = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    exit: { opacity: 0, scale: 0.8 },
  };

  const viewUsersVar = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: isAdding ? 5 : 20,
      transition: { duration: 0.8 },
    },
  };
  return (
    <div className="flex overflow-hidden">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        <div className="mt-4 flex justify-end px-8">
          <button
            type="button"
            className="px-2 py-2 rounded-lg font-semibold bg-secondary text-white flex gap-x-2 items-center"
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? (
              <IoClose className="text-lg" />
            ) : (
              <FaPlus className="text-lg" />
            )}
            {isAdding ? "Close form" : "Add user"}
          </button>
        </div>
        <AnimatePresence>
          {isAdding && (
            <motion.div
              variants={containerVar}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              <AddUser onUserAdded={refreshUsers} setIsAdding={setIsAdding} />
            </motion.div>
          )}
        </AnimatePresence>
        <div
          variants={viewUsersVar}
          initial="visible"
          animate="visible"
          className=""
        >
          <ViewUsers
            userList={userList}
            usersLoading={usersLoading}
            setEditingUser={setEditingUser}
            refreshUsers={refreshUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default PageManageUsers;
