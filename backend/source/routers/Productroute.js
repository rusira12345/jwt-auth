const controller = require("../controllers/ProductController")
const middleware = require("../utils/ProductMiddleware")
const express = require("express");
const router = express.Router();
router.post("/add-product",middleware.authaddProducts,controller.addProducts);
router.post("/search-product",middleware.authsearchproduct,controller.searchproductsss);
module.exports = router;