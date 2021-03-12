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
    await queryInterface.bulkInsert('vendors', [{
      v_name: 'Lenevo',
      address:"dummy address 1",
      city:"Dummy",
      country:"Dummy",
      phone:"dummy",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      {
        v_name: 'Asus',
        address:"dummy address 2",
        city:"Dummy",
        country:"Dummy",
        phone:"dummy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        v_name: 'ArongFabrics',
        address:"dummy address 3",
        city:"Dummy",
        country:"Dummy",
        phone:"dummy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        v_name: 'LalFabrics',
        address:"dummy address 4",
        city:"Dummy",
        country:"Dummy",
        phone:"dummy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        v_name: 'ArongShoes',
        address:"dummy address 5",
        city:"Dummy",
        country:"Dummy",
        phone:"dummy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        v_name: 'LalShoes',
        address:"dummy address 6",
        city:"Dummy",
        country:"Dummy",
        phone:"dummy",
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
    await queryInterface.bulkDelete('vendors', null, {});
  }
};
