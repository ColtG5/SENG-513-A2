/* Course: SENG 513 */
/* Date: October 23rd, 2023 */
/* Assignment 2 */
/* Name: Colton Gowans */
/* UCID: 30143970 */

import { toggleGameOver } from "./game.js";
// import { countingRounds } from "../enemy/enemy-spawning.js";

// get the elements that we change to show the end screen
let endgameScreen = document.getElementById("endgame-screen");
let endgameText = document.getElementById("endgame-text");
let background = document.getElementById("background");

function endScreen() {
    // set game over to false so the game loop stops
    toggleGameOver();
    // show end screen and dont let player interact with game behind it
    background.style.pointerEvents = "none";
    endgameScreen.style.pointerEvents = "all";
    endgameScreen.style.opacity = "0.5";
    endgameText.style.display = "flex";
}

export { endScreen };
