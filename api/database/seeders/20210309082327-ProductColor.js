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

    await queryInterface.bulkInsert('product_colors', [
      {
        product_id:1,
        color_id: 1,
      },
      {
        product_id:1,
        color_id: 2,
      },
      {
        product_id:1,
        color_id: 2,
      },
      {
        product_id:2,
        color_id: 1,
      },
      {
        product_id:2,
        color_id: 3,
      },
      {
        product_id:3,
        color_id: 4,
      },
      {
        product_id:3,
        color_id: 3,
      },
      {
        product_id:3,
        color_id: 1,
      },
      {
        product_id:4,
        color_id: 4,
      },
      {
        product_id:4,
        color_id: 5,
      },
      {
        product_id:4,
        color_id: 1,
      },
      {
        product_id:5,
        color_id: 4,
      },
      {
        product_id:5,
        color_id: 1,
      },
      {
        product_id:5,
        color_id: 3,
      },
      {
        product_id:6,
        color_id: 5,
      },
      {
        product_id:6,
        color_id: 4,
      },
      {
        product_id:6,
        color_id: 1,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('product_colors', null, {});
  }
};
