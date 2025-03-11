const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData) {
    return await this.userRepository.create(userData);
  }

  async getUserById(userId) {
    return await this.userRepository.findById(userId);
  }

  async updateUser(userId, userData) {
    return await this.userRepository.update(userId, userData);
  }

  async deleteUser(userId) {
    return await this.userRepository.delete(userId);
  }

  async registerUser(userData) {
    const { username, email, password } = userData;

    const existingUser = await this.userRepository.findByEmailOrUsername(email, username);
    if (existingUser) throw new Error('El usuario ya existe');

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.create({ username, email, password: hashedPassword });
  }

  async getUserProfile(userId) {
    const user = await this.userRepository.findById(userId, {
      attributes: ['username', 'email'],
    });
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }
}

module.exports = UserService;