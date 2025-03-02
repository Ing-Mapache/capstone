const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Score = sequelize.define('Score', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Games',
      key: 'id',
    },
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Score.associate = (models) => {
  Score.belongsTo(models.User, { foreignKey: 'PlayerId' });
  Score.belongsTo(models.Game, { foreignKey: 'gameId' });
};

module.exports = Score;