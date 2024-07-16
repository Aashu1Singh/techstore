const express = require("express");
require('dotenv').config()


const app = express();
app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

//  routes import
const userRouter = require("./routes/user.routes")

//routes  declaration

app.use("/api/users", userRouter);

module.exports = app;
