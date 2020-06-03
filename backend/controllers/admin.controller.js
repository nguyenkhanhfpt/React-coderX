const Products = require('../models/Products.model');

module.exports.index = (req, res) => {
    res.render('./admin');
}

module.exports.products = async (req, res) => {
    const products = await Products.find();
    res.render('./admin/products', {
        products: products
    });
}

module.exports.viewAdd = (req, res) => {
    res.render('./admin/products/add');
}

module.exports.add = async (req, res) => {
    const data = {
        nameProduct : req.body.nameProduct,
        price: parseFloat(req.body.price),
        imageProduct: req.file.filename
    };
    
    await Products.create(data);
    
    res.redirect('/admin/products');
}

module.exports.delete = async (req, res) => {
    const {id} = req.params;

    await Products.deleteOne({_id: id});

    res.redirect('/admin/products');
};