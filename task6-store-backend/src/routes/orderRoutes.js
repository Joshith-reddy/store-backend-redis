
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    createOrder, getOrders, getOrderById
} = require("../controllers/orderController");

const router = express.Router();

//CREATE a new order
router.post('/', authMiddleware, createOrder);

//GET all orders for the authenticated user
router.get('/', authMiddleware, getOrders);

//GET a specific order by ID
router.get('/:id', authMiddleware, getOrderById);  

module.exports = router;