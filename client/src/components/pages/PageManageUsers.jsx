import React, { useState, useEffect, useRef } from "react";
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
  const formikRef = useRef();

  useEffect(() => {
    if (!isAdding && formikRef.current) {
      formikRef.current.resetForm();
      setEditingUser(null);
    }
  }, [isAdding]);


  console.log("EDITING USER FROM PARENT COMP: ", editingUser)
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


  useEffect(() => {
    if (editingUser?.userId
    ) {
      setIsAdding(true)
    } else {
      setIsAdding(false)
    }
    console.log("editing user from use effect: ", editingUser)
  }, [editingUser])


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
            className="px-2 py-2 rounded-lg font-semibold bg-primary text-white flex gap-x-2 items-center"
            onClick={() => {

              setIsAdding(!isAdding);
            }}
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
              <AddUser onUserAdded={refreshUsers} setIsAdding={setIsAdding} editingUser={editingUser} formikRef={formikRef} />
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
