import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useProductContext } from "../context/productcontex";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useUserContext } from "../context/user_context";

const CheckOut = () => {
  const { checkOut } = useProductContext();
  const { checkOutFn } = useUserContext();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const handleProceed = () => {
    let obj = {
      products: checkOut.products,
      address,
    };
    checkOutFn(obj);
  };
  // console.log(checkOut);

  useEffect(() => {
    if (checkOut.products.length === 0) {
      console.log(checkOut.products.length);
      navigate("/cart");
    }
  }, [checkOut]);

  return (
    <Wrapper>
      <div className="main">
        <div className="left-box">
          <h3>Address Details</h3>
          <hr />

          <Formik
            initialValues={{}}
            onSubmit={(values) => {
              // loginUser(values);
              console.log(values);

              let address = `${values.firstName} ${values.lastName}, ${values.address} , ${values.district}, ${values.state}`;
              console.log(address);
              setAddress(address);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="login-react-form" onSubmit={handleSubmit}>
                <div className=" grid address-form ">
                  <div className="half-row grid">
                    <div className="col">
                      {" "}
                      <label for="firstName">First name</label>
                      <input
                        type="text"
                        id="fname"
                        name="firstName"
                        onChange={handleChange}
                        minLength={0}
                        maxLength={6}
                      ></input>
                    </div>
                    <div className="col">
                      <label for="lastName">Last name</label>
                      <input
                        type="text"
                        id="fname"
                        name="lastName"
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div className="half-row grid">
                    <div className="col">
                      {" "}
                      <label for="phNumber">Number</label>
                      <input
                        type="number"
                        id="fname"
                        name="phNumber"
                        maxLength="10"
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="col">
                      {" "}
                      <label for="pincode">Pincode</label>
                      <input
                        type="number"
                        id="fname"
                        name="pincode"
                        onChange={handleChange}
                        minLength={0}
                        maxLength={6}
                        size={5}
                      ></input>
                    </div>
                  </div>
                  <div className="full-row">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="story"
                      onChange={handleChange}
                      name="address"
                      rows="3"
                      cols="2"
                    >
                      {" "}
                    </textarea>
                  </div>

                  <div className="half-row grid">
                    <div className="col">
                      {" "}
                      <label for="state">State</label>
                      <input
                        type="text"
                        id="fname"
                        name="state"
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="col">
                      {" "}
                      <label for="district">District</label>
                      <input
                        type="text"
                        id="fname"
                        name="district"
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="address-footer">
                  <Button type="submit">Save</Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="right-box">
          <div className="grid grid-two-column">
            <p>Item</p>
            <p className="cart-hide">Quantity</p>
          </div>
          <hr />

          <div className="cart-item">
            {checkOut.products.map((prod) => (
              <div
                className="cart_heading grid grid-two-column"
                key={prod.prod_id}
              >
                <div className="cart-image--name">
                  <div>
                    <p>{prod.name}</p>
                  </div>
                </div>

                <div className="cart-hide">
                  <p>{prod.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <hr />

          <div className="order-total--amount">
            <div className="order-total--subdata">
              <div className="grid grid-two-column">
                <p>Subtotal:</p>
                <p>
                  <FormatPrice price={checkOut.total} />
                </p>
              </div>
              <div className="grid grid-two-column">
                <p>shipping fee:</p>
                <p>
                  <FormatPrice price={500} />
                </p>
              </div>
              <hr />
              <div className="grid grid-two-column">
                <p>Order Total:</p>
                <p>
                  <FormatPrice price={500 + checkOut.total} />
                </p>
              </div>
            </div>
          </div>
          <div className="bill-footer">
            <Button
              style={{ backgroundColor: "black", color: "white" }}
              onClick={handleProceed}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding-top: 10rem;

  textarea {
    resize: none;
  }

  input,
  textarea {
    text-transform: none;
    padding: 1.3rem 1rem;
    border-radius: 0.75rem;
    margin-top: 1rem;
    border: 1px solid rgba(153, 152, 156, 0.5);
  }

  .main {
    width: 80vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: auto;
    gap: 6rem;
  }

  hr {
    margin-top: 2rem;
  }
  .left-box {
    display: flex;
    flex-direction: column;
    // background-color: #f4f4f4d9;
    background-color: rgb(246, 248, 250);
    padding: 4rem 5rem;
    border-radius: 0.85rem;
    // width: 50vw;
    // height: 80vh;
  }
  .right-box {
    display: flex;
    flex-direction: column;
    background-color: rgb(246, 248, 250);
    padding: 4rem 5rem;
    border-radius: 0.85rem;
  }

  .grid: {
    display: grid;
  }
  .grid-two-column {
    grid-template-columns: 3fr 1fr;
    text-align: center;
    align-items: center;
  }

  .address-form {
    grid-template-columns: 1fr;
    font-size: 1.5rem;
    gap: 0rem;
  }
  .half-row {
    grid-template-columns: 1fr 1fr;
    // text-align: center;
    align-items: center;
  }

  .full-row {
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column;

    width: auto;
  }

  .col {
    display: flex;
    flex-direction: column;

    width: auto;
    padding: 0.9rem;
    margin: 7px 0px;
  }
  .cart-item {
    padding: 1.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .bill-footer {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .cart-btn {
    display: flex;

    justify-content: center;
  }
`;
export default CheckOut;
