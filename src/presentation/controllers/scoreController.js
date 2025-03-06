const scoreService = require('../../business/services/scoreService');

const createScore = async (req, res, next) => {
  try {
    const scoreData = req.body;
    const newScore = await scoreService.createScore(scoreData);
    res.status(201).json(newScore);
  } catch (error) {
    next(error);
  }
};

const getScoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const score = await scoreService.getScoreById(id);
    res.status(200).json(score);
  } catch (error) {
    next(error);
  }
};

const getAllScores = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.playerId) filters.playerId = req.query.playerId;
    if (req.query.gameId) filters.gameId = req.query.gameId;
    
    const scores = await scoreService.getAllScores(filters);
    res.status(200).json(scores);
  } catch (error) {
    next(error);
  }
};

const getScoresByPlayer = async (req, res, next) => {
  try {
    const { playerId } = req.params;
    const scores = await scoreService.getScoresByPlayer(playerId);
    res.status(200).json(scores);
  } catch (error) {
    next(error);
  }
};

const getScoresByGame = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const scores = await scoreService.getScoresByGame(gameId);
    res.status(200).json(scores);
  } catch (error) {
    next(error);
  }
};

const updateScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const scoreData = req.body;
    const updatedScore = await scoreService.updateScore(id, scoreData);
    res.status(200).json(updatedScore);
  } catch (error) {
    next(error);
  }
};

const deleteScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await scoreService.deleteScore(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
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