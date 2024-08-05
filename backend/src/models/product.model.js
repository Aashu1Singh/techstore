const connection = require("../db/db");

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

module.exports = {
  fetchProductsDetails,
};
