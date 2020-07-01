const { User, Customer } = require('../models');
const { verifyToken } = require('../helpers/jwt.js');

const authentication = (req, res, next) => {
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
                    console.log('masuk auth');
                    req.user = decode;
                    next()
                }
                else {
                    console.log('invalid');
                    next({
                        name: `INVALID_USER`
                    })
                } 
            }).catch((err) => {
                console.log('no data');
                throw(err);
            });
    } catch (err) {
        next(err);
    }
}

const authenticationCust = (req, res, next) => {
    // console.log('auth Cust', req.params);
    const { token } = req.headers;
    if (!token) next({
        name: `TOKEN_NOT_FOUND`
    })
    try {
        const decode = verifyToken(token);
        const { id } = decode;
    
        Customer.findByPk(id)
            .then((data) => {
                if (data) {
                    // console.log('masuk auth');
                    req.user = decode;
                    // console.log(req.user, 'req user auht');
                    next()
                }
                else {
                    console.log('invalid');
                    next({
                        name: `INVALID_USER`
                    })
                } 
            }).catch((err) => {
                console.log('no data');
                throw(err);
            });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    authentication,
    authenticationCust
};