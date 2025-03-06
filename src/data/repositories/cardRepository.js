const Card = require('../models/card');
const { v4: uuidv4 } = require('uuid');

const createCard = async (cardData) => {
  try {
    const newCard = await Card.create({
      ...cardData,
      id: uuidv4()
    });
    return newCard.toJSON();
  } catch (error) {
    throw new Error(`Error al crear carta: ${error.message}`);
  }
};

const getCardById = async (id) => {
  try {
    const card = await Card.findByPk(id);
    return card ? card.toJSON() : null;
  } catch (error) {
    throw new Error(`Error al obtener carta: ${error.message}`);
  }
};

const getAllCards = async (gameId = null) => {
  try {
    const query = gameId ? { where: { gameId } } : {};
    const cards = await Card.findAll(query);
    return cards.map(card => card.toJSON());
  } catch (error) {
    throw new Error(`Error al obtener cartas: ${error.message}`);
  }
};

const updateCard = async (id, cardData) => {
  try {
    const card = await Card.findByPk(id);
    if (!card) {
      return null;
    }
    
    await card.update(cardData);
    return card.toJSON();
  } catch (error) {
    throw new Error(`Error al actualizar carta: ${error.message}`);
  }
};

const deleteCard = async (id) => {
  try {
    const card = await Card.findByPk(id);
    if (!card) {
      return false;
    }
    
    await card.destroy();
    return true;
  } catch (error) {
    throw new Error(`Error al eliminar carta: ${error.message}`);
  }
};

const initializeDeck = async (gameId) => {
  try {
    const colors = ['red', 'green', 'blue', 'yellow'];
    const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Skip', 'Reverse', 'Draw Two'];
    const specialCards = [
      { color: 'black', value: 'Wild' },
      { color: 'black', value: 'Wild Draw Four' }
    ];
    
    const cardPromises = [];
    
    colors.forEach(color => {
      values.forEach(value => {
        const count = value === '0' ? 1 : 2;
        
        for (let i = 0; i < count; i++) {
          cardPromises.push(
            Card.create({
              id: uuidv4(),
              color,
              value,
              gameId
            })
          );
        }
      });
    });
    
    specialCards.forEach(({ color, value }) => {
      for (let i = 0; i < 4; i++) {
        cardPromises.push(
          Card.create({
            id: uuidv4(),
            color,
            value,
            gameId
          })
        );
      }
    });
    
    await Promise.all(cardPromises);
    
    const allCards = await Card.findAll({ 
      where: { gameId },
      raw: true
    });
    
    return allCards;
  } catch (error) {
    throw new Error(`Error al inicializar baraja: ${error.message}`);
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