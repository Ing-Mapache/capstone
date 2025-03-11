const User = require('../models/userModel');

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findById(userId) {
    return await User.findByPk(userId);
  }

  async update(userId, userData) {
    const [updated] = await User.update(userData, { where: { id: userId } });
    if (updated) return await this.findById(userId);
    return null;
  }

  async delete(userId) {
    return await User.destroy({ where: { id: userId } });
  }

  async findByEmailOrUsername(email, username) {
    return await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });
  }
}

module.exports = UserRepository;