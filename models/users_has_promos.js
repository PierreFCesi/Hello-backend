'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_has_Promos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users_has_Promos.init({
    usr_id: DataTypes.INTEGER,
    prm_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users_has_Promos',
  });
  return Users_has_Promos;
};