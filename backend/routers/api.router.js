const express = require('express');
const router = express.Router();

const controller = require('../controllers/api.controller');
const authValidation = require('../validations/checkAuth');

router.post('/user', controller.login);

router.post('/products', authValidation.checkAuth ,controller.getProducts);

router.post('/checkToken', authValidation.checkAuth, controller.checkToken);

module.exports = router;