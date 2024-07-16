const express = require("express");
const { addNewUser } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  console.log(req.body);

  res.send("ok");
});

userRouter.route("/signup").get(addNewUser);

module.exports = userRouter;
