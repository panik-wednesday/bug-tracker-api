const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = new express.Router;
const User = require("../models/user.js");

module.exports = {
  create,
  login,
  logout,
  me
};

async function create(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({user});
  } catch(error) {
    console.log(error);
    res.status(400).send();
  }
}

async function login(req, res) {
  
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
}

async function logout(req, res) {
  
  try {
    // Delete current token
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    
    await req.user.save();
    res.status(200).send();

  } catch(error) {
    console.log(error);
    res.status(500).send()
  }
}

async function me(req, res) {
  // Sample route for auth
  res.send(req.user);
}
