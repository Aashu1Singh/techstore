const express = require("express");
const {
  addNewUser,
  getUser,
  loginUser,
} = require("../controllers/user.controller");
const authenticate = require("../middlewares/authenticate");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  console.log(req.body);

  res.send("ok");
});

userRouter.route("/signup").post(addNewUser);
userRouter.route("/login").post(loginUser);

// /secured routes

userRouter.route("/getUser").post(authenticate, getUser);

module.exports = userRouter;
