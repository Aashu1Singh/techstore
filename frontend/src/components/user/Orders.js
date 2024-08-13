import React, { useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../../context/user_context";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "../../styles/Button";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import OrderDetails from "./OrderDetails";


const Orders = () => {
  const { getOrders, userOrder , cancelOrder} = useUserContext();
  console.log(userOrder);

  useEffect(() => {
    getOrders();
  }, []);

  if (userOrder.length === 0) {
    return (
      <Wrapper>
        <div className="noOrder">
          <Inventory2TwoToneIcon />
          <h2>No Orders to show</h2>;
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th width="30%">Order Date </th>
            <th width="20%">Price </th>
            <th width="20%">Status </th>
            <th width="20%">Action </th>
          </tr>
        </thead>
        <tbody>
          {userOrder.map((order) => (
            // <OrderDetails order={order} />

            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td width="30%">
                {new Date(order.date).toLocaleDateString("en-In", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td width="20%">{order.price} </td>
              <td width="20%">{order.status} </td>
              <td>
                {" "}
                <Button
                  title="View"
                  className="btn-sm"
                  style={{ backgroundColor: "green" }}
                >
                  <RemoveRedEyeIcon fontSize="large" />{" "}
                </Button>
                {order.status !== "CANCELLED" ? (
                  <Button
                    title="Cancel"
                    className="btn-sm"
                    style={{ backgroundColor: "red" }}
                    onClick={() => {
                      cancelOrder(order.order_id);
                    }}
                  >
                    <CancelIcon fontSize="large" />
                  </Button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Orders;

const Wrapper = styled.section`
  margin-top: 2rem;
  padding: 2rem 5rem;
  font-size: 1.7rem;

  .noOrder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .noOrder svg {
    font-size: 28rem;
  }

  table {
    border-collapse: collapse;
    letter-spacing: 0.13rem;
    border: 2px solid rgb(140 140 140);
  }

  th,
  td {
    border: 1px solid rgb(160 160 160);
    padding: 8px 10px;
    text-align: center;
  }

  .btn-sm {
    padding: 0.3rem 1rem;
    margin: 0rem 0.5rem;
  }
`;
