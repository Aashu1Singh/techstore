const express = require("express");

const {
  getAllProduct,
  getSingleProduct,
  updateProduct,
  addSingleProduct,
  fileUpload,
} = require("../controllers/product.controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/multer");

const productRouter = express.Router();

productRouter.route("/uploads").post(
  upload.fields([
    {
      name: "images",
      maxCount: 4,
    },
  ]),
  fileUpload
);
productRouter.route("/").get(getAllProduct);
productRouter.route("/:id").get(getSingleProduct);

// protected routes

productRouter.route("/update-product").put(
  authenticate,
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  updateProduct
);
productRouter.route("/add-product").post(
  authenticate,
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  addSingleProduct
);

module.exports = productRouter;
