const request = require('supertest');
const { app, server, startServer } = require('../../../../src/app');
const playerRepository = require('../../../../src/data/repositories/playerRepository');

jest.mock('../../../../src/data/repositories/playerRepository');

describe('Player Routes', () => {
  beforeAll(async () => {
    // Inicia el servidor antes de todas las pruebas
    await startServer();
  });

  afterAll(async () => {
    // Cierra el servidor después de todas las pruebas
    await server.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/players', () => {
    it('debería crear un jugador y devolver 201', async () => {
      const playerData = { name: 'Alice', age: 25, email: 'alice@example.com' };
      playerRepository.createPlayer.mockResolvedValue({ id: 'uuid-player', ...playerData });

      const response = await request(app)
        .post('/api/players')
        .send(playerData)
        .expect(201);

      expect(response.body).toEqual({ id: 'uuid-player', ...playerData });
    });

    it('debería devolver 400 si los datos son inválidos', async () => {
      const playerData = { name: '', age: 25, email: 'invalid-email' };

      const response = await request(app)
        .post('/api/players')
        .send(playerData)
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/players/:id', () => {
    it('debería devolver un jugador si existe', async () => {
      const player = { id: 'uuid-player', name: 'Alice', age: 25, email: 'alice@example.com' };
      playerRepository.getPlayerById.mockResolvedValue(player);

      const response = await request(app)
        .get('/api/players/uuid-player')
        .expect(200);

      expect(response.body).toEqual(player);
    });

    it('debería devolver 404 si el jugador no existe', async () => {
      playerRepository.getPlayerById.mockResolvedValue(null);

      const response = await request(app)
        .get('/api/players/uuid-player')
        .expect(404);

      expect(response.body.error).toBeDefined();
    });
  });
});