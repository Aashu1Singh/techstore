const connection = require("../db/db");

const saveOrder = async (order) => {
  // console.log("order", order);

  const { user_id, totalPrice, status, address } = order;

  try {
    const query =
      "INSERT INTO orders (customer_id, price, status, address) VALUES (?)";
    const values = [user_id, totalPrice, status, address];

    const [res] = await connection.query(query, [values]);
    const insertId = JSON.parse(JSON.stringify(res)).insertId;
    // console.log(result);

    return insertId;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const saveOrderDetails = async (order) => {
  const { products, orderId } = order;
  // console.log(" order de", order);

  try {
    for (let product of products) {
      const query =
        "INSERT INTO order_detail (order_id, product_id, price , quantity) VALUES (?, ?, ?, ?)";

      const values = [
        orderId,
        product.prod_id,
        product.price,
        product.quantity,
      ];

      const [res] = await connection.query(query, values);
      const result = JSON.parse(JSON.stringify(res)).insertId;
      console.log(result);
    }

    return true;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const fetchAllOrders = async (user_id) => {
  try {
    const queryString = "SELECT * from orders where customer_id=(?)";
    const [res] = await connection.query(queryString, [user_id]);

    console.log(res);

    const orders = JSON.parse(JSON.stringify(res));

    return orders;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  saveOrder,
  saveOrderDetails,
  fetchAllOrders,
};
