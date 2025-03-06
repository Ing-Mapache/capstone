const scoreRepository = require('../../data/repositories/scoreRepository');
const playerRepository = require('../../data/repositories/playerRepository');
const gameRepository = require('../../data/repositories/gameRepository');

const createScore = async (scoreData) => {
  if (!scoreData.playerId || !scoreData.gameId || scoreData.score === undefined) {
    throw new Error('PlayerId, gameId y score son campos requeridos');
  }
  
  const player = await playerRepository.getPlayerById(scoreData.playerId);
  if (!player) {
    throw new Error('El jugador especificado no existe');
  }

  const game = await gameRepository.getGameById(scoreData.gameId);
  if (!game) {
    throw new Error('El juego especificado no existe');
  }
  
  return await scoreRepository.createScore(scoreData);
};

const getScoreById = async (id) => {
  const score = await scoreRepository.getScoreById(id);
  if (!score) {
    throw new Error('Score no encontrado');
  }
  return score;
};

const getAllScores = async (filters = {}) => {
  return await scoreRepository.getAllScores(filters);
};

const getScoresByPlayer = async (playerId) => {
  const player = await playerRepository.getPlayerById(playerId);
  if (!player) {
    throw new Error('El jugador especificado no existe');
  }
  
  return await scoreRepository.getScoresByPlayer(playerId);
};

const getScoresByGame = async (gameId) => {
  const game = await gameRepository.getGameById(gameId);
  if (!game) {
    throw new Error('El juego especificado no existe');
  }
  
  return await scoreRepository.getScoresByGame(gameId);
};

const updateScore = async (id, scoreData) => {
  const updatedScore = await scoreRepository.updateScore(id, scoreData);
  if (!updatedScore) {
    throw new Error('Score no encontrado');
  }
  return updatedScore;
};

const deleteScore = async (id) => {
  const deleted = await scoreRepository.deleteScore(id);
  if (!deleted) {
    throw new Error('Score no encontrado');
  }
  return { message: 'Score eliminado correctamente' };
};

module.exports = {
  createScore,
  getScoreById,
  getAllScores,
  getScoresByPlayer,
  getScoresByGame,
  updateScore,
  deleteScore
};