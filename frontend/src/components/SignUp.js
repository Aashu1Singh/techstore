import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Person2Icon from "@mui/icons-material/Person2";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";

export const SignUp = () => {
  return (
    <Wrapper>
      <div className="signup-from">
        <div className="signup-fromr">
          <div className="form-header">
            <p>Create Account</p>
          </div>
          <form className="signup-react-form">
            <div className="form-input">
              <label htmlFor="fullname">Full Name</label>
              <Person2Icon />
              <input id="fullname" placeholder="Enter Full Name" />
            </div>
            <div className="form-input">
              <EmailIcon />
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter Your Email" />
            </div>
            <div className="form-input">
              <KeyIcon />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
              />
            </div>
            <button type="submit">Sign-Up</button>
          </form>
          <div className="form-footer">
            <p className="text-legend">- OR -</p>

            <p className="text-footer">
              Already have an account?
              <NavLink to="/login">
                <span className="text-olive">Login</span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .signup-from {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    // flex-direction: row;
    background-color: #e9f8e6;
  }

  .signup-from > .signup-froml {
    width: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .signup-from > .signup-froml > svg {
    height: 25rem;
    width: 25rem;
  }

  .signup-from > .signup-fromr {
    display: flex;
    height: 30rem;

    flex-direction: column;
    justify-content: center;
    width: 20rem;
    padding: 1.5rem 3rem;
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: -3px 0 10px -2px rgba(0, 0, 0, 0.2);
  }
  .signup-from > .signup-fromr > .form-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .signup-from > .signup-fromr > .form-header p {
    margin-bottom: 0.5rem;
  }
  .signup-from > .signup-fromr > .form-header > svg:first-child {
    width: 5rem;
    margin-bottom: 1rem;
  }
  .signup-from > .signup-fromr > .form-header > svg:nth-child(2) {
    display: none;
  }
  .signup-from > .signup-fromr > .form-header > p {
    font-size: 2rem;
    font-weight: bold;
    color: #4c4c4d;
  }
  .signup-from > .signup-fromr > .form-footer {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    // margin-top: 1rem;
  }
  .signup-from > .signup-fromr > .form-footer .anchor-tag:hover {
    cursor: pointer;
    color: darkblue !important;
  }
  .signup-from > .signup-fromr > .form-footer > .text-legend {
    color: silver;
    font-size: 1.2rem;
    margin-bottom: 0;
  }
  .signup-from > .signup-fromr > .form-footer > .social-icons {
    margin: 1rem 0rem;
  }
  .signup-from
    > .signup-fromr
    > .form-footer
    > .social-icons
    > .social-icon:hover {
    cursor: pointer;
  }
  .signup-from
    > .signup-fromr
    > .form-footer
    .social-icon:not(.social-icon:last-child) {
    margin-right: 2rem;
  }
  .signup-from > .signup-fromr > .form-footer .social-icon svg {
    border: 1px solid silver;
    border-radius: 50%;
    padding: 0.35rem;
  }
  .signup-from > .signup-fromr > .form-footer .text-footer {
    color: #000000be;
  }
  @media screen and (max-width: 1200px) {
    .signup-from {
      width: 70rem;
      height: 40rem;
    }
    .signup-from > .signup-froml {
      width: 35rem;
    }
    .signup-from > .signup-froml > svg {
      height: 20rem;
      width: 20rem;
    }
    .signup-from > .signup-fromr {
      width: 35rem;
      padding: 1rem 2.5rem;
    }
    .signup-from > .signup-fromr > .form-header > p {
      font-size: 1.75rem;
    }
    .signup-from > .signup-fromr > .form-header > svg:first-child {
      width: 4.5rem;
      margin-bottom: 0.75rem;
    }
    .signup-from > .signup-fromr > .form-footer > .text-legend {
      color: silver;
      font-size: 1.1rem;
    }
    .signup-from > .signup-fromr > .form-footer > .text-footer {
      font-size: 0.85rem;
    }
  }
  @media screen and (max-width: 920px) {
    .signup-from {
      width: 50rem;
      height: 35rem;
    }
    .signup-from > .signup-froml {
      width: 25rem;
    }
    .signup-from > .signup-froml > svg {
      height: 15rem;
      width: 15rem;
    }
    .signup-from > .signup-fromr {
      width: 25rem;
      padding: 1rem 2rem;
    }
    .signup-from > .signup-fromr > .form-header > p {
      font-size: 1.5rem;
    }
    .signup-from > .signup-fromr > .form-header > svg:first-child {
      width: 4rem;
      margin-bottom: 0.65rem;
    }
    .signup-from > .signup-fromr > .form-footer > .text-legend {
      color: silver;
      font-size: 1rem;
    }
    .signup-from > .signup-fromr > .form-footer > .text-footer {
      font-size: 0.75rem;
    }
  }
  @media screen and (max-width: 768px) {
    .signup-from {
      font-size: 1.1rem;
      height: max-content;
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;
      background-color: unset;
    }
    .signup-from > .signup-froml {
      display: none;
      width: 0rem;
    }
    .signup-from > .signup-froml > svg {
      height: 0rem;
      width: 0rem;
    }
    .signup-from > .signup-fromr {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 50rem;
      padding: 1.5rem 3rem;
      box-shadow: unset;
      background-color: white;
      border-top-left-radius: unset;
      border-bottom-left-radius: unset;
    }
    .signup-from > .signup-fromr > .form-header > svg:nth-child(2) {
      display: block;
      height: 15rem;
    }
  }

  .signup-react-form > .form-input {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 0.75rem;
  }
  .signup-react-form > .form-input label {
    font-weight: bold;
  }
  .signup-react-form > .form-input p {
    margin: 0rem;
    font-size: 0.75rem;
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
  .signup-react-form > .form-input input {
    border: 2px solid silver;
    border-radius: 0.6rem;
    padding: 0.75rem;
    padding-left: 2rem;
  }

  @media screen and (max-width: 1200px) {
    .signup-react-form > .form-input {
      margin-bottom: 0.5rem;
    }
    .signup-react-form > .form-input label {
      font-size: 0.85rem;
    }
    .signup-react-form > .form-input input {
      height: 2.5rem;
      font-size: 0.85rem;
    }
    .signup-react-form > .form-input p {
      font-size: 0.65rem;
    }
    .signup-react-form > .form-input svg {
      top: 2.5rem;
      transform: scale(0.95);
    }
    .signup-react-form > button {
      padding: 0.5rem;
      font-size: 0.85rem;
      border-radius: 0.6rem;
    }
  }
  @media screen and (max-width: 920px) {
    .signup-react-form > .form-input {
      margin-bottom: 0.25rem;
    }
    .signup-react-form > .form-input label {
      font-size: 0.75rem;
    }
    .signup-react-form > .form-input input {
      height: 2rem;
      font-size: 0.75rem;
    }
    .signup-react-form > .form-input p {
      font-size: 0.5rem;
    }
    .signup-react-form > .form-input svg {
      top: 2rem;
      transform: scale(0.75);
    }
    .signup-react-form > button {
      padding: 0.5rem;
      font-size: 0.85rem;
      border-radius: 0.6rem;
    }
  }
`;
