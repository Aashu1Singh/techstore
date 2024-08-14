import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../context/user_context";
import { Button } from "../../styles/Button";

const UserProfile = () => {
  const { userData, getUserData } = useUserContext();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  console.log(userData);

  return (
    <Wrapper>
      {" "}
      <div className="heading">
        <img
          src="https://images.unsplash.com/photo-1722031489919-100378463cfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
          alt="Avatar"
        />

        <h2>{userData?.fullname?.toUpperCase()} </h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grid grid-two-column">
          <div className="col">
            <label htmlFor="name"> Name</label>
            <input
              name="name"
              type="text"
              value={userData?.fullname}
              disabled={disable}
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
            <label htmlFor="phNo"> Contact No </label>
            <input
              name="phNo"
              type="number"
              value={userData?.email}
              disabled={disable}
            ></input>
          </div>
          <div className="col">
            <label htmlFor="gender"> Gender</label>

            <select name="Gender" id="gender" disabled={disable}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="form-footer">
          {disable ? (
            <Button
              onClick={() => {
                setDisable(!disable);
              }}
            >
              {" "}
              Update{" "}
            </Button>
          ) : (
            <Button
              onClick={() => {
                setDisable(!disable);
              }}
            >
              {" "}
              Save Changes{" "}
            </Button>
          )}
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

  .form-footer {
    padding: 2rem 3rem;
    display: flex;
    flex-direction: row-reverse;
  }

  select {
    padding: 11px 3px;
    margin-top: 1rem;
    border-radius: 0.75rem;
  }
`;
