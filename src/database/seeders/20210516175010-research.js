'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('researches', [
      {
        rsrch_id: '4f8341c9-c4ab-46c9-94b6-35a1e3b5d762',
        rsrch_name: 'grupo1',
        rsrch_description: 'description description description',
        rsrch_activities: 'um dois três quatro cinco',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('researches', {
      rsrch_id: ['4f8341c9-c4ab-46c9-94b6-35a1e3b5d762'],
    })
  }
};
