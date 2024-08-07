const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { confirmOrder, getAllOrders } = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.route("").post(authenticate, confirmOrder)
orderRouter.route("/get-all-order").get(authenticate, getAllOrders)

module.exports = orderRouter;
