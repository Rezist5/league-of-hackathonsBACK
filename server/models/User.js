
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  role: {
    type: DataTypes.ENUM('admin', 'participant', 'mentor'),
    defaultValue: 'participant'
  },
  teamId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Teams',
      key: 'id'
    }
  }
});

module.exports = User;
