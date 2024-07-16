// const mongoose = require("mongoose")

// async function connectToDataBase ()  {
//   mongoose
//     .connect("mongodb+srv://aashumongodb:Qrs7MqzfG4tp48rk@cluster0.kxkt9hd.mongodb.net/test")
//     .then(() => console.log("Connected! to db"))
//     .catch((err) => {
//       console.log(err);
//       process.exit(1);
//     });
// }

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aashu",
  database: "test",
});

module.exports = connection;
