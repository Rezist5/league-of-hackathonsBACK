
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const User = require('./User');
const Team = require('./Team');
const Rating = require('./Rating');
const Hackathon = require('./Hackathon');
const Service = require('./Service');
const SearchQuery = require('./SearchQuery');
const BlacklistedToken = require('./BlacklistedToken');

User.belongsTo(Team, { foreignKey: 'teamId' });
Team.hasMany(User, { foreignKey: 'teamId' });

User.hasMany(Rating, { foreignKey: 'entityId', constraints: false, scope: { entityType: 'user' } });
Team.hasMany(Rating, { foreignKey: 'entityId', constraints: false, scope: { entityType: 'team' } });

SearchQuery.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Team,
  Rating,
  Hackathon,
  Service,
  SearchQuery,
  BlacklistedToken
};
