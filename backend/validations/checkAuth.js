const jwt = require('jsonwebtoken');

module.exports.checkAuth = (req, res, next) => {
    const {token} = req.body;

    if(token) {
        jwt.verify(token, process.env.SERECT, (err, decoded) => {
            if(err) {
                return res.json({message: 'invalid token!'});
            }
            else {
                next();
            }
        });
    }
    else {
        res.json({
            message: 'No token provided.' 
        });
    }
}