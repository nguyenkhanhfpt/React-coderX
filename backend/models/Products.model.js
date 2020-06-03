const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nameProduct: String,
    price: Number,
    imageProduct: String
});

const Products = mongoose.model('Products', productSchema, 'products');

module.exports = Products;