const mongoose = require("mongoose")

const Category_Enum=[
     "vegetables", "fruits" , "food-grains", "meat"
]
const Unit_Enum = [
    "500g", "1kg", "2kgs", "5kgs"
]

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:{
            values:Category_Enum
        }
    },
    unit:{
        type:String,
        enum:{
            values:Unit_Enum
        }
    },
    image:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }

}, {timestamps:true})

module.exports = mongoose.model("Product", productSchema)