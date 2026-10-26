const Product = require('../models/Product');

//CREATE a new product
const createProduct = async (req, res) => {
    try {
        const { name, 
            description, 
            price, 
            category, 
            stock } = req.body;
    
    // Validate required fields
        if (!name || price === undefined) {
            return res.status(400).json({
                message: "Name and price are required"
            });
        }

        if (typeof price !== "number" || Number.isNaN(price)) {
            return res.status(400).json({
                message: "Price must be a valid number"
            });
        }

        if (
            stock !== undefined &&
            (typeof stock !== "number" || Number.isNaN(stock))
        ) {
            return res.status(400).json({
                message: "Stock must be a valid number"
            });
        }
        const product = new Product({ 
                name, 
                description, 
                price, 
                category, 
                stock 
            });
            await product.save();
            res.status(201).json({
                message: 'Product created successfully',
                product
            });
    } catch (error) {
        console.error('Create product error:', error.message);
        res.status(500).json({ 
            message: 'Internal Server Error'});
    }
};

//GET all products
const getProducts = async (req, res) => {
    try {   
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Get products error:', error.message);
        res.status(500).json({ 
            message: 'Internal Server Error'});
    }
};

//GET a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }   
        res.status(200).json(product);
    } catch (error) {
        console.error('Get product error:', error.message);
        res.status(500).json({ 
            message: 'Internal Server Error'});
    }
};

//Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const { price, stock } = req.body;
        
        // Validate required fields while updating
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

         if (price !== undefined &&
            (typeof price !== "number" || Number.isNaN(price))
        ) {
            return res.status(400).json({
                message: "Price must be a valid number"
            });
        }

        if (
            stock !== undefined &&
            (typeof stock !== "number" || Number.isNaN(stock))
        ) {
            return res.status(400).json({
                message: "Stock must be a valid number"
            });
        }

        Object.assign(product, req.body);

        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.error("Update product error:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("Delete product error:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
//Exporting the functions to be used in routes
module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

    
