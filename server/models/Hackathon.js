const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Hackathon = sequelize.define('Hackathon', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scoring: {
    type: DataTypes.JSONB,  
    allowNull: false
  }
});

module.exports = Hackathon;


