import React, { useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../../context/user_context";

const Orders = () => {
  const { getOrders, userOrder } = useUserContext();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th width="30%">Order Date </th>
            <th width="20%">Price </th>
            <th width="20%">Status </th>
            <th>Order Action </th>
          </tr>
        </thead>

        {userOrder.map((order) => (
          <tr key={order.order_id}>
            <td>{order.order_id}</td>
            <td width="30%">{order.date}</td>
            <td width="20%">{order.price} </td>
            <td width="20%">{order.status} </td>
            <td>Order Action </td>
          </tr>
        ))}
      </table>
    </Wrapper>
  );
};

export default Orders;

const Wrapper = styled.section`
  margin-top: 2rem;
  padding: 2rem 5rem;
  font-size: 1.7rem;

  table {
    border-collapse: collapse;
    letter-spacing: 0.13rem;
    border: 2px solid rgb(140 140 140);
  }

  th,
  td {
    border: 1px solid rgb(160 160 160);
    padding: 8px 10px;
  }
`;
