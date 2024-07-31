import React from "react";
import styled from "styled-components";
import { useProductContext } from "../context/productcontex";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";

const CheckOut = () => {
  const { checkOut } = useProductContext();

  console.log(checkOut);

  return (
    <Wrapper>
      <section>
        <div className="checkout grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
        </div>

        <div className="cart-item">
          {checkOut.products.map((prod) => (
            <div
              className="cart_heading grid grid-five-column"
              key={prod.prod_id}
            >
              <div className="cart-image--name">
                <div>
                  <p>{prod.name}</p>
                </div>
              </div>
              <div className="cart-hide">
                <p>
                  <FormatPrice price={prod.price} />
                </p>
              </div>
              <div className="cart-hide">
                <p>{prod.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <Button style={{ backgroundColor: "black", color: "white" , margin: "2rem"}}>
          Total : {checkOut.total}
        </Button>
        <Button style={{ backgroundColor: "black", color: "white" }}>
          Proceed
        </Button>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding-top: 16rem;

  .grid: {
    display: grid;
  }
  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }

  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }
`;
export default CheckOut;
