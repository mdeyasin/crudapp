'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, Vendor, Size, Color}) {
      this.belongsTo(Category,{ foreignKey: "category_id", as:"category"});
      this.belongsTo(Vendor,{ foreignKey: "vendor_id", as:"vendor"});
      this.belongsToMany(Size,{through:"product_sizes", as:"sizes", foreignKey:"product_id"});
      this.belongsToMany(Color,{through:"product_colors", as:"colors", foreignKey:"product_id"});
    }

    toJSON() {
      return {...this.get(), id:undefined}
    }
  };

  Product.init({
    token:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    category_id:DataTypes.INTEGER,
    vendor_id:DataTypes.INTEGER,
    unit_cost:DataTypes.STRING,
    unit_price:DataTypes.STRING,
    avatar:DataTypes.STRING,
    hand_on_qty:DataTypes.INTEGER,
    description:DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Product',
    tableName:"products"
  });
  return Product;
};