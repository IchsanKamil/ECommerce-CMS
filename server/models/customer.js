'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Product, {
        through: 'Cart'
      })
    }
  };
  Customer.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Name can't be empty`
        }
      }
    },
    address: {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Email can't be empty`
        },
        isEmail: {
          msg: `Enter a valid email address`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 20],
          msg: `Password must be between 4 & 20 characters`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Customer',
    hooks: {
      beforeCreate: customer => {
        customer.password = encrypt(customer.password);
      }
    }
  });
  return Customer;
};