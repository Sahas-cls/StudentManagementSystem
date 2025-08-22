import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const AddUser = () => {
  const validations = yup.object({
    fullName: yup.string().required("Full name is required").min(3, "Too short"),
    email: yup.string().email("Invalid email").required("Email required"),
    username: yup.string().required("Username required").min(3, "Too short"),
    password: yup.string().required("Password required").min(6, "Min 6 characters"),
    role: yup.string().required("Role required"),
    phone: yup.string().matches(/^[0-9]{10}$/, "Invalid phone number"),
  });

  return (
    <div className="px-8 py-6 bg-white rounded-lg shadow-md mx-8 my-4">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          username: "",
          password: "",
          role: "admin",
          status: "active",
          phone: "",
        }}
        validationSchema={validations}
        onSubmit={(values) => {
          console.log(values); // Replace with API call
        }}
      >
        {() => (
          <Form className="grid grid-cols-2 gap-x-8 gap-y-4">
            {/* Title */}
            <div className="col-span-2 flex items-center justify-center mb-4">
              <h1 className="text-xl font-semibold text-gray-700">User Details</h1>
            </div>

            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Field
                name="fullName"
                id="fullName"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="fullName">
                {(msg) => <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                name="email"
                id="email"
                type="email"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="email">
                {(msg) => <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Username */}
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <Field
                name="username"
                id="username"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="username">
                {(msg) => <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Field
                name="password"
                id="password"
                type="password"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="password">
                {(msg) => <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Field
                name="phone"
                id="phone"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="phone">
                {(msg) => <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Role</label>
              <Field
                as="select"
                name="role"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="superadmin">Super Admin</option>
              </Field>
              <ErrorMessage name="role">
                {(msg) => <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Field
                    type="radio"
                    name="status"
                    id="statusActive"
                    value="active"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="statusActive" className="text-sm text-gray-700">Active</label>
                </div>
                <div className="flex items-center gap-2">
                  <Field
                    type="radio"
                    name="status"
                    id="statusInactive"
                    value="inactive"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="statusInactive" className="text-sm text-gray-700">Inactive</label>
                </div>
              </div>
              <div className="text-xs mt-1 h-5"></div>
            </div>

            {/* Submit */}
            <div className="col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add User
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUser;
