import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./Signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [error, setError] = useState(null);
  useEffect(() => {
    document.body.classList.add("signup-bodyy");
    return () => {
      document.body.classList.remove("signup-bodyy");
    };
  }, []);

  const userSchema = yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(2, "First name must be between 2 and 11 characters")
      .max(11, "First name must be between 2 and 11 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be between 2 and 11 characters")
      .max(11, "Last name must be between 2 and 11 characters"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])[A-Za-z0-9]/,
        "Password must contain at least one uppercase letter"
      )
      .min(8, "Password must be at least 8 characters long"),
    repassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    number: yup
      .string()
      .required("Phone number is required")
      .matches(/^01[1250][0-9]{8}$/, "Invalid phone number"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      password: "",
      repassword: "",
    },
    validationSchema: userSchema,
    onSubmit: async () => {
      try {
        console.log("Successful registration");
      } catch (error) {
        setError("Something went wrong");
      }
    },
  });

  return (
    <>
      <div className="container pt-3">
        <div className="container-sign form-signin row">
          <form onSubmit={formik.handleSubmit}>
            {error && <p className="text-danger">{error}</p>}
            <div className="mb-3">
              <label htmlFor="firstName" className="label">
                First Name
              </label>
              <div className="input-container">
                <input
                  className="form-label form-control"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <FontAwesomeIcon icon={faUser} className="icon" />
              </div>
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="message-error my-2 fs-6">
                  {formik.errors.firstName}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="label">
                Last Name
              </label>
              <div className="input-container">
                <input
                  className="form-label form-control"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                <FontAwesomeIcon icon={faUser} className="icon" />
              </div>
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="message-error my-2 fs-6">
                  {formik.errors.lastName}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="input-container">
                <input
                  className="form-label form-control"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="message-error my-2 fs-6">{formik.errors.email}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="input-container">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Password"
                />
                <FontAwesomeIcon icon={faLock} className="icon" />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="message-error my-2 fs-6">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="repassword" className="label">
                Confirm Password
              </label>
              <div className="input-container">
                <input
                  type="password"
                  name="repassword"
                  className="form-control"
                  id="repassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repassword}
                  placeholder="Confirm Password"
                />
                <FontAwesomeIcon icon={faLock} className="icon" />
              </div>
              {formik.touched.repassword && formik.errors.repassword && (
                <p className="message-error my-2 fs-6">
                  {formik.errors.repassword}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="label">
                Phone Number
              </label>
              <div className="input-container">
                <input
                  type="text"
                  name="number"
                  className="form-control"
                  id="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.number}
                  placeholder="Enter your phone number"
                />
                <FontAwesomeIcon icon={faPhone} className="icon" />
              </div>
              {formik.touched.number && formik.errors.number && (
                <p className="message-error my-2 fs-6">
                  {formik.errors.number}
                </p>
              )}
            </div>
            <span>
              <button type="submit" className="btn btn-primary pill">
                Register
              </button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
