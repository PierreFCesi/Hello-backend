'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Educations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Educations.init({
    diploma_title: DataTypes.STRING,
    shortcuts: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Educations',
  });
  return Educations;
};