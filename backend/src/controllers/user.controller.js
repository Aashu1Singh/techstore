const bcrypt = require("bcrypt");
const connection = require("../db/db");
const jwt = require("jsonwebtoken");

async function addNewUser(req, res) {
  const { email, password, fullname } = req.body;

  if (!email || !password) {
    return res.status(400).json("Email and Password are required");
  }

  let queryString = "SELECT * from user WHERE email=(?)";
  let values = [email];
  connection.query(queryString, [values], async (err, result) => {
    if (err) throw new Error(err);

    if (result.length > 0) {
      console.log(result);
      res.status(400).json("User already exists with this email");

      return;
    } else {
      // console.table([firstname, lastname, email, password]);
      let passwordHash = await bcrypt.hash(password, 8);

      queryString = "INSERT into user ( fullname, email, password) values (?);";

      values = [fullname, email, passwordHash];

      connection.query(queryString, [values], (err, rows) => {
        if (err) {
          console.log(err);
        }

        // console.log(rows);
        res.status(200).json("User added");
        return;
      });
    }
  });
}

const loginUser = (req, response) => {
  const { email, password } = req.body;

  let queryString = "SELECT * from user WHERE email = (?);";
  let value = [email];

  connection.query(queryString, [value], (err, result) => {
    if (err) throw err;
    console.log(result);

    if (result.length === 0) {
      return response
        .status(404)
        .json({ message: "User doesn't exist with this email" });

      // return;
    }
    console.log("after return");
    let verifyUser = bcrypt.compareSync(password, result[0].password);

    if (verifyUser) {
      let verifiedUser = { user_id: result[0].user_id };

      console.log(verifiedUser);

      const accessToken = jwt.sign(verifiedUser, "secret", {
        expiresIn: "1h",
      });

      let updateQuery = "UPDATE user SET access_token = ? WHERE user_id = ?;";
      let updateValues = [accessToken, verifiedUser.user_id];

      connection.query(updateQuery, updateValues, (err, res) => {
        console.log(err);
        if (err) throw new Error(err);

        response.status(200).json({
          message: "Logged In ",
          accessToken: accessToken,
        });
      });
    } else {
      response.status(401).json({ message: "Wrong Password" });
    }
  });
};

const getUser = (req, res) => {
  console.log(req.user);

  const queryString =
    "SELECT user_id, first_name, last_name, email, access_token from user WHERE user_id = ?";
  const value = [req.user?.user_id];

  connection.query(queryString, [value], (err, result) => {
    if (err) throw err;

    let user = {
      user_id: result[0].user_id,
      fullname: result[0].fullname,
      email: result[0].email,
      access_token: result[0].access_token,
    };

    console.log(user);
    res.status(200).json(user);
  });
};

module.exports = {
  addNewUser,
  getUser,
  loginUser,
};
