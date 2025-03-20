const express = require("express");
const router = express.Router();
const authorization = require("../utils/authtransaction")
const controller = require("../controllers/transaction")
router.post("/add",authorization.authtransaction,controller.createtransaction);
module.exports = router;