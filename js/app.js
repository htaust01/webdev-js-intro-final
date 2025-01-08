"use strict";

// Get HTML elements
const guessInputElement = document.getElementById("guess-input");
const guessMessage = document.getElementById("guess-message");
const currentGuess = document.getElementById("current-guess");
const computerGuess = document.getElementById("computer-guess");
const guessHistory = document.getElementById("guess-history");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const introMessage = document.querySelector(".game-message"); // first element with this class name

// Create variables
let prevGuesses = []; // Array containing previous guesses
let number = Math.floor(Math.random() * 10) + 1; // random number to guess
console.log(number) // log number to console to help with testing

// makeGuess plays the next turn in the game
const makeGuess = () => {
  const guess = parseInt(guessInputElement.value);
  prevGuesses.push(guess);
  guessInputElement.value = "Enter Number"; // restore placeholder text

  // get conditions
  const gameWon = guess === number;
  const gameOver = gameWon || prevGuesses.length >= 3;
  const numIsHigher = number > guess;

  // create message for result
  let message;
  if(guess > 10 || guess < 1) {
    message = "Nope. Guess a number between 1 and 10";
    prevGuesses.pop();
  }
  else if(gameOver) message = gameWon ? "You WIN!!!" : "You LOSE :(";
  else message = "That is incorrect. Try " + (numIsHigher ? "higher" : "lower");

  // update elements
  guessMessage.innerText = message;
  currentGuess.innerText = prevGuesses.length === 0 ? "" : prevGuesses[prevGuesses.length - 1];
  guessHistory.innerText = prevGuesses.join(", ");
  computerGuess.innerText = gameOver ? number : "???"; // Only populate with number when gameOver
  introMessage.innerText = gameOver ? "Click Restart to play again!" :
                                      `Try to guess the computer's number within ${3 - prevGuesses.length} ${(prevGuesses.length === 2 ? "try" : "tries")}!`;

  if (gameOver) { // disable submit btn and enable restart btn
    submitBtn.disabled = true;
    restartBtn.disabled = false;
  }

};

const restartGame = () => {
  number = Math.floor(Math.random() * 10) + 1; // get new number
  console.log(number) // log number to console to help with testing
  prevGuesses = []; // clear previous guesses

  // enable submit and disable restart
  submitBtn.disabled = false;
  restartBtn.disabled = true;

  // restore elements to default values
  guessMessage.innerText = "";
  currentGuess.innerText = "";
  computerGuess.innerText = "";
  guessHistory.innerText = "";
  introMessage.innerText = "Try to guess the computer's number within 3 tries!"
};

submitBtn.addEventListener("click", makeGuess);
restartBtn.addEventListener("click", restartGame);
