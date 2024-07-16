const mysql = require("mysql");
const connection = require("../db/db");

async function addNewUser(req, res) {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password) {
    return res.status(400).json("Email and Password are required");
  }

  connection.connect((err) => {
    if (err) throw new err;

    let queryString = "SELECT * from user WHERE email=(?)";
    let values = [email];
    connection.query(queryString, [values], (err, result) => {
      if (err) throw new err;

      if (result.length > 0) {
        console.log(result);
        res.status(200).json("User already exists with this email");
        return;
      } else {
        // console.table([firstname, lastname, email, password]);
        queryString =
          "INSERT into user ( first_name, last_name, email, password) values (?);";
        values = [firstname, lastname, email, password];

        connection.query(queryString, [values], (err, rows) => {
          if (err) {
            console.log(err);
          }
          console.log(rows);
          res.status(200).json("User added");
          return;
        });
      }
    });
  });
}

module.exports = {
  addNewUser,
};
