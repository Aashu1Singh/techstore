const {
  fetchAllProducts,
  fetchSingleProduct,
  findPriceAndQuantityDb,
  updateProductInfo,
  uploadAndUpdateProdImage,
  saveProductInfo,
  addImagesToProduct,
} = require("../models/product.model");
const { uploadMultipleOnCloudinary } = require("../utils/Cloudinary");

const getAllProduct = async (req, res) => {
  try {
    const products = await fetchAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getSingleProduct = async (req, res) => {
  console.log("get Single product");

  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Product Id is required" });
  console.log(id);

  let responseData = await fetchSingleProduct(id);

  if (!responseData) {
    return res.status(400).json({ message: "Product Not Found" });
  }
  return res.status(200).json(responseData);
};

const addSingleProduct = async (req, res) => {
  console.log("addSingleProduct");

  const { body } = req;

  const prod_id = await saveProductInfo(body);
  if (!prod_id) {
    return res.status(500).json({
      statusCode: "500",
      message: "Something went wrong while adding product",
    });
  }

  let localFilePaths = req.files?.images?.map((item) => item.path);

  if (localFilePaths) {
    await addImagesToProduct(localFilePaths);
  }

  res
    .status(200)
    .json({ statusCode: "200", message: "Product Added succesfully" });
};

const updateProduct = async (req, res) => {
  console.log("updateProduct");
  const { prod_id } = req.body;

  let fieldsToUpdate = {};

  for (const field in req.body) {
    if (field == "prod_id") continue;

    fieldsToUpdate[field] = req.body[field];
  }

  try {
    let update = await updateProductInfo(fieldsToUpdate, prod_id);

    let localFilePaths = req.files?.images?.map((item) => item.path);

    if (localFilePaths) {
      let uploadImage = await uploadAndUpdateProdImage(localFilePaths);
    }

    res
      .status(200)
      .json({ statusCode: "200", message: "Product info updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

const calculatePrice = async (req, res) => {
  const { products } = req.body;

  if (!products) {
    return res.status(500).json({
      message: "product is required",
    });
  }

  const priceList = await findPriceAndQuantityDb(products);

  if (!priceList) {
    return res.status(500).json({
      message: "Some thing went wrong",
    });
  }

  res.status(200).json({
    message: "Total amount to pay",
    data: priceList.data,
    total: priceList.total,
  });
};

const fileUpload = async (req, res) => {
  console.log("fileUpload");

  let localFilePaths = req.files?.images.map((item) => item.path);
  if (localFilePaths.length === 0) {
    return res.status(400).json({
      messsge: "File is required",
    });
  }

  let response = await uploadMultipleOnCloudinary(localFilePaths);
  console.log("0", response);

  res.send();
};

module.exports = {
  getAllProduct,
  getSingleProduct,
  updateProduct,
  addSingleProduct,
  fileUpload,
  calculatePrice,
};
