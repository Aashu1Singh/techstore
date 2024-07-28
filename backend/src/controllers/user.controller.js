const bcrypt = require("bcrypt");
const connection = require("../db/db");
const jwt = require("jsonwebtoken");

const addNewUser = async (req, res) => {
  const { email, password, fullname } = req.body;

  if (!email || !password) {
    return res.status(400).json("Email and Password are required");
  }

  try {
    let queryString = "SELECT * from user WHERE email=(?)";
    let values = [email];

    const existingUser = await connection.query(queryString, [values]);

    if (!existingUser) {
      res.status(400).json({ message: "User already exists with this email" });
      return;
    }

    let passwordHash = await bcrypt.hash(password, 8);

    queryString = "INSERT into user ( fullname, email, password) values (?);";

    values = [fullname, email, passwordHash];

    const result = await connection.query(queryString, [values]);

    queryString = "SELECT fullname, email, user_id from  user where email = ?;";

    let user = await connection.query(queryString, email);

    res.status(200).json({
      statusCode: 200,
      message: "User Registed successfully",
      data: {
        ...JSON.parse(JSON.stringify(user[0])),
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let queryString = "SELECT * from user WHERE email = (?);";
    let value = [email];

    let [user] = await connection.query(queryString, [value]);
    let existingUser = user[0];

    if (!existingUser) {
      res.status(404).json({ message: "User doesn't exist with this email" });

      return;
    }

    let verifyUser = bcrypt.compareSync(password, existingUser.password);

    if (!verifyUser) {
      res.status(404).json({ message: "Wrong Password" });
    }

    let verifiedUser = {
      user_id: existingUser.user_id,
      email: existingUser.email,
      fullname: existingUser.fullname,
    };

    const accessToken = jwt.sign(verifiedUser, "secret", {
      expiresIn: "1h",
    });

    let updateQuery = "UPDATE user SET access_token = ? WHERE user_id = ?;";
    let updateValues = [accessToken, verifiedUser.user_id];

    let result = await connection.query(updateQuery, updateValues);

    return res.status(200).json({
      message: "User Logged In ",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getUserDetails = async (req, res) => {
  const { user_id } = req.body;

  try {
    const queryString =
      "SELECT user_id, fullname, email, access_token from user WHERE user_id = ?";
    const value = [user_id];

    let [result] = await connection.query(queryString, [value]);
    const user = result[0];
    console.log(user);

    if (!user) {
      res.status(200).json({
        data: user,
      });
      return;
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  addNewUser,
  getUserDetails,
  loginUser,
};
