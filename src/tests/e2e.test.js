const request = require('supertest');
const app = require('../src/app');

describe('Pruebas End-to-End para el Juego de UNO', () => {
  let playerToken;
  let gameId;

  test('Registrar un nuevo jugador', async () => {
    const response = await request(app)
      .post('/api/players/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });

  test('Iniciar sesión de un jugador', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123',
      })
      .expect(200);

    expect(response.body).toHaveProperty('access_token');
    playerToken = response.body.access_token;
  });

  test('Crear un nuevo juego', async () => {
    const response = await request(app)
      .post('/api/games')
      .set('Authorization', `Bearer ${playerToken}`)
      .send({
        title: 'Nuevo Juego de UNO',
        maxPlayers: 4,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    gameId = response.body.id;
  });

  test('Unirse a un juego existente', async () => {
    const response = await request(app)
      .post('/api/games/join')
      .set('Authorization', `Bearer ${playerToken}`)
      .send({ gameId })
      .expect(200);

    expect(response.body.message).toBe('Usuario se unió al juego exitosamente');
  });

  test('Jugar una carta', async () => {
    const response = await request(app)
      .put('/api/cards/play')
      .set('Authorization', `Bearer ${playerToken}`)
      .send({
        player: 'testuser',
        cardPlayed: 'Red 5',
      })
      .expect(200);

    expect(response.body.message).toBe('Card played successfully.');
  });

  test('Finalizar un juego', async () => {
    const response = await request(app)
      .post('/api/games/end')
      .set('Authorization', `Bearer ${playerToken}`)
      .send({ gameId })
      .expect(200);

    expect(response.body.message).toBe('Juego finalizado exitosamente');
  });
});