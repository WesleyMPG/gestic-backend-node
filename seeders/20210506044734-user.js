'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('users', [
      {
        user_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        prof_id: '285021ca-0510-45cb-ba3c-4f6ad019d0f1',
        user_name: 'coord1',
        user_email: 'coord1@ic.ufal.br',
        user_password: '$2b$10$7NoIELKFMijldCzQgfEQq./fMogwKLTHWSBVxNGtF0965kNMtRwem', // 1234
        user_status: true,
        change_psswd: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('offers', {
      user_id: ['f9584d5c-b11e-4148-8e12-e124782f9b9c']
    })
  }
};
