const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');

describe('CRUD Operations for Users', () => {
  let userId;

  // Crear un nuevo jugador
  test('Create a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
  });

  // Obtener información de un jugador existente
  test('Get user by ID', async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .expect(200);

    expect(response.body.username).toBe('testuser');
  });

  // Actualizar detalles de un jugador
  test('Update user details', async () => {
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({ username: 'updateduser' })
      .expect(200);

    expect(response.body.username).toBe('updateduser');
  });

  // Eliminar un jugador
  test('Delete user', async () => {
    await request(app)
      .delete(`/api/users/${userId}`)
      .expect(204);

    const user = await User.findByPk(userId);
    expect(user).toBeNull();
  });
});

describe('Get User Profile', () => {
    let token;
  
    beforeAll(async () => {
      // Obtener un token válido
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'newuser',
          password: 'password123',
        });
      token = response.body.access_token;
    });
  
    test('Get user profile', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', token)
        .expect(200);
  
      expect(response.body.username).toBe('newuser');
    });
  });