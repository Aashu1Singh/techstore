import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";

const HeroSection = ({ myData }) => {
  const { name } = myData;

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
            <h1> {name} </h1>
            <p>
              Welcome to TechStore - your ultimate destination for all your
              electronic needs. Browse our extensive range of products, from
              smartphones to laptops, gaming consoles, and accessories. With
              easy navigation and a user-friendly interface, shopping with us
              has never been easier. Enjoy fast and secure delivery to your
              doorstep.
            </p>
            <NavLink to="/products">
              <Button>shop now</Button>
            </NavLink>
          </div>
          <div className="hero-section-image">
            <figure>
              <img
                src="images/store.jpg"
                alt="hero-section-family"
                className="img-style"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 12rem 0;
  padding-bottom: 11%;
  background-color: #25274d;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  Button {
    background-color: white;
    color: black;
  }
  .hero-section-data {
    p {
      margin: 2rem 0;
      color: #fff;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
      color: #fff;
    }

    .intro-data {
      margin-bottom: 0;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default HeroSection;
