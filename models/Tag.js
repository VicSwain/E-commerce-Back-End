// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// import database connection from config.js
const sequelize = require('../config/connection.js');

// Initialize Tag model (table) by extending off Sequelize's Model class
class Tag extends Model {}

Tag.init(
  { // column definitions 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
