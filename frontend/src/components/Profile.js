import React, { useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";

const Profile = () => {
  const { userData, getUserData } = useUserContext();
  console.log(userData);

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      getUserData();
    }
  }, []);

  return (
    <Wrapper>
      <div className="main-container">
        <div className="left-form">
          <form>
            <div className="row">
              <div className="col">
                <img src="download.png" alt="Avatar" />
              </div>
              <div className="col">
                <label htmlFor="name">Full Name</label>
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
              <div className="col">
                <label htmlFor="language"> Address</label>
                <input name="language" type="text"></input>
              </div>
            </div>
          </form>
        </div>
        <div className="right-form">
          <form>
            <div className="row">
              <div className="col">
                <label htmlFor="dob"> Date of Birth</label>
                <input name="dob" type="date"></input>
              </div>

              <div className="col">
                <label htmlFor="linkdin"> Linkdin</label>
                <input name="linkdin" type="text"></input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding-top: 8rem;
  width: auto;

  img {
    border-radius: 50%;
    height: 21rem;
    width: 23rem;
  }
  .main-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    font-size: 1.6rem;
  }

  .left-form {
    width: 40%;
  }
  .right-form {
    width: 40%;
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
