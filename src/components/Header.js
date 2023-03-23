import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import { MdStoreMallDirectory} from "react-icons/md"
const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        {/* <img src="./images/logo.png" alt="my logo img" /> */}
        <h2>Tech Store <MdStoreMallDirectory /></h2>
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: #849531;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: #fff

  .logo {
    height: 5rem;
  }

  .header-title{
    width: 70%;
    height: 5rem;
    font-size:3rem
  }
   h2{
    color : #fff;
   }
  .header-logo{
    width : 30%
  }
`;
export default Header;
