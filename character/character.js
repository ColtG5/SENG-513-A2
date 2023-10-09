const character = document.getElementById('character');
const gameContainer = document.getElementById('game-container');

const movementSpeed = 4;
let x = character.offsetLeft;;
let y = character.offsetTop;;
let dx = 0;
let dy = 0;

let orient = "down-right"
let lastOrientation = "down-right"

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

    updateCharacterOrientation(dx, dy);

    x += dx;
    y += dy;
    character.style.left = x + 'px';
    character.style.top = y + 'px';
}

function updateCharacterOrientation(dx, dy) {
    if (dx === 0 && dy === 0) {
        return;
    }

    if (dx > 0) {
        if (dy > 0) {
            orient = "down-right";
        } else if (dy < 0) {
            orient = "up-right";
        } else {
            orient = "right";
        }
    } else if (dx < 0) {
        if (dy > 0) {
            orient = "down-left";
        } else if (dy < 0) {
            orient = "up-left";
        } else {
            orient = "left";
        }
    } else {
        if (dy > 0) {
            orient = "down";
        } else if (dy < 0) {
            orient = "up";
        }
    }

    if (orient !== lastOrientation) {
        console.log(orient)
        character.classList.remove("character-" + lastOrientation);
        character.classList.add("character-" + orient);
        lastOrientation = orient;
    }
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
