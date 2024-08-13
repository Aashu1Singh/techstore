import React, { useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import UserSideBar from "./user/UserSideBar";
import { useParams } from "react-router-dom";
import Orders from "./user/Orders";
import UserProfile from "./user/UserProfile";

const Profile = () => {
  const { userData, getUserData } = useUserContext();

  const { activeParams } = useParams();
  console.log(activeParams);

  useEffect(() => {
    if (userData && Object.keys(userData).length === 0) {
      getUserData();
    }
  }, []);

  return (
    <Wrapper>
      <div className="main-container">
        <div className="left-box">
          <UserSideBar />
        </div>
        <div className="right-box">
          {activeParams === "profile" && <UserProfile />}
          {activeParams === "order" && <Orders />}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding-top: 13rem;

  .main-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 6rem;
  }

  .left-box {
    height: 55rem;
    width: 18%;

    background-color: rgb(246, 248, 250);
  }
  .right-box {
    height: 55rem;
    width: 60%;
    background-color: rgb(246, 248, 250);
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

export default Profile;
