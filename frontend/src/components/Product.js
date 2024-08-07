import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";

const Product = ({ uniqueNo, ...curElem }) => {
  const { prod_id, name, image, price, category } = curElem;
  // console.log(image)
  return (
    <NavLink to={`/singleproduct/${prod_id}`}>
      <div className="card">
        <figure>
          <img src={image} alt={name} height={"100%"} width={"100%"} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price">{<FormatPrice price={price} />}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
