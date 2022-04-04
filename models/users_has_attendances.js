'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_has_Attendances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users_has_Attendances.init({
    usr_id: DataTypes.INTEGER,
    att_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users_has_Attendances',
  });
  return Users_has_Attendances;
};