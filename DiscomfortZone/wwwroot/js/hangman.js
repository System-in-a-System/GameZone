﻿// Define the set of countries
var countries = [
    "Liechtenstein",
    "Brazil",
    "Indonesia",
    "Argentina",
    "Morocco",
    "Germany",
    "Ecuador",
    "Austria",
    "Switzerland",
    "Ireland",
    "Somalia",
    "Thailand",
]

// Declare key variables
let answer = '';
let emojiLine = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

// Picks out a random word out of the countries wordlist and assigns it to "answer" variable
function randomWord() {
    answer = countries[Math.floor(Math.random() * countries.length)].toUpperCase();
}

// Generates emojis for giving a hint
function generateEmojis() {
    if (answer == "LIECHTENSTEIN") emojiLine = "👑🚲🔬";
    if (answer == "BRAZIL") emojiLine = "⚽☕🎊👙";
    if (answer == "INDONESIA") emojiLine = "🌋🌏👳";
    if (answer == "ARGENTINA") emojiLine = "💃⚽🍵";
    if (answer == "MOROCCO") emojiLine = "👑🍊🏄";
    if (answer == "GERMANY") emojiLine = "🏭🚘🍺";
    if (answer == "ECUADOR") emojiLine = "🍌☕🌋🐢";
    if (answer == "AUSTRIA") emojiLine = "⛷️⛰️🎵🇪🇺";
    if (answer == "SWITZERLAND") emojiLine = "🏦⌚🍫";
    if (answer == "IRELAND") emojiLine = "☘️🥔🍺";
    if (answer == "SOMALIA") emojiLine = "🔫🛥️🏴‍☠️🌍";
    if (answer == "THAILAND") emojiLine = "🍍🐘👙";

    document.getElementById("emojiContainer").textContent = emojiLine;
}


// Generate buttons and append them to the document
function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
      <button
        class="btn btn-lg btn-primary m-2 letter-button"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// Processes guessing letter by letter
function handleGuess(chosenLetter) {
    // If the chosen letter was enabled for pushing and was pushed, move it to guessed[] array
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    // Disable the pushed letter
    document.getElementById(chosenLetter).setAttribute('disabled', true);


    // Check the pushed letter for matching

    // If it is a match...
    if (answer.indexOf(chosenLetter) >= 0) {
        // Update guessed word status
        guessedWord();
        // Check if the word is fully guessed
        checkIfGameWon();

    // If it is not a match
    } else if (answer.indexOf(chosenLetter) === -1) {
        // Update mistakes count
        mistakes++;
        updateMistakes();
        // Check and update game status
        checkIfGameLost();
        updateHangmanPicture();
    }
}

// Updates hangman picture based on the number of failed guesses
function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './assets/hangman/man/' + mistakes + '.jpg';
}

// Checks is the word is fully guessed
function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'You saved the man!!!';
    }
}

// Checks if the number of failed guesses reached maximum possible numbwer (8)
function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'And so the man has been hanged...';
    }
}

// Updates word scheme according to the guessing progress
function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

// Updates displayed mistakes counter 
function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

// Resets the game
function reset() {
    // Restart key variables
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './assets/hangman/man/0.jpg';

    // Generate key game composites
    randomWord();
    generateEmojis();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

// Generate key game composites
randomWord();
generateEmojis();
generateButtons();
guessedWord();