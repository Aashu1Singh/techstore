import React from "react";
import styled from "styled-components";
import { useProductContext } from "../context/productcontex";

const CheckOut = () => {
  const { checkOut } = useProductContext();

  return (
    <Wrapper>
      <section>
        <h1>{checkOut?.total}</h1>
      </section>
      
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding-top: 16rem;
`;
export default CheckOut;
