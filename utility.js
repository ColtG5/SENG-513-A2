const gameContainer = document.getElementById('game-container');


// could prob switch to a listener if game is becoming slow
function squareGameGridChecker() {
    // console.log(gameContainer.offsetWidth, gameContainer.offsetHeight);
    if (gameContainer.offsetWidth !== gameContainer.offsetHeight) {
        gameContainer.style.outline = '5px solid #732600';
    } else {
        gameContainer.style.outline = '5px solid #3C2B00';
    }
}


export { squareGameGridChecker }