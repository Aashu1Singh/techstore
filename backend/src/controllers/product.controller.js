const connection = require("../db/db");

const getAllProduct = (req, res) => {
  console.log("getAllProduct");
  const queryString =
    "Select prod_id, name, price , category, stars, description, stock ,featured, url as image from product left join image on  (product.prod_id = image.id AND image.show = 1 );";

  connection.query(queryString, [], (err, result) => {
    if (err) throw Error;
    // console.log(result);

    res.status(200).json(result);
  });
};
const getSingleProduct = (req, res) => {
  const { id } = req.params;

  const queryString = "SELECT * from product where prod_id = (?)";
  const value = [id];

  connection.query(queryString, value, (err, result) => {
    if (err) throw Error;

    // console.log(typeof result);
    const data = JSON.parse(JSON.stringify(result[0]));
    // console.log(typeof data);

    const query = "SELECT * from image WHERE id=?";
    connection.query(query, data.prod_id, (err, result2) => {
      if (err) throw Error;

      data.image = JSON.parse(JSON.stringify(result2));

      console.log(data);

      res.status(200).json(data);
    });
  });
};

const addSingleProduct = (req, res) => {
  // const { }

  console.log(req.body);

  res.send();
};

const updateProduct = (req, res) => {
  const { prod_id } = req.body;
  let fieldsToUpdate = {
    // image: req.body["image"],
  };
  for (const field in req.body) {
    if (field == "prod_id" || field == "image") continue;
    fieldsToUpdate[field] = req.body[field];
  }
  console.log(fieldsToUpdate);
  const queryString = `UPDATE product SET  ? WHERE prod_id=${prod_id}`;

  connection.query(queryString, fieldsToUpdate, (err, result) => {
    if (err) {
      console.log(err);

      throw new Error();
    }
  });
  res.status(200).json({ message: "Product info updated" });
};

module.exports = {
  getAllProduct,
  getSingleProduct,
  updateProduct,
  addSingleProduct,
};
