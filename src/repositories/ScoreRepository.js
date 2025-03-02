const Score = require('../models/scoreModel');

class ScoreRepository {
  async create(scoreData) {
    return await Score.create(scoreData);
  }

  async findById(scoreId) {
    return await Score.findByPk(scoreId);
  }

  async update(scoreId, scoreData) {
    const [updated] = await Score.update(scoreData, { where: { id: scoreId } });
    if (updated) return await this.findById(scoreId);
    return null;
  }

  async delete(scoreId) {
    return await Score.destroy({ where: { id: scoreId } });
  }
}

module.exports = ScoreRepository;