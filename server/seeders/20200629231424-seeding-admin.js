'use strict';

const { encrypt } = require('../helpers/bcrypt.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = [{
      email: 'user@example.com',
      password: encrypt('1234567'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert('Users', user)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
