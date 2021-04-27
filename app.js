const express = require("express");
const app = express();
const router = require("./router.js");
require("./db/connection.js");

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.status(200).send({message: "OK"});
})


module.exports = app;