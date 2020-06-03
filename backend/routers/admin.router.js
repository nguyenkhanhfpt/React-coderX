const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');
const upload = require('../models/ModelMulter');

router.get('/', controller.index);

router.get('/products', controller.products);

router.get('/products/add', controller.viewAdd);

router.get("/products/:id", controller.delete);

router.post('/products/add', upload.single('imageProduct'), controller.add);

module.exports = router;