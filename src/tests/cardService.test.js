const CardService = require('../services/CardService');
const cardService = new CardService();

describe('Card Service', () => {
  test('dealCards should distribute cards correctly', () => {
    const players = ['Player1', 'Player2'];
    const cardsPerPlayer = 5;

    const playerHands = cardService.dealCards(players, cardsPerPlayer);

    expect(Object.keys(playerHands)).toHaveLength(2);
    expect(playerHands['Player1']).toHaveLength(5);
    expect(playerHands['Player2']).toHaveLength(5);
  });

  test('should throw an error if players list is invalid', () => {
    const players = [];
    const cardsPerPlayer = 5;

    expect(() => cardService.dealCards(players, cardsPerPlayer)).toThrow('La lista de jugadores es inválida');
  });

  test('should throw an error if cardsPerPlayer is invalid', () => {
    const players = ['Player1', 'Player2'];
    const cardsPerPlayer = -1;

    expect(() => cardService.dealCards(players, cardsPerPlayer)).toThrow('El número de cartas por jugador es inválido');
  });
});

describe('CardService - playCard', () => {
  beforeEach(() => {
    cardService.dealCards(['Player1', 'Player2'], 5);
    cardService.discardPile = ['Red 5'];
  });

  test('should allow playing a valid card', () => {
    const topCard = cardService.discardPile[cardService.discardPile.length - 1];
    const [topColor] = topCard.split(' ');

    const result = cardService.playCard('Player1', `${topColor} 7`);
    expect(result.nextPlayer).toBe('Player2');
  });

  test('should throw an error for an invalid card', () => {
    expect(() => cardService.playCard('Player1', 'Red 8')).toThrow(
      'Invalid card. Please play a card that matches the top card on the discard pile.'
    );
  });
});

describe('CardService - drawCardIfNoValidCard', () => {
  beforeEach(() => {
    cardService.dealCards(['Player1', 'Player2'], 5);
    cardService.discardPile = ['Red 5'];
  });

  test('should allow drawing a card if no valid card is available', () => {
    cardService.playerHands['Player1'] = ['Red 8', 'Blue 9'];

    const result = cardService.drawCardIfNoValidCard('Player1');
    expect(result.cardDrawn).toBeDefined();
  });

  test('should throw an error if the player has a valid card', () => {
    const topCard = cardService.discardPile[cardService.discardPile.length - 1];
    const [topColor] = topCard.split(' ');
    cardService.playerHands['Player1'].push(`${topColor} 7`);

    expect(() => cardService.drawCardIfNoValidCard('Player1')).toThrow(
      'You have a valid card to play. You cannot draw a card.'
    );
  });
});

describe('CardService - sayUno', () => {
  beforeEach(() => {
    cardService.dealCards(['Player1', 'Player2'], 5);
    cardService.unoStatus = {};
  });

  test('should allow saying UNO when the player has one card left', () => {
    cardService.playerHands['Player1'] = ['Red 7'];

    const result = cardService.sayUno('Player1');
    expect(result.message).toBe('Player1 said UNO successfully.');
  });

  test('should throw an error if the player does not have exactly one card', () => {
    cardService.playerHands['Player1'] = ['Red 7', 'Blue 8'];

    expect(() => cardService.sayUno('Player1')).toThrow(
      'You can only say UNO when you have exactly one card left.'
    );
  });

  test('should throw an error if the player has already said UNO', () => {
    cardService.playerHands['Player1'] = ['Red 7'];
    cardService.unoStatus['Player1'] = true;

    expect(() => cardService.sayUno('Player1')).toThrow(
      'You have already said UNO.'
    );
  });
});

describe('CardService - challengeUno', () => {
  beforeEach(() => {
    cardService.dealCards(['Player1', 'Player2', 'Player3'], 5);
    cardService.unoStatus = {};
  });

  test('should allow a successful challenge if the challenged player forgot to say UNO', () => {
    cardService.playerHands['Player1'] = ['Red 7'];
    cardService.unoStatus['Player1'] = false;

    const result = cardService.challengeUno('Player2', 'Player1');
    expect(result.message).toBe('Challenge successful. Player1 forgot to say UNO and draws 2 cards.');
    expect(result.nextPlayer).toBe('Player3');
    expect(cardService.playerHands['Player1'].length).toBe(3);
  });

  test('should throw an error if the challenged player said UNO on time', () => {
    cardService.playerHands['Player1'] = ['Red 7'];
    cardService.unoStatus['Player1'] = true;

    expect(() => cardService.challengeUno('Player2', 'Player1')).toThrow(
      'Challenge failed. The challenged player said UNO on time.'
    );
  });

  test('should throw an error if the challenged player does not have exactly one card', () => {
    cardService.playerHands['Player1'] = ['Red 7', 'Blue 8'];

    expect(() => cardService.challengeUno('Player2', 'Player1')).toThrow(
      'Challenge failed. The challenged player does not have exactly one card.'
    );
  });
});

