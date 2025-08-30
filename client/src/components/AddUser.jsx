import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import api from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";

const AddUser = ({ onUserAdded, setIsAdding, editingUser, formikRef }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Create validation schema based on whether we're editing a user
  const getValidationSchema = (isEditing) => {
    return yup.object({
      fullName: yup
        .string()
        .required("Full name is required")
        .min(3, "Too short"),
      email: yup.string().email("Invalid email").required("Email required"),
      userName: yup.string().required("userName required").min(3, "Too short"),
      password: yup
        .string()
        .test('password-required', 'Password required', function (value) {
          const { changePassword } = this.parent;
          // If creating new user, password is always required
          if (!isEditing) return !!value;
          // If editing user, password is only required when changePassword is checked
          return !changePassword || (changePassword && !!value);
        })
        .min(6, "Min 6 characters"),
      role: yup.string().required("Role required"),
      phone: yup.string().matches(/^[0-9]{10}$/, "Invalid phone number"),
    });
  };

  const isEditing = !!editingUser?.userId;
  const validationSchema = getValidationSchema(isEditing);

  return (
    <div className="px-8 py-6 bg-white rounded-lg shadow-md mx-8 my-4">
      <Formik
        initialValues={{
          fullName: editingUser?.fullName || "",
          email: editingUser?.email || "",
          userName: editingUser?.userName || "",
          password: "" || "",
          role: editingUser?.role || "admin",
          status: editingUser?.status || "active",
          phone: editingUser?.mobileNo || "",
          changePassword: false,
        }}
        innerRef={formikRef}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          console.log("client values: ", values); // Replace with API call
          try {
            // Prepare data for submission - remove password if not changing it
            const submitData = { ...values };
            if (isEditing && !values.changePassword) {
              delete submitData.password;
            }

            let response = null;
            if (!isEditing) {
              response = await axios.post(
                `${apiUrl}/users/createUser`,
                submitData,
                { withCredentials: true }
              );
            } else {
              response = await axios.put(
                `${apiUrl}/users/updateUser/${editingUser.userId}`,
                submitData,
                { withCredentials: true }
              );
            }

            if (response.status === 201 || response.status === 200) {
              response.status === 200 ? Swal.fire({
                toast: true,
                title: "Operation success",
                text: "User update success...",
                icon: "success",
                timer: 3000,
                position: "bottom-end",
                timerProgressBar: true,
              }) :
                Swal.fire({
                  toast: true,
                  title: "Operation success",
                  text: "New user creation success...",
                  icon: "success",
                  timer: 3000,
                  position: "bottom-end",
                  timerProgressBar: true,
                });

              onUserAdded();
              response = null;
              setIsAdding(false);
            }
          } catch (error) {
            if (error.status === 400) {
              const err = error.response.data;
              console.log(err);
              setFieldError(err.path, err.message);
            }
            console.log(error);
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ values }) => (
          <Form className="grid grid-cols-2 gap-x-8 gap-y-4">
            {/* Title */}
            <div className="col-span-2 flex items-center justify-center mb-4">
              <h1 className="text-xl font-semibold text-gray-700">
                User Details
              </h1>
            </div>

            {/* Full Name */}
            <div className="flex flex-col">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <Field
                name="fullName"
                id="fullName"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="fullName">
                {(msg) => (
                  <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Field
                name="email"
                id="email"
                type="email"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            {/* userName */}
            <div className="flex flex-col">
              <label
                htmlFor="userName"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                userName
              </label>
              <Field
                name="userName"
                id="userName"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="userName">
                {(msg) => (
                  <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <Field
                name="phone"
                id="phone"
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="phone">
                {(msg) => (
                  <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
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
                {(msg) => (
                  <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Field
                    type="radio"
                    name="status"
                    id="statusActive"
                    value="active"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="statusActive"
                    className="text-sm text-gray-700"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Field
                    type="radio"
                    name="status"
                    id="statusInactive"
                    value="inactive"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="statusInactive"
                    className="text-sm text-gray-700"
                  >
                    Inactive
                  </label>
                </div>
              </div>
              <div className="text-xs mt-1 h-5"></div>
            </div>

            {!isEditing ? (
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Field
                  name="password"
                  id="password"
                  type="password"
                  className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="password">
                  {(msg) => (
                    <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
            ) : (
              <div className="grid col-span-2 grid-cols-2 gap-x-8">
                <div className="flex gap-x-4 items-center">
                  <Field id="changePassword" name="changePassword" type="checkbox" />
                  <label htmlFor="changePassword">Change password</label>
                </div>

                <AnimatePresence>
                  {values.changePassword && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="flex flex-col"
                    >
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 mb-1"
                      >
                        Password
                      </label>
                      <Field
                        name="password"
                        id="password"
                        type="password"
                        className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage name="password">
                        {(msg) => (
                          <div className="text-red-600 text-xs mt-1 h-5">{msg}</div>
                        )}
                      </ErrorMessage>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Submit */}
            <div className="col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isEditing ? "Edit user" : "Add user"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUser;