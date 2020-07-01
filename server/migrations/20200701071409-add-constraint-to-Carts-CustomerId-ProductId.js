'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Carts', {
      fields: ['CustomerId'],
      type: 'foreign key',
      name: 'fkey_CustomerId',
      references: { //Required field
        table: 'Customers',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
      .then(() => {
        return queryInterface.addConstraint('Carts', {
          fields: ['ProductId'],
          type: 'foreign key',
          name: 'fkey_ProductId',
          references: { //Required field
            table: 'Products',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Carts', 'fkey_CustomerId')
      .then(() => {
        return queryInterface.removeConstraint('Carts', 'fkey_ProductId')
      })
  }
};
