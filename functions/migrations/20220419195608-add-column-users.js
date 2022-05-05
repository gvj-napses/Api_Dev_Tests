'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'aadharId',
         {
           type : Sequelize.UUID,
           references : {
             model : 'aadharcarddetails',
             key : 'id'
           },
           onUpdate : 'CASCADE', // any change in parent, child will be updated accordingly
           onDelete : 'SET NULL' // any deletion in child table, parent sets null
        }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users','aadharId');
  }
};