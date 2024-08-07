import React from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink, useNavigate } from "react-router-dom";

const UserSideBar = (props) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div
        className="tabs"
        onClick={() => {
          navigate("/user/profile");
        }}
      >
        <div className="icon">
          <PersonIcon />
        </div>

        <span> Account</span>
      </div>
      <div
        className="tabs"
        onClick={() => {
          navigate("/user/order");
        }}
      >
        <ShoppingBagIcon />

        <span> My Orders </span>
      </div>

      <div
        className="tabs"
        onClick={() => {
          navigate("/user/changepassword");
        }}
      >
        <SettingsIcon />

        <span> Change Password </span>
      </div>
    </Wrapper>
  );
};

export default UserSideBar;

const Wrapper = styled.section`

  font-size: 2rem;
  display: flex;
  flex-direction: column;
  color: black;
  cursor: pointer;
  border-radius: 0.75rem;

  .tabs {
    padding: 2rem 2rem;
    display: flex;
    flex-direction: row;
  }

  svg {
    width: 3.5rem;
    height: 2.3rem;
  }
  .main-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 6rem;
  }

  .left-box {
    // width: 40%;
    background-color: grey;
  }
  .right-box {
    width: 100rem;
    background-color: grey;
  }

  .top {
    display: flex;
    flex-direction: row;
  }
  img {
    border-radius: 50%;
    height: 21rem;
    width: 23rem;
  }

  label {
    font-size: 1.6rem;
  }
  .row : {
    display: flex;
    flex-direction: column;
  }
  .col {
    display: flex;
    flex-direction: column;

    width: auto;
    padding: 0.9rem;
    margin: 7px 0px;
  }
  .col input {
    margin-top: 1rem;
    padding: 11px 3px;
    border-radius: 9px;
  }
`;
