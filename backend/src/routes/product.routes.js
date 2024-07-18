const express = require("express");


const { getAllProduct, getSingleProduct } = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.route("/:id").get(getSingleProduct);
productRouter.route("/").get(getAllProduct);

module.exports = productRouter;
