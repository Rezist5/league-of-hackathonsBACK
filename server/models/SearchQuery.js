// models/SearchQuery.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SearchQuery = sequelize.define('SearchQuery', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  query: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

module.exports = SearchQuery;
