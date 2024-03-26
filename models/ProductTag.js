// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// import database connection from config.js
const sequelize = require('../config/connection');

// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

ProductTag.init(
  { // column definitions 
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
