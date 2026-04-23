
# ⚙️ 2. Backend README (Farm2Cart Server)

# 🌾 Farm2Cart — Backend

## 📌 Overview
This repository contains the **backend (server-side)** of Farm2Cart, a B2B e-commerce platform for agricultural products.  
It handles authentication, product management, cart operations, and order processing.

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer

## ✨ Features
- 🔐 OTP-based email authentication
- 👤 User registration & login
- 📦 Product CRUD operations
- 🛒 Cart management APIs
- 📬 Email service using Nodemailer
- 🧱 MVC architecture

## 📂 API Endpoints

### Auth
- POST `/api/auth/send-otp`
- POST `/api/auth/verify-otp`

### Products
- GET `/api/products`
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

### Cart
- POST `/api/cart/add`
- GET `/api/cart`
- DELETE `/api/cart/:id`
