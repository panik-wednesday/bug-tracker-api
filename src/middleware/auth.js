const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const auth = async (req, res, next) => {
  try {
    // get token by removing "Bearer " in the authorization header
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({_id: decoded.id, "tokens.token": token});
    if(!user) throw new Error();

    req.token = token;
    req.user = user;

    next();
  } catch(error) {
    res.status(401).send({message: "Please authenticate"});
  }
}

module.exports = auth;