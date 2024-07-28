
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
}).promise();

module.exports = connection;
