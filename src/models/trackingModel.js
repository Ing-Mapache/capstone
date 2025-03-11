const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Tracking = sequelize.define('Tracking', {
  endpointAccess: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statusCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  responseTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Tracking;