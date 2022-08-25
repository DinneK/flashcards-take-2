const Card = require("./Card");
const data = require("./data");
const Deck = require("./Deck");
const Round = require("./Round");
const prototypeQuestions = data.prototypeData;
const util = require("./util");

class Game {
  constructor() {
    this.currentRound;
    this.deck;
  }

  createCards() {
    let cards = prototypeQuestions.map((card) => {
      return new Card(card.id, card.question, card.answers, card.correctAnswer);
    });
    return cards;
  }

  createDeck() {
    this.deck = new Deck(this.createCards());
    return this.deck;
  }

  makeANewRound() {
    this.currentRound = new Round(this.createDeck());
    return this.currentRound;
  }

  start() {
    this.makeANewRound();
    this.printMessage(this.createDeck());
    this.printQuestion(this.makeANewRound());
  }

  printMessage(deck) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`);
  }

  printQuestion(round) {
    util.main(round);
  }
}

module.exports = Game;
