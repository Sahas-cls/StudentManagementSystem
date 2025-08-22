import React, { useState } from 'react'
import Sidebar from '../common/Sidebar'
import Header from '../Header'
import Dashboard from '../admin/Dashboard'
import AddCourse from '../AddCourse'
import ViewCourses from '../ViewCourses'
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const PageCourses = () => {
  const [isAddingCourse, setIsAddingCourse] = useState(false)

  return (
    <div className='flex overflow-hidden'>
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        <div className="mt-4 flex justify-end px-8">
          <button
            type='button'
            className='px-2 py-2 rounded-lg font-semibold bg-secondary text-white flex gap-x-2 items-center'
            onClick={() => setIsAddingCourse(!isAddingCourse)}
          >
            {isAddingCourse ? <IoClose className='text-lg' /> : <FaPlus className='text-lg' />}
            {isAddingCourse ? "Close form" : "Add course"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isAddingCourse ? (
            <motion.div
              key="add-course"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.9,
                transition: { duration: 0.2 }
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="mb-6"
            >
              <AddCourse />
            </motion.div>
          ) : null}

          <motion.div
            key="view-courses"
            initial={false}
            animate={{
              y: isAddingCourse ? 5 : 0,
              opacity: isAddingCourse ? 0.8 : 1
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: isAddingCourse ? 0.1 : 0
            }}
            className='px-4'
          >
            <ViewCourses />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PageCourses