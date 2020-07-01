'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Customer);
      Cart.belongsTo(models.Product);
    }
  };
  Cart.init({
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `Cart can't be empty`
        },
        min: {
          args: -1,
          msg: `Cart can't be below zero`
        }
      }
    },
    CustomerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};