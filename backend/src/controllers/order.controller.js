const {
  saveOrder,
  saveOrderDetails,
  fetchAllOrders,
} = require("../models/order.model");
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

const getAllOrders = async (req, res) => {
  
  const { userId } = req.query;

  const orders = await fetchAllOrders(userId);

  if (!orders) {
    return res.status(200).json({
      message: "User doesn't have any order",
      orders: [],
    });
  }

  res.status(200).json({
    message: "Fetched all orders",
    orders,
  });
};

module.exports = {
  confirmOrder,
  getAllOrders,
};
