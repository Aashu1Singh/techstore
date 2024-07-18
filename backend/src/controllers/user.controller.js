const bcrypt = require("bcrypt");
const connection = require("../db/db");
const jwt = require("jsonwebtoken");

async function addNewUser(req, res) {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password) {
    return res.status(400).json("Email and Password are required");
  }

  connection.connect((err) => {
    if (err) throw new Error(err);

    let queryString = "SELECT * from user WHERE email=(?)";
    let values = [email];
    connection.query(queryString, [values], async (err, result) => {
      if (err) throw new Error(err);

      if (result.length > 0) {
        console.log(result);
        res.status(200).json("User already exists with this email");

        return;
      } else {
        // console.table([firstname, lastname, email, password]);
        let passwordHash = await bcrypt.hash(password, 8);

        queryString =
          "INSERT into user ( first_name, last_name, email, password) values (?);";

        values = [firstname, lastname, email, passwordHash];

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

const loginUser = (req, response) => {
  const { email, password } = req.body;

  connection.connect(async (err) => {
    if (err) throw new Error(err);

    let queryString = "SELECT * from user WHERE email = (?);";
    let value = [email];

    connection.query(queryString, [value], (err, result) => {
      if (err) throw new err();

      if (result.length == 1) {
        let verifyUser = bcrypt.compareSync(password, result[0].password);

        if (verifyUser) {
          let verifiedUser = { ...result[0] };
          console.log(verifiedUser);

          const accessToken = jwt.sign(verifiedUser, "secret", {
            expiresIn: "1h",
          });

          let updateQuery =
            "UPDATE user SET access_token = ? WHERE user_id = ?;";
          let updateValues = [accessToken, verifiedUser.user_id];

          connection.query(updateQuery, updateValues, (err, res) => {
            console.log(err);
            if (err) throw new Error(err);

            response.status(200).json({ accessToken });
          });
        }
      }
    });
  });
};

const getUser = (req, res) => {
  console.log(req.query);

  res.send();
};

module.exports = {
  addNewUser,
  getUser,
  loginUser,
};
