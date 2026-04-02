
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")

exports.register = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const adminEmail = await Admin.findOne({email})
        if(adminEmail){
            return res.status(401).json("email required")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await Admin.create({
            email, password:hashedPassword
        })
  
        return res.status(200).json({msg:"admin registered"})
    } catch (error) {
         res.status(500).json({ msg: error.message })
    }
}

exports.login = async(req, res)=>{
    try {
        const {email, password}= req.body;

        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(401).json({msg:"Invalid credentials"})
        }
        const checkPassword = await bcrypt.compare(password, admin.password)

        if(!checkPassword){
            return res.status(401).json({msg:"Invalid credentials"})
        }
        const token = jwt.sign(
            {adminId: admin._id}, process.env.JWT_SECRET, {expiresIn:"1d"}
        )
        return res.status(200).json({msg:"login success", token})
        
    } catch (error) {
         res.status(500).json({ msg: error.message })
    }
}