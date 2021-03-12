'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProductSize.init({
    product_id: DataTypes.INTEGER,
    size_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductSize',
    tableName: 'product_sizes'
  });
  ProductSize.removeAttribute("id");
  return ProductSize;
};