'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Promos.init({
    code_ana: DataTypes.STRING,
    year: DataTypes.STRING,
    edu_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Promos',
  });
  return Promos;
};