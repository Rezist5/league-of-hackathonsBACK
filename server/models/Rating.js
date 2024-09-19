const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  hackathonId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Hackathons',
      key: 'id'
    }
  },
  teamId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Teams',
      key: 'id'
    }
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  placement: {
    type: DataTypes.STRING, 
    allowNull: false
  }
});

module.exports = Rating;
