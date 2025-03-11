const generateDeck = () => {
    const colors = ['Red', 'Blue', 'Green', 'Yellow'];
    const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Skip', 'Reverse', 'Draw Two'];
    const specialCards = ['Wild', 'Wild Draw Four'];
  
    const deck = [];
  
    colors.forEach((color) => {
      values.forEach((value) => {
        deck.push(`${color} ${value}`);
        if (value !== '0') {
          deck.push(`${color} ${value}`);
        }
      });
    });
  
    specialCards.forEach((card) => {
      for (let i = 0; i < 4; i++) {
        deck.push(card);
      }
    });
  
    return deck;
  };
  
  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };
  
  module.exports = { generateDeck, shuffleDeck };