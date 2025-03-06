const cardService = require('../../business/services/cardService');

const createCard = async (req, res, next) => {
  try {
    const cardData = req.body;
    const newCard = await cardService.createCard(cardData);
    res.status(201).json(newCard);
  } catch (error) {
    next(error);
  }
};

const getCardById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await cardService.getCardById(id);
    res.status(200).json(card);
  } catch (error) {
    next(error);
  }
};

const getAllCards = async (req, res, next) => {
  try {
    const { gameId } = req.query;
    const cards = await cardService.getAllCards(gameId);
    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cardData = req.body;
    const updatedCard = await cardService.updateCard(id, cardData);
    res.status(200).json(updatedCard);
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await cardService.deleteCard(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const initializeDeck = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const cards = await cardService.initializeDeck(gameId);
    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCard,
  getCardById,
  getAllCards,
  updateCard,
  deleteCard,
  initializeDeck
};