const { Customer } = require('../models');

const authorization = (req, res, next) => {
    console.log('masuk author', req.params);
    // console.log(req.params, '<<<');
    const { CustomerId } = req.params;
    // console.log('author', id);

    Customer.findByPk(CustomerId)
        .then((result) => {
            if (!result) {
                throw({name: 'CART_NOT_FOUND'})
            } else if (result.id != req.user.id) {
                throw({name: 'NOT_AUTHORIZED'})
            } else {
                console.log('pass author');
                next()
            }
        }).catch((err) => {
            next(err);
        });
}

module.exports = authorization;