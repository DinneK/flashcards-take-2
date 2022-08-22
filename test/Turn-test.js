const chai = require("chai");
const expect = chai.expect;

const Turn = require("../src/Turn");
const Card = require("../src/Card");

describe("Turn", function () {
  let card1, card2, guess1, guess2, turn1, turn2;

  beforeEach(() => {
    card1 = new Card(
      1,
      "What is Robbie's favorite animal",
      ["sea otter", "pug", "capybara"],
      "sea otter"
    );
    card2 = new Card(
      2,
      "What is Dinne's favorite animal",
      ["shark", "lemur", "sloth"],
      "sloth"
    );

    guess1 = "pug";
    guess2 = "sloth";

    turn1 = new Turn(guess1, card1);
    turn2 = new Turn(guess2, card2);
  });

  it("should be a function", () => {
    expect(Turn).to.be.a("function");
  });

  it("should be an instance of Card", () => {
    expect(turn1).to.be.an.instanceof(Turn);
    expect(turn2).to.be.an.instanceof(Turn);
  });

  it("should return a guess", () => {
    expect(turn1.returnGuess()).to.be.equal("pug");
    expect(turn2.returnGuess()).to.be.equal("sloth");
  });

  it("should return a card", () => {
    expect(turn1.returnCard()).to.be.deep.equal({
      cardID: 1,
      question: "What is Robbie's favorite animal",
      answers: ["sea otter", "pug", "capybara"],
      correctAnswer: "sea otter",
    });

    expect(turn2.returnCard()).to.be.deep.equal({
      cardID: 2,
      question: "What is Dinne's favorite animal",
      answers: ["shark", "lemur", "sloth"],
      correctAnswer: "sloth",
    });
  });

  it("should evaluate if a guess is right or wrong", () => {
    expect(turn1.evaluateGuess()).to.be.equal(false);
    expect(turn2.evaluateGuess()).to.be.equal(true);
  });

  it("should give the player feedback about the guess", () => {
    expect(turn1.giveFeedback()).to.be.equal("Incorrect!");
    expect(turn2.giveFeedback()).to.be.equal("Correct!");
  });
});
