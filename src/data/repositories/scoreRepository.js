const Score = require('../models/score');
const { v4: uuidv4 } = require('uuid');

const createScore = async (scoreData) => {
  try {
    const newScore = await Score.create({
      ...scoreData,
      id: uuidv4()
    });
    return newScore.toJSON();
  } catch (error) {
    throw new Error(`Error al crear score: ${error.message}`);
  }
};

const getScoreById = async (id) => {
  try {
    const score = await Score.findByPk(id);
    return score ? score.toJSON() : null;
  } catch (error) {
    throw new Error(`Error al obtener score: ${error.message}`);
  }
};

const getAllScores = async (filters = {}) => {
  try {
    const query = Object.keys(filters).length > 0 ? { where: filters } : {};
    const scores = await Score.findAll(query);
    return scores.map(score => score.toJSON());
  } catch (error) {
    throw new Error(`Error al obtener scores: ${error.message}`);
  }
};

const getScoresByPlayer = async (playerId) => {
  try {
    const scores = await Score.findAll({
      where: { playerId }
    });
    return scores.map(score => score.toJSON());
  } catch (error) {
    throw new Error(`Error al obtener scores del jugador: ${error.message}`);
  }
};

const getScoresByGame = async (gameId) => {
  try {
    const scores = await Score.findAll({
      where: { gameId }
    });
    return scores.map(score => score.toJSON());
  } catch (error) {
    throw new Error(`Error al obtener scores del juego: ${error.message}`);
  }
};

const updateScore = async (id, scoreData) => {
  try {
    const score = await Score.findByPk(id);
    if (!score) {
      return null;
    }
    
    await score.update(scoreData);
    return score.toJSON();
  } catch (error) {
    throw new Error(`Error al actualizar score: ${error.message}`);
  }
};

const deleteScore = async (id) => {
  try {
    const score = await Score.findByPk(id);
    if (!score) {
      return false;
    }
    
    await score.destroy();
    return true;
  } catch (error) {
    throw new Error(`Error al eliminar score: ${error.message}`);
  }
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