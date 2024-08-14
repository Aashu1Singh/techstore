const express = require("express");
const {
  addNewUser,
  loginUser,

  getUserDetails,
  generate,
} = require("../controllers/user.controller");
const authenticate = require("../middlewares/authenticate");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  console.log(req.body);

  res.send("ok");
});

userRouter.route("/signup").post(addNewUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/generate").post(express.raw({ type: "*/*" }), generate);

// /secured routes

userRouter.route("/getUser").post(authenticate, getUserDetails);

module.exports = userRouter;
