const express = require("express");
const router = express.Router();

//Controller Functiion
const { loginUser, signupUser } = require("../controller/userController");

//login router
router.post("/login", loginUser);

//signup  router
router.post("/signup", signupUser);

module.exports = router;
