const CardService = require('../services/cardService');
const cardService = new CardService();

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
    const cardId = req.params.id;
    const card = await cardService.getCardById(cardId);
    if (!card) return res.status(404).json({ error: 'Tarjeta no encontrada' });
    res.status(200).json(card);
  } catch (error) {
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  try {
    const cardId = req.params.id;
    const cardData = req.body;
    const updatedCard = await cardService.updateCard(cardId, cardData);
    if (!updatedCard) return res.status(404).json({ error: 'Tarjeta no encontrada' });
    res.status(200).json(updatedCard);
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const cardId = req.params.id;
    const deleted = await cardService.deleteCard(cardId);
    if (!deleted) return res.status(404).json({ error: 'Tarjeta no encontrada' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const dealCardsToPlayers = async (req, res, next) => {
  try {
    const { players, cardsPerPlayer } = req.body;

    if (!players || !Array.isArray(players) || players.length === 0) {
      throw new Error('La lista de jugadores es inválida');
    }

    if (!cardsPerPlayer || typeof cardsPerPlayer !== 'number' || cardsPerPlayer <= 0) {
      throw new Error('El número de cartas por jugador es inválido');
    }

    const playerHands = await cardService.dealCards(players, cardsPerPlayer);

    res.status(200).json({
      message: 'Cards dealt successfully.',
      players: playerHands,
    });
  } catch (error) {
    next(error);
  }
};

const playCard = async (req, res, next) => {
  try {
    const { player, cardPlayed } = req.body;
  
    if (!player || !cardPlayed) {
      throw new Error('Datos de entrada inválidos');
    }
  
    const result = cardService.playCard(player, cardPlayed);
  
    res.status(200).json({
      message: 'Card played successfully.',
      nextPlayer: result.nextPlayer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const drawCardIfNoValidCard = async (req, res, next) => {
  try {
    const { player } = req.body;

    if (!player) {
      throw new Error('Datos de entrada inválidos');
    }

    const result = cardService.drawCardIfNoValidCard(player);

    res.status(200).json({
      message: `${player} drew a card from the deck.`,
      cardDrawn: result.cardDrawn,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const drawCard = async (req, res, next) => {
  try {
    const { player } = req.body;

    if (!player) {
      throw new Error('Datos de entrada inválidos');
    }

    const result = cardService.drawCardIfNoValidCard(player);

    res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const sayUno = async (req, res, next) => {
  try {
    const { player } = req.body;
  
    if (!player) {
      throw new Error('Datos de entrada inválidos');
    }
  
    const result = cardService.sayUno(player);
  
    res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const challengeUno = async (req, res, next) => {
  try {
    const { challenger, challengedPlayer } = req.body;

    if (!challenger || !challengedPlayer) {
      throw new Error('Datos de entrada inválidos');
    }

    const result = cardService.challengeUno(challenger, challengedPlayer);

    res.status(200).json({
      message: result.message,
      nextPlayer: result.nextPlayer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGameState = async (req, res, next) => {
  try {
    const gameState = cardService.getGameState();
    res.status(200).json(gameState);
  } catch (error) {
    next(error);
  }
};

const getPlayerHand = async (req, res, next) => {
  try {
    const { player } = req.query;

    if (!player) {
      throw new Error('Datos de entrada inválidos');
    }

    const playerHand = cardService.getPlayerHand(player);

    res.status(200).json(playerHand);
  } catch (error) {
    next(error);
  }
};

const getTurnHistory = async (req, res, next) => {
  try {
    const turnHistory = cardService.getTurnHistory();
    res.status(200).json(turnHistory);
  } catch (error) {
    next(error);
  }
};

const getCurrentScores = async (req, res, next) => {
  try {
    const scores = cardService.getCurrentScores();
    res.status(200).json(scores);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCard,
  getCardById,
  updateCard,
  deleteCard,
  dealCardsToPlayers,
  playCard,
  drawCard,
  sayUno,
  challengeUno,
  getGameState,
  getPlayerHand,
  getTurnHistory,
  getCurrentScores,
};