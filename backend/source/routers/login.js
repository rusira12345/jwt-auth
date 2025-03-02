const express = require("express");
const router = express.Router();
const {login,refreshtoken} = require("../controllers/login");
router.post("/login",login);
router.post("/refresh-token",refreshtoken);
module.exports = router;