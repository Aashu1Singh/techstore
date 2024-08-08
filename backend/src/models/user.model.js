const connection = require("../db/db");
const bcrypt = require("bcrypt");

const findUserData = async (email) => {
  let queryString = "SELECT * from user WHERE email=(?)";

  try {
    const [res] = await connection.query(queryString, [email]);
    const existingUser = res[0];
    // console.log("existingUser", existingUser);

    return existingUser;
  } catch (error) {
    console.log(error);

    return null;
  }
};
const findUserByUserId = async (user_id) => {
  let queryString = "SELECT * from user WHERE user_id=(?)";

  try {
    const [res] = await connection.query(queryString, [user_id]);
    const existingUser = res[0];

    return existingUser;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const saveNewUserData = async (newUser) => {
  const { email, password, fullname } = newUser;
  try {
    let passwordHash = await bcrypt.hash(password, 8);

    queryString = "INSERT into user ( fullname, email, password) values (?);";

    values = [fullname, email, passwordHash];

    const result = await connection.query(queryString, [values]);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const saveUserAccessToken = async ({ accessToken, user_id }) => {
  try {
    let updateQuery = "UPDATE user SET access_token = ? WHERE user_id = ?;";

    let result = await connection.query(updateQuery, [accessToken, user_id]);

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

module.exports = {
  findUserData,
  saveNewUserData,
  saveUserAccessToken,
  findUserByUserId
};
