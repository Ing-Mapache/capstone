const gameRepository = require('../../data/repositories/gameRepository');
const cardRepository = require('../../data/repositories/cardRepository');

const createGame = async (gameData) => {
  if (!gameData.title) {
    throw new Error('El título del juego es requerido');
  }
  
  const newGame = await gameRepository.createGame(gameData);
  
  await cardRepository.initializeDeck(newGame.id);
  
  return newGame;
};

const getGameById = async (id) => {
  const game = await gameRepository.getGameById(id);
  if (!game) {
    throw new Error('Juego no encontrado');
  }
  return game;
};

const getAllGames = async () => {
  return await gameRepository.getAllGames();
};

const updateGame = async (id, gameData) => {
  const updatedGame = await gameRepository.updateGame(id, gameData);
  if (!updatedGame) {
    throw new Error('Juego no encontrado');
  }
  return updatedGame;
};

const deleteGame = async (id) => {
  const deleted = await gameRepository.deleteGame(id);
  if (!deleted) {
    throw new Error('Juego no encontrado');
  }
  return { message: 'Juego eliminado correctamente' };
};

module.exports = {
  createGame,
  getGameById,
  getAllGames,
  updateGame,
  deleteGame
};