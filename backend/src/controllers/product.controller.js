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

    const data = result[0];
    let parsedImageObj = JSON.parse(data.image)
    data.image = parsedImageObj.image;
    console.log(data);

    res.status(200).json(result);
  });
};

const addSingleProduct = (req, res) => {
  // const { }

  res.send();
};

const updateProduct = (req, res) => {
  const { prod_id } = req.body;
  let fieldsToUpdate = {
    image: req.body["image"],
  };
  for (const field in req.body) {
    if (field == "prod_id") continue;
    fieldsToUpdate[field] = req.body[field];
  }
  console.log(fieldsToUpdate);
  const queryString = `UPDATE product SET image= ? WHERE prod_id=${prod_id}`;

  connection.query(
    queryString,
    JSON.stringify(fieldsToUpdate),
    (err, result) => {
      if (err) {
        console.log(err);

        throw new Error();
      }

      res.status(200).json({ message: "Product info updated" });

      // console.log(result);
    }
  );
};

module.exports = {
  getAllProduct,
  getSingleProduct,
  updateProduct,
  addSingleProduct,
};
