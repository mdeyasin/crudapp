const uuidv4 = require('uuid').v4;
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

    await queryInterface.bulkInsert('products', [
      {
        name: 'G50',
        token:uuidv4(),
        category_id:1,
        vendor_id:1,
        avatar:"1615548330176_shoes55.jpg",
        unit_cost:"200.0",
        unit_price:"230.0",
        description:"This lenevo g50 laptop",
        hand_on_qty:14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'G577',
        token:uuidv4(),
        category_id:1,
        vendor_id:1,
        avatar:"1615548330176_shoes55.jpg",
        unit_cost:"220.0",
        unit_price:"250.0",
        description:"This lenevo G50 laptop",
        hand_on_qty:16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'g88',
        token:uuidv4(),
        category_id:1,
        vendor_id:2,
        avatar:"1615547906080_Ghtr50.jpg",
        unit_cost:"200.0",
        unit_price:"250.0",
        description:"This lenevo g50 laptop",
        hand_on_qty:5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'g45',
        token:uuidv4(),
        category_id:1,
        vendor_id:2,
        avatar:"1615548330176_shoes55.jpg",
        unit_cost:"220.0",
        unit_price:"240.0",
        description:"This lenevo g51 laptop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'g512',
        token:uuidv4(),
        category_id:1,
        vendor_id:2,
        avatar:"1615548330176_shoes55.jpg",
        unit_cost:"130.0",
        unit_price:"150.0",
        description:"This lenevo g512 laptop",
        hand_on_qty:15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'dressh10',
        token:uuidv4(),
        category_id:2,
        vendor_id:3,
        avatar:"1615548330176_shoes55.jpg",
        unit_cost:"200.0",
        unit_price:"230.0",
        description:"This dressh 10",
        hand_on_qty:20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'dressh12',
        token:uuidv4(),
        category_id:2,
        vendor_id:4,
        avatar:"1615548330176_shoes55.jpg",
        unit_cost:"200.0",
        unit_price:"240.0",
        description:"This dressh 10",
        hand_on_qty:50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'shoes55',
        token:uuidv4(),
        category_id:3,
        vendor_id:5,
        avatar:"1615548330176_shoes55.jpg",
        unit_cost:"220.0",
        unit_price:"230.0",
        description:"This shoes 10",
        hand_on_qty:7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'shoes99',
        token:uuidv4(),
        category_id:3,
        vendor_id:6,
        avatar:"1615548330176_shoes55.jpg",
        unit_cost:"320.0",
        unit_price:"330.0",
        description:"This shoes 10",
        hand_on_qty:5,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete('products', null, {});
  }
};
