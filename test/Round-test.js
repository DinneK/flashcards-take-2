const chai = require("chai");
const expect = chai.expect;

const Round = require("../src/Round");
const Deck = require("../src/Deck");
const Card = require("../src/Card");
const Turn = require("../src/Turn");

describe("Round", () => {
  let card1, card2, card3, deck, round;

  beforeEach(() => {
    card1 = new Card(
      1,
      "What is Robbie's favorite animal",
      ["sea otter", "pug", "capybara"],
      "sea otter"
    );
    card2 = new Card(
      14,
      "What organ is Khalid missing?",
      ["spleen", "appendix", "gallbladder"],
      "gallbladder"
    );
    card3 = new Card(
      12,
      "What is Travis's favorite stress reliever?",
      ["listening to music", "watching Netflix", "playing with bubble wrap"],
      "playing with bubble wrap"
    );

    deck = new Deck([card1, card2, card3]);

    round = new Round(deck);

    // guess1 = "pug";
    // guess2 = "sloth";

    // turn1 = new Turn(guess1, card1);
    // turn2 = new Turn(guess2, card2);
  });

  it("should be function", () => {
    expect(Round).to.be.a("function");
  });

  it("should be an instance of Round", () => {
    expect(round).to.be.an.instanceof(Round);
  });

  it("should be a deck of cards", () => {
    expect(round.deck).to.deep.equal([
      {
        cardID: 1,
        question: "What is Robbie's favorite animal",
        answers: ["sea otter", "pug", "capybara"],
        correctAnswer: "sea otter",
      },
      {
        cardID: 14,
        question: "What organ is Khalid missing?",
        answers: ["spleen", "appendix", "gallbladder"],
        correctAnswer: "gallbladder",
      },
      {
        cardID: 12,
        question: "What is Travis's favorite stress reliever?",
        answers: [
          "listening to music",
          "watching Netflix",
          "playing with bubble wrap",
        ],
        correctAnswer: "playing with bubble wrap",
      },
    ]);
  });

  it("should always return the first card", () => {
    expect(round.turns).to.equal(0);
  });

  it("should return the current card", () => {
    expect(round.returnCurrentCard()).to.deep.equal({
      cardID: 1,
      question: "What is Robbie's favorite animal",
      answers: ["sea otter", "pug", "capybara"],
      correctAnswer: "sea otter",
    });
  });

  it("should take turn and increment the turns", function () {
    round.takeTurn();
    round.takeTurn();
    round.takeTurn();

    expect(round.turns).to.equal(3);
  });

  it("should start with no incorrect guesses", () => {
    expect(round.incorrectGuesses).to.deep.equal([]);
  });

  it("should evaluate correct guess", function () {
    round.takeTurn("gallbladder");
    expect(round.takeTurn("gallbladder")).to.equal("Correct!");
  });

  it("should evaluate incorrect guess", function () {
    round.takeTurn("manatee");
    expect(round.takeTurn()).to.equal("Incorrect!");
  });

  it("should store incorrect guess", function () {
    round.takeTurn("guess");
    expect(round.incorrectGuesses.length).to.equal(1);

    round.takeTurn("gallbladder");
    expect(round.incorrectGuesses.length).to.equal(1);

    round.takeTurn("puppies!");
    expect(round.incorrectGuesses.length).to.equal(2);
  });

  it("should calculate the correct percentage", function () {
    round.takeTurn("sea otter");
    round.takeTurn("manatee");
    round.takeTurn("manatee");
    round.calculatePercentCorrect();

    expect(round.calculatePercentCorrect()).to.equal(33.33);
  });

  it("should end the round", function () {
    round.takeTurn("sea otter");
    round.takeTurn("manatee");
    round.takeTurn("manatee");
    round.calculatePercentCorrect();

    expect(round.endRound()).to.equal(
      `Round over! You answered %${33.33} correctly.`
    );
  });
});
