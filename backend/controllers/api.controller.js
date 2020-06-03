const jwt = require('jsonwebtoken');

const Users = require('../models/Users.model');
const Products = require('../models/Products.model');
const md5 = require('md5');

module.exports.login = async (req, res) => {
    const {userName, password} = req.body;

    const user = await Users.findOne({userName: userName});

    if(!user) {
        res.json({message :'User is not exist!'});
        return;
    }

    const passwordHash = md5(password);

    if(user.password != passwordHash) {
        res.json({message: 'Password is wrong!'});
        return;
    }

    const payload = {
        check: true
    }

    const token = jwt.sign(payload, process.env.SERECT);

    res.json({
        message: 'Authentication done!',
        token: token,
        user: user
    });
}

module.exports.getProducts = async (req, res) => {
    const products = await Products.find();

    res.json(products);
}

module.exports.checkToken = (req, res) => {
    res.json({
        message: 'Authentication done!'
    });
}
