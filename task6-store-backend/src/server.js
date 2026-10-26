require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

//Routes for users
const userRoutes = require("./routes/userRoutes");
//Routes for products
const productRoutes = require("./routes/productRoutes");
//Routes for authentication
const authRoutes = require("./routes/authRoutes");
//Routes for orders
const orderRoutes = require("./routes/orderRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/status", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Store API is running"
    });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();