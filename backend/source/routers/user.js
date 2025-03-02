const {getusers} = require("../controllers/user");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
router.get("/users",authMiddleware.authenticatetoken,getusers);
module.exports = router;