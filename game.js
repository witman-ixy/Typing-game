// Variables
const startButton = document.getElementById('start-button');
const userInput = document.getElementById('user-input');
const wordDisplay = document.getElementById('word-display');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverDisplay = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');
const finalScoreDisplay = document.getElementById('final-score');

const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'orange', 'pear', 'pineapple', 'strawberry'];
let currentWord = '';
let score = 0;
let timer = 60;
let gameInterval;
let wordSpeed = 1;  // Speed of the word movement (1 = slow, 2 = medium, 3 = fast)
let currentWordElement;
let wordsArray = [];
let gameStarted = false;

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Start the game
function startGame() {
    // Reset everything
    score = 0;
    timer = 60;
    scoreDisplay.textContent = 'Score: 0';
    timerDisplay.textContent = 'Time: 60s';
    userInput.value = '';
    wordDisplay.textContent = '';
    gameOverDisplay.classList.add('hidden');
    
    // Prepare word array
    wordsArray = [];
    gameStarted = true;
    gameInterval = setInterval(gameLoop, 1000); // Update every second

    // Start word fall interval
    setInterval(moveWords, 20);  // Move words every 20ms
    setInterval(updateTimer, 1000); // Update timer every second

    // Start the first word
    currentWord = getRandomWord();
    createWordElement(currentWord); // Display first word
}

// Restart the game
function restartGame() {
    gameStarted = false;
    gameOverDisplay.classList.add('hidden');
    startGame();
}

// Game Loop - Called every second
function gameLoop() {
    if (!gameStarted) return;

    // Get user input
    const typedWord = userInput.value.trim();

    // Check if the typed word matches the current word
    if (typedWord === currentWord) {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        userInput.value = ''; // Clear input field
        currentWordElement.remove(); // Remove the word from the screen
        wordsArray.shift(); // Remove the word from the array
        currentWord = getRandomWord(); // Set new word
        createWordElement(currentWord); // Display new word
    }

    // Game over if timer reaches 0
    if (timer <= 0) {
        endGame();
    }
}

// Create and display new word on screen
function createWordElement(word) {
    currentWordElement = document.createElement('div');
    currentWordElement.classList.add('word');
    currentWordElement.textContent = word;
    wordDisplay.appendChild(currentWordElement);
    wordsArray.push(currentWordElement);
}

// Move words down the screen
function moveWords() {
    wordsArray.forEach(wordElement => {
        let top = parseInt(wordElement.style.top || '0');
        top += wordSpeed;
        wordElement.style.top = `${top}px`;

        if (top > 400) { // If word reaches the bottom of the container
            wordElement.remove(); // Remove it
            wordsArray.shift(); // Remove from words array
            endGame(); // End the game if word reaches bottom
        }
    });
}

// Update the timer
function updateTimer() {
    if (timer > 0) {
        timer--;
        timerDisplay.textContent = `Time: ${timer}s`;
    } else {
        endGame();
    }
}

// End game function
function endGame() {
    gameStarted = false;
    clearInterval(gameInterval);
    gameOverDisplay.classList.remove('hidden');
    finalScoreDisplay.textContent = score;
    userInput.disabled = true;
}

// Get a random word from the list
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}
