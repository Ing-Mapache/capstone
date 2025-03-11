const cardService = require('../../../../src/business/services/cardService');
const cardRepository = require('../../../../src/data/repositories/cardRepository');
const gameRepository = require('../../../../src/data/repositories/gameRepository');

jest.mock('../../../../src/data/repositories/cardRepository');
jest.mock('../../../../src/data/repositories/gameRepository');

describe('Card Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCard', () => {
    it('debería crear una carta si los datos son válidos', async () => {
      const cardData = { color: 'red', value: '5', gameId: 'uuid-game' };
      gameRepository.getGameById.mockResolvedValue({ id: 'uuid-game' });
      cardRepository.createCard.mockResolvedValue({ id: 'uuid-card', ...cardData });

      const result = await cardService.createCard(cardData);

      expect(gameRepository.getGameById).toHaveBeenCalledWith('uuid-game');
      expect(cardRepository.createCard).toHaveBeenCalledWith(cardData);
      expect(result).toEqual({ id: 'uuid-card', ...cardData });
    });

    it('debería lanzar un error si el juego no existe', async () => {
      const cardData = { color: 'red', value: '5', gameId: 'uuid-game' };
      gameRepository.getGameById.mockResolvedValue(null);

      await expect(cardService.createCard(cardData)).rejects.toThrow('El juego especificado no existe');
    });
  });

  describe('getCardById', () => {
    it('debería devolver una carta si existe', async () => {
      const card = { id: 'uuid-card', color: 'red', value: '5' };
      cardRepository.getCardById.mockResolvedValue(card);

      const result = await cardService.getCardById('uuid-card');

      expect(cardRepository.getCardById).toHaveBeenCalledWith('uuid-card');
      expect(result).toEqual(card);
    });

    it('debería lanzar un error si la carta no existe', async () => {
      cardRepository.getCardById.mockResolvedValue(null);

      await expect(cardService.getCardById('uuid-card')).rejects.toThrow('Carta no encontrada');
    });
  });
});