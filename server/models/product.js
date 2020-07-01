'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
      Product.belongsToMany(models.Customer, {
        through: 'Cart'
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Name can't be empty`
        },
        len: {
          args: [3],
          msg: `Name min 3 characters`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: `Invalid url format`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `Price can't be empty`
        },
        min: {
          args: -1,
          msg: `Price can't be below zero`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `Stock can't be empty`
        },
        min: {
          args: -1,
          msg: `Stock can't be below zero`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};