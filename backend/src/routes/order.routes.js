const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { confirmOrder } = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.route("").post(authenticate, confirmOrder)

module.exports = orderRouter;
