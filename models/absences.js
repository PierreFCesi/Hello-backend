'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Absences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Absences.init({
    comment: DataTypes.TEXT,
    receipt: DataTypes.STRING,
    usr_id: DataTypes.INTEGER,
    att_id: DataTypes.INTEGER,
    rea_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Absences',
  });
  return Absences;
};