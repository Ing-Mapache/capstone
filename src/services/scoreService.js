// services/scoreService.js
const ScoreRepository = require('../repositories/ScoreRepository.js');

class ScoreService {
  constructor() {
    this.scoreRepository = new ScoreRepository();
  }

  async createScore(scoreData) {
    return await this.scoreRepository.create(scoreData);
  }

  async getScoreById(scoreId) {
    return await this.scoreRepository.findById(scoreId);
  }

  async updateScore(scoreId, scoreData) {
    return await this.scoreRepository.update(scoreId, scoreData);
  }

  async deleteScore(scoreId) {
    return await this.scoreRepository.delete(scoreId);
  }
}

module.exports = ScoreService;