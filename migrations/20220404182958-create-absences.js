'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Absences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      receipt: {
        type: Sequelize.STRING
      },
      usr_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key:'id'
        }
      },
      att_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Attendances',
          key:'id'
        }
      },
      rea_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Reasons',
          key:'id'
        }
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
    await queryInterface.dropTable('Absences');
  }
};