import { updateCharacterPosition } from "../character/character.js";
import { squareGameGridChecker } from "../utility.js";
import { collisionsToCheck } from "./collisions.js";
import { updateBullets, updateEnemies } from "./update-objects.js";
import { startWave } from "../enemy/enemy-spawning.js";

let gameOver = false;
function getGameOver() {
    return gameOver;
}

const gameTickInterval = 1000 / 60; // 30 game ticks per second

let previousTimestamp = 0;
let accumulatedTime = 0;

function updateGame(accumulatedTime, timestamp, gameTickInterval) {
    updateCharacterPosition();
    updateEnemies();
    updateBullets();

    startWave();

    // console.log(`${accumulatedTime} ${timestamp} ${gameTickInterval}`)
    // resetKeyStates();

    collisionsToCheck();
}

function renderGame() {
    squareGameGridChecker();
}

function toggleGameOver() {
    gameOver = !gameOver;
}

// The game loop code was taken fron ChatGPT

function gameLoop(timestamp) {
    if (gameOver) {
        return;
    }
    // Calculate the time elapsed since the last frame
    const deltaTime = timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    // Add the elapsed time to the accumulator
    accumulatedTime += deltaTime;

    // Update the game logic in fixed time steps
    while (accumulatedTime >= gameTickInterval) {
        updateGame(accumulatedTime, timestamp, gameTickInterval); // Your game logic goes here
        accumulatedTime -= gameTickInterval;
    }

    // console.log(`I'm here rn:   ${accumulatedTime} ${timestamp} ${gameTickInterval}`)

    // Render the game
    renderGame(); // Your rendering code goes here

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

export { getGameOver, toggleGameOver };
