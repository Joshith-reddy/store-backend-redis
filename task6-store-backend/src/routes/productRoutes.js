const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const router = express.Router();

//CREATE a new product
router.post('/', authMiddleware, allowRoles('admin','manager'), createProduct);

//GET all products
router.get('/', getProducts);

//GET a product by ID
router.get('/:id', getProductById);

//UPDATE a product by ID
router.put('/:id', authMiddleware, allowRoles('admin','manager'), updateProduct);

//DELETE a product by ID
router.delete('/:id', authMiddleware, allowRoles('admin'), deleteProduct);

module.exports = router;