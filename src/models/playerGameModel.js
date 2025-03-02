const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const PlayerGame = sequelize.define('PlayerGame', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Game',
      key: 'id',
    },
  },
  isReady: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = PlayerGame;
