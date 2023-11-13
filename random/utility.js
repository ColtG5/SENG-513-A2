/* Course: SENG 513 */
/* Date: October 23rd, 2023 */
/* Assignment 2 */
/* Name: Colton Gowans */
/* UCID: 30143970 */

import { resetKeyStates } from "../character/character.js";

let gameContainer = document.getElementById("game-container");

// this doesnt work as intended (updating gameContainer for all other files), will fix later
setInterval(() => {
    gameContainer = document.getElementById("game-container");
    squareGameGridChecker();
}, 100);

// tells you when your game grid is not square! (by changing border color from brown to red)
function squareGameGridChecker() {
    if (gameContainer.offsetWidth !== gameContainer.offsetHeight) {
        gameContainer.style.outline = "5px solid #732600";
    } else {
        gameContainer.style.outline = "5px solid #3C2B00";
    }
}

// toggles the music on and off when button is clicked
document.getElementById("music-toggle-button").addEventListener("click", function () {
    toggleMusic();
});

// handles music toggling
function toggleMusic() {
    const audio = document.getElementById("background-music");
    audio.volume = 0.2;
    audio.currentTime = 2; // start 2 seconds in to the track
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    console.log("toggled music");
}

// deprectated but will keep around
let onWindow = true;
function getOnWindow() {
    return onWindow;
}

// check for if the player is on the window or not
window.onfocus = function (ev) {
    console.log("gained focus");
    onWindow = true;
};

window.onblur = function (ev) {
    onWindow = false;
    console.log("lost focus");
    resetKeyStates();
};

export { squareGameGridChecker, toggleMusic, onWindow, gameContainer };
