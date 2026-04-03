const express = require("express")
const mongoose = require("mongoose")
const dotEnv = require("dotenv")
const productRouter = require("./routes/productRoutes")
const adminRouter = require("./routes/adminRoutes")
const emailRouter = require("./routes/userRoutes")
const cartRouter = require("./routes/cartRoutes")
const path = require("path")
const cors = require("cors")

const PORT = 3000;
const app = express()
dotEnv.config()
app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://farm2-cart-backend.vercel.app"
  ],
  credentials: true
}));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connected")
})
.catch((error)=>{
    console.log(error)
})

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/check-file", (req, res) => {
  const fs = require("fs");
  const files = fs.readdirSync("uploads");
  res.json(files);
});
app.use("/product", productRouter)
app.use("/admin", adminRouter)
app.use("/email", emailRouter)
app.use("/cart", cartRouter)

app.listen(PORT, ()=>{
    console.log(`server running @${PORT}`)
})