const character = document.getElementById('character');
const gameContainer = document.getElementById('game-container');

const movementSpeed = 3;
let x = character.offsetLeft;;
let y = character.offsetTop;;
let dx = 0;
let dy = 0;

function updateCharacterPosition() {
    if (isKeyDown('w')) {
        dy = -movementSpeed;
    } else if (isKeyDown('s')) {
        dy = movementSpeed;
    } else {
        dy = 0;
    }

    if (isKeyDown('a')) {
        dx = -movementSpeed;
    } else if (isKeyDown('d')) {
        dx = movementSpeed;
    } else {
        dx = 0;
    }

    x += dx;
    y += dy;
    character.style.left = x + 'px';
    character.style.top = y + 'px';
}

// Helper function to check if a key is down
function isKeyDown(key) {
    return keyStates[key] === true;
}

const keyStates = {};

window.addEventListener('keydown', (e) => {
    keyStates[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keyStates[e.key] = false;
});

// Get the left position in pixels
const leftPosition = character.offsetLeft;

console.log(`Left position: ${leftPosition}px`);

export { updateCharacterPosition };
