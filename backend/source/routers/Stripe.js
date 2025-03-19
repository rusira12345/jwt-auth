const express = require("express");
const controller = require("../controllers/stripes")
const router = express.Router();
router.post("/create-checkout-session",controller.stripess);
module.exports = router;