const app = require("./app");
const connectToDataBase = require("./db/db");

connectToDataBase().then(() => {
  app.listen(5000, () => {
    console.log("Server started on 5000");
  });
});
