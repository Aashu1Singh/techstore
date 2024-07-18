const express = require("express");
const { addNewUser, getUser, loginUser } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  console.log(req.body);

  res.send("ok");
});

userRouter.route("/signup").get(addNewUser);
userRouter.route("/login").get(loginUser);


// /secured routes 

userRouter.route("/getUser").get(getUser)

module.exports = userRouter;
