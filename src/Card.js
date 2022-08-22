class Card {
  constructor(cardID, question, answers, correctAnswer) {
    this.cardID = cardID;
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }
}

module.exports = Card;
