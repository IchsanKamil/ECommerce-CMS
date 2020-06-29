const { Product } = require('../models');

class ProductController {
    static create(req, res, next) {
        console.log('masuk Productcontrol');
        const { name, image_url, price, stock } = req.body;
        const UserId = req.user.id
        const newProduct = { name, image_url, price, stock, UserId };
        console.log(newProduct, '<< new Product');
        Product.create(newProduct)
            .then((data) => {
                console.log('crete Product');
                res.status(201).json(data);
            }).catch((err) => {
                console.log('failed create');
                next(err);
            });
    }

    static findAll(req, res, next) {
        console.log('masuk findAll');
        Product.findAll({
            // where: { UserId: req.user.id },
            order: [['stock', 'ASC']]
        })
            .then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                next(err);
            });
    }

    static findOne(req, res, next) {
        const { id } = req.params;

        Product.findByPk(id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                next(err)
            });
    }

    static update(req, res, next) {
        const { id } = req.params;
        const { name, image_url, price, stock } = req.body;
        const updateTodo = { name, image_url, price, stock };
        console.log(updateTodo, id, 'masuk update');
        Product.update(updateTodo, {
            where: { id }
        })
            .then(() => {
                console.log('then update con');
                res.status(200).json(updateTodo);
            })
            .catch((err) => {
                console.log('catch update con');
                next(err);
            });
    }

    static destroy(req, res, next) {
        const { id } = req.params;
        let deleteTodo;
        console.log('masuk delete controller');
        Product.destroy({
            where: { id },
        })
            .then(() => {
                console.log('delete then con');
                res.status(200).json({
                    message: `Product successfully deleted`,
                    deleteTodo
                })
            })
            .catch((err) => {
                console.log('err delete con');
                next(err);
            });
    }
}

module.exports = ProductController;