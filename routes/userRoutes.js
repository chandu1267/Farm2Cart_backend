
const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

router.post("/send-otp", userController.sendOtp)
router.post("/verify-otp", userController.verifyOtp)

module.exports = router;
