const chai = require("chai");
const expect = chai.expect;

const Game = require("../src/Game");

describe("Game", () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  it("should be a function", () => {
    expect(Game).to.be.a("function");
  });

  it("should be an instance of Game", () => {
    expect(game).to.be.an.instanceof(Game);
  });

  it("should create new cards", () => {
    expect(game.createCards()).to.have.lengthOf(30);
    expect(game.createCards()).to.be.an("array");
    expect(game.createCards().find((card) => card.cardID === 1)).to.deep.equal({
      cardID: 1,
      question:
        "What allows you to define a set of related information using key-value pairs?",
      answers: ["object", "array", "function"],
      correctAnswer: "object",
    });
  });

  it("should create a new deck", () => {
    expect(game.createDeck()).to.be.an("object");
    expect(game.createDeck()).to.deep.equal(game.deck);
    expect(
      game.createDeck().cards.find((card) => card.cardID === 3)
    ).to.deep.equal({
      cardID: 3,
      question:
        "What type of prototype method directly modifies the existing array?",
      answers: ["mutator method", "accessor method", "iteration method"],
      correctAnswer: "mutator method",
    });
  });

  it("should make a new game", () => {
    expect(game.makeANewRound()).to.be.an("object");
    expect(
      game.makeANewRound().deck.find((card) => card.cardID === 9)
    ).to.deep.equal({
      cardID: 9,
      question: "What does the callback function for find() return?",
      answers: ["boolean", "array", "object"],
      correctAnswer: "boolean",
    });
  });
});
