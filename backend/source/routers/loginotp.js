const express = require("express");
const controllers = require("../controllers/sendotp");
const router = express.Router();
router.post('/login-otp-sent',controllers.sendotps);
module.exports = router