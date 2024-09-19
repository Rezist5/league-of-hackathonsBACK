const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключение к вашему экземпляру Sequelize

const BlacklistedToken = sequelize.define('BlacklistedToken', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  // Вы можете добавить дополнительные поля, если это необходимо
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = BlacklistedToken;
