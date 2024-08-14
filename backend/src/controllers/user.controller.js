const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const ejs = require("ejs");

const {
  findUserData,
  saveNewUserData,
  saveUserAccessToken,
  findUserByUserId,
} = require("../models/user.model");

const addNewUser = async (req, res) => {
  const { email, password, fullname } = req.body;

  if (!email || !password) {
    return res.status(400).json("Email and Password are required");
  }

  try {
    const existingUser = await findUserData(email);

    if (existingUser) {
      res.status(400).json({ message: "User already exists with this email" });
      return;
    }

    let newUser = {
      email,
      password,
      fullname,
    };

    const savedNewUser = await saveNewUserData(newUser);
    if (!savedNewUser) {
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }

    const user = await findUserData(email);
    // console.log("user", user);

    res.status(200).json({
      statusCode: 200,
      message: "User Registed successfully",
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let existingUser = await findUserData(email);

    if (!existingUser) {
      res.status(404).json({ message: "User doesn't exist with this email" });

      return;
    }

    let verifyUser = bcrypt.compareSync(password, existingUser.password);

    if (!verifyUser) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    let verifiedUser = {
      user_id: existingUser.user_id,
      email: existingUser.email,
      fullname: existingUser.fullname,
    };

    const accessToken = jwt.sign(verifiedUser, "secret", {
      expiresIn: "1h",
    });

    const savedAccessToken = await saveUserAccessToken(
      accessToken,
      verifiedUser.user_id
    );
    if (!savedAccessToken) {
      return res.status(500).json({
        statusCode: 500,
        message: "Error While saving Access Token",
      });
    }

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

  const user = await findUserByUserId(user_id);

  if (!user) {
    res.status(500).json({
      message: "User Not found",
    });
    return;
  }

  res.status(200).json({
    statusCode: 200,
    user,
  });
};



const generate = async (req, res) => {
  let receiptHtmlPath = fs.readFileSync(
    path.join(__dirname, "..", "templates", "Receipt.html"),
    "utf8"
  );

  let generatedReceiptPath = path.join(
    __dirname,
    "..",
    "..",
    "upload",
    "output.pdf"
  );

  const html = await ejs.renderFile(
    path.join(__dirname, "..", "..", "views", "receipt-template.ejs"),
    { product: order }
  );

  let options = { format: "A5", path: generatedReceiptPath };

  let file = { content: html };
  await html_to_pdf.generatePdf(file, options);

  fs.readFile(generatedReceiptPath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the file.");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.send(data);
  });
};

module.exports = {
  addNewUser,
  getUserDetails,
  loginUser,
  generate,
};
