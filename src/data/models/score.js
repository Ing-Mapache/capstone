const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Player = require('./player');
const Game = require('./game');

const Score = sequelize.define('Score', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'scores',
  timestamps: true,
  updatedAt: false
});

Score.belongsTo(Player, {
  foreignKey: {
    name: 'playerId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

Score.belongsTo(Game, {
  foreignKey: {
    name: 'gameId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

module.exports = Score;