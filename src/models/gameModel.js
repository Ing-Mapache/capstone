const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rules: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'waiting',
  },
  maxPlayers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  currentTurn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

Game.associate = (models) => {
  Game.hasMany(models.Card, { foreignKey: 'gameId' });
  Game.hasMany(models.Score, { foreignKey: 'gameId' });
  Game.belongsToMany(models.User, {
    through: models.PlayerGame,
    foreignKey: 'gameId',
  });
};

module.exports = Game;