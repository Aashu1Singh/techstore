const connection = require("../db/db");

const getAllProduct = (req, res) => {
  console.log("getAllProduct");
  const queryString = "SELECT * from product";

  connection.query(queryString, [], (err, result) => {
    if (err) throw err;
    
    res.status(200).json(result);
  });
};
const getSingleProduct = (req, res) => {
  const { id } = req.params;

  const queryString = "SELECT * from product where prod_id = (?)";
  const value = [id];

  connection.query(queryString, value, (err, result) => {
    if (err) throw err;

    res.status(200).send(result);
  });
};

module.exports = {
  getAllProduct,
  getSingleProduct,
};
