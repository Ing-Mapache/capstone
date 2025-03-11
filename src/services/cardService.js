// services/CardService.js
const CardRepository = require('../repositories/CardRepository');
const { generateDeck, shuffleDeck } = require('../utils/deckUtils');

class CardService {
  constructor() {
    this.cardRepository = new CardRepository();
    this.discardPile = [];
    this.deck = [];
    this.playerHands = {};
    this.unoStatus = {};
    this.currentPlayerIndex = 0;
    this.players = [];
    this.gameOver = false;
    this.turnHistory = [];
  }

  async createCard(cardData) {
    return await this.cardRepository.create(cardData);
  }

  async getCardById(cardId) {
    return await this.cardRepository.findById(cardId);
  }

  async updateCard(cardId, cardData) {
    return await this.cardRepository.update(cardId, cardData);
  }

  async deleteCard(cardId) {
    return await this.cardRepository.delete(cardId);
  }

  async dealCards(players, cardsPerPlayer) {
    const deck = shuffleDeck(generateDeck());
    const playerHands = {};

    players.forEach((player) => {
      playerHands[player] = [];
    });

    const distribute = (remainingCards) => {
      if (remainingCards === 0) return;

      players.forEach((player) => {
        if (playerHands[player].length < cardsPerPlayer) {
          playerHands[player].push(deck.pop());
        }
      });

      distribute(remainingCards - 1);
    };

    distribute(players.length * cardsPerPlayer);
    return playerHands;
  }

  playCard(player, cardPlayed) {
    const topCard = this.discardPile[this.discardPile.length - 1];

    if (
      !this.isValidCard(cardPlayed, topCard) ||
      !this.hasCard(player, cardPlayed)
    ) {
      throw new Error('Invalid card. Please play a card that matches the top card on the discard pile.');
    }

    this.discardPile.push(cardPlayed);

    this.playerHands[player] = this.playerHands[player].filter(
      (card) => card !== cardPlayed
    );

    this.endTurn();

    return { message: `${player} played ${cardPlayed}. Turn ended.` };
  }

  drawCardIfNoValidCard(player) {
    const topCard = this.discardPile[this.discardPile.length - 1];

    const hasValidCard = this.playerHands[player].some((card) =>
      this.isValidCard(card, topCard)
    );

    if (hasValidCard) {
      throw new Error('You have a valid card to play. You cannot draw a card.');
    }

    if (this.deck.length === 0) {
      throw new Error('No cards left in the deck.');
    }

    const cardDrawn = this.deck.pop();
    this.playerHands[player].push(cardDrawn);

    this.endTurn();

    return { message: `${player} drew a card from the deck. Turn ended.` };
  }

  isValidCard(cardPlayed, topCard) {
    const [playedColor, playedValue] = cardPlayed.split(' ');
    const [topColor, topValue] = topCard.split(' ');

    return playedColor === topColor || playedValue === topValue || playedColor === 'Wild';
  }

  hasCard(player, cardPlayed) {
    return this.playerHands[player].includes(cardPlayed);
  }

  endTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  sayUno(player) {
    if (this.playerHands[player].length !== 1) {
      throw new Error('You can only say UNO when you have exactly one card left.');
    }

    if (this.unoStatus[player]) {
      throw new Error('You have already said UNO.');
    }

    this.unoStatus[player] = true;

    return { message: `${player} said UNO successfully.` };
  }

  challengeUno(challenger, challengedPlayer) {
    const players = Object.keys(this.playerHands);

    if (this.playerHands[challengedPlayer].length !== 1) {
      throw new Error('Challenge failed. The challenged player does not have exactly one card.');
    }

    if (this.unoStatus[challengedPlayer]) {
      throw new Error('Challenge failed. The challenged player said UNO on time.');
    }

    for (let i = 0; i < 2; i++) {
      if (this.deck.length === 0) {
        throw new Error('No cards left in the deck.');
      }
      const cardDrawn = this.deck.pop();
      this.playerHands[challengedPlayer].push(cardDrawn);
    }

    const challengerIndex = players.indexOf(challenger);
    const nextPlayerIndex = (challengerIndex + 1) % players.length;
    const nextPlayer = players[nextPlayerIndex];

    return {
      message: `Challenge successful. ${challengedPlayer} forgot to say UNO and draws 2 cards.`,
      nextPlayer,
    };
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  checkForWinner() {
    for (const player of this.players) {
      if (this.playerHands[player].length === 0) {
        return player;
      }
    }
    return null;
  }

  calculateScores() {
    const scores = {};

    this.players.forEach((player) => {
      scores[player] = this.playerHands[player].reduce((total, card) => {
        const value = this.getCardValue(card);
        return total + value;
      }, 0);
    });

    return scores;
  }

  getCardValue(card) {
    const [color, value] = card.split(' ');

    if (value === 'Skip' || value === 'Reverse' || value === 'Draw Two') {
      return 20;
    } else if (value === 'Wild' || value === 'Wild Draw Four') {
      return 50;
    } else {
      return parseInt(value, 10) || 0;
    }
  }

  getGameState() {
    return {
      currentPlayer: this.getCurrentPlayer(),
      topCard: this.discardPile[this.discardPile.length - 1],
      hands: this.playerHands,
      turnHistory: this.turnHistory,
    };
  }

  getPlayerHand(player) {
    if (!this.playerHands[player]) {
      throw new Error('Player not found.');
    }

    return {
      player,
      hand: this.playerHands[player],
    };
  }

  getTurnHistory() {
    return {
      history: this.turnHistory,
    };
  }

  getCurrentScores() {
    return {
      scores: this.calculateScores(),
    };
  }

  addPlayer(playerName) {
    if (this.players.includes(playerName)) {
      throw new Error('El jugador ya está en el juego.');
    }

    this.players.push(playerName);
    this.playerHands[playerName] = [];
    this.unoStatus[playerName] = false;
  }
}

module.exports = CardService;