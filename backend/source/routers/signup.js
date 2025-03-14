const express = require("express");
const middleware = require("../utils/resgisterMiddleware")
const signupcontroller = require("../controllers/Signup")
const router = express.Router();
router.post("/register-manager",middleware.authenticateOwner,signupcontroller.createManager);
router.post("/register-Cashier-asOwner",middleware.authenticateOwner,signupcontroller.createCashier);
router.post("/register-Cashier-Manager",middleware.authenticateManager,signupcontroller.createCashier);
module.exports = router;