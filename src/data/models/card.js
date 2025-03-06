const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Game = require('./game');

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  color: {
    type: DataTypes.ENUM('red', 'green', 'blue', 'yellow', 'black'),
    allowNull: false
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'cards',
  timestamps: true,
  updatedAt: false
});

Card.belongsTo(Game, {
  foreignKey: {
    name: 'gameId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

module.exports = Card;