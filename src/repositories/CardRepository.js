const Card = require('../models/cardModel');

class CardRepository {
  async create(cardData) {
    return await Card.create(cardData);
  }

  async findById(cardId) {
    return await Card.findByPk(cardId);
  }

  async update(cardId, cardData) {
    const [updated] = await Card.update(cardData, { where: { id: cardId } });
    if (updated) return await this.findById(cardId);
    return null;
  }

  async delete(cardId) {
    return await Card.destroy({ where: { id: cardId } });
  }
}

module.exports = CardRepository;