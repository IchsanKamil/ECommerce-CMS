const { Customer, Cart, Product } = require('../models');
const { compare } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class CustomerController {
  static register(req, res, next) {
    const { name, address, email, password } = req.body;
    const newUser = { name, address, email, password };

    Customer.create(newUser)
      .then((result) => {
        const { id, name, email } = result;
        const data = { id, name, email };

        res.status(201).json(data);
      }).catch((err) => {
        next(err)
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    Customer.findOne({
      where: { email }
    })
      .then((data) => {
        if (data) {
          if (compare(password, data.password)) {
            let payload = {
              id: data.id,
              name: data.name,
              email
            }
            const token = generateToken(payload);

            res.status(200).json({
              id: data.id,
              name: data.name,
              email,
              token
            });
          } else throw ({ name: `EMAIL/PASSWORD_NOT_MATCH` })
        } else throw ({ name: `EMAIL_NOT_FOUND` })
      }).catch((err) => {
        next(err);
      });
  }

  static create(req, res, next) {
    const { CustomerId } = req.params
    const { quantity, ProductId } = req.body;
    const newProduct = { quantity, ProductId, CustomerId };

    Cart.findAll({
      where: { CustomerId, ProductId },
      include: [Product]
    })
      .then((result) => {
        if (result.length !== 0) {
          result[0].dataValues.quantity += +quantity
	  if (result[0].dataValues.quantity > result[0].dataValues.Product.stock) {
            result[0].dataValues.quantity = result[0].dataValues.Product.stock
          }
          res.send(result)
          return Cart.update(result[0].dataValues, {
            where: { CustomerId, ProductId }
          })
        } else {
          return Cart.create(newProduct)
        }
      })
      .then((data) => {
        res.status(201).json(data);
      }).catch((err) => {
        console.log('failed create');
        next(err);
      });
  }

  static readAll(req, res, next) {
    const { CustomerId } = req.params
    // console.log('masuk findAll');
    // console.log(req.user, 'res user');
    Cart.findAll({
      where: { CustomerId },
      include: [Product]
    })
      .then((data) => {
        // console.log(data, '<<<<');
        res.status(200).json(data);
      }).catch((err) => {
        // console.log('failed readAll');
        next(err);
      });
  }

  static update(req, res, next) {
    const { CustomerId, ProductId } = req.params;
    const { quantity } = req.body;
    const updateCart = { quantity, CustomerId, ProductId }
    console.log(updateCart, 'update Controller');
    Cart.findAll({
      where: { CustomerId, ProductId }
    })
      .then((result) => {
        console.log('masuk then');
        if (!result) {
          console.log('customer not found');
          throw ({ name: `CUSTOMER_NOT_FOUND`, })
        } else {
          console.log('update control');
          return Cart.update(updateCart, {
            where: { CustomerId, ProductId }
          })
        }
      })
      .then(() => {
        console.log('then update controler');
        res.status(200).json({message: 'Successfully Updated'});
      })
      .catch((err) => {
        next(err);
      });
  }

  static destroy(req, res, next) {
    const { CustomerId, ProductId } = req.params;

    Cart.destroy({
      where: { CustomerId, ProductId },
    })
      .then(() => {
        res.status(200).json({
          message: `Product successfully deleted`,
        })
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = CustomerController;
