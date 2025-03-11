const ScoreService = require('../services/scoreService');
const scoreService = new ScoreService();

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
    const scoreId = req.params.id;
    const score = await scoreService.getScoreById(scoreId);
    if (!score) return res.status(404).json({ error: 'Score no encontrado' });
    res.status(200).json(score);
  } catch (error) {
    next(error);
  }
};

const updateScore = async (req, res, next) => {
  try {
    const scoreId = req.params.id;
    const scoreData = req.body;
    const updatedScore = await scoreService.updateScore(scoreId, scoreData);
    if (!updatedScore) return res.status(404).json({ error: 'Score no encontrado' });
    res.status(200).json(updatedScore);
  } catch (error) {
    next(error);
  }
};

const deleteScore = async (req, res, next) => {
  try {
    const scoreId = req.params.id;
    const deleted = await scoreService.deleteScore(scoreId);
    if (!deleted) return res.status(404).json({ error: 'Score no encontrado' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createScore,
  getScoreById,
  updateScore,
  deleteScore,
};