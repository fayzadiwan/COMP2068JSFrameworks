// lab2.js

const prompt = require("prompt");

const choices = ["ROCK", "PAPER", "SCISSORS"];

prompt.start();

console.log("Welcome to Rock-Paper-Scissors!");
console.log("Please choose: ROCK, PAPER, or SCISSORS");

prompt.get(["userSelection"], function (err, result) {
   if (err) {
    console.error("Error receiving input");
    return;
  }
const userSelection = result.userSelection.toUpperCase();

 if (!choices.includes(userSelection)) {
  console.log("Invalid choice! Please run again and choose ROCK, PAPER, or SCISSORS.");
  return;
  }

});