import { updateCharacterPosition, updateBullets } from '../character/character.js';
import { squareGameGridChecker } from '../utility.js'

const gameTickInterval = 1000 / 30; // 30 game ticks per second

let previousTimestamp = 0;
let accumulatedTime = 0;

function updateGame() {
    updateCharacterPosition();

    // resetKeyStates();
}

function renderGame() {
    updateBullets();
    squareGameGridChecker();
}


// The game loop code was taken fron ChatGPT 

function gameLoop(timestamp) {
    // Calculate the time elapsed since the last frame
    const deltaTime = timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    // Add the elapsed time to the accumulator
    accumulatedTime += deltaTime;

    // Update the game logic in fixed time steps
    while (accumulatedTime >= gameTickInterval) {
        updateGame(); // Your game logic goes here
        accumulatedTime -= gameTickInterval;
    }

    // Render the game
    renderGame(); // Your rendering code goes here

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
