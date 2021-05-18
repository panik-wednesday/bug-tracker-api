const express = require("express");
const auth = require("./middleware/auth.js");
const User = require("./controllers/userController.js");
const Bug = require("./controllers/bugController.js");

const router = new express.Router;

// User routes
router.post("/users/register", User.create);
router.post("/users/login", User.login);
router.post("/users/logout", auth, User.logout);
router.get("/users/me", auth, User.me);
router.get("/users/test", auth, User.me);
router.get("/users/test2", auth, User.me);

// Bug routes
router.get("/bugs/test", auth, Bug.getAll);
router.get("/bugs", auth, Bug.getAll);
router.get("/bugs/:id", auth, Bug.getOne);
router.post("/bugs", auth, Bug.create);
router.patch("/bugs/:id", auth, Bug.update);
router.delete("/bugs/:id", auth, Bug.deleteBug);

module.exports = router;