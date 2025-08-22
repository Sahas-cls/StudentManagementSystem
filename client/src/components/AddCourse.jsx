import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"

const AddCourse = () => {
  const validations = yup.object({
    cName: yup.string().required("Course name required").min(3, "Course name too short"),
    cCode: yup.string().required("Course code required").min(2, "Course code is too short"),
    cDuration: yup.number().required("Course duration required"),
    cTotalSem: yup.number().required("Total semesters required")
  })

  return (
    <div className='px-8 py-6 bg-white rounded-lg shadow-md mx-8 my-4'>
      <Formik
        initialValues={{
          cName: "",
          cCode: "",
          cDuration: "",
          cTotalSem: "",
          cStatus: "active",
          cDescription: "",
        }}
        validationSchema={validations}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ }) => (
          <Form className='grid grid-cols-2 gap-x-8 gap-y-4'>
            <div className="col-span-2 gap-4 flex items-center justify-center mb-4">
              <h1 className='text-xl font-semibold text-gray-700'>Course Details</h1>
            </div>

            {/* Course Name Field */}
            <div className="flex flex-col">
              <label htmlFor="cName" className='block text-sm font-medium text-gray-700 mb-1'>Course Name</label>
              <Field
                name="cName"
                id="cName"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name='cName'>
                {msg => <div className='text-red-600 text-xs mt-1 h-5'>{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Course Code Field */}
            <div className="flex flex-col">
              <label htmlFor="cCode" className='block text-sm font-medium text-gray-700 mb-1'>Course Code</label>
              <Field
                name="cCode"
                id="cCode"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name='cCode'>
                {msg => <div className='text-red-600 text-xs mt-1 h-5'>{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Duration Field */}
            <div className="flex flex-col">
              <label htmlFor="cDuration" className='block text-sm font-medium text-gray-700 mb-1'>Duration (years)</label>
              <Field
                name="cDuration"
                id="cDuration"
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name='cDuration'>
                {msg => <div className='text-red-600 text-xs mt-1 h-5'>{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Total Semesters Field */}
            <div className="flex flex-col">
              <label htmlFor="cTotalSem" className='block text-sm font-medium text-gray-700 mb-1'>Total Semesters</label>
              <Field
                name="cTotalSem"
                id="cTotalSem"
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name='cTotalSem'>
                {msg => <div className='text-red-600 text-xs mt-1 h-5'>{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Status Field */}
            <div className="flex flex-col">
              <label className='block text-sm font-medium text-gray-700 mb-1'>Status</label>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Field
                    type="radio"
                    name="cStatus"
                    id="cStatusActive"
                    value="active"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="cStatusActive" className='text-sm text-gray-700'>Active</label>
                </div>
                <div className="flex items-center gap-2">
                  <Field
                    type="radio"
                    name="cStatus"
                    id="cStatusInactive"
                    value="inactive"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="cStatusInactive" className='text-sm text-gray-700'>Inactive</label>
                </div>
              </div>
              {/* Invisible error placeholder to maintain layout consistency */}
              <div className='text-xs mt-1 h-5'></div>
            </div>

            {/* Description Field - spans full width */}
            <div className="col-span-2 flex flex-col">
              <label htmlFor="cDescription" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
              <Field
                as="textarea"
                name="cDescription"
                id="cDescription"
                rows={4}
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Course
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddCourse