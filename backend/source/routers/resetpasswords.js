const express = require("express");
const middleware = require("../utils/authMiddleware")
const controller = require("../controllers/resetpassword")
const router = express.Router();
router.post("/reset-password",middleware.authenticatetokens,controller.resetpasswords);
module.exports = router;