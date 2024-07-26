import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { Formik } from "formik";
import { useUserContext } from "../context/user_context";

export const Login = (props) => {
  const [showPassword, setShowPassword] = useState();

  const { loginUser } = useUserContext();
  return (
    <Wrapper>
      <div className="login-main">
        <div className="login-right">
          <div className="login-right-container">
            <div className="form-header">
              <h1>Welcome back!</h1>
              <h3>Please enter your details</h3>
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => {
                loginUser(values);
                // console.log(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form className="login-react-form" onSubmit={handleSubmit}>
                  <div className="form-input">
                    <EmailIcon />
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-input">
                    <KeyIcon />
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pass-input-div">
                    {/* {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )} */}
                  </div>

                  <div className="login-center-buttons">
                    <button type="submit" className="login-btn">
                      Log In
                    </button>
                  </div>
                </form>
              )}
            </Formik>
            <div className="login-bottom-form">
              <p className="login-bottom-p">
                Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .login-main {
    display: flex;
    background-color: #ddddddb8;
  }
  .login-btn {
    border-radius: 0.75rem;
    padding: 0.7rem;
  }
  .login-left {
    flex-grow: 1;
    height: 100vh;
    background-color: #e9e9e9;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-left img {
    width: 400px;
  }

  .login-right {
    height: 100vh;
    display: flex;
    flex-grow: 1;
  }

  .login-right-container {
    padding: 2rem 3.5rem;
    height: 27rem;
    width: 21rem;
    margin: auto;
    background-color: white;
    border-radius: 0.75rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .login-right form {
    display: flex;
    flex-direction: column;
  }

  .login-logo {
    align-self: center;
    padding-top: 50px;
  }

  .login-center {
    margin: auto 0;
  }

  .login-logo img {
    width: 50px;
  }

  .login-center h2 {
    font-size: 1.5rem;
  }

  .login-center {
    text-align: center;
  }

  .login-center p {
    font-weight: 400;
    font-size: 2rem;
    margin-bottom: 40px;
  }

  .form-header {
    text-align: center;
  }
  .signup-froml {
    width: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .signup-react-form > button {
    width: 100%;
    border: none;
    color: white;
    padding: 0.75rem;
    font-weight: bold;
    border-radius: 0.6rem;
    background-color: #73895d;
  }

  .signup-react-form > .form-input input:focus-visible,
  .signup-react-form > button:focus-visible {
    outline: none;
  }
  .signup-react-form > button:hover,
  .signup-react-form > button:focus-visible {
    cursor: pointer;
    background-color: #73895dde;
  }
  .signup-react-form > .form-input label {
    color: #464646;
    margin-bottom: 0.5rem;
  }
  .signup-react-form > .form-input svg {
    position: absolute;
    top: 3rem;
    left: 0.45rem;
    height: 1.25rem;
  }

  .form-input {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 0.75rem;
  }

  .form-input label {
    font-weight: bold;
  }
  .form-input p {
    margin: 0rem;
    font-size: 0.75rem;
  }

  .form-input label {
    color: #464646;
    margin-bottom: 0.5rem;
  }
  .form-input svg {
    position: absolute;
    top: 3rem;
    left: 0.45rem;
    height: 1.25rem;
  }
  .form-input input {
    border: 2px solid silver;
    border-radius: 0.6rem;
    padding: 0.75rem;
    padding-left: 2rem;
  }

  .pass-input-div {
    position: relative;
  }

  .pass-input-div svg {
    font-size: 20px;
    position: absolute;
    right: 10px;
    bottom: 35px;
    cursor: pointer;
    outline: none;
  }

  form button[type="button"] {
    width: 100%;
    padding: 0.7rem;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 1rem;
  }

  .login-center-options {
    display: flex;
    justify-content: space-between;
  }

  .remember-div {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }

  .remember-div label {
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
    margin-top: 2px;
  }

  .forgot-pass-link {
    text-decoration: none;
    font-size: 1.3rem;
  }

  .forgot-pass-link:hover {
    text-decoration: underline;
  }

  .login-center-buttons {
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
  }

  .login-center-buttons button:nth-child(1) {
    background-color: black;
    color: white;
    border: 3px solid black;
  }

  .login-center-buttons button:nth-child(1):hover {
    color: white;
    background-color: #343434;
    border: 3px solid #343434;
  }

  .login-bottom-p {
    text-align: center;
    font-size: 1rem;
  }

  .login-bottom-p a {
    text-decoration: none;
    font-weight: 600;
  }

  .login-bottom-p a:hover {
    text-decoration: underline;
  }
`;
