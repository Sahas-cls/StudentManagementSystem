import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

const AddStudent = () => {
  const initialValues = {
    stName: "",
    dob: "",
    gender: "male",
    email: "",
    phoneNo: "",
    address: "",
    course: "",
    status: "active",
  }

  const handleSubmit = (values) => {
    console.log(values)
  }
  return (
    <div className='px-8 py-6'>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form className='grid grid-cols-2 gap-x-8 gap-y-2'>
            <div className="col-span-2 gap-4 flex items-center justify-center">
              {/* <hr className='border border-gray-400/60 flex-1' /> */}
              <h1 className='subTopics opacity-75'>Identity & Personal Info</h1>
              <hr className='border border-gray-400/60 flex-1' />
            </div>
            <div className="grid grid-cols-1">
              <label htmlFor="stName">Full Name</label>
              <Field id="stName" name="stName" placeholder="John Doe" className="formInputs border rounded-md shadow" />
            </div>
            <div className="grid grid-cols-1">
              <label htmlFor="dob">Date of Birth</label>
              <Field type="Date" id="dob" name="dob" className="formInputs border rounded-md shadow" />
            </div>

            <div className="grid grid-cols-1">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" placeholder="example@gmail.com" className="formInputs border rounded-md shadow" />
            </div>
            <div className="grid grid-cols-1">
              <label htmlFor="phoneNo">Phone No</label>
              <Field id="phoneNo" name="phoneNo" placeholder="0710000000" className="formInputs border rounded-md shadow" />
            </div>
            <div className="grid grid-cols-1">
              <label htmlFor="address">Address</label>
              <Field id="address" name="address" placeholder="Madola, Avisawella" className="formInputs border rounded-md shadow" />
            </div>
            <div className="grid grid-cols-1">
              <label htmlFor="gender">Gender</label>
              <div className="gap-x-6 flex items-center">
                <span className='flex items-center gap-1'>
                  <Field type="radio" id="genderMale" name="gender" value="male" />
                  <label htmlFor="genderMale">Male</label>
                </span>
                <span className='flex items-center gap-1'>
                  <Field type="radio" id="genderFemale" name="gender" value="female" />
                  <label htmlFor="genderFemale">Female</label>
                </span>
              </div>

            </div>
            <div className="mt-4 col-span-2 gap-4 flex items-center justify-center">
              {/* <hr className='border border-gray-400/60 flex-1' /> */}
              <h1 className='subTopics opacity-75'>Academic Info</h1>
              <hr className='border border-gray-400/60 opacity-75 flex-1' />
            </div>
            <div className="grid grid-cols-1">
              <label htmlFor="course">Course</label>
              <Field id="course" name="course" placeholder="IT - Diploma" className="formInputs border rounded-md shadow" />
            </div>
            <div className="grid grid-cols-1">
              <label htmlFor="course">Status</label>
              <div className="flex items-center gap-x-4">
                <div className="flex gap-1">
                  <Field type="radio" id="status.active" name="status" value="active" className="" />
                  <label htmlFor="status.active">Active</label>
                </div>
                <div className="flex gap-1">
                  <Field type="radio" id="status.inactive" name="status" value="inactive" className="" />
                  <label htmlFor="status.inactive">Inactive</label>
                </div>
                <div className="flex gap-1">
                  <Field type="radio" id="status.graduated" name="status" value="graduated" className="" />
                  <label htmlFor="status.graduated">Graduated</label>
                </div>
              </div>
            </div>
            <div className="flex col-span-2 gap-4 mt-8 justify-end">
              <button onClick={() => resetForm()} type='button' className='bg-btnReset hover:bg-btnResetHover font-semibold text-white px-2 py-1 rounded-md w-24'>Reset</button>
              <button className='bg-btnSubmit hover:bg-btnSubmitHover font-semibold text-white px-2 py-1 rounded-md w-24'>Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddStudent
