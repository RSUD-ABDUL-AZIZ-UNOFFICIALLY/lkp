'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('aprovements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nik: {
        type: Sequelize.BIGINT(16),
        primaryKey: true,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'nik',
        }
      },
      tglberkas: {
        type: Sequelize.DATEONLY
      },
      status_aprove: {
        type: Sequelize.ENUM('true', 'false'),
        allowNull: true,
        defaultValue: 'false',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('aprovements');
  }
};
