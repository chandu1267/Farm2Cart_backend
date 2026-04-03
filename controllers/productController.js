const Product = require("../models/Product")

exports.createProduct = async(req, res)=>{
    try {
        const {name, price, category,desc, unit} = req.body;
        // const image = req.file? `/uploads/${req.file.filename}`:null
        const image = req.file ? req.file.path : null;

        const productData = await Product.create({
            name, price, category, unit,desc, image
        })

        return res.status(200).json({msg:"product added", productData})

    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

exports.getProducts = async(req, res)=>{
    try {
        const allProducts = await Product.find()
        return res.status(200).json({products:allProducts})
    } catch (error) {
       return res.status(400).json({message:error.message})
    }
}

exports.productById = async(req, res)=>{
    try {
        const {id} = req.params;
        const record = await Product.findById(id)
        if(!record){
            return res.json(404).json({msg:"product not found"})
        }
        return res.status(200).json({record})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}