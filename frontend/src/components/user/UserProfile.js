import React from "react";
import styled from "styled-components";
import { useUserContext } from "../../context/user_context";

const UserProfile = () => {
  const { userData, getUserData } = useUserContext();
  return (
    <Wrapper>
      {" "}
      <div className="heading">
        <img
          src="https://images.unsplash.com/photo-1722031489919-100378463cfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
          alt="Avatar"
        />

        <h2>{userData?.fullname} </h2>
      </div>
      <form>
        <div className="row">
          <div className="col">
            <label htmlFor="name"> Name</label>
            <input
              name="name"
              type="text"
              value={userData?.fullname}
              disabled
            ></input>
          </div>
          <div className="col">
            <label htmlFor="email"> Email </label>
            <input
              name="email"
              type="email"
              value={userData?.email}
              disabled
            ></input>
          </div>
          <div className="col">
            <label htmlFor="gender"> Gender</label>
            <input name="gender" type="text"></input>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default UserProfile;

const Wrapper = styled.section`
  img {
    border-radius: 50%;
    height: 14rem;
    width: 16rem;
  }

  .heading {
    padding: 2rem 7rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
  }
`;
