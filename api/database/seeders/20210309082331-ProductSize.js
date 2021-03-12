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
    await queryInterface.bulkInsert('product_sizes', [
      {
        product_id:1,
        size_id: 1,
      },
      {
        product_id:1,
        size_id: 2,
      },
      {
        product_id:1,
        size_id: 3,
      },
      {
        product_id:2,
        size_id: 1,
      },
      {
        product_id:2,
        size_id: 3,
      },
      {
        product_id:3,
        size_id: 4,
      },
      {
        product_id:3,
        size_id: 1,
      },
      {
        product_id:5,
        size_id: 1,
      },
      {
        product_id:5,
        size_id: 2,
      },
      {
        product_id:6,
        size_id: 1,
      },{
        product_id:6,
        size_id: 3,
      },{
        product_id:6,
        size_id: 4,
      },{
        product_id:7,
        size_id: 1,
      },{
        product_id:7,
        size_id: 2,
      },
      {
        product_id:7,
        size_id: 4,
      },
      {
        product_id:8,
        size_id: 2,
      },
      {
        product_id:8,
        size_id: 4,
      },{
        product_id:8,
        size_id: 5,
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
    await queryInterface.bulkDelete('product_sizes', null, {});
  }
};
