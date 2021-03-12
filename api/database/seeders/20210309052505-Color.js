'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('colors', [
      {
        color_name: 'black',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color_name: 'white',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color_name: 'red',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color_name: 'blue',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        color_name: 'green',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('colors', null, {});
  }
};
