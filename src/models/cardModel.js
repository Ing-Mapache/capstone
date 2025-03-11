const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Games',
      key: 'id',
    },
  },
  isDiscarded: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Card.associate = (models) => {
  Card.belongsTo(models.Game, { foreignKey: 'gameId' });
};

module.exports = Card;