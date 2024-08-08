const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  confirmOrder,
  getAllOrders,
  cancelOrder,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.route("").post(authenticate, confirmOrder);
orderRouter.route("/get-all-order").get(authenticate, getAllOrders);
orderRouter.route("").delete(authenticate, cancelOrder);

module.exports = orderRouter;
