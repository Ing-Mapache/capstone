const cardRepository = require('../../data/repositories/cardRepository');
const gameRepository = require('../../data/repositories/gameRepository');

const createCard = async (cardData) => {
  if (!cardData.color || !cardData.value || !cardData.gameId) {
    throw new Error('Color, valor y gameId son campos requeridos');
  }
  
  const game = await gameRepository.getGameById(cardData.gameId);
  if (!game) {
    throw new Error('El juego especificado no existe');
  }
  
  return await cardRepository.createCard(cardData);
};

const getCardById = async (id) => {
  const card = await cardRepository.getCardById(id);
  if (!card) {
    throw new Error('Carta no encontrada');
  }
  return card;
};

const getAllCards = async (gameId = null) => {
  return await cardRepository.getAllCards(gameId);
};

const updateCard = async (id, cardData) => {
  const updatedCard = await cardRepository.updateCard(id, cardData);
  if (!updatedCard) {
    throw new Error('Carta no encontrada');
  }
  return updatedCard;
};

const deleteCard = async (id) => {
  const deleted = await cardRepository.deleteCard(id);
  if (!deleted) {
    throw new Error('Carta no encontrada');
  }
  return { message: 'Carta eliminada correctamente' };
};

const initializeDeck = async (gameId) => {
  const game = await gameRepository.getGameById(gameId);
  if (!game) {
    throw new Error('El juego especificado no existe');
  }
  
  return await cardRepository.initializeDeck(gameId);
};

module.exports = {
  createCard,
  getCardById,
  getAllCards,
  updateCard,
  deleteCard,
  initializeDeck
};