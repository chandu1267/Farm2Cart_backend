
const express = require("express")
const controller = require("../controllers/productController")
// const upload = require("../middlewares/imageMiddleware")
const upload = require("../middlewares/upload");

const searchProducts = require("../controllers/searchController")

const router = express.Router()

router.post("/add-product", upload.single("image"), controller.createProduct)
router.get("/all-products", controller.getProducts)
router.get("/search",searchProducts.searchProducts)

router.get("/:id", controller.productById)

module.exports = router;