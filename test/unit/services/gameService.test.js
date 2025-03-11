const gameService = require('../../../src/business/services/gameService');
const gameRepository = require('../../../src/data/repositories/gameRepository');
const cardRepository = require('../../../src/data/repositories/cardRepository');

jest.mock('../../../src/data/repositories/gameRepository');
jest.mock('../../../src/data/repositories/cardRepository');

describe('Game Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createGame', () => {
    it('debería crear un juego y inicializar la baraja', async () => {
      const gameData = { title: 'UNO', maxPlayers: 4 };
      gameRepository.createGame.mockResolvedValue({ id: 'uuid-game', ...gameData });
      cardRepository.initializeDeck.mockResolvedValue([]);

      const result = await gameService.createGame(gameData);

      expect(gameRepository.createGame).toHaveBeenCalledWith(gameData);
      expect(cardRepository.initializeDeck).toHaveBeenCalledWith('uuid-game');
      expect(result).toEqual({ id: 'uuid-game', ...gameData });
    });
  });

  describe('getGameById', () => {
    it('debería devolver un juego si existe', async () => {
      const game = { id: 'uuid-game', title: 'UNO' };
      gameRepository.getGameById.mockResolvedValue(game);

      const result = await gameService.getGameById('uuid-game');

      expect(gameRepository.getGameById).toHaveBeenCalledWith('uuid-game');
      expect(result).toEqual(game);
    });

    it('debería lanzar un error si el juego no existe', async () => {
      gameRepository.getGameById.mockResolvedValue(null);

      await expect(gameService.getGameById('uuid-game')).rejects.toThrow('Juego no encontrado');
    });
  });
});