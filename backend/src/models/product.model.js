const connection = require("../db/db");
const { uploadMultipleOnCloudinary } = require("../utils/Cloudinary");

const fetchProductsDetails = async (products) => {
  try {
    let query = "SELECT prod_id, price, name from product where prod_id IN (?)";

    let value = [...products.map((item) => item.prod_id)];

    const [result] = await connection.query(query, [value]);
    const priceList = JSON.parse(JSON.stringify(result));

    const responseData = products.map((product) => ({
      prod_id: product.prod_id,
      quantity: product.quantity,
      name: product.name,
      price: priceList.reduce((accu, curr) => {
        if (curr.prod_id === product.prod_id) {
          return Number(curr.price) * Number(product.quantity) + accu;
        } else {
          return accu;
        }
      }, 0),
    }));

    let total = responseData.reduce((accu, curr) => (accu += curr.price), 0);

    let data = {
      responseData,
      total,
    };

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const fetchAllProducts = async () => {
  try {
    const queryString =
      "Select prod_id, name, price , category, stars, description, stock ,featured, url as image from product left join image on  (product.prod_id = image.id AND image.show = 1 );";

    const [result] = await connection.query(queryString);
    const products = JSON.parse(JSON.stringify(result));

    return products;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const fetchSingleProduct = async (id) => {
  const queryString = "SELECT * from product where prod_id = (?)";
  const value = [id];
  try {
    const [result] = await connection.query(queryString, value);
    // console.log(result);
    if (result.length === 0) return null;

    const responseData = JSON.parse(JSON.stringify(result[0]));
    // console.log(responseData);

    const query = "SELECT * from image WHERE id=(?)";
    const result2 = await connection.query(query, [id]);

    responseData.image = JSON.parse(JSON.stringify(result2[0]));

    return responseData;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const findPriceAndQuantityDb = async (products) => {
  try {
    let query = "SELECT prod_id, price, name from product where prod_id IN (?)";

    let value = [...products.map((item) => item.prod_id)];

    const [result] = await connection.query(query, [value]);
    const priceList = JSON.parse(JSON.stringify(result));

    const responseData = products.map((product) => ({
      prod_id: product.prod_id,
      quantity: product.quantity,
      name: product.name,
      price: priceList.reduce((accu, curr) => {
        if (curr.prod_id === product.prod_id) {
          return Number(curr.price) * Number(product.quantity) + accu;
        } else {
          return accu;
        }
      }, 0),
    }));

    let total = responseData.reduce((accu, curr) => (accu += curr.price), 0);

    let obj = {
      data: responseData,
      total,
    };

    return obj;
  } catch (err) {
    console.log(err);

    return null;
  }
};

const saveProductInfo = async (productInfo) => {
  const { name, price, category, stars, description, stock, featured } =
    productInfo;

  let query =
    "INSERT INTO product ( name, price, category, stars, description, stock, featured) VALUES (?)";
  let value = [name, price, category, stars, description, stock, featured];

  try {
    const [response] = await connection.query(query, [value]);

    const prod_id = JSON.parse(JSON.stringify(response)).insertId;

    return prod_id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addImagesToProduct = async (localFilePaths) => {
  try {
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
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

const updateProductInfo = async (fieldsToUpdate, prod_id) => {
  try {
    const queryString = `UPDATE product SET ? WHERE prod_id=${prod_id}`;

    let result = await connection.query(queryString, fieldsToUpdate);
  } catch (error) {
    console.log(error);
  }
};

const uploadAndUpdateProdImage = async () => {
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
};

module.exports = {
  fetchProductsDetails,
  fetchAllProducts,
  fetchSingleProduct,
  findPriceAndQuantityDb,
  updateProductInfo,
  uploadAndUpdateProdImage,
  saveProductInfo,
  addImagesToProduct,
};
