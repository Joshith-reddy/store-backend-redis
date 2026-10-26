//Order controller
const mongoose = require("mongoose");
const Order = require("../models/Order");
// Create a new order
const createOrder = async (req, res) => {
    try {
        const {products, totalAmount, status } = req.body;
        const order = new Order({ user: req.user.userId, products, totalAmount, status });
        await order.save();
        res.status(201).json({
            message: "Order created successfully",
            order
        });
    } catch (error) {
        res.status(500).json({ message: "Order Create Error", error });
    }
};

//Retrieve all orders for the authenticated user
const getOrders = async (req, res) => {
    try {
        let orders;
        if (req.user.role === "user") {
            orders = await Order.find({ user: req.user.userId });
        } else {
            orders = await Order.find();
        }
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error retrieving orders:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//Retrieve a specific order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }   
        let order;
        if (req.user.role === "user") {
            order = await Order.findOne({ _id: id, user: req.user.userId });
        } else {
            order = await Order.findById(id);
        }
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order });
    } catch (error) {
        console.error("Error retrieving order:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById
};  
