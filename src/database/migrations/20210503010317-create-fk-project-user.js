'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('projects', 'proj_user', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'proj_user');
  }
};
