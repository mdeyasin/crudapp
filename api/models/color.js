'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
      // define association here
      Color.belongsToMany(Product,{through:"product_colors", as:"products", foreignKey:"color_id"});
    }
  };
  Color.init({
    color_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Color',
    tableName: 'colors',
  });
  return Color;
};