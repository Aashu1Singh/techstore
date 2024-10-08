const {
  saveOrder,
  saveOrderDetails,
  fetchAllOrders,
  cancelOrderId,
  generateReceipt,
  saveReceiptUrl,
} = require("../models/order.model");
const { fetchProductsDetails } = require("../models/product.model");

const confirmOrder = async (req, res) => {
  // console.log(req.user);

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
        address,
      };

      const result = await saveOrderDetails(orderDetails);

      if (!result) {
        return res.status(500).json({
          message: "Some thing went wrong",
        });
      }

      let genReceipt = {
        products: orderToProccess.responseData,
        total: orderToProccess.total,
        orderId,
        address,
        shipping: 500,
      };

      const receipt = await generateReceipt(genReceipt);

      // console.log(receipt);

      if (!receipt) {
        console.log("Reciept Not generated");
      } else {
        await saveReceiptUrl(receipt, orderId);
      }

      return res.status(200).json({
        message: "Order successfull",
        orderId,
        receipt,
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

const cancelOrder = async (req, res) => {
  const cancel = await cancelOrderId(req.query);

  if (!cancel) {
    return res.status(401).json({
      message: "Invalid request",
    });
  }

  res.status(200).json({
    message: "Order Cancelled",
  });
};

module.exports = {
  confirmOrder,
  getAllOrders,
  cancelOrder,
};
