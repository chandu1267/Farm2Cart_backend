const express = require("express")

const cartController = require("../controllers/cartController")
const middle = require("../middlewares/userMiddleware")

const router = express.Router()

router.get("/details",middle.userMiddleware, cartController.getCart)
router.post("/add-to-cart",middle.userMiddleware, cartController.addToCart)
router.put("/update",middle.userMiddleware, cartController.updateQuantity)
router.delete("/delete/:productId",middle.userMiddleware, cartController.removeFromCart)

module.exports = router