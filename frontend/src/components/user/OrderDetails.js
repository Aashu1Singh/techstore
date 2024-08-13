import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "../../styles/Button";
import { useUserContext } from "../../context/user_context";

const OrderDetails = ({ order }) => {
  const { cancelOrder } = useUserContext();

  console.log(order);

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            {/* <img src={image} alt={id} /> */}
          </figure>
        </div>
        <div>
          {/* <p>{name}</p> */}
          <div className="color-div">
           
            <div
              className="color-style"
            //   style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          {/* <FormatPrice price={price} /> */}
        </p>
      </div>

      {/* Quantity  */}
      {/* <CartAmountToggle
      amount={amount}
      setDecrease={() => setDecrease(id)}
      setIncrease={() => setIncrement(id)}
    /> */}

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>{/* <FormatPric price={price * amount} /> */}</p>
      </div>
    </div>


  );
};

export default OrderDetails;
