'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
   options.tableName = 'SpotImages';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'images.png',
      preview: true
    },
    {
      spotId: 2,
      url: 'images.png',
      preview: false
    },
    {
      spotId: 3,
      url: 'images.png',
      preview: true
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {})
  }
};
