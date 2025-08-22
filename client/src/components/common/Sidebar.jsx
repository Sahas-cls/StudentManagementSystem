import React, { useState } from 'react';
import { sidebarData } from "../../assets/data/SidebarData";
import { TfiDashboard } from "react-icons/tfi";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  // framer motion variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.02,
      backgroundColor: "#8661BC",
      x: 10,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 200
      }
    }
  }

  const subItemVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120
      }
    },
    hover: {
      scale: 1.01,
      backgroundColor: "#6a4d9a",
      x: 5,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    }
  }

  const toggleSubmenu = (id) => {
    setActiveSubmenu(activeSubmenu === id ? null : id);
  };

  return (
    <div className='w-56 bg-gradient-to-b from-secondary/90 to-secondary/70 min-h-screen h-full text-white overflow-hidden border-r border-white/10 flex flex-col'>
      <div className="h-full flex flex-col">
        {/* Logo and Title Section */}
        <div className="pt-8 pb-6 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: "100" }}
            className="flex justify-center"
          >
            <GiGraduateCap className='text-6xl text-purple-300' />
          </motion.div>
          <motion.h1
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className='text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-100 to-purple-200 mt-2'
          >
            Admin Panel
          </motion.h1>
        </div>

        {/* to take remaining space */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden py-2">
          <motion.ul
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className='flex flex-col gap-y-1'
          >
            {Array.isArray(sidebarData) && sidebarData.map((menu) => (
              <React.Fragment key={menu.id}>
                <motion.li
                  variants={itemVariant}
                  whileHover="hover"
                  onHoverStart={() => setHoveredItem(menu.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className="rounded-lg relative overflow-hidden"
                >
                  {hoveredItem === menu.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  <button
                    className={`w-full flex items-center justify-between px-4 py-3 relative z-10`}
                    onClick={() => menu.subMenu ? toggleSubmenu(menu.id) : navigate(menu.navigateTo)}
                  >
                    <div className="flex items-center gap-3">
                      <span className='text-xl'>
                        {menu.icon && <menu.icon className="text-purple-300" />}
                      </span>
                      <span className='text-lg font-medium'>{menu.title}</span>
                    </div>
                    {menu.subMenu && (
                      <motion.div
                        animate={{ rotate: activeSubmenu === menu.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaAngleDown className="text-sm text-purple-200" />
                      </motion.div>
                    )}
                  </button>
                </motion.li>

                <AnimatePresence>
                  {menu.subMenu && activeSubmenu === menu.id && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 10
                        }
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-8 overflow-hidden"
                    >
                      {menu.subMenu.map((sm) => (
                        <motion.li
                          key={sm.id}
                          variants={subItemVariant}
                          whileHover="hover"
                          className="rounded-lg my-1"
                        >
                          <button
                            className='flex items-center w-full px-4 py-2 gap-3'
                            onClick={() => navigate(sm.navigateTo)}
                          >
                            <span className='text-lg'>
                              {sm.icon && <sm.icon className="text-purple-200" />}
                            </span>
                            <span className='text-md'>{sm.title}</span>
                          </button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </motion.ul>
        </div>

        {/* Footer area */}
        <div className="py-4 mt-auto flex-shrink-0">
          <motion.div
            className="text-center text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-center font-bold text-white font-dancing tracking-wider opacity-75">V1.0</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;