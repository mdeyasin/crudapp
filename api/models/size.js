'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
      // define association here
      Size.belongsToMany(Product,{through:"product_sizes", as:"products", foreignKey:"size_id"});
    }
  };
  Size.init({
    size_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Size',
    tableName: 'sizes',
  });
  return Size;
};