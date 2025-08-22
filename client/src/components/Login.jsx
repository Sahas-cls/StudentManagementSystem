import React from 'react'
import { FaUserCircle } from "react-icons/fa"; //user icon
import loginLeftPnl from "../assets/images/loginLeftPnl.jpg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { motion, AnimatePresence, scale, animate } from "framer-motion";

const Login = () => {
  // yup validations
  const validations = yup.object({
    userName: yup.string().required("User name required"),
    password: yup.string().required("Password required")
  })

  // variant for add animation when form load
  const formVariant = {
    hidden: { opacity: 0, scale: 0, rotate: "45deg" },
    visible: { opacity: 1, scale: 1, x: 0, rotate: "0deg", transition: { duration: 1.4, type: "spring", stiffness: "100" } },
    exit: { opacity: 0, scale: 0 }
  }

  const fieldVariant = {

  }

  // variant for buttons
  const buttonVariant = {
    tap: { scale: 0.5, transition: { duration: 0.4 } },
  }

  return (
    <AnimatePresence>
      <motion.div className='flex w-full h-[100vh] overflow-clip justify-center items-center min-h-screen bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))]

from-[#9660e4]
to-[#1c1d21]
]'>
        <motion.div variants={formVariant} initial="hidden" animate="visible" exit="exit" className="w-2/4 min-h-[80vh] flex shadow-2xl rounded-xl overflow-hidden">
          <section className='flex-1 flex items-center justify-center bg-[#2F3137] text-white'>
            <div className="mt-6 justify-center">
              <div className="mb-4">
                <h1 className='font-bold text-2xl'>Login</h1>
              </div>

              <Formik
                initialValues={{ userName: "", password: "" }}
                validationSchema={validations}
                onSubmit={(values) => {
                  console.log("values:- ", values)
                }}
              >
                {({ values, touched }) => (
                  <Form
                    className=""
                  >
                    <div className="grid grid-cols-1">
                      <div className="grid grid-cols-1">
                        <label htmlFor="">User Name:</label>
                        <Field name="userName" className="formInputs bg-transparent border-b border-0 outline-none" placeholder="John Doe" style={{ backgroundColor: "transparent" }} />
                        <ErrorMessage name='userName' component="div" className='text-red-500' />
                      </div>
                      <div className="grid grid-cols-1 mt-4">
                        <label htmlFor="">Password:</label>
                        <Field type="password" name="password" className="formInputs bg-transparent border-b border-0 outline-none" placeholder="******" style={{ backgroundColor: "transparent" }} />
                        <ErrorMessage name='password' component="div" className='text-red-500' />
                      </div>

                      <div className="mt-8">
                        <motion.button type='submit' variants={buttonVariant} whileTap="tap" className='buttons w-full bg-[#9360e3] font-semibold hover:bg-[#A784DB] duration-150'>Login</motion.button>
                      </div>
                    </div>
                  </Form>
                )}


              </Formik>


            </div>
          </section>
          <section className='w-6/12 bg-yellow-300' style={{
            backgroundImage: `url(${loginLeftPnl})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}>
            <h1></h1>
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Login
