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

    await queryInterface.bulkInsert('sizes', [{
      size_name: 'sm',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      {
        size_name: 'md',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        size_name: 'x',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        size_name: 'xl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        size_name: 'xxl',
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
    await queryInterface.bulkDelete('size', null, {});
  }
};
