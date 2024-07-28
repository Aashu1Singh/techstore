require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

//  routes import
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");

//routes  declaration

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);


module.exports = app;
