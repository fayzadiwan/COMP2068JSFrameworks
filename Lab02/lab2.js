// lab2.js
// Rock-Paper-Scissors Game using Node.js Console App

// Import the 'prompt' package to accept user input from the console
const prompt = require("prompt");

// Define the valid game choices that the user and computer can make
const choices = ["ROCK", "PAPER", "SCISSORS"];

// Initialize the prompt system to start receiving input
prompt.start();

// Print a welcome message and game instructions for the user
console.log("Welcome to Rock-Paper-Scissors!");
console.log("Please choose: ROCK, PAPER, or SCISSORS");

// Prompt the user for their choice
prompt.get(["userSelection"], function (err, result) {
  // Handle errors in receiving user input
  if (err) {
    console.error("Error receiving input");
    return;
  }

  // Convert user input to uppercase to make the input case-insensitive
  const userSelection = result.userSelection.toUpperCase();

  // Check if the input is valid (must be one of ROCK, PAPER, or SCISSORS)
  if (!choices.includes(userSelection)) {
    console.log("Invalid choice! Please run again and choose ROCK, PAPER, or SCISSORS.");
    return;
  }

  // Generate a random computer choice
  // Math.random() generates a number between 0 and 1
  // We divide the range into 3 equal parts for PAPER, SCISSORS, and ROCK
  const random = Math.random();
  let computerSelection = "";

  if (random <= 0.34) {
    computerSelection = "PAPER";
  } else if (random <= 0.67) {
    computerSelection = "SCISSORS";
  } else {
    computerSelection = "ROCK";
  }

  // Display both the user’s and computer’s selections
  console.log(`\nYou chose: ${userSelection}`);
  console.log(`Computer chose: ${computerSelection}\n`);

  // Determine the result of the game
  if (userSelection === computerSelection) {
    // Both chose the same → it’s a tie
    console.log("It's a tie!");
  } else if (
    // Winning conditions for the user
    (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (userSelection === "PAPER" && computerSelection === "ROCK") ||
    (userSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    console.log("User Wins!");
  } else {
    // If none of the above, then the computer wins
    console.log("Computer Wins!");
  }
});
