import { toggleGameOver } from "./game.js";
import { countingRounds } from "../enemy/enemy-spawning.js"

let endgameScreen = document.getElementById("endgame-screen");
let endgameText = document.getElementById("endgame-text");
let background = document.getElementById("background");
let gameContainer = document.getElementById("game-container");

function endScreen() {
    toggleGameOver();
    // endgameScreen.style.display = "flex";
    // background.style.opacity = "0.5";
    background.style.pointerEvents = "none";
    endgameScreen.style.pointerEvents = "all";
    endgameScreen.style.opacity = "0.5";
    endgameText.style.display = "flex";


    // let endGameText = document.createElement("div");
    // endGameText.id = "endgame-text";

    // endGameText.innerHTML = `You died! You reached round ${countingRounds}.` + "<br>" + "Refresh to restart!";

    // gameContainer.insertBefore(endGameText, gameContainer.firstChild);



    // pointer-events: all;
}

export { endScreen };
