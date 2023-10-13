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

function toggleMusic() {
    var audio = document.getElementById("background-music");
    audio.volume = 0.1;
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    console.log("toggled music")
}

document.getElementById("music-toggle-button").addEventListener("click", function() {
    toggleMusic();
});


export { squareGameGridChecker, toggleMusic }