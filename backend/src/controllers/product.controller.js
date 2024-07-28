const connection = require("../db/db");
const { uploadMultipleOnCloudinary } = require("../utils/Cloudinary");

const getAllProduct = async (req, res) => {
  console.log("getAllProduct");

  try {
    const queryString =
      "Select prod_id, name, price , category, stars, description, stock ,featured, url as image from product left join image on  (product.prod_id = image.id AND image.show = 1 );";

    const result = await connection.query(queryString);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  console.log("get Single product");
  const queryString = "SELECT * from product where prod_id = (?)";
  const value = [id];

  try {
    const [result] = await connection.query(queryString, value);

    const responseData = JSON.parse(JSON.stringify(result[0]));

    const query = "SELECT * from image WHERE id=(?)";
    const result2 = await connection.query(query, [id]);

    responseData.image = JSON.parse(JSON.stringify(result2[0]));

    // console.log(responseData);
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });

    console.log(error);
  }
};

const addSingleProduct = (req, res) => {
  // const { }

  console.log(req.body);

  res.send();
};

const updateProduct = async (req, res) => {
  const { prod_id } = req.body;

  let fieldsToUpdate = {};

  for (const field in req.body) {
    if (field == "prod_id" || field == "image") continue;

    fieldsToUpdate[field] = req.body[field];
  }
  // console.log(fieldsToUpdate);

  try {
    const queryString = `UPDATE product SET  ? WHERE prod_id=${prod_id}`;

    let result = connection.query(queryString, fieldsToUpdate);
    res.status(200).json({ message: "Product info updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

const fileUpload = async (req, res) => {
  console.log("biuhiiu");
  // console.log(req.file);
  console.log(req.files);

  let localFilePaths = req.files?.images.map((item) => item.path);
  // console.log(localFilePaths);
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
};
