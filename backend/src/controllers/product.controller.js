const connection = require("../db/db");
const { uploadMultipleOnCloudinary } = require("../utils/Cloudinary");

const getAllProduct = async (req, res) => {
  console.log("getAllProduct");

  try {
    const queryString =
      "Select prod_id, name, price , category, stars, description, stock ,featured, url as image from product left join image on  (product.prod_id = image.id AND image.show = 1 );";

    const [result] = await connection.query(queryString);
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
  console.log("get Single product");
  // console.log();
  const { id } = req.params;

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
// rgb(7 56 30)
const addSingleProduct = async (req, res) => {
  console.log("addSingleProduct");

  const { name, price, category, stars, description, stock, featured } =
    req.body;

  try {
    let query =
      "INSERT INTO product ( name, price, category, stars, description, stock, featured) VALUES (?)";
    let value = [name, price, category, stars, description, stock, featured];

    const [response] = await connection.query(query, [value]);

    const prod_id = JSON.parse(JSON.stringify(response)).insertId;

    // query = 'INS'
    let localFilePaths = req.files?.images?.map((item) => item.path);
    console.log(localFilePaths);
    console.log(req.files);

    if (localFilePaths) {
      let responseUrls = await uploadMultipleOnCloudinary(localFilePaths);
      responseUrls.map(async (item, index) => {
        let queryString1 =
          "INSERT INTO image (id, url , width, height,filename, size ) VALUES (?);";
        let values = [
          Number(prod_id),
          item.url,
          item.width,
          item.height,
          `${item.original_filename}-${index + 1}`,
          item.bytes,
        ];
        await connection.query(queryString1, [values]);
      });
    }

    res
      .status(200)
      .json({ statusCode: "200", message: "Product Added succesfully" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ statusCode: "400", message: "Something went wrong" });
  }
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
    const queryString = `UPDATE product SET ? WHERE prod_id=${prod_id}`;

    let result = await connection.query(queryString, fieldsToUpdate);

    let localFilePaths = req.files?.images?.map((item) => item.path);
    console.log(localFilePaths);
    console.log(req.files);

    if (localFilePaths) {
      let responseUrls = await uploadMultipleOnCloudinary(localFilePaths);
      responseUrls.map(async (item, index) => {
        let queryString1 =
          "INSERT INTO image (id, url , width, height,filename, size ) VALUES (?);";
        let values = [
          Number(prod_id),
          item.url,
          item.width,
          item.height,
          `${item.original_filename}-${index + 1}`,
          item.bytes,
        ];
        await connection.query(queryString1, [values]);
      });
    }

    res
      .status(200)
      .json({ statusCode: "200", message: "Product info updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
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
};