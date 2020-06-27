const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt.js');

const authentication = (req, res, next) => {
    console.log('masuk auth');
    const { token } = req.headers;
    if (!token) next({
        name: `TOKEN_NOT_FOUND`
    })
    try {
        const decode = verifyToken(token);
        const { id } = decode;
    
        User.findByPk(id)
            .then((data) => {
                if (data) {
                    req.user = decode;
                    next()
                }
                else next({
                    name: `INVALID_USER`
                })
            }).catch((err) => {
                throw(err);
            });
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;