const connection = require("../db/db");
const path = require("path");

const html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const ejs = require("ejs");

const { uploadSingleOnCloudinary } = require("../utils/Cloudinary");

const saveOrder = async (order) => {
  const { user_id, totalPrice, status, address } = order;

  try {
    const query =
      "INSERT INTO orders (customer_id, price, status, address) VALUES (?)";
    const values = [user_id, totalPrice, status, address];

    const [res] = await connection.query(query, [values]);
    const insertId = JSON.parse(JSON.stringify(res)).insertId;

    return insertId;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const saveOrderDetails = async (order) => {
  const { products, orderId } = order;
  // console.log(" order de", order);

  try {
    for (let product of products) {
      const query =
        "INSERT INTO order_detail (order_id, product_id, price , quantity) VALUES (?, ?, ?, ?)";

      const values = [
        orderId,
        product.prod_id,
        product.price,
        product.quantity,
      ];

      const [res] = await connection.query(query, values);
      const result = JSON.parse(JSON.stringify(res)).insertId;
      console.log(result);
    }

    return true;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const fetchAllOrders = async (user_id) => {
  try {
    const queryString = "SELECT * from orders where customer_id=(?)";
    const [res] = await connection.query(queryString, [user_id]);

    // console.log(res);

    const orders = JSON.parse(JSON.stringify(res));

    return orders;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const cancelOrderId = async (payload) => {
  const { user_id, order_id } = payload;

  try {
    const queryString = `UPDATE orders set status="CANCELLED" WHERE order_id=(?) AND customer_id=(?)`;

    const [res] = await connection.query(queryString, [order_id, user_id]);
    let rowAffected =
      JSON.parse(JSON.stringify(res)).affectedRows === 1 ? true : false;
    // console.log(rowAffected);
    return rowAffected;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const generateReceipt = async (orderDetails) => {
  let receiptTempPlatePath = path.join(
    __dirname,
    "..",
    "..",
    "views",
    "receipt-template.ejs"
  );

  let generatedReceiptPath = path.join(
    __dirname,
    "..",
    "..",
    "upload",
    "output.pdf"
  );
  let options = { format: "A5", path: generatedReceiptPath };

  try {
    const html = await ejs.renderFile(receiptTempPlatePath, { orderDetails });

    let file = { content: html };

    await html_to_pdf.generatePdf(file, options);

    const responseUrl = await uploadSingleOnCloudinary(generatedReceiptPath);
    // console.log(responseUrl);

    return responseUrl.secure_url;
  } catch (error) {
    return null;
  }
};

const saveReceiptUrl = async (url, order_id) => {
  try {
    const query = `UPDATE ORDERS SET receipt_link=(?) WHERE order_id=(?)`;

    connection.query(query, [url, order_id]);
  } catch (error) {
    console.log(error);

    console.log("Receipt not saved");
  }
};
module.exports = {
  saveOrder,
  saveOrderDetails,
  fetchAllOrders,
  cancelOrderId,
  generateReceipt,
  saveReceiptUrl,
};
