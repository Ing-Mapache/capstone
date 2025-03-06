const Game = require('../models/game');
const { v4: uuidv4 } = require('uuid');

const createGame = async (gameData) => {
  try {
    const newGame = await Game.create({
      ...gameData,
      id: uuidv4()
    });
    return newGame.toJSON();
  } catch (error) {
    throw new Error(`Error al crear juego: ${error.message}`);
  }
};

const getGameById = async (id) => {
  try {
    const game = await Game.findByPk(id);
    return game ? game.toJSON() : null;
  } catch (error) {
    throw new Error(`Error al obtener juego: ${error.message}`);
  }
};

const getAllGames = async () => {
  try {
    const games = await Game.findAll();
    return games.map(game => game.toJSON());
  } catch (error) {
    throw new Error(`Error al obtener juegos: ${error.message}`);
  }
};

const updateGame = async (id, gameData) => {
  try {
    const game = await Game.findByPk(id);
    if (!game) {
      return null;
    }
    
    await game.update(gameData);
    return game.toJSON();
  } catch (error) {
    throw new Error(`Error al actualizar juego: ${error.message}`);
  }
};

const deleteGame = async (id) => {
  try {
    const game = await Game.findByPk(id);
    if (!game) {
      return false;
    }
    
    await game.destroy();
    return true;
  } catch (error) {
    throw new Error(`Error al eliminar juego: ${error.message}`);
  }
};

module.exports = {
  createGame,
  getGameById,
  getAllGames,
  updateGame,
  deleteGame
};