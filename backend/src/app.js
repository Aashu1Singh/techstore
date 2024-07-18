const express = require("express");
const bodyParser = require('body-parser')
require('dotenv').config()


const app = express();
app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));


app.use(express.static("public"));

//  routes import
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");

//routes  declaration

app.use("/api/users", userRouter);
app.use("/api/product", productRouter)

module.exports = app;
