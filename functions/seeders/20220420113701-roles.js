'use strict';
const { v4 : uuidv4 } = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('roles',[{id : uuidv4(),name : 'CEO',createdAt : new Date(),updatedAt: new Date()},
   {id : uuidv4(),name : 'COO',createdAt : new Date(),updatedAt: new Date()},
   {id : uuidv4(),name : 'Product Manager',createdAt : new Date(),updatedAt: new Date()}])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('roles', null, {})
  }
};