describe('CardService - playCard and drawCard', () => {
  beforeEach(() => {
    cardService.dealCards(['Player1', 'Player2'], 5);
    cardService.discardPile = ['Red 5'];
  });

  test('should end the turn after playing a card', () => {
    const player = 'Player1';
    const card = 'Blue 5';

    const result = cardService.playCard(player, card);
    expect(result.message).toBe('Player1 played Blue 5. Turn ended.');
    expect(cardService.getCurrentPlayer()).toBe('Player2');
  });

  test('should end the turn after drawing a card', () => {
    const player = 'Player1';

    const result = cardService.drawCardIfNoValidCard(player);
    expect(result.message).toBe('Player1 drew a card from the deck. Turn ended.');
    expect(cardService.getCurrentPlayer()).toBe('Player2');
  });
});

describe('CardService - checkForWinner', () => {
  beforeEach(() => {
    cardService.dealCards(['Player1', 'Player2'], 5);
  });

  test('should detect a winner when a player has no cards left', () => {
    cardService.playerHands['Player1'] = [];

    const winner = cardService.checkForWinner();
    expect(winner).toBe('Player1');
  });

  test('should return null if no player has won yet', () => {
    const winner = cardService.checkForWinner();
    expect(winner).toBeNull();
  });

  test('should calculate scores correctly', () => {
    cardService.playerHands['Player1'] = ['Red 5', 'Blue Skip'];
    cardService.playerHands['Player2'] = ['Wild Draw Four', 'Green 7'];

    const scores = cardService.calculateScores();
    expect(scores['Player1']).toBe(25);
    expect(scores['Player2']).toBe(57);
  });
});

describe('CardService - getGameState', () => {
  beforeEach(() => {
    cardService.dealCards(['Player1', 'Player2'], 5);
    cardService.discardPile = ['Red 5'];
  });

  test('should return the current game state', () => {
    const gameState = cardService.getGameState();

    expect(gameState.currentPlayer).toBeDefined();
    expect(gameState.topCard).toBeDefined();
    expect(gameState.hands).toBeDefined();
    expect(gameState.turnHistory).toBeDefined();
  });
});

describe('CardService - getPlayerHand', () => {
  beforeEach(() => {
    cardService.dealCards(['Player1', 'Player2'], 5);
  });

  test('should return the hand of a specific player', () => {
    const player = 'Player1';
    const playerHand = cardService.getPlayerHand(player);

    expect(playerHand.player).toBe(player);
    expect(playerHand.hand).toBeDefined();
  });

  test('should throw an error if the player does not exist', () => {
    const player = 'NonExistentPlayer';

    expect(() => cardService.getPlayerHand(player)).toThrow('Player not found.');
  });
});

describe('CardService - getTurnHistory', () => {
  beforeEach(() => {
    cardService.dealCards(['Player1', 'Player2'], 5);
    cardService.discardPile = ['Red 5'];
  });

  test('should return the turn history', () => {
    cardService.playCard('Player1', 'Red 3');
    cardService.drawCardIfNoValidCard('Player2');

    const turnHistory = cardService.getTurnHistory();
    expect(turnHistory.history).toHaveLength(2);
    expect(turnHistory.history[0].player).toBe('Player1');
    expect(turnHistory.history[0].action).toBe('Played Red 3');
    expect(turnHistory.history[1].player).toBe('Player2');
    expect(turnHistory.history[1].action).toBe('Drew a card');
  });
});

describe('CardService - getCurrentScores', () => {
  beforeEach(() => {
    cardService.dealCards(['Player1', 'Player2'], 5);
  });

  test('should return the current scores of all players', () => {
    cardService.playerHands['Player1'] = ['Red 5', 'Blue Skip'];
    cardService.playerHands['Player2'] = ['Wild Draw Four'];

    const scores = cardService.getCurrentScores();
    expect(scores.scores['Player1']).toBe(25);
    expect(scores.scores['Player2']).toBe(50);
  });
});

describe('CardService - addPlayer', () => {
  test('should add a new player to the game', () => {
    cardService.addPlayer('Player1');
    expect(cardService.players).toContain('Player1');
    expect(cardService.playerHands['Player1']).toBeDefined();
  });

  test('should throw an error if the player already exists', () => {
    cardService.addPlayer('Player1');
    expect(() => cardService.addPlayer('Player1')).toThrow('El jugador ya está en el juego.');
  });
});