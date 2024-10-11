import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./Login.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.classList.add("signup-body");
    return () => {
      document.body.classList.remove("signup-body");
    };
  }, []);

  const userSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])[A-Za-z0-9]/,
        "Password must contain at least one uppercase letter"
      )
      .min(8, "Password must be at least 8 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://jwt-bearer-auth1.p.rapidapi.com/login",
          values,
          {
            headers: {
              "content-type": "application/json",
              "Content-Type": "application/json",
              "X-RapidAPI-Key":
                "ddf881fae0mshe761ff8e4a2b0cbp116c40jsne983689f024f",
              "X-RapidAPI-Host": "jwt-bearer-auth1.p.rapidapi.com",
            },
          }
        );
        if (response.status === 200) {
          console.log("Signup successful");
          const token = response.data.token;
          localStorage.setItem("token", token);
        }
      } catch (error) {
        setError("An error occurred during signup");
      }
    },
  });

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://jwt-bearer-auth1.p.rapidapi.com/login",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container pt-5">
        <div className="container-sign form-signin row ">
          <form
            onSubmit={formik.handleSubmit}
            className="col-lg-12 col-sm-12 col-xl-12 col-xxl-12 col-xs-12"
          >
            {error && <p className="text-danger">{error}</p>}

            <div className="mb-3">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <div className="input-container">
                <input
                  className="form-label form-control"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                />
                <FontAwesomeIcon icon={faLock} className="icon" />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="message-error my-2 fs-6">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <span>
              <button type="submit" className="btn btn-primary pill">
                Register
              </button>
              <Link to="/signup">
                <p className="sign">Don't have an account? Sign in here.</p>
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
