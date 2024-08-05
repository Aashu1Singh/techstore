const connection = require("../db/db");
const { saveOrder, saveOrderDetails } = require("../models/order.model");
const { fetchProductsDetails } = require("../models/product.model");

const confirmOrder = async (req, res) => {
  console.log(req.user);

  const { products, address } = req.body;
  const { user_id } = req.user;

  if (!products) {
    return res.status(500).json({
      message: "product is required",
    });
  }

  try {
    // let query = "SELECT prod_id, price, name from product where prod_id IN (?)";

    // let value = [...products.map((item) => item.prod_id)];

    // const [result] = await connection.query(query, [value]);
    // const priceList = JSON.parse(JSON.stringify(result));
    // // console.log(priceList);

    // const totalPrice = priceList.reduce((agg, curr) => {
    //   return agg + Number(curr.price);
    // }, 0);

    let orderToProccess = await fetchProductsDetails(products);
    console.log("orderToProccess ", orderToProccess);

    if (!orderToProccess) {
      return res.status(500).json({
        message: "Some thing went wrong",
      });
    }

    /// Payment integration to be done later
    let confirmPayment = true;
    if (confirmPayment) {
      let order = {
        totalPrice: orderToProccess.total,
        user_id,
        address,
        status: "PENDING",
      };

      const orderId = await saveOrder(order);

      if (!orderId) return;

      let orderDetails = {
        products: orderToProccess.responseData,
        orderId,
        user_id,
      };

      const result = await saveOrderDetails(orderDetails);

      if (!result) {
        return res.status(500).json({
          message: "Some thing went wrong",
        });
      }

      return res.status(200).json({
        message: "Order successfull",
        orderId,
      });
    }

    // console.log(totalPrice);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Some thing went wrong",
      error: err,
    });
  }
};

module.exports = {
  confirmOrder,
};
