const express = require("express");
const userRouter = require("./routers/userRouter.js")
const app = express();
require("./db/connection.js");
app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.status(200).send({message: "OK"});
})


module.exports = app;