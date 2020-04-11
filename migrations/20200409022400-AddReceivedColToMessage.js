'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('messages', 'received', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        }, { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

// npx sequelize migration:create --name AddReceivedColToMessage
// npx sequelize-cli db:migrate