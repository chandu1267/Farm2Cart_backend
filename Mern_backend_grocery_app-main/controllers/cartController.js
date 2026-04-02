const Cart = require("../models/Cart")
const Product = require("../models/Product")

exports.addToCart = async(req, res)=>{
    try {
        const userId = req.user._id;
        const {productId, quantity} = req.body;

        if(quantity < 1){
            return res.status(400).json({msg:"Pls add a product"});
        }
        const productExists = await Product.findById(productId);
        if(!productExists){
            return res.status(404).json({msg:"Product not found"})
        }
        let cart = await Cart.findOne({user:userId})

        if(!cart){
            cart = await Cart.create({
                user:userId,
                items: [{product: productId, quantity}]
            })
            
            return res.status(201).json({
                success:true,
                message:"Cart created & product added", 
                cart
            })   
        }
        const itemIndex = cart.items.findIndex(
            item =>item.product.toString() === productId
        )
        if(itemIndex > -1){
            cart.items[itemIndex].quantity += quantity;
        }else{
            cart.items.push({product:productId, quantity})
        }
        await cart.save()
        res.json({
            success:true,
            message:"Product added to cart"
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getCart = async(req, res)=>{
    try {
        const cart = await Cart.findOne({user:req.user._id})
        .populate("user", "email")
        .populate("items.product")
        if(!cart){
            return res.status(404).json({msg:'Cart not found'});
        }
        res.json({success:true, cart})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.removeFromCart = async(req, res)=>{
    try {
        const cart = await Cart.findOneAndUpdate(
            {user: req.user._id},
            {$pull: {items: {product: req.params.productId}}}, 
            {new:true}
        )
        res.json({
            success:true,
            message:"Product removed",
            cart
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(
        item => item.product.toString() !== productId.toString()
      );
      await cart.save();
      return res.json({ success: true, message: "Product removed", cart });
    }

    const item = cart.items.find(
      item => item.product.toString() === productId.toString()
    );

    if (!item) {
      return res.status(404).json({ msg: "Product not in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    res.json({
      success: true,
      message: "Quantity updated",
      cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
