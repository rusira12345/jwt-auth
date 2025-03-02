const express = require("express");
const signupcontroller = require("../controllers/Signup")
const router = express.Router();
router.post("/register",signupcontroller.createUser);
module.exports = router;