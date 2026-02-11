// src/controllers/productController.js
const Product = require('../models/Product'); // Import the model!

// READ all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// CREATE a new product
exports.createProduct = async (req, res) => {
  // ... paste the POST logic here ...
};

// UPDATE a product
exports.updateProduct = async (req, res) => {
   // ... paste the PUT logic here ...
};

// DELETE a product
exports.deleteProduct = async (req, res) => {
   // ... paste the DELETE logic here ...
};