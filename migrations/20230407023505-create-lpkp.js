'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lpkps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nik: {
        type: Sequelize.BIGINT(16),
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'nik',
        }
      },
      rak: {
        type: Sequelize.STRING(512)
      },
      tgl: {
        type: Sequelize.DATEONLY
      },
      volume: {
        type: Sequelize.INTEGER
      },
      satuan: {
        type: Sequelize.ENUM,
        values: ['Kegiatan','Dokumen', 'Laporan', '-']
      },
      waktu: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lpkps');
  }
};