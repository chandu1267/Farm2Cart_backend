const jwt = require("jsonwebtoken")

exports.adminMiddleware = (req, res)=>{
    try {
        const adminHeaders = req.headers.authorization;

        if(!adminHeaders || !adminHeaders.startsWith("Bearer ")){
            return res.status(401).json({msg:"token required"})
        }
        
        const token = adminHeaders.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.adminId = decoded.adminId;
        next()

    } catch (error) {
        return res.status(400).json({msg:"Invalid or expired token"})
    }
}