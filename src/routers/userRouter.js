const express = require("express");
const router = new express.Router;
const User = require("../models/user.js");

router.post("/users/register", async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    res.status(201).send({user});
  } catch(error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = router;