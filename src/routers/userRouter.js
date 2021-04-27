const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = new express.Router;
const User = require("../models/user.js");

router.post("/users/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({user});
  } catch(error) {
    console.log(error);
    res.status(400).send();
  }
});

router.post("/users/login", async (req, res) => {
  try {

    const user = await User.findOne({username: req.body.username});
    if(!user) throw new Error();

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if(!passwordMatch) throw new Error();
    
    // Add new token to valid users token
    const token = jwt.sign({id: user.id.toString()}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    
    await user.save();
    res.status(200).send({token});
  
  } catch(error) {
    console.log(error);
    res.status(400).send({message:"Wrong username or password"});
  }
   
});

module.exports = router;