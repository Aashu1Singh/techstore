const express = require("express");


const { getAllProduct, getSingleProduct, updateProduct, addSingleProduct } = require("../controllers/product.controller");
const authenticate = require("../middlewares/authenticate");

const productRouter = express.Router();

productRouter.route("/:id").get(getSingleProduct);
productRouter.route("/").get(getAllProduct);


// protected routes 

productRouter.route("/update-product").put(authenticate, updateProduct);
productRouter.route("/add-product").post(authenticate, addSingleProduct)
module.exports = productRouter;
