const { Product } = require('../models');

const authorization = (req, res, next) => {
    const { id } = req.params;

    Product.findByPk(id)
        .then((data) => {
            if (!data) {
                next({
                    name: `PRODUCT_NOT_FOUND`,
                    id
                })
            } else if (data.UserId !== req.user.id) {
                next({
                    name: `NOT_AUTHORIZED`,
                })
            } else {
                console.log('next autho');
                next()
            }
        }).catch((err) => {
            next(err);
        });
}

module.exports = authorization;