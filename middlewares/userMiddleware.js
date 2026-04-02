const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.userMiddleware = async (req, res, next) => {
    try {
        const userHeader = req.headers.authorization;

        if (!userHeader || !userHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                msg: "Token required"
            })
        }
        const token = userHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded._id);
        if(!user){
            return res.status(401).json({msg:"User not found"})
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });

    }
}